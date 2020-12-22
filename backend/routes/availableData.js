const express = require('express');
const router = express.Router();
const fs = require('fs');
const availableDataFile = '../data/availableData.json';
const INTERNAL_SERVER_ERROR = 500;

router.get('/', (req, res) => {
	try {
		const availableData = JSON.parse(fs.readFileSync(availableDataFile, 'utf8'));
		res.send(availableData);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;