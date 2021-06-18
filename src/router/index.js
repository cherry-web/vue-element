import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)


import mainprocessRouter from './modules/mainprocess'

export const constantRoutes = [
    {
      path: '/redirect',
      component: Layout,
      hidden: true,
      children: [
        {
          path: '/redirect/:path(.*)',
          component: () => import('@/views/redirect/index')
        }
      ]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/component',
      children: [
        {
          path: 'component',
          component: () => import('@/views/component/component'),
          name: 'Aicomponent',
          meta: { title: '组件管理', icon: 'aicomponent', affix: true }
        }
      ]
    },
    // {
    //   path: '/contChar',
    //   name: 'contChar',
    //   component: contChar
    // },{
    //   path: '/thouSeparator',
    //   name: 'thouSeparator',
    //   component: thousandthSeparator
    // },{
    //   path:'/trimFun',
    //   name: 'trimFun',
    //   component: trimFun
    // },{
    //   path:'/parseUrlParam',
    //   name: 'parseUrlParam',
    //   component: parseUrlParam
    // },{
    //   path:'/funCach',
    //   name: 'funCach',
    //   component: funCach
    // },{
    //   path:'/handwrite',
    //   name: 'handwrite',
    //   component: handwrite
    // },{
    //   path:'/realizAdd',
    //   name: 'realizAdd',
    //   component: realizAdd
    // },{
    //   path:'/shakeThrottle',
    //   name: 'shakeThrottle',
    //   component: shakeThrottle
    // },{
    //   path:'/deepCopy',
    //   name: 'deepCopy',
    //   component: deepCopy
    // },{
    //   path:'/arrHeavy',
    //   name: 'arrHeavy',
    //   component: arrHeavy
    // },{
    //   path:'/arrRandom',
    //   name: 'arrRandom',
    //   component: arrRandom
    // },{
    //   path:'/fibonacci',
    //   name: 'fibonacci',
    //   component: fibonacci
    // },{
    //   path:'/strMultiply',
    //   name: 'strMultiply',
    //   component: strMultiply
    // },
    mainprocessRouter
  ]

  export const asyncRoutes = [
    // tableRouter,
    // {
    //   path: '/tab',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/tab/index'),
    //       name: 'Tab',
    //       meta: { title: 'Tab', icon: 'tab' }
    //     }
    //   ]
    // },
    { path: '*', redirect: '/404', hidden: true }
  ]

  const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

  const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
