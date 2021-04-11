import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store/index';
import Signup from '../views/AppSignup.vue';
import Login from '../views/AppLogin.vue';
import Home from '../views/AppHome.vue';
import Form from '../views/AppForm.vue';
import TechStack from '../views/TechStack.vue';
import UserStartups from '../views/UserStartups.vue';
import ProgLangInfoDetails from '../commons/components/ProgLangInfoDetails.vue';
import StartupDetails from '../commons/components/StartupDetails.vue';
import BarChart from '../commons/components/BarChart.vue';
import PieChart from '../commons/components/PieChart.vue';
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
			name: 'prog-lang',
			path: '/prog-lang/:id',
			props: true,
			component: ProgLangInfoDetails,
			meta: {
				requiresAuth: true,
			},
		},
		{
			name: 'userStartups',
			path: '/user-startups',
			component: UserStartups,
			meta: {
				requiresAuth: true,
			},
		},
		{
			name: 'startup',
			path: '/startup/:id',
			props: true,
			component: StartupDetails,
			meta: {
				requiresAuth: true,
			},
		},
		{
			name: 'barchart',
			path: '/barchart/:type',
			props: true,
			component: BarChart,
		},
		{
			name: 'piechart',
			path: '/piechart/:type',
			props: true,
			component: PieChart,
			meta: {
				requiresAuth: true,
			},
		},
	],
});
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.getters['authData/isLoggedIn']) {
			next();
			return;
		}
		next('/home');
	} else if (to.matched.some(record => record.meta.guest)) {
		if (store.getters['authData/isLoggedIn']) {
			next('/home');
			return;
		}
		next();
	} else {
		next();
	}
});
export default router;