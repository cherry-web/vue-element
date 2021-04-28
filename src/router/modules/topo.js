/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const topoRouter = {
  path: '/topo',
  component: Layout,
  redirect: '/topo/index',
  children: [
    {
      path: 'topo',
      component: () => import('@/views/topo/index'),
      name: 'Topo',
      meta: { title: '拓扑管理',icon: 'table' }
    }
  ]
}
export default topoRouter