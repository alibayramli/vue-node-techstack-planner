const express = require('express');
const router = express.Router();
const INTERNAL_SERVER_ERROR = 500;
const { verifyAccessToken } = require('../helpers/jwt');
const Detail = require('../models/detail.js');

router.get('/user-startups', verifyAccessToken, async (req, res) => {
	try {
		const details = await Detail.find({ author: req.user.aud });
		const startupDetails = details.map((detail) => {
			return {
				startupId: detail._id,
				startupName: detail.startupName,
				creationDate: detail.creationDate,
				choices: detail.choices,
			};
		});
		res.send(startupDetails);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

router.post('/new-startup', verifyAccessToken, async (req, res) => {
	try {
		req.body.author = req.user.aud;
		const newStartupInfo = new Detail(req.body);
		await newStartupInfo.save();
		res.send(newStartupInfo);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;