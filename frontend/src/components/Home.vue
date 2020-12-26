<template>
	<div class="container">
		<p> Some 2020 statistics to be aware of</p>
		<div class="row">
			<div class="col-sm" v-for="(stat, type) of stats" :key="type">
				<p> {{ type }} </p>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">name</th>
							<th v-if="Object.entries(stat)[0][1][0]" scope="col">popularity</th>
							<th v-if="Object.entries(stat)[0][1][1]" scope="col">cost</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="([name,[popularity,cost]], index) of Object.entries(stat)" :key="index">
							<th scope="row">{{ index + 1 }}</th>
							<td>{{ name }}</td>
							<td v-if="popularity">{{ popularity }}</td>
							<td>{{ cost }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'Home',
	data() {
		return {

		};
	},
	computed: {
		...mapState('statisticsData', {
			stats: 'statistics',
		}),
	},
	methods: {

	},
};
</script>

<style scoped>

</style>