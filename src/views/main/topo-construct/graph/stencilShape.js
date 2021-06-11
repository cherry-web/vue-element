import './nodeData'

// 配置页面组件
export default class shapeModuleData {
  // graphData为引入此页面位置所传this
  static stencilShape(graphData) {
    const { graph } = graphData
    const virtualMachine = graph.createNode({
      shape: 'flowGroupNode',
      attrs: {
        text: {
          textWrap: {
            text: '虚拟机'
          }
        }
      },
      data: {
        parent: true
      }
    })
    const physicalMachine = graph.createNode({
      shape: 'flowGroupNode',
      attrs: {
        text: {
          textWrap: {
            text: '物理机'
          }
        }
      },
      data: {
        parent: true
      }
    })
    const busModule1 = graph.createNode({
      shape: 'flow-chart-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: '后管'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const busModule2 = graph.createNode({
      shape: 'flow-chart-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: '部署单元'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })

    const busModule3 = graph.createNode({
      shape: 'financ-gateway-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: '金融网关'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const busModule4 = graph.createNode({
      shape: 'flow-inside-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: 'Inside'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const busModule5 = graph.createNode({
      shape: 'file-transfer-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: '文件传输'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const busModule6 = graph.createNode({
      shape: 'config-center-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: '配置中心'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const basicModule1 = graph.createNode({
      shape: 'mysql-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: 'Mysql(垂直)'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const basicModule2 = graph.createNode({
      shape: 'mysql-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: 'Mysql(水平)'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const basicModule3 = graph.createNode({
      shape: 'redis-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: 'Redis'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const basicModule4 = graph.createNode({
      shape: 'f5-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: 'F5'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    const basicModule5 = graph.createNode({
      shape: 'firewall-image-rect',
      attrs: {
        text: {
          textWrap: {
            text: '防火墙'
          },
          fontSize: 12,
          refX: 50,
          refY: 17
        }
      }
    })
    graphData.stencil.load([virtualMachine, physicalMachine], 'runModule')
    graphData.stencil.load([busModule1, busModule2, busModule3, busModule4, busModule5, busModule6], 'businessModule')
    graphData.stencil.load([basicModule1, basicModule2, basicModule3, basicModule4, basicModule5], 'basicModule')
  }
}
