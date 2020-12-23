import { createStore } from 'vuex';
import startupData from './startupData';
import formData from './formData';
import toolsData from './toolsData';
export const store = createStore({
	modules: {
		startupData,
		formData,
		toolsData,
	},
});