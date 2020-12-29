export default {
	data() {
	},
	methods: {
		convertToStartCase(camelCase) {
			return camelCase.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
		},
	},
};