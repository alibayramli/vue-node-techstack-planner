import axios from 'axios';
import router from '../router/router';
export default {
	namespaced: true,
	state: {
		size: '',
		location: '',
		field: '',
		budget: '',
		name: '',
	},
	mutations: {
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
		UPDATE_NAME(state, newStartupName) {
			state.name = newStartupName;
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