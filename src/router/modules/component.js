/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentRouter = {
  path: '/com',
  component: Layout,
  children: [
    {
      path: 'component',
      component: () => import('@/views/component/component'),
      name: 'Aicomponent',
      meta: { title: '组件管理',icon: 'table' }
    }
  ]
}
export default componentRouter