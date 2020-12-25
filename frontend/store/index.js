import { createStore } from 'vuex';
import statisticsData from './statisticsData';
import startupData from './startupData';
import formData from './formData';
import toolsData from './toolsData';
export const store = createStore({
	modules: {
		statisticsData,
		startupData,
		formData,
		toolsData,
	},
});