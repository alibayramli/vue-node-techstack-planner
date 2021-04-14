<template>
	<div class="container">
		<div class="d-flex justify-content-center" style="margin:5rem auto" v-if="isSavedStartupsSpinnerActive">
			<div class="spinner-border" role="status" />
		</div>
		<div v-else>
			<div class="mb-3">
				<button
					type="button"
					style="margin:1rem"
					class="btn btn-primary"
					@click="viewPieChart('startupSize')"
				>
					Sizes PieChart
				</button>
				<button
					type="button"
					class="btn btn-primary"
					@click="viewPieChart('startupLocation')"
				>
					Locations PieChart
				</button>
			</div>
			<div class="row container" style="margin:5rem auto">
				<div class="col-12 col-sm-6 col-lg-3 d-flex pb-3"
					v-if="hasFormSubmitted && draftStartupName"
				>
					<div class="card w-100">
						<div class="card-body">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">
									Name:
									<b>
										{{ draftStartupName }}
									</b>
								</li>
								<li class="list-group-item">
									Does speed matter:
									<b>
										{{ doesDraftStartupDeploymentSpeedMatter }}
									</b>
								</li>
								<li class="list-group-item">
									Field:
									<b>
										{{ $convertToStartCase(draftStartupField) }}
									</b>
								</li>
							</ul>
							<hr>
							<button type="button"
								class="btn btn-primary"
								@click="viewStartup('draft')"
								:disabled="!areAllTeamChoicesPicked"
							>
								View
							</button>
							<div class="form-text" v-if="!areAllTeamChoicesPicked">
								Please note you need to check all
								team choices to view/save the startup details
							</div>
						</div>
						<div class="card-footer text-muted">
							Draft
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-6 col-lg-3 d-flex pb-3" v-for="startup of savedStartups" :key="startup">
					<div class="card w-100" v-if="savedStartups.length">
						<div class="card-body">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">
									Name:
									<b>
										{{ startup.startupName }}
									</b>
								</li>
								<li class="list-group-item">
									Does speed matter:
									<b>
										{{ startup.startupDeploymentSpeed }}
									</b>
								</li>
								<li class="list-group-item">
									Field:
									<b>
										{{ $convertToStartCase(startup.startupField) }}
									</b>
								</li>
							</ul>
							<hr>
							<button type="button"
								class="btn btn-primary"
								@click="viewStartup(startup.startupId)"
							>
								View
							</button>
						</div>
						<div class="card-footer text-muted">
							{{ showCreationDate(startup.creationDate) }}
						</div>
					</div>
					<br>
				</div>
				<div style="margin:5rem auto" v-if="!savedStartups.length && !hasFormSubmitted">
					<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="m-3 bi bi-bag" viewBox="0 0 16 16">
						<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
					</svg>
					<span class="d-flex justify-content-center">No startups</span>
				</div>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'UserStartups',
	data() {
		return {
			isSavedStartupsSpinnerActive: true,
		};
	},
	computed: {
		...mapGetters('startupChoices', {
			savedStartups: 'getSavedChoices',
			areAllTeamChoicesPicked: 'getAreAllTeamChoicesPicked',
		}),
		...mapGetters('startupForm', {
			draftStartupName: 'getName',
			draftStartupField: 'getField',
			doesDraftStartupDeploymentSpeedMatter: 'getDeploymentSpeed',
			hasFormSubmitted: 'hasFormSubmitted',
		}),
	},
	async mounted() {
		await this.loadSavedUserChoices();
		this.isSavedStartupsSpinnerActive = false;
	},
	methods: {
		...mapActions('startupChoices', {
			loadSavedUserChoices: 'loadSavedChoices',
		}),
		viewStartup(startupId) {
			this.$router.push({ name: 'startup', params: { id: startupId } });
		},
		showCreationDate(dateStr) {
			return new Date(dateStr).toLocaleString();
		},
		viewPieChart(type) {
			this.$router.push({ name: 'piechart', params: { type } });
		},
	},
};
</script>

<style scoped>
</style>