const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	startupName: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	startupSize: {
		type: String,
	},
	startupLocation: {
		type: String,
	},
	startupField: {
		type: String,
		required: true,
	},
	startupBudget: {
		type: String,
	},
	creationDate: {
		type: Date,
	},
	choices: {
		general: {
			type: Object,
		},
		team: {
			type: Object,
		},
	},
});

module.exports = mongoose.model('detail', detailSchema);