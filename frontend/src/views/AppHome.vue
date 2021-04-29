<template>
	<HeroSection v-if="!isLoggedInAuthMixin" />
	<div class="container">
		<h5 style="margin: 2rem">
			Statistics are taken from StackOverflow and Jetbrains Developer
			Surveys.
			<div v-if="isLoggedInAuthMixin">
				Feel free to get to know about the trends before going to the
				<router-link to="/form">form</router-link>
			</div>
		</h5>
		<GeneralStatisticsAccordion :stats-obj="generalStats" :is-pickable-general="false" />
		<TeamStatisticsAccordion :is-pickable-team="false" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import GeneralStatisticsAccordion from '../commons/components/GeneralStatisticsAccordion.vue';
import TeamStatisticsAccordion from '../commons/components/TeamStatisticsAccordion.vue';
import HeroSection from '../commons/components/HeroSection.vue';
export default {
	name: 'AppHome',
	components: {
		GeneralStatisticsAccordion,
		TeamStatisticsAccordion,
		HeroSection,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('statistics', {
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