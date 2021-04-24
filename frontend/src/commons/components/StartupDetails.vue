<template>
	<div class="container mt-5">
		<legend>Startup Details</legend>
		<hr>
		<div class="mb-3">
			<label
				for="size"
				class="form-label"
			>
				Startup Name
			</label>
			<input
				type="text"
				class="form-control form-label"
				placeholder="Name of the startup"
				aria-label="Startup Name"
				required
				v-model="formInfo.name"
			>
		</div>
		<div class="mb-3">
			<label
				for="size"
				class="form-label"
			>
				Startup size
			</label>
			<select
				class="form-select"
				aria-label="select"
				disabled
				v-model="formInfo.size"
			>
				<option
					v-for="size in sizes"
					:key="size"
					:value="size"
				>
					{{ $convertToStartCase(size) }}
				</option>
			</select>
		</div>
		<div class="mb-3">
			<label
				for="location"
				class="form-label"
			>
				Startup Location
			</label>
			<select
				class="form-select"
				aria-label="select"
				v-model="formInfo.location"
			>
				<option
					v-for="location in locations"
					:value="location"
					:key="location"
				>
					{{ location }}
				</option>
			</select>
		</div>
		<div class="mb-3">
			<label
				for="field"
				class="form-label"
			>
				Does Deployment Speed Matter?
			</label>
			<select
				class="form-select"
				required
				aria-label="select"
				disabled
				v-model="formInfo.deploymentSpeed"
			>
				<option
					v-for="speed in fastDeploymentInfos"
					:key="speed"
					:value="speed"
				>
					{{ $convertToStartCase(speed) }}
				</option>
			</select>
		</div>
		<div class="mb-3">
			<label
				for="field"
				class="form-label"
			>
				Startup Field
			</label>
			<select
				class="form-select"
				required
				aria-label="select"
				v-model="formInfo.field"
			>
				<option v-for="field in fields" :key="field" :value="field">
					{{ $convertToStartCase(field) }}
				</option>
			</select>
		</div>
		<div class="mb-3">
			<label
				for="budget"
				class="form-label"
			>
				Max Budget Per Person (yearly, in USD)
			</label>
			<input
				type="text"
				class="form-control form-label"
				placeholder="Startup Budget"
				aria-label="Budget"
				required
				disabled
				v-model="formInfo.budget"
			>
		</div>
		<div
			class="accordion accordion-flush"
			id="accordionFlushExample"
		>
			<div class="accordion-item">
				<h2
					class="accordion-header"
					id="flush-headingOne"
				>
					<button class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#flush-collapseOne"
						aria-expanded="false"
						aria-controls="flush-collapseOne"
					>
						General Choices
					</button>
				</h2>
				<div
					id="flush-collapseOne"
					class="accordion-collapse collapse"
					aria-labelledby="flush-headingOne"
					data-bs-parent="#accordionFlushExample"
				>
					<div class="accordion-body">
						<div
							v-for="[key, values] of generalChoicesByTypes"
							:key="key"
						>
							<h4>
								<strong>{{ key }}</strong>
							</h4>
							<ul class="list-group list-group-flush">
								<li
									class="list-group-item"
									v-for="val of values"
									:key="val"
								>
									{{ val }}
								</li>
							</ul>
							<hr>
							<br>
						</div>
						<div v-if="!generalChoicesByTypes.length">
							No tools
						</div>
					</div>
				</div>
			</div>
			<div class="accordion-item">
				<h2
					class="accordion-header"
					id="flush-headingTwo"
				>
					<button
						class="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#flush-collapseTwo"
						aria-expanded="false"
						aria-controls="flush-collapseTwo"
					>
						Team Choices
					</button>
				</h2>
				<div
					id="flush-collapseTwo"
					class="accordion-collapse collapse"
					aria-labelledby="flush-headingTwo"
					data-bs-parent="#accordionFlushExample"
				>
					<div class="accordion-body">
						<div
							v-for="[header, subArr] of teamChoicesByTypes"
							:key="header"
						>
							<h4>
								<strong> {{ header }}</strong>
							</h4>
							<br>
							<div
								v-for="[type, values] of subArr"
								:key="type"
							>
								<h6>
									<strong> {{ type }}</strong>
								</h6>
								<ul class="list-group list-group-flush">
									<li
										class="list-group-item"
										v-for="val of values"
										:key="val"
									>
										{{ val }}
									</li>
								</ul>
								<hr>
								<br>
							</div>
						</div>
						<div v-if="!teamChoicesByTypes.length">
							No tools
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-3">
			<button
				class="btn btn-primary"
				style="margin:1rem"
				:disabled="!isValidStartupContent"
				@click="storeStartup()"
			>
				<span
					v-if="id === 'draft'"
				>
					Save startup
				</span>
				<span v-else>
					Update startup
				</span>
			</button>
			<button
				class="btn btn-danger"
				@click="showModal()"
			>
				<span> Delete startup </span>
			</button>
		</div>
	</div>
	<Modal
		v-if="isModalVisible"
		@closed="closeModal"
		@approved="removeStartup"
	>
		<template #header>
			Delete Startup
		</template>

		<template #body>
			Are you sure you want to delete?
		</template>
	</Modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';
import Modal from './AppModal.vue';

export default {
	name: 'StartupDetails',
	components: {
		Modal,
	},
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			formInfo: null,
			isFieldChoicesUpdated: false,
			isModalVisible: false,
		};
	},
	computed: {
		...mapGetters('startupForm', {
			locations: 'getAvailableLocations',
			sizes: 'getAvailableSizes',
			fields: 'getAvailableFields',
			fastDeploymentInfos: 'getFastDeploymentInfos',
		}),
		...mapGetters('startupChoices', {
			generalChoicesByTypes: 'getGeneralChoicesByTypes',
			teamChoicesByTypes: 'getTeamChoicesByTypes',
		}),
		...mapGetters('startupForm', {
			formInfoFromStore: 'getStartupFormData',
		}),
		isValidStartupContent() {
			return this.formInfo.name
				&& this.formInfo.deploymentSpeed
				&& this.formInfo.budget;
		},
	},
	watch: {
		'formInfo.field': {
			handler(newVal, oldVal) {
				if (oldVal !== null && !this.isFieldChoicesUpdated) {
					this.$store
						.commit('startupChoices/RESET_GENERAL_CHOICES_SUGGESTED_PROG_LANGS',
							{ startupId: this.id });
					this.isFieldChoicesUpdated = true;
				}
			},
		},
	},
	created() {
		this.formInfo = _.cloneDeep(this.formInfoFromStore);
	},
	methods: {
		...mapActions('startupChoices', {
			createStartup: 'createStartup',
			updateStartup: 'updateStartup',
			deleteDraftStartup: 'deleteDraftStartup',
			deleteStartup: 'deleteStartup',
		}),
		showModal() {
			this.isModalVisible = true;
		},
		closeModal() {
			this.isModalVisible = false;
		},
		async storeStartup() {
			if (this.id === 'draft') {
				await this.createStartup(this.formInfo);
			} else {
				await this.updateStartup(this.formInfo);
			}
		},
		async removeStartup() {
			if (this.id === 'draft') {
				this.deleteDraftStartup();
			} else {
				await this.deleteStartup(this.id);
			}
		},
	},
};
</script>

<style scoped>
</style>