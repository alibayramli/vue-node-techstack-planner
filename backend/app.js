const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;
require('./helpers/init_mongodb');
require('./helpers/init_redis');
const authDataRoutes = require('./routes/authData');
const startupDataRoutes = require('./routes/startupData');
const techStackDataRoutes = require('./routes/techStackData');
app.use('/techstack-data', techStackDataRoutes);
app.use('/startup-data', startupDataRoutes);
app.use('/auth-data', authDataRoutes);

app.listen(port, (err) => {
	return err
		? console.error('Error while starting server:', err)
		: console.log(`Server is listening on port ${port}`);
});