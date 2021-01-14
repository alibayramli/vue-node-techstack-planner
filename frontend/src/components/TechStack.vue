<template>
	<div v-if="Object.keys(tools).length">
		<p class="text-center">Here are some exciting tools for your startup!</p>
		<StatisticsTable type="suggestedProgrammingLanguages" :stat="tools" is-pickable has-details-card is-expandable-by-default />
		<GeneralStatisticsAccordion :is-pickable="true" :stats-obj="generalStats" />
		<TeamStatisticsAccordion :is-pickable="true" />
	</div>
	<div v-else>
		Nothing to show, go to <router-link to="/form"> Form </router-link>to start
		exploring!
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import StatisticsTable from './StatisticsTable.vue';
import GeneralStatisticsAccordion from './GeneralStatisticsAccordion.vue';
import TeamStatisticsAccordion from './TeamStatisticsAccordion.vue';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'TechStack',
	components: {
		StatisticsTable,
		GeneralStatisticsAccordion,
		TeamStatisticsAccordion,
	},
	mixins: [ caseConverterMixin ],
	data() {
		return {};
	},
	computed: {
		...mapState('toolsData', {
			tools: 'tools',
		}),
		...mapGetters('statisticsData', {
			generalStats: 'getIsPickableGeneralStatistics',
		}),
	},
};
</script>

<style scoped>
</style>