import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scan',
      name: 'scan',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ScanView.vue'),
      props: true
    },
    {
      path: '/add/:barcode',
      name: 'addScanned',
      component: () => import('../views/AddScanned.vue'),
      props: true
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddView.vue')
    },
    {
      path: '/add/custom',
      name: 'addCustom',
      component: () => import('../views/AddCustom.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/UserSettings.vue')
    },
  ]
})

export default router
