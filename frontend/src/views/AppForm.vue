<template>
	<div id="app">
		<div class="startup-form">
			<legend>Tech Stack Specification Form</legend>
			<div class="mb-3">
				<input type="text" class="form-control form-label" placeholder="Name of the startup" aria-label="Startup Name" required v-model="startupName">
			</div>

			<div class="mb-3">
				<label for="size" class="form-label">Startup size</label>
				<select
					class="form-select"

					aria-label="select"
					v-model="startupSize"
				>
					<option v-for="size in sizes" :key="size" :value="size">
						{{ $convertToStartCase(size) }}
					</option>
				</select>
				<div class="invalid-feedback">Please select</div>
			</div>

			<div class="mb-3">
				<label for="location" class="form-label">Startup Location</label>
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
				<div class="invalid-feedback">Please select</div>
			</div>

			<div class="mb-3">
				<label for="field" class="form-label">Startup Field</label>
				<select
					class="form-select"
					required
					aria-label="select"
					v-model="startupField"
				>
					<option v-for="field in fields" :key="field" :value="field">
						{{ $convertToStartCase(field) }}
					</option>
				</select>
				<div class="invalid-feedback">Please select</div>
			</div>
			<div class="mb-3">
				<label for="field" class="form-label">Does Deployment Speed Matter? </label>
				<select
					class="form-select"
					required
					aria-label="select"
					v-model="startupDeploymentSpeed"
				>
					<option v-for="speed in fastDeploymentInfos" :key="speed" :value="speed">
						{{ $convertToStartCase(speed) }}
					</option>
				</select>
				<div class="invalid-feedback">Please select</div>
			</div>
			<div class="mb-3">
				<label for="budget" class="form-label">Startup Budget</label>
				<input type="text" class="form-control form-label"
					placeholder="Startup Budget" aria-label="Budget"
					required v-model="startupBudget"
					@keypress=" $isValidStartupBudget($event,startupBudget)"
				>
				<div class="form-text">Please include average annual salary per person. (e.g 65 -> 65000 USD)</div>
			</div>

			<div class="mb-3">
				<button
					class="btn btn-primary"
					:disabled="(!startupName || !startupField || !startupDeploymentSpeed || !startupBudget )
						|| isSubmitFormClicked"
					@click="submitForm"
				>
					Submit form
					<div
						class="spinner-border spinner-border-sm"
						role="status"
						v-if="isSubmitFormSpinnerActive"
					/>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'AppForm',
	data() {
		return {
			isSubmitted: false,
			isSubmitFormSpinnerActive: false,
			isSubmitFormClicked: false,
		};
	},
	computed: {
		...mapGetters('startupForm', {
			locations: 'getAvailableLocations',
			sizes: 'getAvailableSizes',
			fields: 'getAvailableFields',
			fastDeploymentInfos: 'getFastDeploymentInfos',
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
	},
	methods: {
		...mapActions('startupForm', {
			createStartupQuery: 'createStartupQuery',
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