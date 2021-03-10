<template>
	<div>
		<div v-if="type === 'addChoice'">
			<span class="tooltip-text-add">Click to add the tool </span>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#32CD32" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
			</svg>
		</div>
		<div v-if="type === 'choiceAdded'">
			added
			<a>
				<svg style="color:lightgreen" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#32CD32" class="bi bi-bookmark-check-fill" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zm8.854-9.646a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
				</svg>
			</a>
		</div>
		<div v-if="type === 'notEnoughBudget'">
			<span class="tooltip-text-add">budget ({{ startupBudget + 'k' }}) is not enough to pick: <strong>{{ convertToStartCase(name) }}</strong> </span>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="lightgray" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
			</svg>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'AddChoicesIcon',
	mixins: [ caseConverterMixin ],
	props: {
		name: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
	},
	data() {
		return {

		};
	},
	computed: {
		...mapGetters('startupData', {
			startupBudget: 'getBudget',
		}),
	},
};
</script>

<style scoped>
.tooltip-text-add {
  visibility: hidden;
  width: 120px;
  background-color: #0d6efd;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  margin: 0 5px;
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