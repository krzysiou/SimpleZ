import { createRouter, createWebHashHistory } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import Register from '../components/Register.vue'

const routes = [
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
