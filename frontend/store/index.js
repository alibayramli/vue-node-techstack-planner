import { createStore } from 'vuex';
import statisticsData from './statisticsData';
import startupData from './startupData';
import formData from './formData';
import toolsData from './toolsData';
import programmingLanguagesData from './programmingLanguagesData';
import userData from './userData';
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