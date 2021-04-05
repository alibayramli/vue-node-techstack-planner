<template>
	<div class="chart">
		<Chart :chart-data="chartData" :chart-options="chartOptions" :chart-type="chartType" />
	</div>
</template>

<script>
import Chart from './Chart.vue';
export default {
	name: 'BarChart',
	components: {
		Chart,
	},
	props: {
		statsData: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			chartType: 'bar',
			chartData: {
				labels: this.statsData.map(stat => stat[0]),
				datasets: [{
						label: 'popularity',
						data: this.statsData.map(stat => parseInt(stat[1][0])),
						backgroundColor: 'rgb(153, 102, 255)',
						borderWidth: 1,
					},
					{
						label: 'cost',
						data: this.statsData.map(stat => parseInt(stat[1][1] || 0)),
						backgroundColor: 'rgba(75, 192, 192)',
						borderWidth: 1,
					}],
			},
			chartOptions: {
				tooltips: {
					mode: 'label',
				},
				scales: {
					y: {
						beginAtZero: true,
					},
				},
				maintainAspectRatio: false,
				legend: {
					labels: {
						boxWidth: 10,
					},
					position: 'top',
				},
				animation: {
					duration: 2000,
					easing: 'easeInOutQuart',
				},
			},

		};
	},
};
</script>

<style></style>