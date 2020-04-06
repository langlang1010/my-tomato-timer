import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Main from '@/pages/Main.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Main',
      component: Main,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    }
  ]
})