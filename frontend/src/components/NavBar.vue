<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Tech Stack Planner</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link" to="/home"> Home </router-link>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<router-link class="nav-link" to="/form"> Form </router-link>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<router-link class="nav-link" to="/techstack">
							Tech Stack
						</router-link>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<router-link class="nav-link" to="/user-startups">
							Your Startups
						</router-link>
					</li>
				</ul>
				<ul class="d-flex navbar-nav mb-2 mb-lg-0">
					<li class="nav-item" v-if="!isLoggedIn">
						<router-link class="nav-link" to="/">
							Login
						</router-link>
					</li>
					<li class="nav-item" v-if="!isLoggedIn">
						<router-link class="nav-link" to="/signup">
							Signup
						</router-link>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<a class="nav-link" style="cursor:pointer">
							{{ fullName }}
						</a>
					</li>
					<li class="nav-item" v-if="isLoggedIn">
						<a class="nav-link" style="cursor:pointer" @click="modal.show()">
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<div class="modal fade" ref="logoutModal" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="logoutModalLabel">Modal title</h5>
					<button type="button" class="btn-close" @click="modal.hide()" aria-label="Close" />
				</div>
				<div class="modal-body">
					Are you sure to log out?
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" @click="modal.hide()">No</button>
					<button type="button" class="btn btn-danger" @click="logout()">Yes</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Modal } from 'bootstrap';

export default {
	name: 'NavBar',
	data() {
		return {
			modal: null,
		};
	},
	computed: {
		...mapGetters('authData', {
			isLoggedIn: 'isLoggedIn',
			fullName: 'getFullName',
		}),
	},
	mounted() {
		this.modal = new Modal(this.$refs.logoutModal);
	},
	methods: {
		...mapActions('authData', {
			sendLogOutInfo: 'sendLogOutInfo',
		}),
		async logout() {
			await this.sendLogOutInfo();
		},
	},
};
</script>

<style scoped>

</style>