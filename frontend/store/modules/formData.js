import backend from '../../src/middleware/axios';
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
			const formInfosResponse = await backend.get('form-data');
			const locations = formInfosResponse.data.startupSpecifics.locations.map(location => location[0]);
			const sizes = formInfosResponse.data.startupSpecifics.sizeOfStartup;
			const fieldResponse = await backend.get('statistics-data');
			const fields = fieldResponse.data.typesOfSoftware;
			commit('SET_AVAILABLE_SIZES', sizes);
			commit('SET_AVAILABLE_LOCATIONS', locations);
			commit('SET_AVAILABLE_FIELDS', fields);
		},
	},
};