import { createStore } from 'vuex';
import statisticsData from './modules/statisticsData';
import startupData from './modules/startupData';
import formData from './modules/formData';
import toolsData from './modules/toolsData';
import programmingLanguagesData from './modules/programmingLanguagesData';
import userData from './modules/userData';
export const store = createStore({
	modules: {
		statisticsData,
		startupData,
		formData,
		toolsData,
		programmingLanguagesData,
		userData,
	},
});