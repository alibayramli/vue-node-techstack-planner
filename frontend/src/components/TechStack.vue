<template>
	<div v-if="tools.length">
		<p class="text-center">
			Here are some exciting tools for your startup!
		</p>

		<table class="table">
			<thead class="thead-dark">
				<tr>
					<th scope="col">#</th>
					<th scope="col">Tool Name</th>
					<th scope="col">Popularity Rate</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="([name, rate], index) in tools" :key="name">
					<th scope="row">{{ index + 1 }}</th>
					<td>{{ name }}</td>
					<td>{{ rate }}</td>
				</tr>
			</tbody>
		</table>
	</div>
	<div v-else>Nothing to show, go to <router-link to="/form"> Form </router-link>to start exploring!</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'TechStack',
	data() {
		return {

		};
	},
	computed: {
		...mapState('toolsData', {
			tools: 'tools',
		}),
	},
};
</script>

<style>

</style>