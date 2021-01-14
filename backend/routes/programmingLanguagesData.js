const express = require('express');
const router = express.Router();
const fs = require('fs');
const languagesFile = '../data/programmingLanguages.json';
const INTERNAL_SERVER_ERROR = 500;
router.post('/', (req, res) => {
	try {
		const languages = JSON.parse(fs.readFileSync(languagesFile, 'utf8'));
		const { name } = req.body;
		const languageDetails = languages[camelCase(name)] || 'language info not found';
		res.send(languageDetails);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

function camelCase(str) {
	return str[0].toLowerCase() + str.slice(1);
}

module.exports = router;