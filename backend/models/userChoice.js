const mongoose = require('mongoose');
const userChoiceSchema = new mongoose.Schema({
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
	choices: {
		general: {
			type: Object,
		},
		team: {
			type: Object,
		},
	},
});

module.exports = mongoose.model('Choice', userChoiceSchema);