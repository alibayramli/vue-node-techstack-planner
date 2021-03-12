import backend from '../../src/middleware/axios';
import router from '../../router/router';
export default {
	namespaced: true,
	state: {
		fullName: '',
		email: '',
		password: '',
		token: localStorage.getItem('token') || '',
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
		getToken(state) {
			return state.token;
		},
		isLoggedIn(state) {
			return !!state.token;
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
		DELETE_GENERAL_CHOICE(state, { type }) {
			delete state.generalChoices[type];
		},
		SET_TEAM_CHOICES(state, { header, type, name }) {
			state.teamChoices.push({ [header]: { [type]: name } });
		},
		DELETE_TEAM_CHOICE(state, { header, type, name }) {
			const teamChoiceIdxToDelete = state.teamChoices
				.findIndex(choice => choice[header] && choice[header][type] === name);
			delete state.teamChoices.splice(teamChoiceIdxToDelete, 1);
		},
		SET_TOKEN(state, token) {
			state.token = token;
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
				await backend.post('user-data/signup', newData);
				commit('UPDATE_ERROR_MESSAGE', '');
				router.push('/');
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.title);
			}
		},
		async sendLoginInfo({ commit, state }) {
			try {
				const { email, password } = state;
				const newData = { email, password };
				const response = await backend.post('user-data/login', newData);
				const accessToken = response.data.accessToken;
				commit('SET_TOKEN', accessToken);
				commit('UPDATE_ERROR_MESSAGE', '');
				localStorage.setItem('token', accessToken);
				router.go();
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.error);
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
				await backend.post('user-data', newData);
				commit('UPDATE_IS_CHOICES_SAVED', true);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
	},
};