<template>
	<div>
		prog lang: {{ id }}
	</div>
</template>

<script>

export default {
	name: 'ProgrammingLanguageDetails',
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>
<style scoped>

</style>