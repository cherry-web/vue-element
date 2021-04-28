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
                    textWrap:{
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
                    textWrap:{
                        text: '物理机'
                    }
                }
            },
            data: {
                parent: true
            }
        })
        const busModule1 = graph.createNode({
            shape: 'basic-chart-rect',
            attrs: {
                text: {
                    textWrap: {
                        text: '文件传输'
                    }
                }
            }
        })
        const busModule2 = graph.createNode({
            shape: 'basic-chart-rect',
            attrs: {
                text: {
                    textWrap: {
                        text: '配置中心'
                    }
                }
            }
        })

        const busModule3 = graph.createNode({
            shape: 'basic-chart-rect',
            attrs: {
                text: {
                    textWrap: {
                        text: '金融网关'
                    }
                }
            }
        })
        const busModule4 = graph.createNode({
            shape: 'basic-chart-rect',
            attrs: {
                text: {
                    textWrap: {
                        text: 'Inside'
                    }
                }
            }
        })
        const basicModule1 = graph.createNode({
            shape: 'basic-chart-rect',
            attrs: {
                text: {
                    textWrap: {
                        text: 'Mysql(垂直)'
                    }
                }
            }
        })
        const basicModule2 = graph.createNode({
            shape: 'basic-chart-rect',
            attrs: {
                text: {
                    textWrap: {
                        text: 'Mysql(水平)'
                    }
                }
            }
        })
        const basicModule3 = graph.createNode({
            shape: 'basic-chart-rect',
            attrs: {
                text: {
                    textWrap: {
                        text: 'Redis'
                    }
                }
            }
        })
        graphData.stencil.load([virtualMachine, physicalMachine], 'runModule')
        graphData.stencil.load([busModule1, busModule2, busModule3, busModule4], 'businessModule')
        graphData.stencil.load([basicModule1, basicModule2, basicModule3], 'basicModule')
    }
}