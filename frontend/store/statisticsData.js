import axios from 'axios';
export default {
	namespaced: true,
	state: {
		generalStatistics: [],
		teamStatistics: [],
	},
	getters: {
		getGeneralStatistics: (state) => {
			Object.keys(state.generalStatistics).forEach(stat => delete state.generalStatistics[stat].isPickable);
			return state.generalStatistics;
		},
		getTeamStatistics: (state) => {
			delete state.teamStatistics.isPickable;
			return state.teamStatistics;
		},
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
			commit('SET_GENERAL_STATISTICS', response.data.generalStatistics);
			commit('SET_TEAM_STATISTICS', response.data.teamStatistics);
		},
	},
};