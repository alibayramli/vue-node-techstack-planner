<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon" />
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<router-link class="nav-link" to="/"> Home </router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/form"> Form </router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/techstack">
								Tech Stack
							</router-link>
						</li>
						<li class="nav-item" v-if="Object.keys(generalChoices).length || Object.keys(teamChoices).length">
							<router-link class="nav-link" to="/choices">
								Your choices
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<router-view />
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'App',
	data() {
		return {};
	},
	computed: {
		...mapState('userData', {
			generalChoices: 'generalChoices',
			teamChoices: 'teamChoices',
		}),

	},
	async created() {
		await this.statisticsInfos();
	},
	methods: {
		...mapActions('statisticsData', {
			statisticsInfos: 'loadStatisticsInfos',
		}),
	},
};
</script>

<style scoped>
</style>>