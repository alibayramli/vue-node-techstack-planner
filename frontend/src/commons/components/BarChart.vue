<template>
	<p class="d-flex p-3">
		<button type="button" class="btn btn-primary"
			@click="goBackToPreviousLink()"
		>
			Go back
		</button>
	</p>
	<p>
		<span v-if="accordionHeader">
			Header:
			{{ $convertToStartCase(accordionHeader) }}
		</span>
	</p>
	Type: {{ $convertToStartCase(type) }}
	<div class="chart" v-if="chartStats">
		<Chart :chart-data="chartData" :chart-options="chartOptions" :chart-type="chartType" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import Chart from './CreateChart.vue';
export default {
	name: 'BarChart',
	components: {
		Chart,
	},
	props: {
		type: {
			type: String,
			default: '',
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('statistics', {
			generalStats: 'getIsPickableIgnoredGeneralStatistics',
			teamStats: 'getTeamStatistics',
		}),
		accordionHeader() {
			return this.$route.query.header;
		},
		chartStats() {
			const header = this.$route.query.header;
			if (!header) {
				if (this.generalStats.length) {
					const typeToFind = Object
						.entries(this.generalStats
							.find(stat => stat[this.type])[this.type]);
					return typeToFind;
				} else {
					return null;
				}
			} else {
				if (Object.keys(this.teamStats).length) {
					const headerTofind = Object
						.entries(this.teamStats)
						.find(stat => stat[0] === header)[1];
					const typeToFind = Object.entries(headerTofind[this.type]);
					return typeToFind;
				} else {
					return null;
				}
			}
		},
		chartType() {
			return 'bar';
		},
		chartData() {
			if (this.chartStats && this.chartStats.length) {
				const datasets = [];
				const popularity = this.chartStats[0][1][0];
				const cost = this.chartStats[0][1][1];
				if (popularity) {
					datasets.push({
						label: 'popularity',
						data: this.chartStats.map(stat => parseInt(stat[1][0])),
						backgroundColor: 'rgb(153, 102, 255)',
						borderWidth: 1,
					});
				}
				if (cost) {
					datasets.push({
						label: 'cost',
						data: this.chartStats.map(stat => parseInt(stat[1][1] || 0)),
						backgroundColor: 'rgba(75, 192, 192)',
						borderWidth: 1,
					});
				}

				return {
					labels: this.chartStats.map(stat => stat[0]),
					datasets,

				};
			} else {
				return null;
			}
		},
		chartOptions() {
			return {
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
			};
		},
	},
	methods: {
		goBackToPreviousLink() {
			this.$router.back();
		},
	},
};
</script>

<style></style>