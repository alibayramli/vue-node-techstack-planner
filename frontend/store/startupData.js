import axios from 'axios';
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
		async createStartupData({ commit, state }) {
			const newStartupData = {
				size: state.size,
				location: state.location,
				budget: state.budget,
			};
			const response = await axios.post('http://localhost:5000/startup-data', newStartupData);
			console.log('answer from backend:');
			console.log(response.data);
		},
	},
};