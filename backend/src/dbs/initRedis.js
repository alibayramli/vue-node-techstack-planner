const redis = require('redis');
const redisPortNumber = 6379;
const redisHostNumber = '127.0.0.1';

const client = redis.createClient({
	port: redisPortNumber,
	host: redisHostNumber,
});

client.on('connect', () => {
	console.log('Connected to redis');
});

client.on('ready', () => {
	console.log('Ready to use redis');
});

client.on('error', (err) => {
	console.log(err.message);
});

client.on('end', () => {
	console.log('Disconnected from redis');
});
process.on('SIGINT', () => {
	client.quit();
});

module.exports = client;