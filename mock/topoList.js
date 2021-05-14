const Mock = require('mockjs')

let status = Mock.mock({
  id: '@increment',
  "status|1": true
})

const placeInfo = {
  OAArea:['后管','部署单元','文件传输'],
  coreArea:['后管','部署单元','文件传输'],
  DMZArea:['后管','部署单元','文件传输'],
  publicNetArea:['后管','部署单元','文件传输'],
  lineArea:['后管','部署单元','文件传输']
}

const edgeInfo = {
  '后管':['部署单元','文件传输'],
  '部署单元':['文件传输'],
  '文件传输':['后管']
}

module.exports = [
  {
    url: '/vue-element-admin/topoList/isConnectEdge',
    type: 'get',
    response: config => {
      const source = config.query.source
      const current = config.query.current
      const aaa = edgeInfo[source].indexOf(current)
      return {
        code: 20000,
        info: aaa
      }
    }
  },

  {
    url: '/vue-element-admin/topoList/getGraphData',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/topoList/postGraphData',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/topoList/verifyPlace',
    type: 'get',
    response: config => {
      const parentInfo = config.query.parent
      const childrenInfo = config.query.children
      const num = placeInfo[parentInfo].indexOf(childrenInfo)
      return {
        code: 20000,
        info:num
      }
    }
  }
]

