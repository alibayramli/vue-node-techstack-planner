const express = require('express');
const router = express.Router();
const INTERNAL_SERVER_ERROR = 500;
const UserChoice = require('../models/userChoice.js');
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