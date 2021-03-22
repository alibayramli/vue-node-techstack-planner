import backend from '../../helpers/interceptors';
import router from '../../router/router';
export default {
	namespaced: true,
	state: {
		generalChoices: [],
		teamChoices: [],
		isChoicesSaved: false,
	},
	getters: {
		getGeneralChoices(state) {
			return state.generalChoices;
		},
		getTeamChoices(state) {
			return state.teamChoices;
		},
		getIsChoicesSaved(state) {
			return state.isChoicesSaved;
		},
		getGeneralChoicesByTypes(state) {
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
		},
		getTeamChoicesByTypes(state) {
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
		},
	},
	mutations: {
		SET_GENERAL_CHOICES(state, { type, name }) {
			state.generalChoices.push({ [type]: name }) ;
		},
		SET_TEAM_CHOICES(state, { header, type, name }) {
			state.teamChoices.push({ [header]: { [type]: name } });
		},
		UPDATE_IS_CHOICES_SAVED(state, newIsChoicesSavedValue) {
			state.isChoicesSaved = newIsChoicesSavedValue;
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
	},
	actions: {
		async sendChoicesToBackend({ commit, state, rootState }) {
			try {
				const { generalChoices, teamChoices } = state;
				const newData = {
					startupName: rootState.startupData.name,
					startupSize: rootState.startupData.size,
					startupLocation: rootState.startupData.location,
					startupField: rootState.startupData.field,
					startupBudget: rootState.startupData.budget + 'k',
					choices: {
						general: generalChoices,
						team: teamChoices,
					},
				};
				await backend.post('user-data', newData);
				commit('UPDATE_IS_CHOICES_SAVED', true);
				router.go();
			} catch (err) {
				// eslint-disable-next-line no-console
				console.log(err);
			}
		},
	},
};