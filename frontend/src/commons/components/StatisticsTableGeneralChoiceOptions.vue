<template>
	<div v-if="type === 'developerType'">
		<div class="tooltip-add tooltip-view" v-if="hasEnoughBudgetToPick">
			<span v-if="isGeneralChoiceAdded">
				<TechStackSuggestedToolIcons
					type="deleteChoice" :name="name"
					@click.stop="deleteGeneralChoice(type,name)"
				/>
			</span>
			<span v-if="!isGeneralChoiceAdded">
				<TechStackSuggestedToolIcons
					type="addChoice"
					@click.stop="selectGeneralChoice(type,name)"
				/>
			</span>
			<TechStackSuggestedToolIcons type="choiceAdded" v-if="isGeneralChoiceAdded" />
		</div>
		<TechStackSuggestedToolIcons class="tooltip-add" v-else
			type="notEnoughBudget" :name="name"
		/>
	</div>
	<div v-else>
		<div class="tooltip-add tooltip-view">
			<span v-if="isGeneralChoiceAdded">
				<TechStackSuggestedToolIcons
					type="deleteChoice" :name="name"
					@click.stop="deleteGeneralChoice(type,name)"
				/>
			</span>
			<span v-if="!isGeneralChoiceAdded">
				<TechStackSuggestedToolIcons
					type="addChoice"
					@click.stop="selectGeneralChoice(type,name)"
				/>
			</span>
			<TechStackSuggestedToolIcons type="choiceAdded" v-if="isGeneralChoiceAdded" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import TechStackSuggestedToolIcons from './TechStackSuggestedToolIcons.vue';

export default {
	name: 'StatisticsTableGeneralChoiceOptions',
	components: {
		TechStackSuggestedToolIcons,
	},
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
		...mapGetters('startupChoices', {
			generalChoices: 'getGeneralChoices',
			teamChoices: 'getTeamChoices',
		}),
		...mapGetters('startupForm', {
			startupBudget: 'getBudget',
		}),
		hasEnoughBudgetToPick() {
			return this.startupBudget >= this.cost;
		},
		isGeneralChoiceAdded() {
			return this.generalChoices
				.some(choice => choice[this.type] === this.name);
		},
	},
	methods: {
		selectGeneralChoice(type, name) {
			this.$store.commit('startupChoices/SET_GENERAL_CHOICES', { type, name });
		},
		deleteGeneralChoice(type, name) {
			this.$store.commit('startupChoices/DELETE_GENERAL_CHOICE', { type, name });
		},
	},
};
</script>

<style scoped>
div span{
	cursor: pointer;
}
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