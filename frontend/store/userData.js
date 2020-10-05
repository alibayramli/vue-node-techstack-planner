export default {
	namespaced: true,
	state: {
		size: '',
		location: '',
		budget: '',
	},
	mutations: {
		UPDATE_SIZE(state, newSizeValue) {
			state.size = newSizeValue;
		},
		UPDATE_LOCATION(state, newLocationValue) {
			state.location = newLocationValue;
		},
		UPDATE_BUDGET(state, newBudgetValue) {
			state.budget = newBudgetValue;
		},
	},
	actions: {
	},
};