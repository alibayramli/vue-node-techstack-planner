import { createStore } from 'vuex';
import statisticsData from './modules/statisticsData';
import startupData from './modules/startupData';
import formData from './modules/formData';
import toolsData from './modules/toolsData';
import programmingLanguagesData from './modules/programmingLanguagesData';
import startupChoicesData from './modules/startupChoicesData';
import authData from './modules/authData';
export const store = createStore({
	modules: {
		statisticsData,
		startupData,
		formData,
		toolsData,
		programmingLanguagesData,
		startupChoicesData,
		authData,
	},
});