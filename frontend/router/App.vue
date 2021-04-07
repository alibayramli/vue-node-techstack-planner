<template>
	<header>
		<NavBar />
	</header>
	<router-view />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import NavBar from '../src/components/NavBar.vue';
export default {
	name: 'App',
	components: {
		NavBar,
	},
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
			await Promise.all([
				this.formInfos(),
				this.loadSavedUserChoices(),
			]);
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

<style scoped>
</style>>