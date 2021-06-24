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
            name: 'ApplicationList',
            meta: { title: '应用列表'}
        },
        {
            path: 'topological-list',
            component: () => import('@/views/main/topological-list/topological-list.vue'),
            name: 'TopologicalList',
            meta: { title: '拓扑列表'}
        },
        {
            path: 'topo-add',
            component: () => import('@/views/main/topo-add.vue'),
            name: 'TopoAdd',
            meta: { title: '拓扑新建'}
        },
        {
            path: 'topo-construct',
            component: () => import('@/views/main/topo-construct/index.vue'),
            name: 'TopoConstruct',
            meta: { title: '拓扑构建(首次)'}
        },
        {
            path: 'topo-info',
            component: () => import('@/views/main/topo-info'),
            name: 'TopoInfo',
            meta: { title: '拓扑部署信息填写'}
        },
        {
            path: 'topo-submit',
            component: () => import('@/views/main/topo-submit'),
            name: 'TopoSubmit',
            meta: { title: '拓扑部署表单提交'}
        },
    ]
}
export default mainprocessRouter