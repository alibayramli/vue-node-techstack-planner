<template>
	<div>
		<form
			class="signup-form"
			@submit.prevent="onSubmitSignup"
		>
			<fieldset>
				<legend>Sign up</legend>
				<hr>
				<div class="mb-3">
					<label for="name" class="form-label">Name</label>
					<input type="text" class="form-control" v-model="fullName">
				</div>

				<div class="mb-3">
					<label for="name" class="form-label">Email</label>
					<input class="form-control" v-model="email">
				</div>
				<div class="mb-3">
					<label for="name" class="form-label">Password</label>
					<input class="form-control" v-model="password">
				</div>

				<div class="mb-3">
					<button
						class="btn btn-primary"
						type="submit"
						:disabled="!fullName || !email || !password"
					>
						Signup
					</button>
				</div>
				<p class="form-text text-muted">{{ error }}</p>
			</fieldset>
		</form>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
	name: 'Signup',
	data() {
		return {};
	},
	computed: {
		...mapGetters('userData', {
			error: 'getErrorMessage',
		}),
		fullName: {
			get() {
				return this.$store.state.userData.fullName;
			},
			set(value) {
				this.$store.commit('userData/UPDATE_FULL_NAME', value);
			},
		},
		email: {
			get() {
				return this.$store.state.userData.email;
			},
			set(value) {
				this.$store.commit('userData/UPDATE_EMAIL', value);
			},
		},
		password: {
			get() {
				return this.$store.state.userData.password;
			},
			set(value) {
				this.$store.commit('userData/UPDATE_PASSWORD', value);
			},
		},

	},
	methods: {
		...mapActions('userData', {
			sendSignupInfo: 'sendSignupInfo',
		}),
		async onSubmitSignup() {
			await this.sendSignupInfo();
		},
	},

};
</script>

<style scoped>
.signup-form {
  margin: auto;
  margin-top: 5rem;
  padding: 15px 30px;
  width: 40rem;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>