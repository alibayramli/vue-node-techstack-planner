<template>
	<div class="chart">
		<Chart :chart-data="chartData" :chart-options="chartOptions" :chart-type="chartType" />
	</div>
</template>

<script>
import Chart from './Chart.vue';
export default {
	name: 'PieChart',
	components: {
		Chart,
	},
	data() {
		return {
			chartType: 'doughnut',
			chartData: {
				labels: [
					'Red',
					'Blue',
					'Yellow',
				],
				datasets: [ {
					label: 'My First Dataset',
					data: [300, 50, 100],
					backgroundColor: [
						'rgb(255, 99, 132)',
						'rgb(54, 162, 235)',
						'rgb(255, 205, 86)',
					],
					hoverOffset: 4,
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