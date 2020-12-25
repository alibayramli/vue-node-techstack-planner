import axios from 'axios';
export default {
	namespaced: true,
	state: {
		developersStatistics: [],
		languagesStatistics: [],
		frameworksStatistics: [],
		databasesStatistics: [],
		collaborationToolsStatistics: [],
		topPayingTechnologiesStatistics: [],

	},
	mutations: {
		SET_DEVELOPERS_STATISTICS(state, devStats) {
			state.developersStatistics = devStats;
		},
		SET_LANGUAGES_STATISTICS(state, langStats) {
			state.languagesStatistics = langStats;
		},
		SET_FRAMEWORKS_STATISTICS(state, frameworkStats) {
			state.frameworksStatistics = frameworkStats;
		},
		SET_DATABASES_STATISTICS(state, dbStats) {
			state.databasesStatistics = dbStats;
		},
		SET_COLLABORATION_TOOLS_STATISTICS(state, collabStats) {
			state.collaborationToolsStatistics = collabStats;
		},
		SET_TOP_PAYING_TECHNOLOGIES_STATISTICS(state, topPayTechStats) {
			state.topPayingTechnologiesStatistics = topPayTechStats;
		},
	},
	actions: {
		async loadStatisticsInfos({ commit }) {
			const response = await axios.get('http://localhost:5000/statistics-data');
			commit('SET_DEVELOPERS_STATISTICS', response.data.developerType);
			commit('SET_LANGUAGES_STATISTICS', response.data.mostUsedLanguages);
			commit('SET_LANGUAGES_STATISTICS', response.data.mostUsedLanguages);
			commit('SET_FRAMEWORKS_STATISTICS', response.data.mostWantedFrameworks);
			commit('SET_DATABASES_STATISTICS', response.data.databases);
			commit('SET_COLLABORATION_TOOLS_STATISTICS', response.data.collaborationTools);
			commit('SET_TOP_PAYING_TECHNOLOGIES_STATISTICS', response.data.topPayingTechnologies);
		},
	},
};