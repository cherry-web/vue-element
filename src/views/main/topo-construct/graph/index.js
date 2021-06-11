import { Graph, Addon, Shape } from '@antv/x6'
import './nodeData'
// import graphData from './edgeData'
import svgData from './svgData'
import stencilShape from './stencilShape'
import graphEvent from './graphEvent'
import insertCss from 'insert-css'

export default class FlowGraph {
  // public static graph: Graph
  // private static stencil: Addon.Stencil

  static init() {
    this.graph = new Graph({
      container: document.getElementById('flowContainer'),
      width: 1300,
      height: 800,
      interacting: function(cellView) {
        if (cellView.cell.id === 'mainMachineRoom') {
          return { nodeMovable: false }
        }
        if (cellView.cell.id === 'OAArea') {
          return { nodeMovable: false }
        }
        if (cellView.cell.id === 'coreArea') {
          return { nodeMovable: false }
        }
        if (cellView.cell.id === 'DMZArea') {
          return { nodeMovable: false }
        }
        if (cellView.cell.id === 'publicNetArea') {
          return { nodeMovable: false }
        }
        if (cellView.cell.id === 'lineArea') {
          return { nodeMovable: false }
        }
        return true
      },
      grid: {
        size: 10,
        visible: true, // 绘制网格，默认绘制 dot 类型网格，此处设置为doubleMesh类型网格
        // type: 'doubleMesh', // 设置网格样式
        args: [
          {
            color: '#cccccc', // 主网格线颜色
            thickness: 1 // 主网格线宽度
          }
          // {
          //   color: '#5F95FF',
          //   thickness: 1,
          //   factor: 4  // 主次网格线间隔
          // }
        ]
      },
      // 限制子节点自由
      translating: {
        restrict(view) {
          const cell = view.cell
          if (cell.isNode()) {
            const parent = cell.getParent()
            if (parent && (parent.prop('shape') === 'flowGroupNode')) {
              return parent.getBBox()
            }
          }
          return null
        }
      },
      // 画布调整
      scroller: {
        enabled: true, // 是否配置画布滚动等效果
        pannable: true // 是否启用画布平移能力（在空白位置按下鼠标后拖动平移画布）
      },
      mousewheel: {
        enabled: true, // 是否开启滚轮缩放交互
        modifiers: ['ctrl', 'meta'], // 修饰键('alt'、'ctrl'、'meta'、'shift')，设置修饰键后需要按下修饰键并滚动鼠标滚轮时才触发画布缩放
        minScale: 0.6, // 最小的缩放级别
        maxScale: 1.8 // 最大的缩放级别
      },
      autoResize: true,
      panning: {
        enabled: true,
        modifiers: 'shift'
      },
      // 画布调整
      selecting: {
        enabled: false,
        multiple: true, // 是否启用点击多选
        rubberband: true, // 是否启用框选
        movable: false, // 选中的节点是否可以被移动
        showNodeSelectionBox: true, // 是否显示节点的选择框
        showEdgeSelectionBox: true // 是否显示边的选择框
      },
      // 配置全局的连线规则
      connecting: {
        anchor: 'center', // 当连接到节点时，通过 anchor 来指定被连接的节点的锚点
        connectionPoint: 'anchor', // 指定连接点，默认值为 boundary
        allowBlank: false, // 是否允许连接到画布空白位置的点
        highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点
        snap: { // 连线的过程中距离节点或者连接桩 50px 时会触发自动吸附
          radius: 50
        }, // 可以通过配置 radius 属性自定义触发吸附的距离
        createEdge() { // 连接的过程中创建新的边
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: 'black',
                targetMarker: 'classic',
                strokeDasharray: '0'
              }
            },
            connector: {
              name: 'rounded'
            },
            router: {
              // 曼哈顿路由 'manhattan' 路由是正交路由 'orth' 的智能版本，该路由由水平或垂直的正交线段组成，并自动避开路径上的其他节点（障碍）
              name: 'manhattan'
            },
            zIndex: 1
          })
        },
        // 判断连接是否有效
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet
        }) {
          if (sourceView === targetView) {
            return false
          }
          if (!sourceMagnet) {
            return false
          }
          if (!targetMagnet) {
            return false
          }
          return true
        }
      },
      highlighting: {
        // 当链接桩可以被链接时，在链接桩外围渲染一个 4px 宽的rgba(223,234,255)色矩形框
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)'
            }
          }
        }
      },
      snapline: false, // 对齐线是移动节点排版的辅助工具
      history: true, // 配置开启画布撤销/重做能力
      clipboard: { // 剪切板
        enabled: true
      },
      keyboard: { // 键盘快捷键
        enabled: true
      },
      embedding: { // 将一个节点拖动到另一个节点中，使其成为另一节点的子节点
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox() // 返回容器渲染到画布后的包围盒
          return this.getNodes().filter((node) => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData()
            if (data && data.parent) {
              const targetBBox = node.getBBox()
              return bbox.isIntersectWithRect(targetBBox)
            }
            return false
          })
        }
      }
    })
    this.initStencil()
    this.initShape()
    this.initGraphShape()
    this.initEvent()
    return this.graph
  }
  // 侧边栏的 UI 组件，并支持分组、折叠、搜索等能力
  static initStencil() {
    this.stencil = new Addon.Stencil({
      title: '组件搜索', // 标题
      target: this.graph, // 目标画布
      search: (cell, keyword) => {
        if (keyword) {
          return cell.attr('text/textWrap/text').includes(keyword)
        }
        return true
      },
      stencilGraphWidth: 280, // 模板画布宽度
      collapsable: false, // 分组是否可折叠
      groups: [
        {
          name: 'runModule',
          title: '运行组件库',
          layoutOptions: {
            columns: 1,
            marginX: 60
          },
          graphHeight: 260
        },
        {
          name: 'businessModule',
          title: '业务组件库',
          graphHeight: 260
        },
        {
          name: 'basicModule',
          title: '基础组件库',
          graphHeight: 260
        }
      ]
    })
    // 渲染在页面左侧工具栏中
    const stencilContainer = document.querySelector('#flowStencil')
    stencilContainer.appendChild(this.stencil.container)
  }
  // 描绘节点
  static initShape() {
    stencilShape.stencilShape(this)
  }
  // 描绘背景节点
  static initGraphShape() {
    this.graph.fromJSON(svgData)
  }

  static initEvent() {
    graphEvent.graphEvent(this)
  }
  static mainChange() {
    
  }
  // 销毁
  static destroy() {
    this.graph.dispose()
  }
}
insertCss(`
  @keyframes ant-line {
    to {
        stroke-dashoffset: -1000
    }
  }
`)
