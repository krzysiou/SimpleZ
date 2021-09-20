import { createRouter, createWebHashHistory } from 'vue-router'
import Manage from '../components/Manage.vue'
import Home from '../components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

//comment