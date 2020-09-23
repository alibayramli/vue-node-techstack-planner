import { createApp } from 'vue';
import App from '../router/App.vue';
import { store } from '../store/index.js';
import { router } from '../router/router.js';
import './index.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');