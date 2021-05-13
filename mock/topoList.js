const Mock = require('mockjs')

let status = Mock.mock({
  id: '@increment',
  "status|1": false
})

module.exports = [
  {
    url: '/vue-element-admin/topoList/isConnectEdge',
    type: 'get',
    response: config => {
      console.log(config.query)
      return {
        code: 20000,
        data: status
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
]

