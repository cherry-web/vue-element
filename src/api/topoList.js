import request from '@/utils/request'

// 边是否能连接
export function isConnectEdge(query) {
  return request({
    url: '/vue-element-admin/topoList/isConnectEdge',
    method: 'get',
    params: query
  })
}
// 获取画布graph数据
export function fetchArticleCom(id) {
  return request({
    url: '/vue-element-admin/topoList/getGraphData',
    method: 'get',
    params: { id }
  })
}

// 存储画布graph数据
export function createArticleCom(data) {
  return request({
    url: '/vue-element-admin/topoList/postGraphData',
    method: 'post',
    data
  })
}

// 判断节点是否可以放在该区域
export function verifyPlace(query) {
  return request({
    url: '/vue-element-admin/topoList/verifyPlace',
    method: 'get',
    params: query
  })
}
