export default {
	namespaced: true,
	state: {
		tools: [],
	},
	mutations: {
		SET_TOOLS(state, tools) {
			state.tools = tools;
		},
	},
};