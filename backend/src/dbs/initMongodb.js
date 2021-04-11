const mongoose = require('mongoose');
const dbUrl = process.env.URL;
mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});
const db = mongoose.connection;
db.on('connected', function () {
	console.log('Connected to mongoDB');
});
db.on('error', function (err) {
	console.log('Error in connection:');
	console.log(err);
});

process.on('SIGINT', function () {
	db.close(function () {
		throw new Error('Mongoose connection is disconnected');
	});
});