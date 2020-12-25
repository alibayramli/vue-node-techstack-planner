<template>
	<div class="container">
		<p> Some 2020 statistics to be aware of</p>
		<div class="row">
			<div class="col-sm">
				<p> Developer Types </p>
				<table class="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Name</th>
							<th scope="col">Popularity</th>
							<th scope="col">Cost</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(dev, index) in Object.keys(devs)" :key="dev">
							<th scope="row">{{ index + 1 }}</th>
							<td>{{ dev }}</td>
							<td>{{ devs[dev].popularity }}</td>
							<td>{{ devs[dev].cost }}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm" />
			<div class="col-sm" />
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
			devs: 'developersStatistics',
		}),
	},
};
</script>

<style scoped>

</style>