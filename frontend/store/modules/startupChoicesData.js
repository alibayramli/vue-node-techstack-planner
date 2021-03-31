import backend from '../../helpers/interceptors';
import router from '../../router/router';
export default {
	namespaced: true,
	state: {
		generalChoices: [],
		teamChoices: [],
		savedChoices: [],
	},
	getters: {
		getGeneralChoices(state) {
			return state.generalChoices;
		},
		getTeamChoices(state) {
			return state.teamChoices;
		},
		getSavedChoices(state) {
			return state.savedChoices;
		},
		getGeneralChoicesByTypes(state) {
			const fullRouteName = router.currentRoute._rawValue.fullPath;
			const startupId = fullRouteName.substring(fullRouteName.lastIndexOf('/') + 1);
			const isDraftStartup = startupId === 'draft';
			if (isDraftStartup) {
				const choicesByTypes = {} ;
				state.generalChoices.forEach((choice) => {
					const [type, value] = Object.entries(choice)[0];
					if (!choicesByTypes[type]) {
						choicesByTypes[type] = [ value ];
					} else {
						choicesByTypes[type].push(value);
					}
				});
				return Object.entries(choicesByTypes);
			} else {
				const savedStartup = state.savedChoices
					.find(startup => startup.startupId === startupId);
				return savedStartup.choices.general;
			}
		},
		getTeamChoicesByTypes(state) {
			const fullRouteName = router.currentRoute._rawValue.fullPath;
			const startupId = fullRouteName
				.substring(fullRouteName.lastIndexOf('/') + 1);
			const isDraftStartup = startupId === 'draft';
			if (isDraftStartup) {
				const choicesByTypes = {} ;
				state.teamChoices.forEach((choice) => {
					const [header, typeValObj] = Object.entries(choice)[0];
					const [type, value] = Object.entries(typeValObj)[0];
					if (!choicesByTypes[header]) {
						choicesByTypes[header] = { [type]: [ value ] };
					} else if (choicesByTypes[header] && !choicesByTypes[header][type]) {
						choicesByTypes[header][type] = [ value ] ;
					} else {
						choicesByTypes[header][type].push(value);
					}
				});
				return Object.entries(choicesByTypes).map((choiceArr) => {
					return [choiceArr[0], Object.entries(choiceArr[1])];
				});
			} else {
				const savedStartup = state.savedChoices
					.find(startup => startup.startupId === startupId);
				return savedStartup.choices.team;
			}
		},
	},
	mutations: {
		SET_GENERAL_CHOICES(state, { type, name }) {
			state.generalChoices.push({ [type]: name }) ;
		},
		SET_TEAM_CHOICES(state, { header, type, name }) {
			state.teamChoices.push({ [header]: { [type]: name } });
		},
		SET_SAVED_CHOICES(state, choices) {
			state.savedChoices = choices;
		},
		DELETE_GENERAL_CHOICE(state, { type, name }) {
			const generalChoiceIdxToDelete = state.generalChoices
				.findIndex(choice => choice[type] && choice[type] === name);
			state.generalChoices.splice(generalChoiceIdxToDelete, 1);
		},
		DELETE_TEAM_CHOICE(state, { header, type, name }) {
			const teamChoiceIdxToDelete = state.teamChoices
				.findIndex(choice => choice[header] && choice[header][type] === name);
			state.teamChoices.splice(teamChoiceIdxToDelete, 1);
		},
		RESET_STARTUP_CHOICES(state) {
			state.generalChoices = [];
			state.teamChoices = [];
		},
	},
	actions: {
		async loadSavedChoices({ commit }) {
			try {
				const response = await backend.get('startup-data/user-startups');
				commit('SET_SAVED_CHOICES', response.data);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		async createStartup({ rootState, getters, commit }) {
			try {
				const newData = {
					startupName: rootState.startupFormData.name,
					startupSize: rootState.startupFormData.size,
					startupLocation: rootState.startupFormData.location,
					startupField: rootState.startupFormData.field,
					startupBudget: rootState.startupFormData.budget,
					creationDate: new Date(),
					choices: {
						general: getters.getGeneralChoicesByTypes,
						team: getters.getTeamChoicesByTypes,
					},
				};
				await backend.post('startup-data/new-startup', newData);
				commit('startupFormData/UPDATE_HAS_FORM_SUBMITTED', false, { root: true });
				commit('startupFormData/RESET_STARTUP_FORM', null, { root: true });
				commit('RESET_STARTUP_CHOICES');
				router.push('/user-startups');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		async updateStartup({ getters }, formInfo) {
			try {
				const fullRouteName = router.currentRoute._rawValue.fullPath;
				const startupId = fullRouteName.substring(fullRouteName.lastIndexOf('/') + 1);
				const newData = {
					startupName: formInfo.name,
					startupSize: formInfo.size,
					startupLocation: formInfo.location,
					startupField: formInfo.field,
					startupBudget: formInfo.budget,
					choices: {
						general: getters.getGeneralChoicesByTypes,
						team: getters.getTeamChoicesByTypes,
					},
				};
				await backend.patch(`startup-data/edit-startup/${startupId}`, newData);
				router.push('/user-startups');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		// eslint-disable-next-line no-empty-pattern
		async deleteStartup({ }, startupId) {
			try {
				await backend.delete(`startup-data/delete-startup/${startupId}`);
				router.push('/user-startups');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
	},
};