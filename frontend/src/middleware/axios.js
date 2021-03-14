import axios from 'axios';
import { store } from '../../store/index';
const instance = axios.create({
	baseURL: 'http://localhost:5000',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});
instance.interceptors.request.use(function (config) {
	const token = store.getters['authData/getToken'];
	config.headers.Authorization = 'Bearer ' + token;
	return config;
}, function (error) {
	return Promise.reject(error);
});
export default instance;