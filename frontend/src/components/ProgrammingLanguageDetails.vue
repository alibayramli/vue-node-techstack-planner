<template>
	<div>
		prog lang: {{ id }}
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

		};
	},
	computed: {
		...mapGetters('programmingLanguagesData', {
			languageDetails: 'getDetails',
		}),
	},
	async created() {
		await this.getProgLangDetails(this.id);
	},
	methods: {
		...mapActions('programmingLanguagesData', {
			loadLanguageDetails: 'loadProgrammingLanguageDetails',
		}),
		async getProgLangDetails(progName) {
			this.$store.commit('programmingLanguagesData/UPDATE_NAME', progName);
			await this.loadLanguageDetails();
		},
	},
};
</script>
<style scoped>

</style>