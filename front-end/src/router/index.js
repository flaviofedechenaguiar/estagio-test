import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginClient from '../views/LoginClient.vue'
import CreateClient from '../views/CreateClient.vue'
import EditClient from '../views/EditClient.vue'
import AdminLogin from '../views/AdminLogin.vue'
import AdminCreate from '../views/AdminCreate.vue'
import AdminPanel from '../views/AdminPanel.vue'
import AdminClientEdit from '../views/AdminClientEdit'


Vue.use(VueRouter)

let hasTokenAdmin = function (to, from, next) {
  let token = localStorage.getItem('token');
  if (token) {
    next();
  } else {
    router.push({ name: 'AdminLogin' });
  }
}

const routes = [
  {
    path: '/',
    name: 'LoginClient',
    component: LoginClient
  },
  {
    path: '/create',
    name: 'CreateClient',
    component: CreateClient
  }, {
    path: '/edit',
    name: 'EditClient',
    component: EditClient,
    beforeEnter: (to, from, next) => {
      let token = localStorage.getItem('token');
      if (token) {
        next();
      } else {
        router.push({ name: 'LoginClient' });
      }
    }
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/create',
    name: 'AdminCreate',
    component: AdminCreate
  },
  {
    path: '/admin/panel',
    name: 'AdminPanel',
    component: AdminPanel,
    beforeEnter: hasTokenAdmin
  },
  {
    path: '/admin/client/edit/:id',
    name: 'AdminClientEdit',
    component: AdminClientEdit,
    beforeEnter: hasTokenAdmin
  },
  // {
  //   path: '*',
  //   name: 'all',
  //   beforeEnter: () => {
  //     router.push({ name: 'LoginClient' });
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
