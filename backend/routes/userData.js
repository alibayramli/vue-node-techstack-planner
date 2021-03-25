const express = require('express');
const router = express.Router();
const INTERNAL_SERVER_ERROR = 500;
const { verifyAccessToken } = require('../helpers/jwt');
const Detail = require('../models/detail.js');

router.get('/startup-choices', verifyAccessToken, (req, res) => {
	try {
		Detail
			.find({})
			.populate('author', { choices: 1 })
			.exec((err, results) => {
				const userChoices = results.map((result) => {
					return {
						startupId: result._id,
						startupName: result.startupName,
						creationDate: result.creationDate,
						choices: result.choices,
					};
				});
				res.send(userChoices);
			});
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

router.post('/', verifyAccessToken, async (req, res) => {
	try {
		req.body.author = req.user.aud;
		const newStartupChoice = new Detail(req.body);
		await newStartupChoice.save();
		res.send(newStartupChoice);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;