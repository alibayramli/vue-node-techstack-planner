import backend from '../../src/middleware/axios';
import router from '../../router/router';
export default {
	namespaced: true,
	state: {
		fullName: '',
		email: '',
		password: '',
		accessToken: localStorage.getItem('accessToken') || '',
		refreshToken: '',
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
		getAccessToken(state) {
			return state.accessToken;
		},
		isLoggedIn(state) {
			return !!state.accessToken;
		},
		getErrorMessage(state) {
			return state.errorMessage;
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
		SET_ACCESS_TOKEN(state, token) {
			state.accessToken = token;
		},
		UPDATE_ERROR_MESSAGE(state, newErrorMessage) {
			state.errorMessage = newErrorMessage;
		},
	},
	actions: {
		async sendSignupInfo({ commit, state }) {
			try {
				const { fullName, email, password } = state;
				const newData = { fullName, email, password };
				await backend.post('auth-data/signup', newData);
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
				const response = await backend.post('auth-data/login', newData);
				const accessToken = response.data.accessToken;
				commit('SET_ACCESS_TOKEN', accessToken);
				commit('UPDATE_ERROR_MESSAGE', '');
				localStorage.setItem('accessToken', accessToken);
				router.go();
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.error);
			}
		},
	},
};