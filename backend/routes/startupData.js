const express = require('express');
const router = express.Router();
const fs = require('fs');
const statisticsFile = '../data/statistics.json';
const INTERNAL_SERVER_ERROR = 500;
router.post('/', (req, res) => {
	try {
		const statistics = JSON.parse(fs.readFileSync(statisticsFile, 'utf8'));
		const { size, location, field } = req.body;
		const tools = statistics.softwareType[field].popularLanguages;
		res.send(tools);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;