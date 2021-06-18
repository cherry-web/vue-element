import request from '@/utils/request'

export function fetchListCom(query) {
  return request({
    url: '/vue-element-admin/component/list',
    method: 'get',
    params: query
  })
}

export function fetchArticleCom(id) {
  return request({
    url: '/vue-element-admin/component/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPvCom(pv) {
  return request({
    url: '/vue-element-admin/component/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticleCom(data) {
  return request({
    url: '/vue-element-admin/component/create',
    method: 'post',
    data
  })
}

export function updateArticleCom(data) {
  return request({
    url: '/vue-element-admin/component/update',
    method: 'post',
    data
  })
}
