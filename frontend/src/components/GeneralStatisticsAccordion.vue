<template>
	<div>
		<div v-for="generalStat of statsObj" :key="generalStat">
			<StatisticsTable
				v-for="(stat, type) of generalStat"
				:type="type"
				:stat="stat"
				:key="type"
			/>
		</div>
	</div>
</template>

<script>
import StatisticsTable from './StatisticsTable.vue';
export default {
	name: 'GeneralStatisticsAccordion',
	components: {
		StatisticsTable,
	},
	props: {
		statsObj: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {};
	},
};
</script>

<style scoped>
</style>