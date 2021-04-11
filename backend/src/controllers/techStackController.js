const fs = require('fs');
const formDataFile = './data/formData.json';
const statisticsFile = './data/statisticsData.json';
const languagesFile = './data/programmingLanguagesData.json';
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
	getFormDropdowns: (req, res) => {
		try {
			const formData = JSON.parse(fs.readFileSync(formDataFile, 'utf8'));
			res.send(formData);
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	getStatisticsInfo: (req, res) => {
		try {
			const statistics = JSON.parse(fs.readFileSync(statisticsFile, 'utf8'));
			const { general, team } = statistics;
			const { softwareType, ...restofGeneral } = general;
			const typesOfSoftware = Object.keys(softwareType);
			res.send({ generalStatistics: restofGeneral, teamStatistics: team, typesOfSoftware });
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	createFormResult: (req, res) => {
		try {
			const statistics = JSON.parse(fs.readFileSync(statisticsFile, 'utf8'));
			const { field } = req.body;
			const tools = statistics.general.softwareType[field].popularLanguages;
			res.send(tools);
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
	createProgLangInfo: (req, res) => {
		try {
			const languages = JSON.parse(fs.readFileSync(languagesFile, 'utf8'));
			const { name: languageName } = req.body;
			const languageDetails = languages[convertToCamelCase(languageName)];
			res.send(languageDetails);
		} catch (err) {
			console.log(err);
			res.status(INTERNAL_SERVER_ERROR).send(err);
		}
	},
};

function convertToCamelCase(str) {
	return str[0].toLowerCase() + str.slice(1);
}