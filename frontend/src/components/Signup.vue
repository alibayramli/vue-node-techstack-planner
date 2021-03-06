<template>
	<div>
		<form class="signup-form" @submit.prevent="onSubmitSignup">
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
					<div v-if="isValidPassword" class="form-text">
						Good to go :)
					</div>
				</div>

				<div v-if="!getToken">
					<button
						class="btn btn-primary"
						type="submit"
						:disabled="
							!fullName || !isValidEmail || !isValidPassword || isSignupButtonClicked
						"
					>
						Signup
						<div
							class="spinner-border spinner-border-sm"
							role="status"
							v-if="isSignupSpinnerActive"
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
	name: 'Signup',
	data() {
		return {
			isSignupSpinnerActive: false,
			isSignupButtonClicked: false,
			emailRegex: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,}$'),
			minPasswordCharacters: 6,
		};
	},
	computed: {
		...mapGetters('userData', {
			error: 'getErrorMessage',
			getToken: 'getToken',
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
		...mapActions('userData', {
			sendSignupInfo: 'sendSignupInfo',
		}),
		async onSubmitSignup() {
			this.isSignupSpinnerActive = true;
			this.isSignupButtonClicked = true;
			await this.sendSignupInfo();
			this.isSignupSpinnerActive = false;
			this.isSignupButtonClicked = false;
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