const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 5000;

const app = express();
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const INTERNAL_SERVER_ERROR = 500;
const NO_CONTENT_HTTP_STATUS = 204;

app.get('/techstack', function (req, res) {
	try {
		res.send();
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

app.post('/startupdata', function (req, res) {
	try {
		res.send();
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

app.delete('/userdata:techstackId', function (req, res) {
	try {
		res.sendStatus(NO_CONTENT_HTTP_STATUS);
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

app.patch('/environments/:envId', function (req, res) {
	try {
		res.send();
	} catch (err) {
		console.log(err);
		res.status(INTERNAL_SERVER_ERROR).send(err);
	}
});

app.listen(port, (err) => {
	if (err) {
		return console.error('Error while starting server:', err);
	}

	console.log(`Server is listening on port ${port}`);
});