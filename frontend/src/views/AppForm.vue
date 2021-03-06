<template>
	<div class="startup-form">
		<legend>Tech Stack Specification Form</legend>
		<div class="mb-3">
			<input
				type="text"
				class="form-control form-label"
				placeholder="Name of the startup*"
				aria-label="Startup Name"
				required
				v-model="startupName"
			>
		</div>

		<div class="mb-3">
			<label
				for="size"
				class="form-label"
			>
				Startup size*
			</label>
			<select
				class="form-select"
				aria-label="select"
				v-model="startupSize"
			>
				<option
					v-for="[size, numOfEmployees] of Object.entries(sizes)"
					:key="size"
					:value="size"
				>
					{{ $convertToStartCase(size) }}:
					(
					{{ numOfEmployees }} employees
					)
				</option>
			</select>
		</div>

		<div class="mb-3">
			<label
				for="location"
				class="form-label"
			>
				Startup Location*
			</label>
			<select
				class="form-select"
				aria-label="select"
				v-model="startupLocation"
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
				Startup Field*
			</label>
			<select
				class="form-select"
				required
				aria-label="select"
				v-model="startupField"
			>
				<option
					v-for="field in fields"
					:key="field"
					:value="field"
				>
					{{ $convertToStartCase(field) }}
				</option>
			</select>
		</div>
		<div class="mb-3">
			<label
				for="field"
				class="form-label"
			>
				Does Deployment Speed Matter?*
			</label>
			<select
				class="form-select"
				required
				aria-label="select"
				v-model="startupDeploymentSpeed"
			>
				<option
					v-for="speed in fastDeploymentInfos"
					:key="speed"
					:value="speed"
				>
					{{ $convertToStartCase(speed) }}
				</option>
			</select>
			<div
				class="form-text"
				v-if="doesDeploymentSpeedMatter"
			>
				Please note that fast deployment
				requires all team choices to be selected
			</div>
		</div>
		<div class="mb-3">
			<label
				for="budget"
				class="form-label"
			>
				Startup Budget*
			</label>
			<input
				type="text"
				class="form-control form-label"
				placeholder="Startup Budget"
				aria-label="Budget"
				required
				v-model="startupBudget"
				@keypress="$isValidStartupBudget($event,startupBudget)"
			>
			<div class="form-text">
				Please include max yearly salary per person.
				(e.g 65 -> 65000 USD)
			</div>
		</div>
		<div class="mb-3">
			<button
				class="btn btn-primary"
				style="margin:1rem"
				:disabled="!isValidStartupForm"
				@click="!hasFormSubmitted ? submitForm() : showSubmitModal()"
			>
				Submit form
				<div
					class="spinner-border spinner-border-sm"
					role="status"
					v-if="isSubmitFormSpinnerActive"
				/>
			</button>
			<button
				class="btn btn-primary"
				style="margin:1rem"
				@click="!hasFormSubmitted ? deleteForm() : showResetModal()"
			>
				Reset form
			</button>
		</div>
	</div>
	<Modal
		v-if="isSubmitModalVisible"
		@closed="closeSubmitModal()"
		@approved="submitForm()"
	>
		<template #header>
			Re-submit form
		</template>

		<template #body>
			Previous details are not saved yet.
			Are you sure to override?
		</template>
	</Modal>
	<Modal
		v-if="isResetModalVisible"
		@closed="closeResetModal()"
		@approved="deleteForm()"
	>
		<template #header>
			Reset form
		</template>

		<template #body>
			Previous details are not saved yet.
			Are you sure to reset?
		</template>
	</Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Modal from '../commons/components/AppModal.vue';

export default {
	name: 'AppForm',
	components: {
		Modal,
	},
	data() {
		return {
			isSubmitted: false,
			isSubmitFormSpinnerActive: false,
			isSubmitFormClicked: false,
			isSubmitModalVisible: false,
			isResetModalVisible: false,
		};
	},
	computed: {
		...mapGetters('startupForm', {
			locations: 'getAvailableLocations',
			sizes: 'getAvailableSizes',
			fields: 'getAvailableFields',
			fastDeploymentInfos: 'getFastDeploymentInfos',
			doesDeploymentSpeedMatter: 'doesDeploymentSpeedMatter',
			hasFormSubmitted: 'hasFormSubmitted',
		}),
		startupName: {
			get() {
				return this.$store.state.startupForm.name;
			},
			set(value) {
				this.$store.commit('startupForm/UPDATE_NAME', value);
			},
		},
		startupSize: {
			get() {
				return this.$store.getters['startupForm/getSize'];
			},
			set(value) {
				this.$store.commit('startupForm/UPDATE_SIZE', value);
			},
		},
		startupLocation: {
			get() {
				return this.$store.getters['startupForm/getLocation'];
			},
			set(value) {
				this.$store.commit('startupForm/UPDATE_LOCATION', value);
			},
		},
		startupField: {
			get() {
				return this.$store.getters['startupForm/getField'];
			},
			set(value) {
				this.$store.commit('startupForm/UPDATE_FIELD', value);
			},
		},
		startupDeploymentSpeed: {
			get() {
				return this.$store.getters['startupForm/getDeploymentSpeed'];
			},
			set(value) {
				this.$store.commit('startupForm/UPDATE_DEPLOYMENT_SPEED', value);
			},
		},
		startupBudget: {
			get() {
				return this.$store.getters['startupForm/getBudget'];
			},
			set(value) {
				this.$store.commit('startupForm/UPDATE_BUDGET', value);
			},
		},
		isValidStartupForm() {
			return this.startupName
				&& this.startupField
				&& this.startupDeploymentSpeed
				&& this.startupBudget
				&& !this.isSubmitFormClicked;
		},
	},
	watch: {
		startupSize: {
			handler(newVal) {
				if (newVal !== 'small') {
					this.$store.commit('startupForm/UPDATE_DEPLOYMENT_SPEED', 'yes');
				}
			},
		},
		startupDeploymentSpeed: {
			handler(newVal) {
				if (newVal === 'no') {
					this.$store.commit('startupForm/UPDATE_SIZE', 'small');
				}
			},
		},
	},
	methods: {
		...mapActions('startupForm', {
			createStartupQuery: 'createStartupQuery',
		}),
		...mapActions('startupChoices', {
			deleteForm: 'deleteDraftStartup',
		}),
		async submitForm() {
			this.$store.commit('startupChoices/RESET_STARTUP_CHOICES');
			this.isSubmitFormSpinnerActive = true;
			this.isSubmitFormClicked = true;
			await this.createStartupQuery();
			this.isSubmitted = true;
			this.isSubmitFormSpinnerActive = false;
			this.isSubmitFormClicked = false;
		},
		resetForm() {
			this.deleteForm();
		},
		showSubmitModal() {
			this.isSubmitModalVisible = true;
		},
		showResetModal() {
			this.isResetModalVisible = true;
		},
		closeSubmitModal() {
			this.isSubmitModalVisible = false;
		},
		closeResetModal() {
			this.isResetModalVisible = false;
		},
	},
};
</script>

<style scoped>
.startup-form {
  margin: 5rem auto;
  padding:2rem;
  max-width: 50rem;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(41, 0, 60, 0.24);
}
</style>