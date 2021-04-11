const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
require('./dbs/initMongodb');
require('./dbs/initRedis');
const authRoute = require('./routes/authRoute');
const startupRoute = require('./routes/startupRoute');
const techStackRoute = require('./routes/techStackRoute');
app.use('/techstack-data', techStackRoute);
app.use('/startup-data', startupRoute);
app.use('/auth-data', authRoute);

app.listen(port, (err) => {
	return err
		? console.error('Error while starting server:', err)
		: console.log(`Server is listening on port ${port}`);
});