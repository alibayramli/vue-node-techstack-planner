const Joi = require('@hapi/joi');
const minPasswordLength = 6;

const authSchemaSignup = Joi.object({
	fullName: Joi.string().required(),
	email: Joi.string().email().lowercase()
		.required(),
	password: Joi.string().min(minPasswordLength).required(),
});
const authSchemaLogin = Joi.object({
	email: Joi.string().email().lowercase()
		.required(),
	password: Joi.string().min(minPasswordLength).required(),
});

module.exports = {
	authSchemaSignup,
	authSchemaLogin,
};