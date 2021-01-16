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
							{{ size }}
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
					<input type="text" class="form-control form-label" placeholder="Startup Budget" aria-label="Budget" required v-model="startupBudget" @keypress="isNumber(event)">
					<div class="form-text">Please include average annual salary per person.</div>
				</div>

				<div class="mb-3">
					<button
						class="btn btn-primary"
						type="submit"
						:disabled="!startupField || !startupBudget"
					>
						Submit form
					</button>
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'Form',
	mixins: [ caseConverterMixin ],
	data() {
		return {
			isSubmitted: false,
		};
	},
	computed: {
		...mapState('formData', {
			locations: 'availableLocations',
			sizes: 'availableSizes',
			fields: 'availableFields',
		}),
		startupSize: {
			get() {
				return this.$store.state.startupData.size;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_SIZE', value);
			},
		},
		startupLocation: {
			get() {
				return this.$store.state.startupData.location;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_LOCATION', value);
			},
		},
		startupField: {
			get() {
				return this.$store.state.startupData.field;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_FIELD', value);
			},
		},
		startupBudget: {
			get() {
				return this.$store.state.startupData.budget;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_BUDGET', value);
			},
		},
	},
	async created() {
		await this.formInfos();
	},
	methods: {
		...mapActions('formData', {
			formInfos: 'loadFormInfos',
		}),
		...mapActions('startupData', {
			createStartupData: 'createData',
		}),
		async submit() {
			await this.createStartupData();
			this.resetForm();
			this.isSubmitted = true;
		},
		resetForm() {
			this.$store.commit('startupData/UPDATE_SIZE', '');
			this.$store.commit('startupData/UPDATE_LOCATION', '');
			this.$store.commit('startupData/UPDATE_FIELD', '');
		},
		isNumber(evt = window.event) {
			const charCode = (evt.which) ? evt.which : evt.keyCode;
			// eslint-disable-next-line no-magic-numbers
			if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
				evt.preventDefault();
			} else {
				return true;
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