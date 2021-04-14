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
		toastDuration: 1000,
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
		async sendSignupInfo({ commit, state }, { vm }) {
			try {
				const { fullName, email, password, confirmedPassword } = state;
				const newData = { fullName, email, password, confirmedPassword };
				await backend.post('auth/signup', newData);
				commit('UPDATE_ERROR_MESSAGE', '');
				vm.$toast.success('Account created. Sign in to use your account', {
					position: 'top-right',
				});
				setTimeout(() => {
					router.push('/');
				}, state.toastDuration);
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.title);
				vm.$toast.error(state.errorMessage || 'Oops there is something wrong.', {
					position: 'top-right',
					duration: 2000,
				});
			}
		},
		async sendLoginInfo({ commit, state }, { vm }) {
			try {
				const { email, password } = state;
				const newData = { email, password };
				const response = await backend.post('auth/login', newData);
				const { fullName, accessToken, refreshToken } = response.data;
				commit('UPDATE_FULL_NAME', fullName);
				commit('SET_ACCESS_TOKEN', accessToken);
				commit('SET_REFRESH_TOKEN', refreshToken);
				commit('UPDATE_ERROR_MESSAGE', '');
				vm.$toast.success('You are now logged in', {
					position: 'top-right',
				});
				setTimeout(() => {
					router.go();
				}, state.toastDuration);
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.error);
				vm.$toast.error(state.errorMessage || 'Oops there is something wrong.', {
					position: 'top-right',
					duration: 1000,
				});
			}
		},
		async sendLogOutInfo({ commit, state }, { vm }) {
			try {
				const { refreshToken } = state;
				await backend.delete('auth/logout', { params: { refreshToken } });
				commit('DESTROY_TOKENS');
				vm.$toast.info('You are now logged out.', {
					position: 'top-right',
				});
				setTimeout(() => {
					router.go();
				}, state.toastDuration);
			} catch (err) {
				commit('UPDATE_ERROR_MESSAGE', err.response.data.error);
				vm.$toast.error(state.errorMessage || 'Oops there is something wrong.', {
					position: 'top-right',
					duration: 1000,
				});
			}
		},
		async refreshTokens({ commit, state }) {
			try {
				const refreshToken = state.refreshToken;
				const response = await backend.post('auth/refresh-token', { refreshToken });
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