<template>
	<div>
		<router-view name="progDetails" />
		<div v-if="Object.keys(tools).length">
			<StatisticsTable type="suggestedProgrammingLanguages" :stat="tools" is-pickable-general has-details-card is-expanded-by-default />
			<GeneralStatisticsAccordion :is-pickable-general="true" :stats-obj="generalStats" />
			<TeamStatisticsAccordion :is-pickable-team="true" />
		</div>
		<div v-else>
			<p style="margin:5rem auto">
				Nothing to show, go to <router-link to="/form"> Form </router-link>to start
				exploring!
			</p>
		</div>
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