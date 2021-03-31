import { createStore } from 'vuex';
import statisticsData from './modules/statisticsData';
import startupFormData from './modules/startupFormData';
import programmingLanguagesData from './modules/programmingLanguagesData';
import startupChoicesData from './modules/startupChoicesData';
import authData from './modules/authData';
export const store = createStore({
	modules: {
		statisticsData,
		startupFormData,
		programmingLanguagesData,
		startupChoicesData,
		authData,
	},
});