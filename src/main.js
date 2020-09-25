import { createApp } from 'vue';
import App from '../router/App.vue';
import { store } from '../store/index';
import { router } from '../router/router';
import './index.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');