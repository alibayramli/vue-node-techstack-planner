const express = require('express');
const router = express.Router();
const INTERNAL_SERVER_ERROR = 500;
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

module.exports = router;