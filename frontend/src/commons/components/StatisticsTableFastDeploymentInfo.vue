<template>
	<span
		class="px-2"
		style="color:crimson"
		v-if="!IsTeamChoiceTypePicked"
	>
		Required for fast deployment
	</span>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'StatisticsTableFastDeploymentInfo',
	props: {
		teamChoiceType: {
			type: String,
			default: '',
		},
	},
	computed: {
		...mapGetters('startupChoices', {
			userPickedChoices: 'getUserPickedTeamChoices',
		}),
		IsTeamChoiceTypePicked() {
			return this.userPickedChoices.includes(this.teamChoiceType);
		},
	},
};
</script>

<style>

</style>