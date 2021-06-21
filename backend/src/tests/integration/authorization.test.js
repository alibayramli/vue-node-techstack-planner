/* eslint-disable no-magic-numbers */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
let mongoServer;
const opts = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
};
beforeAll(async () => {
	mongoServer = new MongoMemoryServer();
	const URI = await mongoServer.getUri();

	mongoose.connect(URI, opts, (err) => {
		if (err) {
			console.error(err);
		}
	});
});
afterAll(async (done) => {
	mongoose.disconnect(done);
	await mongoServer.stop();
});
afterEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (const collection of collections) {
		await collection.deleteMany();
	}
});
describe('User', () => {
	it('should be able to create an account with correct credentials', async () => {
		const response = await request(app)
			.post('/auth/signup')
			.send({
				fullName: 'Ali Bayramli',
				email: 'alidemo@gmail.com',
				password: 'A2!222',
				confirmedPassword: 'A2!222',
			});

		expect(response.status).toBe(200);
	});
	it('should not create an account if email is already used', async () => {
		await request(app)
			.post('/auth/signup')
			.send({
				fullName: 'Ali Bayramli',
				email: 'someone@gmail.com',
				password: 'ABCD!1',
				confirmedPassword: 'ABCD!1',
			});
		const response = await request(app)
			.post('/auth/signup')
			.send({
				fullName: 'Ali Bayramli',
				email: 'someone@gmail.com',
				password: 'ABCD!1',
				confirmedPassword: 'ABCD!1',
			});
		expect(JSON.parse(response.text).title).toBe('email is in use');
	});

	it('should not log in if email is not in the database', async () => {
		await request(app)
			.post('/auth/signup')
			.send({
				fullName: 'Ali Bayramli',
				email: 'someone@gmail.com',
				password: 'ABCD!1',
				confirmedPassword: 'ABCD!1',
			});
		const response = await request(app)
			.post('/auth/login')
			.send({
				email: 'unknown@gmail.com',
				password: 'ABCD!1!',
			});
		expect(response.status).toBe(404);
	});

	it('should not log in if paswword is incorrect', async () => {
		await request(app)
			.post('/auth/signup')
			.send({
				fullName: 'Ali Bayramli',
				email: 'someone@gmail.com',
				password: 'ABCD!1',
				confirmedPassword: 'ABCD!1',
			});
		const response = await request(app)
			.post('/auth/login')
			.send({
				email: 'someone@gmail.com',
				password: 'ABCD!1!',
			});
		expect(response.status).toBe(401);
	});

	it('should log in to the system with correct credentials', async () => {
		await request(app)
			.post('/auth/signup')
			.send({
				fullName: 'Ali Bayramli',
				email: 'someone@gmail.com',
				password: 'ABCD!1',
				confirmedPassword: 'ABCD!1',
			});
		const response = await request(app)
			.post('/auth/login')
			.send({
				email: 'someone@gmail.com',
				password: 'ABCD!1',
			});
		expect(JSON.parse(response.text).title).toBe('login successful');
	});

	it('should not view protected content without access token', async () => {
		const response = await request(app)
			.get('/startup/user-startups');
		expect(response.status).toBe(500);
	});
});