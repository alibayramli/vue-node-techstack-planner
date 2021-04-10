<template>
	<header>
		<NavBar />
	</header>
	<router-view />
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from '../src/components/NavBar.vue';
export default {
	name: 'App',
	components: {
		NavBar,
	},
	data() {
		return {};
	},
	async mounted() {
		await this.statisticsInfos();
		if (this.isLoggedInAuthMixin) {
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
		...mapActions('startupChoicesData', {
			loadSavedUserChoices: 'loadSavedChoices',
		}),
	},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>>