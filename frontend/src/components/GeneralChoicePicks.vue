<template>
	<div v-if="type === 'developerType'">
		<button class="tooltip-add" v-if="hasEnoughBudgetToPick" @click="selectGeneralChoice(type,name)">
			<ChoiceIcons type="addChoice" />
		</button>
		<button class="tooltip-add" v-else>
			<ChoiceIcons type="notEnoughBudget" :name="name" />
		</button>
		<div v-if="isGeneralChoiceAdded">
			<ChoiceIcons type="choiceAdded" />
		</div>
	</div>
	<div v-else>
		<button class="tooltip-add" @click="selectGeneralChoice(type,name)">
			<ChoiceIcons type="addChoice" />
		</button>
		<div v-if="isGeneralChoiceAdded">
			<ChoiceIcons type="choiceAdded" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import caseConverterMixin from '../mixins/caseConverter';
import ChoiceIcons from './ChoiceIcons.vue';

export default {
	name: 'GeneralChoicePicks',
	components: {
		ChoiceIcons,
	},
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
		cost: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('userData', {
			generalChoices: 'getGeneralChoices',
			teamChoices: 'getTeamChoices',
		}),
		...mapGetters('startupData', {
			startupBudget: 'getBudget',
		}),
		hasEnoughBudgetToPick() {
			return this.startupBudget >= this.cost;
		},
		isGeneralChoiceAdded() {
			return this.generalChoices[this.type] === this.name;
		},
	},
	methods: {
		selectGeneralChoice(type, name) {
			this.$store.commit('userData/SET_GENERAL_CHOICES', { type, name });
		},
	},
};
</script>

<style scoped>
button {
  outline: none;
  background: transparent;
  border: 1px solid transparent;
}
.tooltip-add {
  position: relative;
  display: inline-block;
}
.tooltip-add .tooltip-text-add {
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