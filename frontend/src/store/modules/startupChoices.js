import backend from '../../helpers/interceptors';
import router from '../../router/index';
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
			const isDraftStartup = startupId === 'draft'
				|| fullRouteName.includes('user-startups')
				|| fullRouteName.includes('techstack');
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
		getUserPickedTeamChoices(state, getters) {
			const choices = [];
			getters.getTeamChoicesByTypes.forEach((choiceByHeader) => {
				choiceByHeader[1].forEach((choiceByType) => {
					choices.push(choiceByType[0]);
				});
			});
			return choices;
		},
		getAreAllTeamChoicesPicked(state, getters, rootState, rootGetters) {
			if (!rootGetters['startupForm/doesDeploymentSpeedMatter']) {
				return true;
			} else {
				const allTeamChoices = rootGetters['statistics/getTeamStatisticsByTypes'];
				const userPickedTeamChoices = getters.getUserPickedTeamChoices;
				return userPickedTeamChoices.length === allTeamChoices.length;
			}
		},
	},
	mutations: {
		SET_GENERAL_CHOICES(state, { type, name }) {
			state.generalChoices.push({ [type]: name }) ;
		},
		RESET_GENERAL_CHOICES_SUGGESTED_PROG_LANGS(state, { startupId }) {
			if (startupId === 'draft') {
				state.generalChoices = state.generalChoices
					.filter(choice => !choice.suggestedProgrammingLanguages);
			} else {
				const savedStartup = state.savedChoices
					.find(startup => startup.startupId === startupId);
				const indexToDelete = savedStartup.choices.general
					.findIndex(choice => choice[0] === 'suggestedProgrammingLanguages');
				const notFoundIdx = -1;
				if (indexToDelete > notFoundIdx) {
					savedStartup.choices.general.splice(indexToDelete, 1);
				}
			}
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
				const response = await backend.get('startup/user-startups');
				commit('SET_SAVED_CHOICES', response.data);
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		async createStartup({ getters, commit }, formInfo) {
			try {
				const newData = {
					startupName: formInfo.name,
					startupSize: formInfo.size,
					startupLocation: formInfo.location,
					startupField: formInfo.field,
					startupDeploymentSpeed: formInfo.deploymentSpeed,
					startupBudget: formInfo.budget,
					creationDate: new Date(),
					choices: {
						general: getters.getGeneralChoicesByTypes,
						team: getters.getTeamChoicesByTypes,
					},
				};
				await backend.post('startup/new-startup', newData);
				commit('startupForm/UPDATE_HAS_FORM_SUBMITTED', false, { root: true });
				commit('startupForm/RESET_STARTUP_FORM', null, { root: true });
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
					startupDeploymentSpeed: formInfo.deploymentSpeed,
					startupBudget: formInfo.budget,
					choices: {
						general: getters.getGeneralChoicesByTypes,
						team: getters.getTeamChoicesByTypes,
					},
				};
				await backend.patch(`startup/edit-startup/${startupId}`, newData);
				router.push('/user-startups');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		// eslint-disable-next-line no-empty-pattern
		async deleteStartup({ }, startupId) {
			try {
				await backend.delete(`startup/delete-startup/${startupId}`);
				router.push('/user-startups');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
		deleteDraftStartup({ commit }) {
			try {
				commit('startupForm/RESET_STARTUP_FORM', null, { root: true });
				commit('RESET_STARTUP_CHOICES');
				commit('startupForm/UPDATE_HAS_FORM_SUBMITTED', false, { root: true });
				router.push('/form');
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
	},
};