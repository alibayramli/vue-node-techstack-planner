import { createRouter, createWebHistory } from 'vue-router';
import Home from '../src/components/Home.vue';
import Form from '../src/components/Form.vue';
import TechStack from '../src/components/TechStack.vue';
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'home',
			path: '/',
			component: Home,
		},
		{
			name: 'form',
			path: '/form',
			component: Form,
		},
		{
			name: 'techstack',
			path: '/techstack',
			component: TechStack,
		},
	],
});
export default router;