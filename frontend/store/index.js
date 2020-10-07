import { createStore } from 'vuex';
import startupData from './startupData';
export const store = createStore({
	modules: {
		startupData,
	},
});