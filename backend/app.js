const express = require('express');
const cors = require('cors');
require('./helpers/init_mongodb');
require('./helpers/init_redis');
const statisticsDataRoutes = require('./routes/statisticsData');
const startupDataRoutes = require('./routes/startupData');
const formDataRoutes = require('./routes/formData');
const programmingLanguagesDataRoutes = require('./routes/programmingLanguagesData');
const userDataRoutes = require('./routes/userData');
const authDataRoutes = require('./routes/authData');
const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use('/statistics-data', statisticsDataRoutes);
app.use('/startup-data', startupDataRoutes);
app.use('/form-data', formDataRoutes);
app.use('/programming-languages-data', programmingLanguagesDataRoutes);
app.use('/user-data', userDataRoutes);
app.use('/auth-data', authDataRoutes);

app.listen(port, (err) => {
	return err
		? console.error('Error while starting server:', err)
		: console.log(`Server is listening on port ${port}`);
});