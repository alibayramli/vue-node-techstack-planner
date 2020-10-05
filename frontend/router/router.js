import { createRouter, createWebHistory } from 'vue-router';
import Hello from '../src/components/Hello.vue';
import TechStack from '../src/components/TechStack.vue';
export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			name: 'hello',
			path: '/hello',
			component: Hello,
		},
		{
			name: 'techstack',
			path: '/techstack',
			component: TechStack,
		},
	],
});