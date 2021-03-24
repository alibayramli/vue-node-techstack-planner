<template>
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Name of the startup</h5>
						<p class="card-text">Creation date:</p>
						<router-link to="/choices/one">Open </router-link>
					</div>
				</div>
			</div>
			<div class="col-sm-6">
				<div class="card">
					<div class="card-body">
						<h5 class="card-title">Name of the startup</h5>
						<p class="card-text">Creation date:</p>
						<router-link to="/choices/one">Open </router-link>
					</div>
				</div>
			</div>
		</div>

		<router-view />
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'UserChoices',
	data() {
		return {};
	},
	computed: {
		...mapActions('userData', {
			savedChoices: 'getSavedChoices',
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
	async mounted() {
		await this.loadSavedUserChoices();
	},
	methods: {
		...mapActions('userData', {
			loadSavedUserChoices: 'loadSavedChoices',
		}),
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