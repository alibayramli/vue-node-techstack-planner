import backend from '../../helpers/interceptors';
export default {
	namespaced: true,
	state: {
		name: '',
		details: [],
	},
	getters: {
		getDetails(state) {
			return state.details;
		},
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
			const response = await backend.post('techstack-data/programming-language-info', newData);
			const details = response.data;
			commit('UPDATE_DETAILS', details);
		},
	},
};