<template>
	<div :class="chartType">
		<canvas />
	</div>
</template>

<script>
import Chart from 'chart.js';
export default {
	name: 'CreateChart',
	props: {
		chartType: {
			type: String,
			default: '',
		},
		chartData: {
			type: Object,
			default: null,
		},
		chartOptions: {
			type: Object,
			default: null,
		},
	},

	mounted() {
		const { chartType, chartData, chartOptions } = this;
		this.drawChart(chartType, chartData, chartOptions);
	},
	methods: {
		drawChart(chartType, chartData, chartOptions) {
			const chartElement = document.querySelector(`.${this.chartType} canvas`);
			new Chart(chartElement, {
				type: chartType,
				data: chartData,
				options: chartOptions,
			});
		},
	},
};
</script>

<style>
canvas{
	width: 150vh;
}
</style>