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
					<li class="nav-item" v-if="isLoggedInAuthMixin">
						<router-link class="nav-link" to="/form"> Form </router-link>
					</li>
					<li class="nav-item" v-if="isLoggedInAuthMixin">
						<router-link class="nav-link" to="/techstack">
							Tech Stack
						</router-link>
					</li>
					<li class="nav-item" v-if="isLoggedInAuthMixin">
						<router-link class="nav-link" to="/user-startups">
							Your Startups
						</router-link>
					</li>
				</ul>
				<ul class="d-flex navbar-nav mb-2 mb-lg-0">
					<li class="nav-item" v-if="!isLoggedInAuthMixin">
						<router-link class="nav-link" to="/">
							Login
						</router-link>
					</li>
					<li class="nav-item" v-if="!isLoggedInAuthMixin">
						<router-link class="nav-link" to="/signup">
							Signup
						</router-link>
					</li>
					<li class="nav-item" v-if="isLoggedInAuthMixin">
						<a class="nav-link" style="cursor:pointer">
							{{ fullNameAuthMixin }}
						</a>
					</li>
					<li class="nav-item" v-if="isLoggedInAuthMixin">
						<a class="nav-link" style="cursor:pointer" @click="showModal">
							Logout
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<Modal
		v-if="isModalVisible"
		@closed="closeModal"
		@approved="submitLogOutAuthMixin"
	>
		<template #header>
			Log out
		</template>

		<template #body>
			Are you sure you want to log out?
		</template>
	</Modal>
</template>

<script>
import Modal from './AppModal.vue';
export default {
	name: 'TheNavbar',
	components: {
		Modal,
	},
	data() {
		return {
			isModalVisible: false,
		};
	},
	methods: {
		showModal() {
			this.isModalVisible = true;
		},
		closeModal() {
			this.isModalVisible = false;
		},
	},
};
</script>

<style scoped>

</style>