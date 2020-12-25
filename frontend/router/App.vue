<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container collapse navbar-collapse" id="main">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
						<router-link class="nav-link" to="/"> Home </router-link> &nbsp;
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/form"> Form </router-link> &nbsp;
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/techstack"> Tech Stack </router-link> &nbsp;
					</li>
				</ul>
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
		return {
		};
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