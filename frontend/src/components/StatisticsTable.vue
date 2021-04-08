<template>
	<div class="container">
		<div class="accordion" :id="['accordion-' + type]">
			<div class="accordion-item">
				<h2 :id="['#heading-' + type]">
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						:data-bs-target="['#collapse-' + type]"
						aria-expanded="false"
						:aria-controls="['#collapse-' + type]"
					>
						{{ $convertToStartCase(type) }}
					</button>
				</h2>
				<div
					:id="['collapse-' + type]"
					class="accordion-collapse collapse" :class="{ show: isExpandedByDefault }"
					:aria-labelledby="['#heading-' + type]"
					:data-bs-parent="['#accordion-' + type]"
				>
					<div class="accordion-body">
						<button class="btn btn-primary"
							@click="viewBarChart(header,type)"
							v-if="!isPickableGeneral && !isPickableTeam"
						>
							Barchart view
						</button>
						<table class="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">name</th>
									<th
										v-if="Object.entries(stat)[0][1][0] &&
											!isPickableGeneral && !isPickableTeam"
										scope="col"
									>
										popularity
									</th>
									<th v-if="Object.entries(stat)[0][1][1]" scope="col">cost</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="([name, [popularity, cost]], index) of Object.entries(
										stat,
									).slice(0, limit)"
									:key="index"
								>
									<td scope="row">{{ index + 1 }}</td>
									<td scope="row">
										{{ type === 'developerType' ? $convertToStartCase(name) : name }}
										<ProgLangInfo v-if="hasDetailsCard" :name="name" />
										<GeneralChoicePicks v-if="isPickableGeneral" :name="name" :type="type" :cost="parseInt(cost)" />
										<TeamChoicePicks v-if="isPickableTeam" :header="header" :type="type" :name="name" />
									</td>
									<td scope="row"
										v-if="popularity
											&& !isPickableGeneral && !isPickableTeam"
									>
										{{ popularity }}
									</td>
									<td scope="row" v-if="cost">{{ cost }}</td>
								</tr>
							</tbody>
						</table>
						<div class="buttons">
							<button
								class="btn btn-light"
								v-if="limit < Object.entries(stat).length"
								@click="limit = limit + 5"
							>
								Show more
							</button>
							<div class="divider" />
							<button
								class="btn btn-light"
								v-if="limit !== 5"
								@click="limit = limit - 5"
							>
								Show less
							</button>
							<div class="divider" />
							<button
								class="btn btn-light"
								v-if="limit !== 5"
								@click="limit = 5"
							>
								Show only 5
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProgLangInfo from './ProgLangInfo.vue';
import GeneralChoicePicks from './GeneralChoicePicks.vue';
import TeamChoicePicks from './TeamChoicePicks.vue';
export default {
	name: 'StatisticsTable',
	components: {
		ProgLangInfo,
		GeneralChoicePicks,
		TeamChoicePicks,
	},
	props: {
		stat: {
			type: Object,
			default: null,
		},
		header: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		isExpandedByDefault: {
			type: Boolean,
		},
		isPickableGeneral: {
			type: Boolean,
		},
		isPickableTeam: {
			type: Boolean,
		},
		hasDetailsCard: {
			type: Boolean,
		},
	},
	data() {
		return {
			limit: 5,
		};
	},
	methods: {
		viewBarChart(header, type) {
			this.$router.push({ name: 'barchart', query: { header: header || undefined }, params: { type } });
		},
	},
};
</script>

<style scoped>
.divider {
  width: 5px;
  height: auto;
  display: inline-block;
}
.buttons {
  padding-bottom: 2rem;
}
.accordion-button {
  background-color: aliceblue;
  color: black;
}
</style>