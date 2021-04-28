import Layout from '@/layout'

const mainprocessRouter = {
    path: '/main',
    component: Layout,
    redirect: '/main/topological-list',
    children: [
        {
            path: 'topological-list',
            component: () => import('@/views/main/topological-list/topological-list.vue'),
            name: 'topologicalList',
            meta: { title: '拓扑列表',icon: 'table' }
        }
    ]
}
export default mainprocessRouter