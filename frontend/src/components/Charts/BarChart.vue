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
	data() {
		return {
			chartType: 'bar',
			chartData: {
				labels: ['Jan1', 'Jan2', 'Jan3', 'Jan4', 'Jan5', 'Jan6', 'Jan7'],
				datasets: [ {
					label: 'My First Dataset',
					data: [44.7, 23.6, 7.4, 81, 2, 89, 55, 40],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(255, 159, 64, 0.2)',
						'rgba(255, 205, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(201, 203, 207, 0.2)',
					],
					borderColor: [
						'rgb(255, 99, 132)',
						'rgb(255, 159, 64)',
						'rgb(255, 205, 86)',
						'rgb(75, 192, 192)',
						'rgb(54, 162, 235)',
						'rgb(153, 102, 255)',
						'rgb(201, 203, 207)',
					],
					borderWidth: 1,
				} ],
			},
			chartOptions: {
				tooltips: {
					mode: 'label',
					callbacks: {
						label(tooltipItem, data) {
							return (
								data.datasets[tooltipItem.datasetIndex].label
								+ ': '
								+ tooltipItem.xLabel
							);
						},

					},

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