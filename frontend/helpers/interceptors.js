import axios from 'axios';
import { store } from '../store/index';
const UNAUTHORIZED_STATUS = 401;
const instance = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});
instance.interceptors.request.use(function (config) {
	const accessToken = store.getters['authData/getAccessToken'];
	if (accessToken) {
		config.headers.Authorization = 'Bearer ' + accessToken;
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

instance.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response.status === UNAUTHORIZED_STATUS && !originalRequest._retry) {
			originalRequest._retry = true;
			const newAccessToken = await store.dispatch('authData/refreshTokens');
			originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
			return axios(originalRequest);
		}
		return Promise.reject(error);
	},
);
export default instance;