import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import { firebaseApp } from './firestore'
//firestore



firebaseApp.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

//////
Vue.use(BootstrapVue)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
