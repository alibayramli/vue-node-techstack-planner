<template>
	<div>
		<form
			class="login-form"
			@submit.prevent="onSubmitLogin"
		>
			<fieldset>
				<legend>Login</legend>
				<hr>
				<div class="mb-3">
					<label for="name" class="form-label">Email</label>
					<input class="form-control" v-model="email">
				</div>
				<div class="mb-3">
					<label for="name" class="form-label">Password</label>
					<input type="password" class="form-control" v-model="password">
				</div>

				<div v-if="!getToken">
					<button
						class="btn btn-primary"
						type="submit"
						:disabled="!email || !password"
					>
						Login
						<div class="spinner-border spinner-border-sm" role="status"
							v-if="isLoginSpinnerActive"
						/>
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
	name: 'Login',
	data() {
		return {
			isLoginSpinnerActive: false,
		};
	},
	computed: {
		...mapGetters('userData', {
			error: 'getErrorMessage',
			getToken: 'getToken',
		}),
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
			sendLoginInfo: 'sendLoginInfo',
		}),
		async onSubmitLogin() {
			this.isLoginSpinnerActive = true;
			await this.sendLoginInfo();
			this.isLoginSpinnerActive = false;
		},
	},

};
</script>

<style scoped>
.login-form {
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