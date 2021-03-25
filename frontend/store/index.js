import { createStore } from 'vuex';
import statisticsData from './modules/statisticsData';
import startupFormData from './modules/startupFormData';
import toolsData from './modules/toolsData';
import programmingLanguagesData from './modules/programmingLanguagesData';
import startupChoicesData from './modules/startupChoicesData';
import authData from './modules/authData';
export const store = createStore({
	modules: {
		statisticsData,
		startupFormData,
		toolsData,
		programmingLanguagesData,
		startupChoicesData,
		authData,
	},
});