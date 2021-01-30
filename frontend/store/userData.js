import axios from 'axios';
import router from '../router/router';
export default {
	namespaced: true,
	state: {
		fullName: '',
		email: '',
		password: '',
		generalChoices: {},
		teamChoices: [],
		isChoicesSaved: false,
		errorMessage: '',
	},
	getters: {
		getFullName(state) {
			return state.fullName;
		},
		getEmail(state) {
			return state.email;
		},
		getPassword(state) {
			return state.password;
		},
		getErrorMessage(state) {
			return state.errorMessage;
		},
		getGeneralChoices(state) {
			return state.generalChoices;
		},
		getTeamChoices(state) {
			return state.teamChoices;
		},
	},
	mutations: {
		UPDATE_FULL_NAME(state, newFullName) {
			state.fullName = newFullName;
		},
		UPDATE_EMAIL(state, newEmail) {
			state.email = newEmail;
		},
		UPDATE_PASSWORD(state, newPassword) {
			state.password = newPassword;
		},
		UPDATE_ERROR_MESSAGE(state, newErrorMessage) {
			state.errorMessage = newErrorMessage;
		},
		SET_GENERAL_CHOICES(state, { type, name }) {
			state.generalChoices[type] = name;
		},
		SET_TEAM_CHOICES(state, { header, type, name }) {
			state.teamChoices.push({ [header]: { [type]: name } });
		},
		UPDATE_IS_CHOICES_SAVED(state, newIsChoicesSavedValue) {
			state.isChoicesSaved = newIsChoicesSavedValue;
		},
	},
	actions: {
		async sendSignupInfo({ commit, state }) {
			try {
				const { fullName, email, password } = state;
				const newData = { fullName, email, password };
				await axios.post('http://localhost:5000/user-data/signup', newData);
				commit('UPDATE_ERROR_MESSAGE', '');
				router.push('login');
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.title);
			}
		},
		async sendLoginInfo({ state }) {
			try {
				const { email, password } = state;
				const newData = { email, password };
				await axios.post('http://localhost:5000/user-data/login', newData);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		async sendChoicesToBackend({ commit, state, rootState }) {
			try {
				const { generalChoices, teamChoices } = state;
				const newData = {
					startupName: rootState.startupData.name,
					startupSize: rootState.startupData.size,
					startupLocation: rootState.startupData.location,
					startupField: rootState.startupData.field,
					startupBudget: rootState.startupData.budget + 'k',
					choices: {
						general: generalChoices,
						team: teamChoices,
					},
				};
				await axios.post('http://localhost:5000/user-data', newData);
				commit('UPDATE_IS_CHOICES_SAVED', true);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
	},
};