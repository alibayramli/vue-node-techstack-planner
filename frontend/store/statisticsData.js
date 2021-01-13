import axios from 'axios';
export default {
	namespaced: true,
	state: {
		generalStatistics: [],
		teamStatistics: [],
	},
	getters: {
		getIsPickableFilteredTeamStatistics(state) {
			const { teamStatistics } = state;
			const { isPickable, ...restOfheProperties } = teamStatistics;
			return restOfheProperties;
		},
		getIsPickableFilteredGeneralStatistics(state) {
			const { generalStatistics } = state;
			return Object.keys(generalStatistics).map((stat) => {
				const { isPickable, ...restOfheProperties } = generalStatistics[stat];
				return { [stat]: restOfheProperties };
			});
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