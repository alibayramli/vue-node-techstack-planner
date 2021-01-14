<template>
	<div>
		<a data-bs-toggle="collapse"
			role="button" aria-expanded="false"
			:href="['#' + name.replace(/[+#]+/, name.length)]"
			:aria-controls="['#' + name.replace(/[+#]+/, name.length)]"
		>
			<a class="tooltip-view" @click="getDetails(name)">
				<span class="tooltip-text-view">Click to view the details</span>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16">
					<path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
				</svg>
			</a>
		</a>
		<div class="collapse" :id="[name.replace(/[+#]+/, name.length)]" v-if="details">
			<div class="card" v-for="detailType of Object.keys(details)" :key="detailType">
				<div class="card-header">
					{{ convertToStartCase(detailType) }}
				</div>
				<p class="card-text"
					v-for="detail of details[detailType]"
					:key="detail"
				>
					{{ detail[0] }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';
export default {
	name: 'ProgLangInfo',
	mixins: [ caseConverterMixin ],
	props: {
		name: {
			type: String,
			default: '',
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapState('programmingLanguagesData', {
			details: 'details',
		}),
	},
	methods: {
		...mapActions('programmingLanguagesData', {
			languageDetails: 'loadProgrammingLanguageDetails',
		}),
		async getDetails(name) {
			this.$store.commit('programmingLanguagesData/UPDATE_NAME', name);
			await this.languageDetails();
		},
	},
};
</script>

<style scoped>
.tooltip-view {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip-view  .tooltip-text-view{
  visibility: hidden;
  width: 120px;
  background-color: navy;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  top: -5px;
  left: 105%;
}
.tooltip-view:hover .tooltip-text-view{
  visibility: visible;
}
.tooltip-add {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip-add .tooltip-text-add {
  visibility: hidden;
  width: 120px;
  background-color: navy;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 2;
  top: -5px;
  left: 105%;
}
.tooltip-add:hover .tooltip-text-add {
  visibility: visible;
}
</style>