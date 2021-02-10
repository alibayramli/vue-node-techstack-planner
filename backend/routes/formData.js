const express = require('express');
const router = express.Router();
const fs = require('fs');
const { verify } = require('../middleware/verifyAuth');
const formDataFile = '../data/formData.json';
const INTERNAL_SERVER_ERROR = 500;

router.get('/', verify, (req, res) => {
	try {
		const formData = JSON.parse(fs.readFileSync(formDataFile, 'utf8'));
		res.send(formData);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;