import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firestore'
const login = () => import(/* webpackChunkName: "home" */ '@/views/login.vue');
const dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard.vue');
Vue.use(VueRouter)


const routes = [
  {
    path: '*',
    redirect: "/dashboard"
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
    component: dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router
