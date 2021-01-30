const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const INTERNAL_SERVER_ERROR = 500;
const UNAUTHORIZED_STATUS = 401;
const BAD_REQUEST = 400;
const OK_STATUS = 200;
const User = require('../models/user');
const UserChoice = require('../models/userChoice.js');
const mongoose = require('mongoose');
const dbUrl = process.env.URL;
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
const db = mongoose.connection;
db.once('open', function () {
	console.log('Connected to mongoDB');
});
db.on('error', function (err) {
	console.log('Error in connection:');
	console.log(err);
});
router.post('/', async (req, res) => {
	try {
		const newStartupChoice = new UserChoice(req.body);
		console.log(req.body);
		await newStartupChoice.save();
		res.send(newStartupChoice);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});
router.post('/signup', async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		const saltRounds = 10;
		const salt = bcrypt.genSaltSync(saltRounds);
		const newUser = new User({
			fullName, email, password: bcrypt.hashSync(password, salt),
		});
		await newUser.save((err) => {
			if (err) {
				return res.status(BAD_REQUEST).json({
					title: 'email is in use',
				});
			}
			return res.status(OK_STATUS).json({
				title: 'successful signup',
			});
		});
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		await User.findOne({ email }, (err, user) => {
			if (err) {
				return res.status(INTERNAL_SERVER_ERROR).json({
					title: 'server error',
					error: err,
				});
			}
			if (!user) {
				return res.status(UNAUTHORIZED_STATUS).json({
					title: 'user not found',
					error: 'invalid credentials',
				});
			}
			// if password is incorrect
			if (!bcrypt.compareSync(password, user.password)) {
				return res.status(UNAUTHORIZED_STATUS).json({
					title: 'login failed',
					error: 'invalid credentials',
				});
			}
		});
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;