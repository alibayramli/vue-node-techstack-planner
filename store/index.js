import { createStore } from 'vuex';
import userData from './userData';
export  const store = createStore({
  modules: {
    userData,
  }
})