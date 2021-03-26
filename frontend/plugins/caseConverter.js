export default {
	install: (app) => {
		app.config.globalProperties.$convertToStartCase = (camelCaseStr) => {
			return camelCaseStr.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
		};
	},
};