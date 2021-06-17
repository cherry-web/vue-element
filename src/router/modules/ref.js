import Layout from '@/layout'

const refRouter = {
  path: '/ref',
  component: Layout,
  redirect: '/ref/index',
  name:'Ref',
  meta:{
    title:'关联管理',
    icon:'el-icon-paperclip'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/ref/index'),
      name: 'refManger',
      meta: { title: '关联管理'}
    }
  ]
}
export default refRouter