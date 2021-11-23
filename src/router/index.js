import Vue from 'vue'
import Router from 'vue-router'
import Table1 from '@/components/table1'
import Table2 from '@/components/table2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'table2',
      component: Table2
    }
  ]
})
