const express = require('express');
const cors = require('cors');
const app = express();
require('./dbs/initMongodb');
require('./dbs/initRedis');
app.use(cors());
app.use(express.json());
const authRoute = require('./routes/authRoute');
const startupRoute = require('./routes/startupRoute');
const techStackRoute = require('./routes/techStackRoute');
app.use('/techstack', techStackRoute);
app.use('/startup', startupRoute);
app.use('/auth', authRoute);

module.exports = app;