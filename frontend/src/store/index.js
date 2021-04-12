import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import statistics from './modules/statistics';
import startupFormData from './modules/startupFormData';
import progLangInfo from './modules/progLangInfo';
import startupChoices from './modules/startupChoices';
import auth from './modules/auth';
export const store = createStore({
	modules: {
		statistics,
		startupFormData,
		progLangInfo,
		startupChoices,
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