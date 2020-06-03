import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index';
import login from '../views/login.vue'
import dashboard from '../views/dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'home',
    component: login
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/'];
  //const acceptedPages = ['/login', '/',"/menu",'/records','/records_printing','/salaries','/hr'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.state.loggedIn;
  console.log("user" ,loggedIn )
  // trying to access a restricted page + not logged in
  // redirect to login page
  if ((authRequired && loggedIn == null)) {
    console.log("not authed")
    next({ name: 'home' });
  } else {
    console.log(" authed")

    next();
  }
});

export default router
