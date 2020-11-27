const express = require('express');
const router = express.Router();
const fs = require('fs');
const generalInfoFile = '../data/generalInfo.json';
const INTERNAL_SERVER_ERROR = 500;

router.get('/', (req, res) => {
	try {
		const generalInfo = JSON.parse(fs.readFileSync(generalInfoFile, 'utf8'));
		res.send(generalInfo);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;