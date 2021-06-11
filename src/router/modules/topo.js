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
      meta: { title: '拓扑构建',icon: 'table' }
    }
  ]
}
export default topoRouter