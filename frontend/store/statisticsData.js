import axios from 'axios';
export default {
	namespaced: true,
	state: {
		generalStatistics: [],
		teamStatistics: [],
	},
	mutations: {
		SET_GENERAL_STATISTICS(state, stats) {
			state.generalStatistics = stats;
		},
		SET_TEAM_STATISTICS(state, stats) {
			state.teamStatistics = stats;
		},
	},
	actions: {
		async loadStatisticsInfos({ commit }) {
			const response = await axios.get('http://localhost:5000/statistics-data');
			const generalSt = response.data.generalStatistics;
			const { isPickable, ...restOfTeamSt } = response.data.teamStatistics;
			commit('SET_GENERAL_STATISTICS', generalSt);
			commit('SET_TEAM_STATISTICS', restOfTeamSt);
		},
	},
};