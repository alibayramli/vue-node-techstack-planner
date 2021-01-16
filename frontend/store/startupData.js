import axios from 'axios';
import router from '../router/router';
export default {
	namespaced: true,
	state: {
		name: '',
		size: '',
		location: '',
		field: '',
		budget: '',
	},
	mutations: {
		UPDATE_NAME(state, newStartupName) {
			state.name = newStartupName;
		},
		UPDATE_SIZE(state, newSizeValue) {
			state.size = newSizeValue;
		},
		UPDATE_LOCATION(state, newLocationValue) {
			state.location = newLocationValue;
		},
		UPDATE_FIELD(state, newFieldValue) {
			state.field = newFieldValue;
		},
		UPDATE_BUDGET(state, newBudgetValue) {
			state.budget = newBudgetValue;
		},
	},
	actions: {
		async createData({ commit, state }) {
			const newData = {
				size: state.size,
				location: state.location,
				field: state.field,
			};
			const response = await axios.post('http://localhost:5000/startup-data', newData);
			const suggestedProgrammingLanguages = response.data;
			commit('toolsData/SET_TOOLS', suggestedProgrammingLanguages, { root: true });
			router.push('techstack');
		},
	},
};