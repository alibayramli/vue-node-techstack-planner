const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED_STATUS = 401;
const FORBIDDEN_STATUS = 403;
const BAD_REQUEST = 400;
const OK_STATUS = 200;
exports.verify = function (req, res, next) {
	const [, accessToken] = req.headers.authorization.split(' ');
	if (!accessToken) {
		return res.status(UNAUTHORIZED_STATUS).send();
	}
	try {
		jwt.verify(accessToken, accessTokenSecret, (err, user) => {
			if (!err) {
				req.user = user;
				next();
			}
		});
	} catch (e) {
		console.log(e);
		return res.status(FORBIDDEN_STATUS).send();
	}
};