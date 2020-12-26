const express = require('express');
const router = express.Router();
const fs = require('fs');
const toolsFile = '../data/tools.json';
const INTERNAL_SERVER_ERROR = 500;

router.get('/', (req, res) => {
	try {
		const tools = JSON.parse(fs.readFileSync(toolsFile, 'utf8'));
		const { softwareType, toolsRelateTo, ...restOfStatistics } = tools;
		res.send(restOfStatistics);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;