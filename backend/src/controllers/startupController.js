const Startup = require('../models/startup.js');
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
	getStartups: async (req, res) => {
		try {
			const details = await Startup.find({ author: req.user.aud });
			const startupDetails = details.map((detail) => {
				return {
					startupId: detail._id,
					startupName: detail.startupName,
					startupSize: detail.startupSize,
					startupLocation: detail.startupLocation,
					startupField: detail.startupField,
					startupDeploymentSpeed: detail.startupDeploymentSpeed,
					startupBudget: detail.startupBudget,
					creationDate: detail.creationDate,
					choices: detail.choices,
				};
			});
			res.send(startupDetails);
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	createStartup: async (req, res) => {
		try {
			req.body.author = req.user.aud;
			const newStartupInfo = new Startup(req.body);
			await newStartupInfo.save();
			res.send(newStartupInfo);
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	editStartup: async (req, res) => {
		try {
			req.body.author = req.user.aud;
			const startupToUpdate = await Startup
				.findByIdAndUpdate(req.params.startupId, req.body, { new: true });
			res.send(startupToUpdate);
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	deleteStartup: async (req, res) => {
		try {
			req.body.author = req.user.aud;
			const startupToDelete = await Startup
				.findByIdAndDelete(req.params.startupId);
			res.send(startupToDelete);
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
};