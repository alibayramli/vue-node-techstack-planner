<template>
	<div>
		<button class="tooltip-view" @click="goToProgInfoComponent()">
			<TechStackSuggestedToolIcons type="viewDetails" />
		</button>
	</div>
</template>

<script>
import TechStackSuggestedToolIcons from './TechStackSuggestedToolIcons.vue';

export default {
	name: 'ProgLangInfo',
	components: {
		TechStackSuggestedToolIcons,
	},
	props: {
		name: {
			type: String,
			default: '',
		},
	},
	data() {
		return {};
	},
	methods: {
		goToProgInfoComponent() {
			this.$router.push({ name: 'prog-lang', params: { id: this.name } });
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
.tooltip-view {
  position: relative;
  display: inline-block;
}
.tooltip-view  .tooltip-text-view{
  visibility: hidden;
  width: 120px;
  background-color:#0d6efd;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  margin: 0 5px;
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

</style>