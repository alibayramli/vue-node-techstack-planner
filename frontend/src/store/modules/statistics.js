import backend from '../../helpers/interceptors';
export default {
	namespaced: true,
	state: {
		generalStatistics: [],
		teamStatistics: [],
	},
	getters: {
		getIsPickableIgnoredGeneralStatistics(state) {
			const { generalStatistics } = state;
			return Object.keys(generalStatistics).map((stat) => {
				const { isPickable, ...restOfheProperties } = generalStatistics[stat];
				return { [stat]: restOfheProperties };
			});
		},
		getIsPickableGeneralStatistics(state) {
			const { generalStatistics } = state;
			return Object.keys(generalStatistics)
				.filter(stat => generalStatistics[stat].isPickable)
				.map((stat) => {
					const { isPickable, ...restOfheProperties } = generalStatistics[stat];
					return { [stat]: restOfheProperties };
				});
		},
		getTeamStatistics(state) {
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
			const response = await backend.get('techstack/all-statistics');
			commit('SET_GENERAL_STATISTICS', response.data.generalStatistics);
			commit('SET_TEAM_STATISTICS', response.data.teamStatistics);
		},
	},
};