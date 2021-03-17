import axios from 'axios';
import { store } from '../store/index';
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
export default instance;