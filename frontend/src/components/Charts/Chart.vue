<template>
	<div :class="chartType">
		<canvas />
	</div>
</template>

<script>
import Chart from 'chart.js';
export default {
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
		this.createChart(chartType, chartData, chartOptions);
	},
	methods: {
		createChart(chartType, chartData, chartOptions) {
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
	height: 30rem;
}
</style>