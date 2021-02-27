<template>
	<div>
		<div class="d-flex p-3 container">
			<button type="button" class="btn btn-secondary"
				@click="goBackToPreviousLink()"
			>
				Go back
			</button>
		</div>
		<div v-if="!Object.keys(languageDetails).length">
			<div class="d-flex justify-content-center">
				no data :(
			</div>
		</div>
		<div class="container">
			<div class="card" v-for="detailType of Object.keys(languageDetails)" :key="detailType">
				<div class="card-header">
					{{ convertToStartCase(detailType) }}
				</div>
				<p class="card-text"
					v-for="detail of languageDetails[detailType]"
					:key="detail"
				>
					{{ detail[0] }}
				</p>
			</div>
			<div v-if="isSpinnerActive">
				<div class="d-flex justify-content-center">
					<div class="spinner-border" role="status" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'ProgrammingLanguageDetails',
	mixins: [ caseConverterMixin ],
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			isSpinnerActive: false,
		};
	},
	computed: {
		...mapGetters('programmingLanguagesData', {
			languageDetails: 'getDetails',
		}),
	},
	async created() {
		this.isSpinnerActive = true;
		await this.getProgLangDetails(this.id);
		this.isSpinnerActive = false;
	},
	methods: {
		...mapActions('programmingLanguagesData', {
			loadLanguageDetails: 'loadProgrammingLanguageDetails',
		}),
		async getProgLangDetails(progName) {
			this.$store.commit('programmingLanguagesData/UPDATE_NAME', progName);
			await this.loadLanguageDetails();
		},
		goBackToPreviousLink() {
			const backwardsSteps = -1;
			this.$router.go(backwardsSteps);
			this.$store.commit('programmingLanguagesData/UPDATE_DETAILS', []);
		},
	},
};
</script>
<style scoped>

</style>