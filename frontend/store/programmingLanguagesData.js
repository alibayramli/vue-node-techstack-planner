import axios from 'axios';
export default {
	namespaced: true,
	state: {
		name,
		details: [],
	},
	mutations: {
		UPDATE_NAME(state, newName) {
			state.name = newName;
		},
		UPDATE_DETAILS(state, newDetails) {
			state.details = newDetails;
		},
	},
	actions: {
		async loadProgrammingLanguageDetails({ commit, state }) {
			const newData = {
				name: state.name,
			};
			const response = await axios.post('http://localhost:5000/programming-languages-data', newData);
			const details = response.data;
			commit('UPDATE_DETAILS', details);
		},
	},
};