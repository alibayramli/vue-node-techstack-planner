<template>
	<div class="container">
		<h5 style="margin: 2rem">
			Those statistics are taken from StackOverflow and Jetbrains Developer
			Surveys. Feel free to get to know about the trends before going the form
		</h5>
		<GeneralStatisticsAccordion :stats-obj="generalStats" />
		<TeamStatisticsAccordion />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import GeneralStatisticsAccordion from './GeneralStatisticsAccordion.vue';
import TeamStatisticsAccordion from './TeamStatisticsAccordion.vue';

export default {
	name: 'Home',
	components: {
		GeneralStatisticsAccordion,
		TeamStatisticsAccordion,
	},
	data() {
		return {};
	},
	computed: {
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