<template>
	<p class="d-flex p-5 mt-3">
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
	<div else>
		<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="m-5 bi bi-cart" viewBox="0 0 16 16">
			<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
		</svg>
		<span class="d-flex justify-content-center">
			Chart information will be shown when you have saved startups
		</span>
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
		...mapGetters('startupChoices', {
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