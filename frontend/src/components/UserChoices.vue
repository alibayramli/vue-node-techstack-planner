<template>
	<div v-if="Object.keys(generalChoices).length && Object.keys(teamChoices).length">
		<h4 class="text-center py-4">General Choices</h4>
		<table class="table" v-if="Object.keys(generalChoices).length">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Type</th>
					<th scope="col">Value</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="([type,name], index) of Object.entries(generalChoices)" :key="index">
					<th scope="row">{{ index + 1 }}</th>
					<td>{{ convertToStartCase(type) }}</td>
					<td>{{ name }}</td>
				</tr>
			</tbody>
		</table>
		<h4 class="text-center py-4">Team Choices</h4>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Header</th>
					<th scope="col">Type</th>
					<th scope="col">Value</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="([index,choice]) of Object.entries(teamChoices)" :key="index">
					<td scope="row">{{ parseInt(index) + 1 }}</td>
					<td scope="row">{{ convertToStartCase(Object.keys(choice)[0]) }}</td>
					<td scope="row">{{ convertToStartCase(Object.keys(choice[Object.keys(choice)[0]])[0]) }}</td>
					<td scope="row">{{ Object.values(choice[Object.keys(choice)[0]])[0] }}</td>
				</tr>
			</tbody>
		</table>
		<form
			class="was-validated save-choices"
			@submit.prevent="saveToDatabse()"
		>
			<fieldset v-if="!isChoicesSaved">
				<legend>Ready? Save your preferences!</legend>
				<div class="mb-3">
					<input type="text" class="form-control form-label" placeholder="Name of the startup" aria-label="Startup Name" required v-model="startupName">
				</div>

				<div class="mb-3">
					<button
						class="btn btn-primary"
						type="submit"
						:disabled="!startupName"
					>
						Save choices
					</button>
				</div>
			</fieldset>
			<button type="button" class="btn btn-success" v-if="isChoicesSaved" disabled>Saved</button>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'UserChoices',
	mixins: [ caseConverterMixin ],
	data() {
		return {};
	},
	computed: {
		...mapState('userData', {
			generalChoices: 'generalChoices',
			teamChoices: 'teamChoices',
			isChoicesSaved: 'isChoicesSaved',
		}),
		startupName: {
			get() {
				return this.$store.state.startupData.name;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_NAME', value);
			},
		},

	},
	methods: {
		...mapActions('userData', {
			sendChoicesToBackend: 'sendChoicesToBackend',
		}),
		async saveToDatabse() {
			await this.sendChoicesToBackend();
			await this.resetForm();
		},
		resetForm() {
			this.$store.commit('startupData/UPDATE_NAME', '');
			this.$store.commit('startupData/UPDATE_SIZE', '');
			this.$store.commit('startupData/UPDATE_LOCATION', '');
			this.$store.commit('startupData/UPDATE_FIELD', '');
			this.$store.commit('startupData/UPDATE_BUDGET', '');
		},
	},
};
</script>

<style scoped>
.save-choices {
  margin: auto;
  margin-top: 5rem;
  padding: 15px 30px;
  width: 40rem;
  background-color: #fff;
}
</style>