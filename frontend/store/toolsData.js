import axios from 'axios';
export default {
	namespaced: true,
	state: {
	},
	mutations: {
		SET_LOCATIONS(state, loc) {
			state.locations = loc;
		},
	},
	actions: {
		async loadTools({ commit }) {
			// const response = await axios.get('http://localhost:5000/general-info-data');
			// console.log(response.data);
			// const locations = response.data;
			// commit('SET_', locations);
		},
	},
};