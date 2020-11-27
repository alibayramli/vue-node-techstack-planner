import { createStore } from 'vuex';
import startupData from './startupData';
import generalInfoData from './generalInfoData';
import toolsData from './toolsData';
export const store = createStore({
	modules: {
		startupData,
		generalInfoData,
		toolsData,
	},
});