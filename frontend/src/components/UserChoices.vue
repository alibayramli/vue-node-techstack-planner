<template>
	<div class="container">
		<div class="row">
			<h1>Draft Startups</h1>
			<div class="card" v-if="draftStartupName">
				<div class="card-body">
					<h5 class="card-title">Name of the startup: <b>{{ draftStartupName }}</b></h5>
					<button type="button"
						class="btn btn-primary"
						@click="viewStartup('draft')"
					>
						View
					</button>
				</div>
			</div>
			<div v-else>
				No draft data,  <router-link to="/form">start adding</router-link>
			</div>
		</div>
		<hr>
		<h1>Saved Startups</h1>
		<div class="row" v-for="startup of savedStartups" :key="startup">
			<div>
				<div class="card">
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
		</div>

		<router-view />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'UserChoices',
	data() {
		return {};
	},
	computed: {
		...mapGetters('userData', {
			savedStartups: 'getSavedChoices',
		}),
		...mapGetters('startupData', {
			draftStartupName: 'getName',
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
.save-choices {
  margin: auto;
  margin-top: 5rem;
  padding: 15px 30px;
  width: 40rem;
  background-color: #fff;
}
</style>