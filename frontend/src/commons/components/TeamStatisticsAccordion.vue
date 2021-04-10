<template>
	<div>
		<div class="container" v-for="statName of Object.keys(teamStats)" :key="statName">
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
							{{ $convertToStartCase(statName) }}
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
								:is-pickable-team="isPickableTeam"
								:header="statName"
								v-for="(stat, type) of teamStats[statName]"
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
import { mapGetters } from 'vuex';
import StatisticsTable from './StatisticsTable.vue';
export default {
	name: 'TeamStatisticsAccordion',
	components: {
		StatisticsTable,
	},
	props: {
		isPickableTeam: {
			type: Boolean,
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('statisticsData', {
			teamStats: 'getTeamStatistics',
		}),
	},
};
</script>

<style scoped>
.accordion-button {
  background-color: aliceblue;
  color: black;
}
</style>