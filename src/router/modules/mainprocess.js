import Layout from '@/layout'

const mainprocessRouter = {
    path: '/main',
    component: Layout,
    redirect: '/main/topological-list',
    meta:{
      title:'主流程',
      icon:'el-icon-menu'
    },
    children: [
        {
            path: 'application-list',
            component: () => import('@/views/main/application-list/application-list.vue'),
            name: 'applicationList',
            meta: { title: '应用列表'}
        },
        {
            path: 'topological-list',
            component: () => import('@/views/main/topological-list/topological-list.vue'),
            name: 'topologicalList',
            meta: { title: '拓扑列表'}
        },
        {
            path: 'topo-add',
            component: () => import('@/views/main/topo-add.vue'),
            name: 'topoAdd',
            meta: { title: '拓扑新建'}
        },
        {
            path: 'topo-construct',
            component: () => import('@/views/main/topo-construct/index.vue'),
            name: 'topoConstruct',
            meta: { title: '拓扑构建(首次)'}
        },
        {
            path: 'topo-info',
            component: () => import('@/views/main/topo-info'),
            name: 'topoInfo',
            meta: { title: '拓扑部署信息填写'}
        },
        {
            path: 'topo-submit',
            component: () => import('@/views/main/topo-submit'),
            name: 'topoSubmit',
            meta: { title: '拓扑部署表单提交'}
        },
    ]
}
export default mainprocessRouter