import request from '@/utils/request'

export function topologicalList(query) {
  return request({
    url: '/vue-element-admin/topological-list/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/topological-list/detail',
    method: 'get',
    params: { id }
  })
}

export function topologicalPv(pv) {
  return request({
    url: '/vue-element-admin/topological-list/pv',
    method: 'get',
    params: { pv }
  })
}

export function topologicalCreate(data) {
  return request({
    url: '/vue-element-admin/topological-list/create',
    method: 'post',
    data
  })
}

export function topologicalUpdate(data) {
  return request({
    url: '/vue-element-admin/topological-list/update',
    method: 'post',
    data
  })
}
