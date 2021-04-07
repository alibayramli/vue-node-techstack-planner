const mongoose = require('mongoose');
const startupSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	startupName: {
		type: String,
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
	startupDeploymentSpeed: {
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

module.exports = mongoose.model('startup', startupSchema);