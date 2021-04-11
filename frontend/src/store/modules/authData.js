import backend from '../../helpers/interceptors';
import router from '../../router/index';
export default {
	namespaced: true,
	state: {
		fullName: '',
		email: '',
		password: '',
		confirmedPassword: '',
		accessToken: '',
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
		getConfirmedPassword(state) {
			return state.confirmedPassword;
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
		UPDATE_CONFIRMED_PASSWORD(state, newConfirmedPassword) {
			state.confirmedPassword = newConfirmedPassword;
		},
		UPDATE_ERROR_MESSAGE(state, newErrorMessage) {
			state.errorMessage = newErrorMessage;
		},
		SET_ACCESS_TOKEN(state, accessToken) {
			state.accessToken = accessToken;
		},
		SET_REFRESH_TOKEN(state, refreshToken) {
			state.refreshToken = refreshToken;
		},
		DESTROY_TOKENS(state) {
			state.accessToken = '';
			state.refreshToken = '';
		},
	},
	actions: {
		async sendSignupInfo({ commit, state }) {
			try {
				const { fullName, email, password, confirmedPassword } = state;
				const newData = { fullName, email, password, confirmedPassword };
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
				const { fullName, accessToken, refreshToken } = response.data;
				commit('UPDATE_FULL_NAME', fullName);
				commit('SET_ACCESS_TOKEN', accessToken);
				commit('SET_REFRESH_TOKEN', refreshToken);
				commit('UPDATE_ERROR_MESSAGE', '');
				router.go();
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.error);
			}
		},
		async sendLogOutInfo({ commit, state }) {
			try {
				const { refreshToken } = state;
				await backend.delete('auth-data/logout', { params: { refreshToken } });
				commit('DESTROY_TOKENS');
				router.go();
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.error);
			}
		},
		async refreshTokens({ commit, state }) {
			try {
				const refreshToken = state.refreshToken;
				const response = await backend.post('auth-data/refresh-token', { refreshToken });
				const newAccessToken = response.data.accessToken;
				const newRefreshToken = response.data.refreshToken;
				commit('SET_ACCESS_TOKEN', newAccessToken);
				commit('SET_REFRESH_TOKEN', newRefreshToken);
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.error);
			}
		},
	},
};