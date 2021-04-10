<template>
	<p class="d-flex p-3 ">
		<button type="button" class="btn btn-primary"
			@click="goBackToPreviousLink()"
		>
			Go back
		</button>
	</p>
	<div class="chart" v-if="Object.keys(valuesByStartupTypes).length">
		<Chart :chart-data="chartData"
			:chart-options="chartOptions"
			:chart-type="chartType"
		/>
	</div>
</template>

<script>
import Chart from './CreateChart.vue';
import { mapGetters } from 'vuex';
export default {
	name: 'PieChart',
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
		...mapGetters('startupChoicesData', {
			startups: 'getSavedChoices',
		}),
		allStartupTypes() {
			if (this.startups.length) {
				return [ ...new Set(this.startups.map(startup => startup[this.type])) ];
			} else {
				return [];
			}
		},
		valuesByStartupTypes() {
			if (this.allStartupTypes.length) {
				const typeObj = this.allStartupTypes.reduce((obj, type) => {
					return {
						...obj,
						[type]: 0,
					};
				}, new Map());
				this.startups.forEach((startup) => {
					typeObj[startup[this.type]] += 1;
				});
				return typeObj;
			} else {
				return {};
			}
		},
		randomRgba() {
			if (this.allStartupTypes.length) {
				const rgbUpperLimit = 256;
				const randomR = Math.random() * rgbUpperLimit;
				const randomG = Math.random() * rgbUpperLimit;
				const randomB = Math.random() * rgbUpperLimit;
				return this.allStartupTypes
					.map(() => `rgb(${randomR}, ${randomG}, ${randomB})`);
			} else {
				return null;
			}
		},
		chartType() {
			return 'doughnut';
		},
		chartData() {
			if (Object.keys(this.valuesByStartupTypes).length) {
				return {
					labels: this.allStartupTypes,
					datasets: [ {
						data: Object.values(this.valuesByStartupTypes),
						backgroundColor: this.randomRgba,

					} ],

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