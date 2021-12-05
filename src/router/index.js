import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main.vue'
import Login from '@/components/login.vue'
import Table1 from '@/components/table1'
import Table2 from '@/components/table2'
import Table3 from '@/components/table3'
import Table4 from '@/components/table4'
import Empty from '@/components/empty'
import UserList from '@/components/user-list'
import DataList from '@/components/data-list'
import AddUser from '@/components/add-user'
// import Table5 from '@/components/table5'
// import Table6 from '@/components/table6'
// import Table7 from '@/components/table7'
// import Table8 from '@/components/table8'
// import Table9 from '@/components/table9'
import TableOut from '@/components/table-out'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [{
        path: '/',
        name: 'empty',
        component: Empty
      },{
        path: '/table1',
        name: 'table1',
        component: Table1
      }, {
        path: '/table2',
        name: 'table2',
        component: Table2
      }, {
        path: '/table3',
        name: 'table3',
        component: Table3
      }, {
        path: '/table4',
        name: 'table4',
        component: Table4
      }, {
        path: '/table-out',
        name: 'table-out',
        component: TableOut
      },{
        path: '/user-list',
        name: 'user-list',
        component: UserList
      },{
        path: '/add-user',
        name: 'add-user',
        component: AddUser
      },{
        path: '/data-list',
        name: 'data-list',
        component: DataList
      }]
    },
    // {
    //   path: '/table1',
    //   name: 'table1',
    //   component: Table1
    // },
    // {
    //   path: '/table2',
    //   name: 'table2',
    //   component: Table2
    // },
    // {
    //   path: '/table3',
    //   name: 'table3',
    //   component: Table3
    // },
    // {
    //   path: '/table4',
    //   name: 'table4',
    //   component: Table4
    // },
    // {
    //   path: '/table5',
    //   name: 'table5',
    //   component: Table5
    // },
    // {
    //   path: '/table6',
    //   name: 'table6',
    //   component: Table6
    // },
    // {
    //   path: '/table7',
    //   name: 'table7',
    //   component: Table7
    // },
    // {
    //   path: '/table8',
    //   name: 'table8',
    //   component: Table8
    // },
    // {
    //   path: '/table9',
    //   name: 'table9',
    //   component: Table9
    // },
    // {
    //   path: '/table-out',
    //   name: 'table-out',
    //   component: TableOut
    // },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
