import { createStore } from 'vuex';
import startupData from './startupData';
import availableData from './availableData';
import toolsData from './toolsData';
export const store = createStore({
	modules: {
		startupData,
		availableData,
		toolsData,
	},
});