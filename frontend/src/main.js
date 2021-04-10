import { createApp } from 'vue';
import App from '../router/App.vue';
import { store } from '../store/index';
import { router } from '../router/router';
import caseConverter from './plugins/caseConverter';
import budgetValidator from './plugins/budgetValidator';
import authMixin from './mixins/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(caseConverter);
app.use(budgetValidator);
app.mixin(authMixin);
app.mount('#app');