/* eslint-disable no-await-in-loop */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-undef */
// eslint-disable-next-line node/no-unpublished-require
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config({ path: 'ENV_FILENAME' });
// const User = require('../../models/user');
const app = require('../../app');

describe('User', () => {
	let mongoServer;
	beforeAll(async () => {
		mongoServer = new MongoMemoryServer();
		const URI = await mongoServer.getUri();

		mongoose.connect(URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
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

	it('should log in to the system', async () => {
		const response = await request(app)
			.post('/auth/login')
			.send({
				email: 'alidemo@gmail.com',
				password: 'A2!222',
			});

		expect(response.status).toBe(200);
	});
	it('should not log in if the email is not found', async () => {
		const response = await request(app)
			.post('/auth/login')
			.send({
				email: 'unknown@gmail.com',
				password: 'A2!222',
			});

		expect(response.status).toBe(404);
	});
});