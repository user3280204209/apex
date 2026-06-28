import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/ProductView.vue'),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/MineView.vue'),
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/MessageView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
