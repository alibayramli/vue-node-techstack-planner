<template>
	<div v-if="Object.keys(tools).length">
		<p class="text-center">Here are some exciting tools for your startup!</p>
		<StatisticsTable type="suggestedProgrammingLanguages" :stat="tools" is-expandable-by-default />
		<div v-for="generalStat of generalStats" :key="generalStat">
			<StatisticsTable
				v-for="(stat, type) of generalStat"
				:type="type"
				:stat="stat"
				:key="type"
			/>
		</div>
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
	<div v-else>
		Nothing to show, go to <router-link to="/form"> Form </router-link>to start
		exploring!
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import StatisticsTable from './StatisticsTable.vue';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'TechStack',
	components: {
		StatisticsTable,
	},
	mixins: [ caseConverterMixin ],
	data() {
		return {};
	},
	computed: {
		...mapState('toolsData', {
			tools: 'tools',
		}),
		...mapState('statisticsData', {
			teamStats: 'teamStatistics',
		}),
		...mapGetters('statisticsData', {
			generalStats: 'getIsPickableGeneralStatistics',
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