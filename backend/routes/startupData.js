const express = require('express');
const router = express.Router();
const fs = require('fs');
const { verify } = require('../middleware/verifyAuth');
const statisticsFile = '../data/statistics.json';
const INTERNAL_SERVER_ERROR = 500;
router.post('/', verify, (req, res) => {
	try {
		const statistics = JSON.parse(fs.readFileSync(statisticsFile, 'utf8'));
		const { size, location, field } = req.body;
		const tools = statistics.general.softwareType[field].popularLanguages;
		res.send(tools);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;