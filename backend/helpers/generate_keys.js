const crypto = require('crypto');
const length = 32;
const key1 = crypto.randomBytes(length).toString('hex');
const key2 = crypto.randomBytes(length).toString('hex');
console.log({ key1, key2 });