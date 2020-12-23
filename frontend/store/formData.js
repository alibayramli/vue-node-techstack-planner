import axios from 'axios';
export default {
	namespaced: true,
	state: {
		availableSizes: [],
		availableLocations: [],
		availableFields: [],
	},
	mutations: {
		SET_AVAILABLE_SIZES(state, sizes) {
			state.availableSizes = sizes;
		},
		SET_AVAILABLE_LOCATIONS(state, locations) {
			state.availableLocations = locations;
		},
		SET_AVAILABLE_FIELDS(state, fields) {
			state.availableFields = fields;
		},
	},
	actions: {
		async loadFormInfos({ commit }) {
			const formInfosResponse = await axios.get('http://localhost:5000/form-data');
			const locations = formInfosResponse.data.startupSpecifics.locations.map(location => location[0]);
			const sizes = formInfosResponse.data.startupSpecifics.sizeOfStartup;
			const fieldResponse = await axios.get('http://localhost:5000/tools-data');
			const fields = Object.keys(fieldResponse.data.softwareType);

			commit('SET_AVAILABLE_SIZES', sizes);
			commit('SET_AVAILABLE_LOCATIONS', locations);
			commit('SET_AVAILABLE_FIELDS', fields);
		},
	},
};