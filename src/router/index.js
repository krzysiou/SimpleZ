import { createRouter, createWebHashHistory } from 'vue-router'
const { getCookie } = require('../utils/cookies')
import jwt from 'jsonwebtoken'
import Manage from '../components/Manage.vue'
import Home from '../components/Home.vue'
import Account from '../components/Account.vue'
import CreateFile from '../components/CreateFile.vue'
import EditFile from '../components/EditFile.vue'
import DownloadFile from '../components/DownloadFile.vue'

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
        next('/users/'+jwt.decode(token).id)
      } else {
        next()
      }
    }),
    name: 'Manage',
    component: Manage
  },
  {
    path: '/users/:id',
    name: 'Account',
    component: Account,
  },
  {
    path: '/users/:id/files/create',
    name: 'CreateFile',
    component: CreateFile,
  },
  {
    path: '/users/:userId/files/edit/:fileId',
    name: 'EditFile',
    component: EditFile,
  },
  {
    path: '/users/:userId/files/download/:fileId',
    name: 'EditFile',
    component: DownloadFile,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router