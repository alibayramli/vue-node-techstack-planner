export default {
	install: (app) => {
		app.config.globalProperties.$isValidStartupBudget = (event, budget) => {
			// allow numbers and one dot
			const keyCode = (event.keyCode ? event.keyCode : event.which);
			// eslint-disable-next-line no-magic-numbers
			if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || budget.indexOf('.') !== -1)) {
				event.preventDefault();
			}
			// allow up to 2 decimal places
			if (budget !== null && budget.indexOf('.') > 0
                && (budget.split('.')[1].length > 1)) {
				event.preventDefault();
			}
		};
	},
};