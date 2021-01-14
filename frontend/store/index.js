import { createStore } from 'vuex';
import statisticsData from './statisticsData';
import startupData from './startupData';
import formData from './formData';
import toolsData from './toolsData';
import programmingLanguagesData from './programmingLanguagesData';
export const store = createStore({
	modules: {
		statisticsData,
		startupData,
		formData,
		toolsData,
		programmingLanguagesData,
	},
});