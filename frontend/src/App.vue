<template>
	<header>
		<TheNavbar />
	</header>
	<router-view />
</template>

<script>
import { mapActions } from 'vuex';
import TheNavbar from './commons/components/TheNavbar.vue';
export default {
	name: 'App',
	components: {
		TheNavbar,
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
		...mapActions('statistics', {
			statisticsInfos: 'loadStatisticsInfos',
		}),
		...mapActions('startupFormData', {
			formInfos: 'loadFormInfos',
		}),
		...mapActions('startupChoices', {
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