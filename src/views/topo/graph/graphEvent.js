import extendBaseNode from './extendBaseNode'
import { FunctionExt } from '@antv/x6'
import { isConnectEdge } from '@/api/topoList'
import { Message } from 'element-ui'

export default class graphEvent {
  static graphEvent(graphData) {
    const { graph } = graphData
    // let nowNode = {}
    const container = document.getElementById('flowContainer')

    // 右键
    // graph.on('node:contextmenu', ({ cell, view }) => {
    //     const oldText = cell.attr('text/textWrap/text')
    //     const elem = view.container.querySelector('.x6-edit-text')
    //     if (elem == null) { return }
    //     cell.attr('text/style/display', 'none')
    //     if (elem) {
    //         elem.style.display = ''
    //         elem.contentEditable = 'true'
    //         elem.innerText = oldText
    //         elem.focus()
    //     }
    //     const onBlur = () => {
    //         cell.attr('text/textWrap/text', elem.innerText)
    //         cell.attr('text/style/display', '')
    //         elem.style.display = 'none'
    //         elem.contentEditable = 'false'
    //     }
    //     elem.addEventListener('blur', () => {
    //         onBlur()
    //         elem.removeEventListener('blur', onBlur)
    //     })
    // })
    // 鼠标移入
    graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => { // debounce防抖
        const ports = container.querySelectorAll(
          '.x6-port-body' // 链接桩类名
        )
        this.showPorts(ports, true)
      }),
      500
    )
    // 拖拽节点进入画布后可判断此节点是否可放入该区域
    graph.on('cell:change:children', ({ cell, key, current }) => {
      console.log('拖拽节点进入画布后可判断此节点是否可放入该区域')
      let parentNode = cell
      // 排除分组节点
      if (cell.prop('shape') === 'flowGroupNode') {
        parentNode = cell.getParent()
      }
      const nowNodeChild = parentNode.getChildren()
      const nowNode = nowNodeChild[nowNodeChild.length - 1]
      const parentNodeName = parentNode.attr('text/text')
      isConnectEdge().then((response) => {
        console.log(response.data.status)
        if (!response.data.status) {
          Message({
            message: '此节点不能放入' + parentNodeName,
            type: 'warning',
            duration: 5 * 1000
          })
          graph.removeNode(nowNode)
        }
      })
    })
    // 鼠标离开
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll(
        '.x6-port-body'
      )
      this.showPorts(ports, false)
    })
    // 节点折叠
    graph.on('node:collapse', ({ node, e }) => {
      e.stopPropagation()
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const cells = node.getDescendants()
      cells.forEach((n) => {
        if (collapsed) {
          n.hide()
        } else {
          n.show()
        }
      })
    })
    // 快捷键删除
    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })
    // 动态伸缩
    graph.on('node:change:size', ({ node, options }) => {
      if (options.skipParentHandler) {
        return
      }
      const children = node.getChildren()
      // if (node.prop('shape') == 'flowGroupNode') {
      //   node.prop('originSize', { width: 240, height: 240 })
      // } else {
      if (children && children.length) {
        node.prop('originSize', node.getSize())
      }
      // }
    })
    // 节点改变位置
    graph.on('node:change:position', ({ node, options }) => {
      if (options.skipParentHandler) {
        return
      }
      const children = node.getChildren()
      if (children && children.length) { // 如果有子节点
        node.prop('originPosition', node.getPosition()) // 记录移动后的x,y位置
      }
      extendBaseNode.extendNode(node, graphData)
    })
    // 边连接/取消连接
    graph.on('edge:connected', ({ isNew, edge }) => {
      console.log('边连接/取消连接')
      const listQuery = {
        page: 1,
        limit: 20,
        sort: '+id'
      }
      isConnectEdge(listQuery).then((response) => {
        if (!response.data.status) {
          Message({
            message: '这两个节点禁止连接',
            type: 'warning',
            duration: 5 * 1000
          })
          graph.removeEdge(edge)
        }
      })
    })
  }
  static showPorts(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
}
