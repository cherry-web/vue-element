import request from '@/utils/request'

export function getRefList(query) {
  return request({
    url: '/vue-element-admin/ref/list',
    method: 'get',
    params: query
  })
}

export function getRefDetail(id) {
  return request({
    url: '/vue-element-admin/ref/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/ref/pv',
    method: 'get',
    params: { pv }
  })
}

export function createRef(data) {
  return request({
    url: '/vue-element-admin/ref/create',
    method: 'post',
    data
  })
}

export function updateRef(data) {
  return request({
    url: '/vue-element-admin/ref/update',
    method: 'post',
    data
  })
}
