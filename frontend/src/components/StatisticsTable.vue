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
						{{ convertToStartCase(type) }}
					</button>
				</h2>
				<div
					:id="['collapse-' + type]"
					class="accordion-collapse collapse" :class="{ show: isExpandableByDefault }"
					:aria-labelledby="['#heading-' + type]"
					:data-bs-parent="['#accordion-' + type]"
				>
					<div class="accordion-body">
						<table class="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">name</th>
									<th v-if="Object.entries(stat)[0][1][0]" scope="col">
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
										{{ type === 'developerType' ? convertToStartCase(name) : name }}
										<ProgLangInfo v-if="hasDetailsCard" :name="name" />
										<div v-if="isPickableGeneral">
											<a class="tooltip-add" role="button" @click="selectGeneralChoice(type,name)">
												<span class="tooltip-text-add">Click to add the tool</span>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
													<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
												</svg>

											</a>
											<div v-if="generalChoices[type] === name">
												<p>
													added
													{{ generalChoices }}
													<a>
														<svg style="color:lightgreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
															<path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
														</svg>
													</a>
												</p>
											</div>
										</div>
										<div v-if="isPickableTeam">
											<a class="tooltip-add" role="button" @click="selectTeamChoice(header,type,name)">
												<span class="tooltip-text-add">Click to add the tool</span>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
													<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
												</svg>

											</a>
											<div v-if="teamChoices.some((choice) => choice[header] ? choice[header][type] === name : null)">
												<p>
													added
													<a>
														<svg style="color:lightgreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
															<path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
														</svg>
													</a>
												</p>
											</div>
										</div>
									</td>
									<td scope="row" v-if="popularity">{{ popularity }}</td>
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
import { mapGetters } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';
import ProgLangInfo from './ProgLangInfo.vue';
export default {
	name: 'StatisticsTable',
	components: {
		ProgLangInfo,
	},
	mixins: [ caseConverterMixin ],
	props: {
		stat: {
			type: Object,
			default: null,
		},
		type: {
			type: String,
			default: '',
		},
		header: {
			type: String,
			default: '',
		},
		isExpandableByDefault: {
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
	computed: {
		...mapGetters('userData', {
			generalChoices: 'getGeneralChoices',
			teamChoices: 'getTeamChoices',
		}),
	},
	methods: {
		selectGeneralChoice(type, name) {
			this.$store.commit('userData/SET_GENERAL_CHOICES', { type, name });
		},
		selectTeamChoice(header, type, name) {
			this.$store.commit('userData/SET_TEAM_CHOICES', { header, type, name });
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
.tooltip-add {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip-add .tooltip-text-add {
  visibility: hidden;
  width: 120px;
  background-color: navy;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 2;
  top: -5px;
  left: 105%;
}
.tooltip-add:hover .tooltip-text-add {
  visibility: visible;
}
</style>