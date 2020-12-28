import _ from 'lodash';
export default {
	data() {
	},
	methods: {
		convertToStartCase(str){
			return _.startCase(str);
		}
	},
};