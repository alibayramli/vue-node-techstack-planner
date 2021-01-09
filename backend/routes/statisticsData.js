const express = require('express');
const router = express.Router();
const fs = require('fs');
const statisticsFile = '../data/statistics.json';
const INTERNAL_SERVER_ERROR = 500;

router.get('/', (req, res) => {
	try {
		const statistics = JSON.parse(fs.readFileSync(statisticsFile, 'utf8'));
		const { softwareType, teamStack, ...restOfStatistics } = statistics;
		res.send({ softwareType, teamStatistics: teamStack, generalStatistics: restOfStatistics });
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;