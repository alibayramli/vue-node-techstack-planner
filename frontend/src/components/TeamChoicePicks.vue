<template>
	<div>
		<div class="tooltip-add tooltip-view">
			<span v-if="isTeamChoiceAdded">
				<ChoiceIcons
					type="deleteChoice" :name="name"
					@click.stop="deleteTeamChoice(header,type,name)"
				/>

			</span>
			<span v-if="!isTeamChoiceAdded">
				<ChoiceIcons
					type="addChoice"
					@click.stop="selectTeamChoice(header,type,name)"
				/>
			</span>
			<ChoiceIcons type="choiceAdded" v-if="isTeamChoiceAdded" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChoiceIcons from './ChoiceIcons.vue';

export default {
	name: 'TeamChoicePicks',
	components: {
		ChoiceIcons,
	},
	props: {
		header: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('startupChoicesData', {
			teamChoices: 'getTeamChoices',
		}),
		isTeamChoiceAdded() {
			return this.teamChoices
				.some(choice => choice[this.header] && choice[this.header][this.type] === this.name);
		},
	},
	methods: {
		selectTeamChoice(header, type, name) {
			this.$store.commit('startupChoicesData/SET_TEAM_CHOICES', { header, type, name });
		},
		deleteTeamChoice(header, type, name) {
			this.$store.commit('startupChoicesData/DELETE_TEAM_CHOICE', { header, type, name });
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