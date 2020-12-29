export default {
	data() {
		return {
		};
	},
	methods: {
		convertToStartCase(camelCase) {
			return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
		},
	},
};