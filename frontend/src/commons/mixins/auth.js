import { mapGetters, mapActions } from 'vuex';
export default {
	data() {
		return {
			isSignupSpinnerActiveAuthMixin: false,
			isSignupButtonClickedAuthMixin: false,
			isLoginSpinnerActiveAuthMixin: false,
			isLoginButtonClickedAuthMixin: false,
			emailRegexAuthMixin: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]{2,}$'),
			minPasswordCharactersAuthMixin: 6,
		};
	},
	computed: {
		...mapGetters('auth', {
			isLoggedInAuthMixin: 'isLoggedIn',
		}),
		fullNameAuthMixin: {
			get() {
				return this.$store.state.auth.fullName;
			},
			set(value) {
				this.$store.commit('auth/UPDATE_FULL_NAME', value);
			},
		},
		emailAuthMixin: {
			get() {
				return this.$store.state.auth.email;
			},
			set(value) {
				this.$store.commit('auth/UPDATE_EMAIL', value);
			},
		},
		passwordAuthMixin: {
			get() {
				return this.$store.state.auth.password;
			},
			set(value) {
				this.$store.commit('auth/UPDATE_PASSWORD', value);
			},
		},
		reTypedPassWordAuthMixin: {
			get() {
				return this.$store.state.auth.confirmedPassword;
			},
			set(value) {
				this.$store.commit('auth/UPDATE_CONFIRMED_PASSWORD', value);
			},
		},
		isValidEmailAuthMixin() {
			return this.emailRegexAuthMixin.test(this.emailAuthMixin);
		},
		passwordContainsCapitalLetterAuthMixin() {
			return (new RegExp('[A-Z]+').test(this.passwordAuthMixin));
		},
		passwordContainsNumberAuthMixin() {
			return (new RegExp('[0-9]+').test(this.passwordAuthMixin));
		},
		passwordContainsSpecialLetterAuthMixin() {
			return (new RegExp('[!@#$%^&*]+').test(this.passwordAuthMixin));
		},
		passwordContainsMinCharactersAuthMixin() {
			return (this.passwordAuthMixin.length >= this.minPasswordCharactersAuthMixin);
		},
		isValidPasswordAuthMixin() {
			return this.passwordContainsCapitalLetterAuthMixin
				&& this.passwordContainsNumberAuthMixin
				&& this.passwordContainsSpecialLetterAuthMixin
				&& this.passwordContainsMinCharactersAuthMixin;
		},
		IsPasswordConfirmedAuthMixin() {
			return this.passwordAuthMixin === this.reTypedPassWordAuthMixin;
		},
		isValidSignupFormAuthMixin() {
			return this.fullNameAuthMixin.length > 0
				&& this.isValidEmailAuthMixin
                && this.isValidPasswordAuthMixin
				&& this.IsPasswordConfirmedAuthMixin
                && !this.isSignupButtonClickedAuthMixin;
		},
		isValidLoginFormAuthMixin() {
			return this.isValidEmailAuthMixin
                && this.isValidPasswordAuthMixin
                && !this.isLoginButtonClickedAuthMixin
				&& !this.isLoggedInAuthMixin;
		},
	},
	methods: {
		...mapActions('auth', {
			sendSignupInfoAuthMixin: 'sendSignupInfo',
			sendLoginInfoAuthMixin: 'sendLoginInfo',
			sendLogOutInfoAuthMixin: 'sendLogOutInfo',
		}),
		async submitSignupAuthMixin() {
			this.isSignupSpinnerActiveAuthMixin = true;
			this.isSignupButtonClickedAuthMixin = true;
			await this.sendSignupInfoAuthMixin({ vm: this });
			this.isSignupSpinnerActiveAuthMixin = false;
			this.isSignupButtonClickedAuthMixin = false;
		},
		async submitLoginAuthMixin() {
			this.isLoginSpinnerActiveAuthMixin = true;
			this.isLoginButtonClickedAuthMixin = true;
			await this.sendLoginInfoAuthMixin({ vm: this });
			this.isLoginSpinnerActiveAuthMixin = false;
			this.isLoginButtonClickedAuthMixin = false;
		},
		async submitLogOutAuthMixin() {
			await this.sendLogOutInfoAuthMixin({ vm: this });
		},
	},
};