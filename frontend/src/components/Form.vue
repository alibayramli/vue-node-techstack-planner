<template>
	<div id="app">
		<form class="vue-form" @submit.prevent="submit">
			<fieldset>
				<legend>Tech Stack Specification Form</legend>
				<div>
					<label class="label" for="name">Team size</label>
					<p class="select">
						<select v-model="startupSize">
							<option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
						</select>
					</p>
				</div>
				<div>
					<label class="label" for="name">Location of the startup</label>
					<p class="select">
						<select v-model="startupLocation">
							<option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
						</select>
					</p>
				</div>
				<div>
					<label class="label" for="name">Startup field</label>
					<p class="select">
						<select v-model="startupField">
							<option v-for="field in fields" :key="field" :value="field">{{ field }}</option>
						</select>
					</p>
				</div>
				<div>
					<input type="submit" value="Send Form" :disabled="!startupSize || !startupLocation || !startupField">
				</div>
			</fieldset>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	name: 'Form',
	data() {
		return {
		};
	},
	computed: {
		...mapState('availableData', {
			locations: 'availableLocations',
			sizes: 'availableSizes',
			fields: 'availableFields',
		}),
		startupSize: {
			get() {
				return this.$store.state.startupData.size;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_SIZE', value);
			},
		},
		startupLocation: {
			get() {
				return this.$store.state.startupData.location;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_LOCATION', value);
			},
		},
		startupField: {
			get() {
				return this.$store.state.startupData.field;
			},
			set(value) {
				this.$store.commit('startupData/UPDATE_FIELD', value);
			},
		},
	},
	watch: {
	},
	async created() {
		await this.availableInfos();
	},
	methods: {
		...mapActions('availableData', {
			availableInfos: 'loadAvailableInfos',
		}),
		...mapActions('startupData', {
			createStartupData: 'createData',
		}),
		async submit() {
			await this.createStartupData();
		},
	},
};
</script>

<style scoped>
*,
*::after,
*::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.vue-form {
  width: 500px;
  margin: 15px auto;
  padding: 15px 30px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.vue-form fieldset {
  margin: 24px 0 0 0;
  border: none;
}
.vue-form legend {
  padding-bottom: 10px;
  font-size: 2rem;
  border-bottom: 2px solid #ecf0f1;
}
.vue-form div {
  position: relative;
  margin: 20px 0;
}
.vue-form .label {
  font-size: 1.3rem;
  color: #94aab0;
  margin-bottom: 10px;
}
.vue-form .label {
  display: block;
}
.vue-form input,
.vue-form select,
.vue-form label {
  font-family: "Open Sans", sans-serif;
  font-size: 1.6rem;
  color: #2b3e51;
}
.vue-form input[type="text"],
.vue-form select,
.vue-form legend {
  display: block;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.vue-form input[type="text"],
.vue-form input[type="number"],
.vue-form select  {
  padding: 12px;
  border: 1px solid #cfd9db;
  background-color: #ffffff;
  border-radius: 0.25em;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
}
.vue-form input[type="text"]:focus,
.vue-form input[type="number"]:focus,
.vue-form select:focus {
  outline: none;
  border-color: #2c3e50;
  -webkit-box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
  box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
}
.vue-form .select {
  position: relative;
}
.vue-form .select::after {
  content: "";
  position: absolute;
  z-index: 1;
  right: 16px;
  top: 50%;
  margin-top: -8px;
  display: block;
  width: 16px;
  height: 16px;
  background: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cg%3E%0D%0A%09%3Cpolygon%20fill%3D%22%232c3e50%22%20points%3D%220.9%2C5.5%203.1%2C3.4%208%2C8.3%2012.9%2C3.4%2015.1%2C5.5%208%2C12.6%20%09%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E")
    no-repeat center center;
  pointer-events: none;
}
.vue-form select {
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
.vue-form select::-ms-expand {
  display: none;
}
.vue-form input[type="submit"] {
  border: none;
  background: #2c3e50;
  border-radius: 1em;
  padding: 12px 20px;
  color: #ffffff;
  font-weight: bold;
  float: right;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.no-touch .vue-form input[type="submit"]:hover {
  background: #42a2e1;
}
.vue-form input[type="submit"]:focus {
  outline: none;
  background: #2b3e51;
}
.vue-form input[type="submit"]:active {
  -webkit-transform: scale(0.9);
  -ms-transform: scale(0.9);
  transform: scale(0.9);
}

.debug {
  width: 500px;
  background-color: #2c3e50;
  margin: 15px auto;
  padding: 30px;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.debug pre {
  color: #ffffff;
  font-size: 18px;
  line-height: 30px;
  font-family: "Source Code Pro", monospace;
  font-weight: 300;
  white-space: pre-wrap;
}
</style>