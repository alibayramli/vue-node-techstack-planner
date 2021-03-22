<template>
	<div class="container">
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
					</div>
				</div>
			</div>
		</div>
		<form
			class="was-validated save-choices"
			@submit.prevent="saveChoices()"
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
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ChoicesPicked',
	data() {
		return {};
	},
	computed: {
		...mapGetters('userData', {
			generalChoices: 'getGeneralChoices',
			teamChoices: 'getTeamChoices',
			isChoicesSaved: 'getIsChoicesSaved',
			generalChoicesByTypes: 'getGeneralChoicesByTypes',
			teamChoicesByTypes: 'getTeamChoicesByTypes',
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
		async saveChoices() {
			await this.sendChoicesToBackend();
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