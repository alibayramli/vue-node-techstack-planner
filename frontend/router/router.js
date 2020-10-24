import { createRouter, createWebHistory } from 'vue-router';
import Hello from '../src/components/Form.vue';
import TechStack from '../src/components/TechStack.vue';
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'hello',
			path: '/form',
			component: Hello,
		},
		{
			name: 'techstack',
			path: '/techstack',
			component: TechStack,
		},
	],
});