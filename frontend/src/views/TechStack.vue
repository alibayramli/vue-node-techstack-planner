<template>
	<div v-if="hasFormSubmitted">
		<h5 style="margin: 2rem">
			General Choices
		</h5>
		<StatisticsTable type="suggestedProgrammingLanguages" :stat="tools"
			is-pickable-general
			has-details-card
			is-expanded-by-default
		/>
		<GeneralStatisticsAccordion :is-pickable-general="true" :stats-obj="generalStats" />
		<h5 style="margin: 2rem">
			Team Choices
		</h5>
		<TeamStatisticsAccordion :is-pickable-team="true" />
	</div>
	<div v-else>
		<p style="margin:5rem auto">
			Nothing to show, go to <router-link to="/form"> Form </router-link>to start
			exploring!
		</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import StatisticsTable from '../commons/components/StatisticsTable.vue';
import GeneralStatisticsAccordion from '../commons/components/GeneralStatisticsAccordion.vue';
import TeamStatisticsAccordion from '../commons/components/TeamStatisticsAccordion.vue';

export default {
	name: 'TechStack',
	components: {
		StatisticsTable,
		GeneralStatisticsAccordion,
		TeamStatisticsAccordion,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('startupForm', {
			tools: 'getTools',
			hasFormSubmitted: 'hasFormSubmitted',
		}),
		...mapGetters('statistics', {
			generalStats: 'getIsPickableGeneralStatistics',
		}),
	},
};
</script>

<style scoped>
</style>