const app = require('./app');
const port = 5000;

app.listen(port, (err) => {
	return err
		? console.error('Error while starting server:', err)
		: console.log(`Server is listening on port ${port}`);
});