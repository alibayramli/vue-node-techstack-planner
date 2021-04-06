<template>
	<div class="container">
		<form
			class="startup-form"
			@submit.prevent="submit"
		>
			<fieldset>
				<legend>Startup Details</legend>
				<hr>
				<div class="mb-3">
					<label for="size" class="form-label">Startup Name</label>
					<input type="text" class="form-control form-label"
						placeholder="Name of the startup"
						aria-label="Startup Name"
						required v-model="formInfo.name"
					>
				</div>

				<div class="mb-3">
					<label for="size" class="form-label">Startup size</label>
					<select
						class="form-select"
						aria-label="select"
						v-model="formInfo.size"
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
					<div class="invalid-feedback">Please select</div>
				</div>

				<div class="mb-3">
					<label for="field" class="form-label">Startup Deployment Speed</label>
					<select
						class="form-select"
						required
						aria-label="select"
						v-model="formInfo.deploymentSpeed"
					>
						<option v-for="speed in deploymentSpeeds" :key="speed" :value="speed">
							{{ $convertToStartCase(speed) }}
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
						v-model="formInfo.field"
					>
						<option v-for="field in fields" :key="field" :value="field">
							{{ $convertToStartCase(field) }}
						</option>
					</select>
					<div class="invalid-feedback">Please select</div>
				</div>
				<div class="mb-3">
					<label for="budget" class="form-label">Startup Budget</label>
					<input type="text" class="form-control form-label"
						placeholder="Startup Budget" aria-label="Budget"
						required v-model="formInfo.budget"
						@keypress="$isValidStartupBudget($event,formInfo.budget)"
					>
				</div>
			</fieldset>
		</form>
		<div class="accordion accordion-flush" id="accordionFlushExample">
			<div class="accordion-item">
				<h2 class="accordion-header" id="flush-headingOne">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
						General Choices
					</button>
				</h2>
				<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						<div v-for="[key, values] of generalChoicesByTypes" :key="key">
							<h4><strong>{{ key }}</strong></h4>
							<ul class="list-group list-group-flush">
								<li v-for="val of values" class="list-group-item" :key="val">{{ val }}</li>
							</ul>
							<hr><br>
						</div>
						<div v-if="!generalChoicesByTypes.length">
							No data
						</div>
					</div>
				</div>
			</div>
			<div class="accordion-item">
				<h2 class="accordion-header" id="flush-headingTwo">
					<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
						Team Choices
					</button>
				</h2>
				<div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
					<div class="accordion-body">
						<div v-for="[header, subArr] of teamChoicesByTypes" :key="header">
							<h4><strong> {{ header }}</strong></h4> <br>
							<div v-for="[type, values] of subArr" :key="type">
								<h6><strong> {{ type }}</strong></h6>
								<ul class="list-group list-group-flush">
									<li v-for="val of values" class="list-group-item" :key="val">{{ val }}</li>
								</ul>
								<hr><br>
							</div>
						</div>
						<div v-if="!teamChoicesByTypes.length">
							No data
						</div>
					</div>
				</div>
			</div>
		</div>
		<form
			class="was-validated save-choices"
			@submit.prevent="storeStartup()"
		>
			<fieldset>
				<div class="mb-2">
					<button
						class="btn btn-primary"
						style="margin:1rem"
					>
						<span v-if="id === 'draft'">Save startup</span>
						<span v-else> Update startup</span>
					</button>
					<button
						class="btn btn-danger"
						v-if="id !=='draft'"
						@click.stop="removeStartup()"
					>
						<span v-if="id === 'draft'">Save startup</span>
						<span v-else> Delete startup</span>
					</button>
				</div>
			</fieldset>
		</form>
	</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'StartupDetails',
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			isEditing: true,
		};
	},
	computed: {
		...mapGetters('startupFormData', {
			locations: 'getAvailableLocations',
			sizes: 'getAvailableSizes',
			fields: 'getAvailableFields',
			deploymentSpeeds: 'getAvailableDeploymentSpeeds',
		}),
		...mapGetters('startupChoicesData', {
			generalChoicesByTypes: 'getGeneralChoicesByTypes',
			teamChoicesByTypes: 'getTeamChoicesByTypes',
		}),
		...mapGetters('startupFormData', {
			formInfo: 'getStartupFormData',
		}),
	},
	beforeMount() {
		window.addEventListener('beforeunload', this.preventNav);
	},
	beforeUnmount() {
		window.removeEventListener('beforeunload', this.preventNav);
	},
	methods: {
		...mapActions('startupChoicesData', {
			createStartup: 'createStartup',
			updateStartup: 'updateStartup',
			deleteStartup: 'deleteStartup',
		}),
		async storeStartup() {
			window.removeEventListener('beforeunload', this.preventNav);
			if (this.id === 'draft') {
				await this.createStartup();
			} else {
				await this.updateStartup(this.formInfo);
			}
		},
		async removeStartup() {
			window.removeEventListener('beforeunload', this.preventNav);
			await this.deleteStartup(this.id);
		},
		preventNav(event) {
			if (!this.isEditing) {
				return;
			}
			event.preventDefault();
			event.returnValue = '';
		},
	},
};
</script>

<style scoped>
.save-choices {
  margin: auto;
  padding: 15px 30px;
  width: 40rem;
  background-color: #fff;
}
</style>