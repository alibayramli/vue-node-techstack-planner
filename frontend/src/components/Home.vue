<template>
	<div class="container">
		<p> Some 2020 statistics to be aware of</p>
		<div class="row">
			<StatisticsTable v-for="(stat, type) of stats" :key="type" :type="type" :stat="stat" />
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import StatisticsTable from './StatisticsTable.vue';

export default {
	name: 'Home',
	components: {
		StatisticsTable,
	},
	data() {
		return {
		};
	},
	computed: {
		...mapState('statisticsData', {
			stats: 'statistics',
		}),
	},
};
</script>

<style scoped>

</style>