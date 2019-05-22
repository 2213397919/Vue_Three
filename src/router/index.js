import Vue from 'vue'
import Router from 'vue-router'
import Test from '@/views/Test'
import Ceshi from '@/views/Ceshi'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/ceshi',
      name: 'Ceshi',
      component: Ceshi
    }
  ]
})
