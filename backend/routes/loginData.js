const express = require('express');
const router = express.Router();
const INTERNAL_SERVER_ERROR = 500;

router.post('/', (req, res) => {
	try {
		res.send(req.body);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;