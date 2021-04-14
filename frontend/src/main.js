import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store/index';
import { router } from './router/index';
import Toaster from '@meforma/vue-toaster';
import caseConverter from './plugins/caseConverter';
import budgetValidator from './plugins/budgetValidator';
import authMixin from './commons/mixins/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Toaster);
app.use(caseConverter);
app.use(budgetValidator);
app.mixin(authMixin);
app.mount('#app');