import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Calendar from 'v-calendar/lib/components/calendar.umd'

import { auth } from './firestore'
//firestore



auth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

//////
Vue.use(BootstrapVue)
Vue.component('calendar', Calendar)

Vue.config.productionTip = false

let app

auth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

