<template>
	<div class="signup-form">
		<legend>Sign up</legend>
		<hr>
		<div class="login-link">
			Have an account?
			<router-link to="/">
				Sign-in
			</router-link>
			instead
		</div>

		<div class="mb-3">
			<label
				for="name"
				class="form-label"
			>
				Name*
			</label>
			<input
				type="text"
				class="form-control"
				v-model="fullNameAuthMixin"
			>
		</div>
		<div class="mb-3">
			<label
				for="name"
				class="form-label"
			>
				Email*
			</label>
			<input
				class="form-control"
				v-model="emailAuthMixin"
			>
			<div
				class="form-text"
				v-if="emailAuthMixin && !isValidEmailAuthMixin"
			>
				Invalid email.
			</div>
		</div>
		<div class="mb-3">
			<label
				for="name"
				class="form-label"
			>
				Password*
			</label>
			<input
				type="password"
				class="form-control"
				v-model="passwordAuthMixin"
			>
			<div
				class="form-text"
				v-if="passwordAuthMixin && !isValidPasswordAuthMixin"
			>
				Please include: <br>
				<span
					v-if="!passwordContainsCapitalLetterAuthMixin"
				>
					capital letter(s)
				</span>
				<span
					v-if="!passwordContainsNumberAuthMixin"
				>
					number(s)
				</span>
				<span
					v-if="!passwordContainsSpecialLetterAuthMixin"
				>
					special character(s)
				</span>
				<span
					v-if="!passwordContainsMinCharactersAuthMixin"
				>
					min length of
					{{ minPasswordCharactersAuthMixin }}
					characters
				</span>
				<br>
				<span
					v-if="!passwordContainsSpecialLetterAuthMixin"
				>
					special character(s): !@#$%^&*
				</span>
			</div>
		</div>
		<div class="mb-3">
			<label
				for="name"
				class="form-label"
			>
				Confirm Password*
			</label>
			<input
				type="password"
				class="form-control"
				v-model="reTypedPassWordAuthMixin"
			>
			<div
				class="form-text"
				v-if="passwordAuthMixin
					&& reTypedPassWordAuthMixin
					&& !IsPasswordConfirmedAuthMixin"
			>
				Passwords don't match
			</div>
		</div>
		<button
			class="btn btn-primary"
			type="submit"
			:disabled="!isValidSignupFormAuthMixin"
			@click="submitSignupAuthMixin"
		>
			Signup
			<div
				class="spinner-border spinner-border-sm"
				role="status"
				v-if="isSignupSpinnerActiveAuthMixin"
			/>
		</button>
	</div>
</template>

<script>
export default {
	name: 'AppSignup',
	data() {
		return {};
	},
};
</script>

<style scoped>
.signup-form {
  position: relative;
  margin: 1rem auto;
  padding:1rem;
  max-width: 50rem;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(41, 0, 60, 0.24);
}
@media screen and (min-width: 700px) {
  .signup-form .login-link {
	position: absolute;
	top: 1.4rem;
	right: 1.4rem;
	}
}
</style>