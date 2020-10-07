const express = require('express');
const router = express.Router();
const INTERNAL_SERVER_ERROR = 500;
const NO_CONTENT_HTTP_STATUS = 204;
router.post('/', (req, res) => {
	try {
		console.log('post request is made');
		console.log(req.body);
		res.send('got it');
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

module.exports = router;