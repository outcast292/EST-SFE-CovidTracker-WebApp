import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//firestore
import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAWggXGkEl_gANHMtwmDY0gA8d6hTlGi4s",
  authDomain: "covid-tracer-274905.firebaseapp.com",
  databaseURL: "https://covid-tracer-274905.firebaseio.com",
  projectId: "covid-tracer-274905",
  storageBucket: "covid-tracer-274905.appspot.com",
  messagingSenderId: "540405409258",
  appId: "1:540405409258:web:63d0610fbd21664a1efe93",
  measurementId: "G-JDB70DS6RQ"
};
//import {firestorePlugin} from 'vuefire'
//Vue.use(firestorePlugin)
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
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
