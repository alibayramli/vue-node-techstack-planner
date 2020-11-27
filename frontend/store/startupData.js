import axios from 'axios';
export default {
	namespaced: true,
	state: {
		size: '',
		location: '',
		field: '',
	},
	mutations: {
		UPDATE_SIZE(state, newSizeValue) {
			state.size = newSizeValue;
		},
		UPDATE_LOCATION(state, newLocationValue) {
			state.location = newLocationValue;
		},
		UPDATE_FIELD(state, newFieldValue) {
			state.field = newFieldValue;
		},
	},
	actions: {
		async createStartupData({ state }) {
			const newStartupData = {
				size: state.size,
				location: state.location,
				field: state.field,
			};
			const response = await axios.post('http://localhost:5000/startup-data', newStartupData);
			console.log('answer from backend:');
			console.log(response.data);
		},
	},
};