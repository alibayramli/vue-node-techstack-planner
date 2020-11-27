const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const startupDataRoutes = require('../routes/startupData');
const generalInfoDataRoutes = require('../routes/generalInfoData');
const toolsDataRoutes = require('../routes/toolsData');
const port = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/startup-data', startupDataRoutes);
app.use('/general-info-data', generalInfoDataRoutes);
app.use('/tools-data', toolsDataRoutes);

app.listen(port, (err) => {
	if (err) {
		return console.error('Error while starting server:', err);
	}

	console.log(`Server is listening on port ${port}`);
});