<template>
	<div>
		<router-link to="/hello"> Greeting </router-link> &nbsp;
		<router-link to="/techstack"> Tech Stack </router-link>
		<router-view />
	</div>
</template>

<script>

export default {
	name: 'App',
	data() {
		return {
		};
	},
};
</script>

<style>

</style>