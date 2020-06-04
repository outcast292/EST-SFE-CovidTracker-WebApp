import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import(/* webpackChunkName: "home" */ '@/views/login.vue');
const dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue');
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
    component: dashboard,



  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
