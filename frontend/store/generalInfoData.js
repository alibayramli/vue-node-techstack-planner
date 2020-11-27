import axios from 'axios';
export default {
	namespaced: true,
	state: {
		locations: [],
		fields: [],
		startupSizes: [],
	},
	mutations: {
		SET_STARTUP_SIZES(state, sizes) {
			state.startupSizes = sizes;
		},
		SET_LOCATIONS(state, locs) {
			state.locations = locs;
		},
		SET_FIELDS(state, fields) {
			state.fields = fields;
		},
	},
	actions: {
		async loadGeneralInfos({ commit }) {
			const response = await axios.get('http://localhost:5000/general-info-data');
			const locations = response.data.startupSpecifics.locations.map(location => location[0]);
			const startupSizes = response.data.startupSpecifics.sizeOfStartup;
			console.log(locations);
			console.log(startupSizes);
			commit('SET_LOCATIONS', locations);
			commit('SET_STARTUP_SIZES', startupSizes);
		},
		async loadFields({ commit }) {
			const response = await axios.get('http://localhost:5000/tools-data');
			const fields = Object.keys(response.data.softwareType);
			console.log(fields);
			commit('SET_FIELDS', fields);
		},
	},
};