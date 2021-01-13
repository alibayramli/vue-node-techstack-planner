<template>
	<div v-if="Object.keys(tools).length">
		<p class="text-center">Here are some exciting tools for your startup!</p>
		<StatisticsTable type="suggestedProgrammingLanguages" :stat="tools" is-expandable-by-default />
	</div>
	<div v-else>
		Nothing to show, go to <router-link to="/form"> Form </router-link>to start
		exploring!
	</div>
</template>

<script>
import { mapState } from 'vuex';
import StatisticsTable from './StatisticsTable.vue';

export default {
	name: 'TechStack',
	components: {
		StatisticsTable,
	},
	data() {
		return {};
	},
	computed: {
		...mapState('toolsData', {
			tools: 'tools',
		}),
	},
};
</script>

<style scoped>
</style>