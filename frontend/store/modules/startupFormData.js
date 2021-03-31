import backend from '../../helpers/interceptors';
import router from '../../router/router';
export default {
	namespaced: true,
	state: {
		name: '',
		size: '',
		location: '',
		field: '',
		budget: '',
		hasFormSubmitted: false,
		availableSizes: [],
		availableLocations: [],
		availableFields: [],
		tools: [],
	},
	getters: {
		getName(state) {
			return state.name;
		},
		getSize(state) {
			return state.size;
		},
		getLocation(state) {
			return state.location;
		},
		getField(state) {
			return state.field;
		},
		getBudget(state) {
			return state.budget;
		},
		hasFormSubmitted(state) {
			return state.hasFormSubmitted;
		},
		getAvailableSizes(state) {
			return state.availableSizes;
		},
		getAvailableLocations(state) {
			return state.availableLocations;
		},
		getAvailableFields(state) {
			return state.availableFields;
		},
		getTools(state) {
			return state.tools;
		},
		getStartupFormData(state, getters, rootState) {
			const fullRouteName = router.currentRoute._rawValue.fullPath;
			const startupId = fullRouteName.substring(fullRouteName.lastIndexOf('/') + 1);
			const isDraftStartup = startupId === 'draft';
			if (isDraftStartup) {
				return {
					name: getters.getName,
					size: getters.getSize,
					location: getters.getLocation,
					field: getters.getField,
					budget: getters.getBudget,
				};
			} else {
				const savedStartup = rootState.startupChoicesData.savedChoices
					.find(startup => startup.startupId === startupId);
				return {
					name: savedStartup.startupName,
					size: savedStartup.startupSize,
					location: savedStartup.startupLocation,
					field: savedStartup.startupField,
					budget: savedStartup.startupBudget,
				};
			}
		},
	},
	mutations: {
		UPDATE_NAME(state, newStartupName) {
			state.name = newStartupName;
		},
		UPDATE_SIZE(state, newSizeValue) {
			state.size = newSizeValue;
		},
		UPDATE_LOCATION(state, newLocationValue) {
			state.location = newLocationValue;
		},
		UPDATE_FIELD(state, newFieldValue) {
			state.field = newFieldValue;
		},
		UPDATE_BUDGET(state, newBudgetValue) {
			state.budget = newBudgetValue;
		},
		UPDATE_HAS_FORM_SUBMITTED(state, newTruthyValue) {
			state.hasFormSubmitted = newTruthyValue;
		},
		SET_AVAILABLE_SIZES(state, sizes) {
			state.availableSizes = sizes;
		},
		SET_AVAILABLE_LOCATIONS(state, locations) {
			state.availableLocations = locations;
		},
		SET_AVAILABLE_FIELDS(state, fields) {
			state.availableFields = fields;
		},
		SET_TOOLS(state, tools) {
			state.tools = tools;
		},
		RESET_STARTUP_FORM(state) {
			state.name = '';
			state.size = '';
			state.location = '';
			state.field = '';
			state.budget = '';
		},
	},
	actions: {
		async loadFormInfos({ commit }) {
			const formInfosResponse = await backend.get('techstack-data/available-form-dropdowns');
			const locations = formInfosResponse.data.startupSpecifics.locations.map(location => location[0]);
			const sizes = formInfosResponse.data.startupSpecifics.sizeOfStartup;
			const fieldResponse = await backend.get('techstack-data/all-statistics');
			const fields = fieldResponse.data.typesOfSoftware;
			commit('SET_AVAILABLE_SIZES', sizes);
			commit('SET_AVAILABLE_LOCATIONS', locations);
			commit('SET_AVAILABLE_FIELDS', fields);
		},
		async createStartupQuery({ commit, state }) {
			const newData = {
				size: state.size,
				location: state.location,
				field: state.field,
			};
			const response = await backend.post('techstack-data/startup-form-query', newData);
			const suggestedProgrammingLanguages = response.data;
			commit('SET_TOOLS', suggestedProgrammingLanguages);
			commit('UPDATE_HAS_FORM_SUBMITTED', true);
			router.push('techstack');
		},
	},
};