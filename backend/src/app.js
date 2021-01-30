const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const statisticsDataRoutes = require('../routes/statisticsData');
const startupDataRoutes = require('../routes/startupData');
const formDataRoutes = require('../routes/formData');
const programmingLanguagesDataRoutes = require('../routes/programmingLanguagesData');
const userDataRoutes = require('../routes/userData');
const signupDataRoutes = require('../routes/signupData');
const loginDataRoutes = require('../routes/loginData');
const port = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use('/signup-data', signupDataRoutes);
app.use('/login-data', loginDataRoutes);
app.use('/statistics-data', statisticsDataRoutes);
app.use('/startup-data', startupDataRoutes);
app.use('/form-data', formDataRoutes);
app.use('/programming-languages-data', programmingLanguagesDataRoutes);
app.use('/user-data', userDataRoutes);

app.listen(port, (err) => {
	if (err) {
		return console.error('Error while starting server:', err);
	}

	console.log(`Server is listening on port ${port}`);
});