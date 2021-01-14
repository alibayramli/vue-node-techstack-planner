export default {
	namespaced: true,
	state: {
		choices: {},
	},
	getters: {
		getChoices(state) {
			return state.choices;
		},
	},
	mutations: {
		SET_CHOICES(state, { type, name }) {
			state.choices[type] = name;
		},
	},
};