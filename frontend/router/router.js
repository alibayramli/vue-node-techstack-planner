import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store/index';
import Home from '../src/components/Home.vue';
import Form from '../src/components/Form.vue';
import TechStack from '../src/components/TechStack.vue';
import UserChoices from '../src/components/UserChoices.vue';
import Login from '../src/components/Login.vue';
import Signup from '../src/components/Signup.vue';
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'login',
			path: '/',
			component: Login,
			meta: {
				guest: true,
			},
		},
		{
			name: 'signup',
			path: '/signup',
			component: Signup,
			meta: {
				guest: true,
			},
		},
		{
			name: 'home',
			path: '/home',
			component: Home,
		},
		{
			name: 'form',
			path: '/form',
			component: Form,
			meta: {
				requiresAuth: true,
			},
		},
		{
			name: 'techstack',
			path: '/techstack',
			component: TechStack,
			meta: {
				requiresAuth: true,
			},
		},
		{
			name: 'choices',
			path: '/choices',
			component: UserChoices,
			meta: {
				requiresAuth: true,
			},
		},
	],
});
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters['userData/isLoggedIn']) {
			next();
			return;
		}
		next('/home');
	} else if (to.matched.some(record => record.meta.guest)) {
		if (store.getters['userData/isLoggedIn']) {
			next('/home');
			return;
		}
		next();
	} else {
		next();
	}
});
export default router;