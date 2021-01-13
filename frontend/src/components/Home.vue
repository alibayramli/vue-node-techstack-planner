<template>
	<div class="container">
		<h5 style="margin: 2rem">
			Those statistics are taken from StackOverflow and Jetbrains Developer
			Surveys. Feel free to get to know about the trends before going the form
		</h5>
		<GeneralStatisticsAccordion :stats-obj="generalStats" />
		<TeamStatisticsAccordion :stats-obj="teamStats" />
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import GeneralStatisticsAccordion from './GeneralStatisticsAccordion.vue';
import TeamStatisticsAccordion from './TeamStatisticsAccordion.vue';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'Home',
	components: {
		GeneralStatisticsAccordion,
		TeamStatisticsAccordion,
	},
	mixins: [ caseConverterMixin ],
	data() {
		return {};
	},
	computed: {
		...mapState('statisticsData', {
			teamStats: 'teamStatistics',
		}),
		...mapGetters('statisticsData', {
			generalStats: 'getIsPickableIgnoredGeneralStatistics',
		}),
	},
};
</script>
<style scoped>
.accordion-button {
  background-color: aliceblue;
  color: black;
}
</style>