import { createRouter, createWebHashHistory } from 'vue-router'
const { getCookie } = require('../utils/cookies')
import jwt from 'jsonwebtoken'
import Manage from '../components/Manage.vue'
import Home from '../components/Home.vue'
import Account from '../components/Account.vue'
import Files from '../components/Files.vue'
import CreateFile from '../components/CreateFile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage',
    beforeEnter: ( async (to, from, next) => {
      //check token
      const token = getCookie("accessToken")
      if(token){
        next('/users/')
      } else {
        next()
      }
    }),
    name: 'Manage',
    component: Manage
  },
  {
    path: '/users/',
    name: 'Account',
    component: Account,
    children: [
      {
        path: 'files',
        component: Files
      },
      {
        path: 'files/create',
        component: CreateFile
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router