<template>
	<div id="app">
		<form
			class="startup-form"
			@submit.prevent="submit"
		>
			<fieldset>
				<legend>Tech Stack Specification Form</legend>

				<hr>

				<div class="mb-3">
					<label for="size" class="form-label">Startup size</label>
					<select
						class="form-select"

						aria-label="select"
						v-model="startupSize"
					>
						<option v-for="size in sizes" :key="size" :value="size">
							{{ convertToStartCase(size) }}
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
							{{ convertToStartCase(field) }}
						</option>
					</select>
					<div class="invalid-feedback">Please select</div>
				</div>
				<div class="mb-3">
					<label for="budget" class="form-label">Startup Budget</label>
					<input type="text" class="form-control form-label"
						placeholder="Startup Budget" aria-label="Budget"
						required v-model="startupBudget"
						@keypress="isValidStartupBudget"
					>
					<div class="form-text">Please include average annual salary per person.</div>
				</div>

				<div class="mb-3">
					<button
						class="btn btn-primary"
						type="submit"
						:disabled="!startupField || !startupBudget|| isSubmitFormClicked"
					>
						Submit form
						<div
							class="spinner-border spinner-border-sm"
							role="status"
							v-if="isSubmitFormSpinnerActive"
						/>
					</button>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'Form',
	mixins: [ caseConverterMixin ],
	data() {
		return {
			isSubmitted: false,
			isSubmitFormSpinnerActive: false,
			isSubmitFormClicked: false,
		};
	},
	computed: {
		...mapGetters('formData', {
			locations: 'getAvailableLocations',
			sizes: 'getAvailableSizes',
			fields: 'getAvailableFields',
		}),
		startupSize: {
			get() {
				return this.$store.getters['startupData/getSize'];
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_SIZE', value);
			},
		},
		startupLocation: {
			get() {
				return this.$store.getters['startupData/getLocation'];
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_LOCATION', value);
			},
		},
		startupField: {
			get() {
				return this.$store.getters['startupData/getField'];
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_FIELD', value);
			},
		},
		startupBudget: {
			get() {
				return this.$store.getters['startupData/getBudget'];
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_BUDGET', value);
			},
		},
	},
	methods: {
		...mapActions('startupData', {
			createStartupData: 'createData',
		}),
		async submit() {
			this.isSubmitFormSpinnerActive = true;
			this.isSubmitFormClicked = true;
			await this.createStartupData();
			this.isSubmitted = true;
			this.isSubmitFormSpinnerActive = false;
			this.isSubmitFormClicked = false;
		},
		isValidStartupBudget(event) {
			// allow numbers and one dot
			const keyCode = (event.keyCode ? event.keyCode : event.which);
			// eslint-disable-next-line no-magic-numbers
			if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.startupBudget.indexOf('.') !== -1)) {
				event.preventDefault();
			}
			// allow up to 2 decimal places
			if (this.startupBudget !== null
				&& this.startupBudget.indexOf('.') > 0
				&& (this.startupBudget.split('.')[1].length > 1)) {
				event.preventDefault();
			}
		},
	},
};
</script>

<style scoped>
.startup-form {
  margin: auto;
  margin-top: 5rem;
  padding: 15px 30px;
  width: 40rem;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>