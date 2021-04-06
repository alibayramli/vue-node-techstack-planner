<template>
	<div class="container">
		<div class="d-flex justify-content-center" style="margin:5rem auto" v-if="isSavedStartupsSpinnerActive">
			<div class="spinner-border" role="status" />
		</div>
		<div v-else>
			<div class="row container" style="margin:5rem auto">
				<div class="col-sm-4 d-flex pb-3" v-if="hasFormSubmitted">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">Name of the startup: <b>{{ draftStartupName }}</b></h5>
							<p class="card-text">Creation date:  <strong>Draft, make sure to save data!</strong></p>
							<button type="button"
								class="btn btn-primary"
								@click="viewStartup('draft')"
							>
								View
							</button>
						</div>
					</div>
				</div>
				<div class="col-sm-4 d-flex pb-3" v-for="startup of savedStartups" :key="startup">
					<div class="card" v-if="savedStartups.length">
						<div class="card-body">
							<h5 class="card-title">Name of the startup: <b>{{ startup.startupName }}</b></h5>
							<p class="card-text">Creation date:  <b>{{ showCreationDate(startup.creationDate) }}</b></p>
							<button type="button"
								class="btn btn-primary"
								@click="viewStartup(startup.startupId)"
							>
								View
							</button>
						</div>
					</div>
					<br>
				</div>
				<div style="margin:5rem auto" v-if="!savedStartups.length && !hasFormSubmitted">
					<span class="d-flex justify-content-center">No startups</span> <br>
					<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
						<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
					</svg>
				</div>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'UserChoices',
	data() {
		return {
			isSavedStartupsSpinnerActive: true,
		};
	},
	computed: {
		...mapGetters('startupChoicesData', {
			savedStartups: 'getSavedChoices',
		}),
		...mapGetters('startupFormData', {
			draftStartupName: 'getName',
			hasFormSubmitted: 'hasFormSubmitted',
		}),
	},
	async mounted() {
		await this.loadSavedUserChoices();
		this.isSavedStartupsSpinnerActive = false;
	},
	methods: {
		...mapActions('startupChoicesData', {
			loadSavedUserChoices: 'loadSavedChoices',
		}),
		viewStartup(startupId) {
			this.$router.push({ name: 'startup', params: { id: startupId } });
		},
		showCreationDate(dateStr) {
			return new Date(dateStr).toLocaleString();
		},
	},
};
</script>

<style scoped>
</style>