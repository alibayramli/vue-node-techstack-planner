import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import statisticsData from './modules/statisticsData';
import startupFormData from './modules/startupFormData';
import progLangInfoData from './modules/progLangInfoData';
import startupChoicesData from './modules/startupChoicesData';
import authData from './modules/authData';
export const store = createStore({
	modules: {
		statisticsData,
		startupFormData,
		progLangInfoData,
		startupChoicesData,
		authData,
	},
	plugins: [ createPersistedState() ],
});