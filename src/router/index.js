import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login.vue'
import Main from '@/pages/Main.vue'
import global_msg from '../global.js'   //注意文件路径，实际路径以项目目录结构为准
Vue.prototype.$global_msg = global_msg;
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