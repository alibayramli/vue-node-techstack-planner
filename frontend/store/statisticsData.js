import axios from 'axios';
export default {
	namespaced: true,
	state: {
		statistics: [],

	},
	mutations: {
		SET_STATISTICS(state, stats) {
			state.statistics = stats;
		},
	},
	actions: {
		async loadStatisticsInfos({ commit }) {
			const response = await axios.get('http://localhost:5000/statistics-data');
			commit('SET_STATISTICS', response.data);
		},
	},
};