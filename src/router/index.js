import Vue from 'vue'
import Router from 'vue-router'
import Table1 from '@/components/table1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table1',
      component: Table1
    }
  ]
})
