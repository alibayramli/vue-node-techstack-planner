const JWT = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const UNAUTHORIZED_STATUS = 401;
module.exports = {
	signAccessToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {};
			const options = {
				expiresIn: '30m',
				issuer: 'techstackplanner',
				audience: userId,
			};
			JWT.sign(payload, accessTokenSecret, options, (err, token) => {
				if (err) {
					console.log(err.message);
					return reject(err);
				}
				resolve(token);
			});
		});
	},
	verifyAccessToken: (req, res, next) => {
		const [, accessToken] = req.headers.authorization.split(' ');
		if (!accessToken) {
			return res.status(UNAUTHORIZED_STATUS).send();
		}
		JWT.verify(accessToken, accessTokenSecret, (err, user) => {
			if (err) {
				console.log(err.message);
				// prevent explicit jwt error messages
				const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
				return res.status(UNAUTHORIZED_STATUS).send(message);
			}
			req.user = user;
			next();
		});
	},
	signRefreshToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {};
			const options = {
				expiresIn: '1y',
				issuer: 'techstackplanner',
				audience: userId,
			};
			JWT.sign(payload, refreshTokenSecret, options, (err, token) => {
				if (err) {
					console.log(err);
					// respond with error code in future
					return reject(err);
				}
				resolve(token);
			});
		});
	},
	verifyRefreshToken: (refreshToken) => {
		return new Promise((resolve, reject) => {
			JWT.verify(refreshToken, refreshTokenSecret, (err, payload) => {
				if (err) {
					// respond with error code in future
					console.log(err);
					return reject(err);
				}
				const userId = payload.aud;
				resolve(userId);
			});
		});
	},

};