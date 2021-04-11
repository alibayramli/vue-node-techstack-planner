const { authSchemaSignup, authSchemaLogin } = require('../helpers/validateAuthSchema');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/handleJwt');
const client = require('../dbs/initRedis');
const User = require('../models/user');
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED_STATUS = 401;
const UNPROCESSABLE_ENTITY = 422;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const OK_STATUS = 200;
const NO_CONTENT_STATUS = 204;
module.exports = {
	signup: async (req, res) => {
		try {
			const resultObj = await authSchemaSignup.validateAsync(req.body);
			const { fullName, email, password } = resultObj;
			const doesUserExist = await User.findOne({ email });
			if (doesUserExist) {
				return res.status(BAD_REQUEST).json({
					title: 'email is in use',
				});
			}
			const newUser = new User({
				fullName,
				email,
				password,
			});
			await newUser.save();
			return res.status(OK_STATUS).json({
				title: 'signup successful',
			});
		} catch (err) {
			console.log(err);
			if (err.isJoi === true) {
				res.status(UNPROCESSABLE_ENTITY).send(err);
			}
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	// eslint-disable-next-line max-statements
	login: async (req, res) => {
		try {
			const resultObj = await authSchemaLogin.validateAsync(req.body);
			const { email, password } = resultObj;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(NOT_FOUND).json({
					title: 'not found',
					error: 'User has not been registered yet',
				});
			}
			const isMathced = await user.isValidPassword(password);
			if (!isMathced) {
				return res.status(UNAUTHORIZED_STATUS).json({
					title: 'login failed',
					error: 'invalid credentials',
				});
			}
			const accessToken = await signAccessToken(String(user._id));
			const refreshToken = await signRefreshToken(String(user._id));
			return res.status(OK_STATUS).json({
				title: 'login successful',
				fullName: user.fullName,
				accessToken,
				refreshToken,
			});
		} catch (err) {
			console.log(err);
			if (err.isJoi === true) {
				return res.status(BAD_REQUEST).json({
					title: 'login failed',
					error: 'invalid credentials',
				});
			}
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	refreshToken: async (req, res) => {
		try {
			const { refreshToken } = req.body;
			if (!refreshToken) {
				res.status(BAD_REQUEST).send();
			}
			const userId = await verifyRefreshToken(refreshToken);
			const newAccessToken = await signAccessToken(userId);
			const newRefreshToken = await signRefreshToken(userId);
			return res.status(OK_STATUS).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	logout: async (req, res) => {
		try {
			const { refreshToken } = req.query;
			if (!refreshToken) {
				return res.status(BAD_REQUEST).json({
					title: 'no refresh token',
					error: 'please provide with a refresh token',
				});
			}
			const userId = await verifyRefreshToken(refreshToken);
			client.DEL(userId, (err, value) => {
				if (err) {
					console.log(err.message);
					res.status(INTERNAL_SERVER_ERROR).send(err);
				}
				console.log(value);
				res.sendStatus(NO_CONTENT_STATUS);
			});
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
};