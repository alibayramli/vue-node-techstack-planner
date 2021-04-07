<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<div class="container-fluid">
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon" />
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item" v-if="!isLoggedIn">
							<router-link class="nav-link" to="/">
								Login
							</router-link>
						</li>
						<li class="nav-item" v-if="!isLoggedIn">
							<router-link class="nav-link" to="/signup">
								Signup
							</router-link>
						</li>
						<li class="nav-item" v-if="isLoggedIn">
							<a class="nav-link" style="cursor:pointer" @click="logout()">
								Logout
							</a>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/home"> Home </router-link>
						</li>
						<li class="nav-item" v-if="isLoggedIn">
							<router-link class="nav-link" to="/form"> Form </router-link>
						</li>
						<li class="nav-item" v-if="isLoggedIn">
							<router-link class="nav-link" to="/techstack">
								Tech Stack
							</router-link>
						</li>
						<li class="nav-item" v-if="isLoggedIn">
							<router-link class="nav-link" to="/user-startups">
								Your Startups
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
import { mapActions, mapGetters } from 'vuex';
export default {
	name: 'App',
	data() {
		return {};
	},
	computed: {
		...mapGetters('authData', {
			isLoggedIn: 'isLoggedIn',
		}),

	},
	async mounted() {
		await this.statisticsInfos();
		if (this.isLoggedIn) {
			await this.formInfos();
		}
	},
	methods: {
		...mapActions('statisticsData', {
			statisticsInfos: 'loadStatisticsInfos',
		}),
		...mapActions('startupFormData', {
			formInfos: 'loadFormInfos',
		}),
		...mapActions('authData', {
			sendLogOutInfo: 'sendLogOutInfo',
		}),
		async logout() {
			await this.sendLogOutInfo();
		},
	},
};
</script>

<style scoped>
</style>>