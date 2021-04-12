import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import statisticsData from './modules/statisticsData';
import startupFormData from './modules/startupFormData';
import progLangInfoData from './modules/progLangInfoData';
import startupChoicesData from './modules/startupChoicesData';
import auth from './modules/auth';
export const store = createStore({
	modules: {
		statisticsData,
		startupFormData,
		progLangInfoData,
		startupChoicesData,
		auth,
	},
	plugins: [ createPersistedState({
		key: 'vuex',
		reducer(value) {
			if (!value.auth.accessToken) {
				// return empty state when user logged out
				return {};
			}
			return value;
		},
	}) ],
});