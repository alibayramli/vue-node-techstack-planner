<template>
	<div>
		<form class="login-form" @submit.prevent="onSubmitLogin">
			<fieldset>
				<legend>Login</legend>
				<hr>
				<div class="mb-3">
					<label for="name" class="form-label">Email</label>
					<input class="form-control" v-model="email">
					<div v-if="email && !isValidEmail" class="form-text">Invalid email.</div>
				</div>
				<div class="mb-3">
					<label for="name" class="form-label">Password</label>
					<input type="password" class="form-control" v-model="password">
					<div v-if="password && !isValidPassword" class="form-text">
						<span>Please include:</span> <br>
						<span v-if="!passwordContainsCapitalLetter"> capital letter(s) </span>
						<span v-if="!passwordContainsNumber">number(s) </span>
						<span v-if="!passwordContainsSpecialLetter"> special character(s) </span>
						<span v-if="!passwordContainsMinCharacters"> min length of
							{{ minPasswordCharacters }} characters
						</span>
					</div>
				</div>

				<div v-if="!getAccessToken">
					<button
						class="btn btn-primary"
						type="submit"
						:disabled="!isValidEmail || !isValidPassword || isLoginButtonClicked"
					>
						Login
						<div
							class="spinner-border spinner-border-sm"
							role="status"
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
			isLoginButtonClicked: false,
			emailRegex: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,}$'),
			minPasswordCharacters: 6,
		};
	},
	computed: {
		...mapGetters('authData', {
			error: 'getErrorMessage',
			getAccessToken: 'getAccessToken',
		}),
		email: {
			get() {
				return this.$store.state.authData.email;
			},
			set(value) {
				this.$store.commit('authData/UPDATE_EMAIL', value);
			},
		},
		password: {
			get() {
				return this.$store.state.authData.password;
			},
			set(value) {
				this.$store.commit('authData/UPDATE_PASSWORD', value);
			},
		},
		isValidEmail() {
			return this.emailRegex.test(this.email);
		},
		passwordContainsCapitalLetter() {
			return (new RegExp('[A-Z]+').test(this.password));
		},
		passwordContainsNumber() {
			return (new RegExp('[0-9]+').test(this.password));
		},
		passwordContainsSpecialLetter() {
			return (new RegExp('[!@#$%^&*]+').test(this.password));
		},
		passwordContainsMinCharacters() {
			return (this.password.length >= this.minPasswordCharacters);
		},
		isValidPassword() {
			return this.passwordContainsCapitalLetter
				&& this.passwordContainsNumber
				&& this.passwordContainsSpecialLetter
				&& this.passwordContainsMinCharacters;
		},
	},
	methods: {
		...mapActions('authData', {
			sendLoginInfo: 'sendLoginInfo',
		}),
		async onSubmitLogin() {
			this.isLoginSpinnerActive = true;
			this.isLoginButtonClicked = true;
			await this.sendLoginInfo();
			this.isLoginSpinnerActive = false;
			this.isLoginButtonClicked = false;
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