import { createRouter, createWebHistory } from 'vue-router';
import { store } from '../store/index';
import Login from '../src/components/Login.vue';
import Signup from '../src/components/Signup.vue';
import Home from '../src/components/Home.vue';
import Form from '../src/components/Form.vue';
import TechStack from '../src/components/TechStack.vue';
import UserChoices from '../src/components/UserChoices.vue';
import ProgrammingLanguageDetails from '../src/components/ProgrammingLanguageDetails.vue';
import StartupDetails from '../src/components/StartupDetails.vue';
import BarChart from '../src/components/Charts/BarChart.vue';
import PieChart from '../src/components/Charts/PieChart.vue';
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
			component: ProgrammingLanguageDetails,
			meta: {
				requiresAuth: true,
			},
		},
		{
			name: 'userStartups',
			path: '/user-startups',
			component: UserChoices,
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