import Layout from '@/layout'

const refRouter = {
  path: '/ref',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/ref/index'),
      name: 'RefManger',
      meta: { title: '关联管理',icon:'el-icon-paperclip'}
    }
  ]
}
export default refRouter