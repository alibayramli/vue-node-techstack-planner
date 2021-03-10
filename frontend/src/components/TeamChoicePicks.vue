<template>
	<div>
		<button class="tooltip-add" @click="selectTeamChoice(header,type,name)">
			<AddChoicesIcon type="addChoice" />
		</button>
		<div v-if="isTeamChoiceAdded">
			<AddChoicesIcon type="choiceAdded" />
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import AddChoicesIcon from './AddChoicesIcon.vue';

export default {
	name: 'TeamChoicePicks',
	components: {
		AddChoicesIcon,
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
		...mapGetters('userData', {
			teamChoices: 'getTeamChoices',
		}),
		isTeamChoiceAdded() {
			return this.teamChoices
				.some(choice => choice[this.header] && choice[this.header][this.type] === this.name);
		},
	},
	methods: {
		selectTeamChoice(header, type, name) {
			this.$store.commit('userData/SET_TEAM_CHOICES', { header, type, name });
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