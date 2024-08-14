import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/campingMain',
    component: () => import('../views/CampingMainView.vue')
  },
  {
    path: '/login',
    component: () => import('../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router  // 여기에서 default로 내보냅니다

