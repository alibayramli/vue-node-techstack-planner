<template>
	<div class="d-flex p-3">
		<button
			type="button"
			class="btn btn-primary"
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
	<div v-else>
		{{ id }} Ecosystem
	</div>
	<div class="container">
		<div
			class="card m-4"
			v-for="detailType of Object.keys(languageDetails)"
			:key="detailType"
		>
			<div class="card-header">
				{{ $convertToStartCase(detailType) }}
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
				<div
					class="spinner-border"
					role="status"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'ProgLangInfoDetails',
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
		...mapGetters('progLangInfo', {
			languageDetails: 'getDetails',
		}),
	},
	async created() {
		this.isSpinnerActive = true;
		await this.getProgLangDetails(this.id);
		this.isSpinnerActive = false;
	},
	methods: {
		...mapActions('progLangInfo', {
			loadLanguageDetails: 'loadProgrammingLanguageDetails',
		}),
		async getProgLangDetails(progName) {
			this.$store.commit('progLangInfo/UPDATE_NAME', progName);
			await this.loadLanguageDetails();
		},
		goBackToPreviousLink() {
			this.$router.back();
			this.$store.commit('progLangInfo/UPDATE_DETAILS', []);
		},
	},
};
</script>
<style scoped>

</style>