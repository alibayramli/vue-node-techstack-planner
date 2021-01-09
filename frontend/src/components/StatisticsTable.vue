<template>
	<div class="container" >
		<div class="accordion" :id="['accordion-' + type]">
			<div class="accordion-item">
				<h2 :id="['#heading-' + type]">
					<button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="['#collapse-' + type]" aria-expanded="true" :aria-controls="['#collapse-' + type]">
							{{ convertToStartCase(type) }}
					</button>
				</h2>
				<div :id="['collapse-' + type]" class="accordion-collapse collapse" :aria-labelledby="['#heading-' + type]" :data-bs-parent="['#accordion-' + type]">
					<div class="accordion-body">
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
								<tr v-for="([name,[popularity,cost]], index) of Object.entries(stat).slice(0,limit)" :key="index">
									<td scope="row">{{ index + 1 }}</td>
									<td scope="row">{{ name }}</td>
									<td scope="row" v-if="popularity">{{ popularity }}</td>
									<td scope="row" v-if="cost">{{ cost }}</td>
								</tr>
							</tbody>
						</table>
						<div class="buttons">
							<button class="btn btn-light" v-if="limit < Object.entries(stat).length" @click="limit=limit + 5">Show more</button>
							<div class="divider" />
							<button class="btn btn-light" v-if="limit !== 5" @click="limit= limit - 5">Show less</button>
							<div class="divider" />
							<button class="btn btn-light" v-if="limit !== 5" @click="limit= 5">Show only 5</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import caseConverterMixin from '../mixins/caseConverter';

export default {
	name: 'StatisticsTable',
	mixins: [ caseConverterMixin ],
	props: {
		stat: {
			type: Object,
			default: null,
		},
		type: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			limit: 5,
		};
	},
};
</script>

<style scoped>
.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
.buttons {
	padding-bottom:2rem;
}
</style>