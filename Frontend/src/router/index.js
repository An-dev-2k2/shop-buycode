import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/source-code',
      name: 'source-code',
      component: () => import('../views/SourceCode.vue')
    },
    {
      path: '/product/:slug',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: () => import('../views/Wallet.vue')
    }
  ],
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    return { left: 0, top: 0, behavior: "smooth" }; // Luôn cuộn lên đầu
  }
})

export default router
