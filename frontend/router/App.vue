<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon" />
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
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
					</ul>
				</div>
			</div>
		</nav>
		<router-view />
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'App',
	data() {
		return {};
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