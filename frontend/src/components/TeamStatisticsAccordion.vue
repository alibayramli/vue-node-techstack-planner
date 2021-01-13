<template>
	<div>
		<div class="container" v-for="statName of Object.keys(statsObj)" :key="statName">
			<div class="accordion" :id="['accordion-' + statName]">
				<div class="accordion-item">
					<h2 :id="['#heading-' + statName]">
						<button
							class="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							:data-bs-target="['#collapse-' + statName]"
							aria-expanded="false"
							:aria-controls="['#collapse-' + statName]"
						>
							{{ convertToStartCase(statName) }}
						</button>
					</h2>
					<div
						:id="['collapse-' + statName]"
						class="accordion-collapse collapse"
						:aria-labelledby="['#heading-' + statName]"
						:data-bs-parent="['#accordion-' + statName]"
					>
						<div class="accordion-body">
							<StatisticsTable
								v-for="(stat, type) of statsObj[statName]"
								:type="type"
								:stat="stat"
								:key="type"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import StatisticsTable from './StatisticsTable.vue';
import caseConverterMixin from '../mixins/caseConverter';
export default {
	name: 'TeamStatisticsAccordion',
	components: {
		StatisticsTable,
	},
	mixins: [ caseConverterMixin ],
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
.accordion-button {
  background-color: aliceblue;
  color: black;
}
</style>