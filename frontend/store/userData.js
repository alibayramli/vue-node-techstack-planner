export default {
	namespaced: true,
	state: {
		generalChoices: {},
		teamChoices: [],
	},
	getters: {
		getGeneralChoices(state) {
			return state.generalChoices;
		},
		getTeamChoices(state) {
			return state.teamChoices;
		},
	},
	mutations: {
		SET_GENERAL_CHOICES(state, { type, name }) {
			state.generalChoices[type] = name;
		},
		SET_TEAM_CHOICES(state, { header, type, name }) {
			state.teamChoices.push({ [header]: { [type]: name } });
		},
	},
};