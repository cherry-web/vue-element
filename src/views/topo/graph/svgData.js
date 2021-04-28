// import graphData from './edgeData'
const svgData = {
    cells: [
        {
            // 主机房
            id: 'mainMachineRoom',
            position: {
                x: 20,
                y: 20
            },
            size: {
                width: 1170,
                height: 640
            },
            attrs: {
                label: { refY: 10 },
                text: {
                    text: '主机房'
                }
            },
            shape: 'rect',
            zIndex: 1,
            data: {
                fixPos: true,
                parent: false
            },
            movable: 'true' // 判断是否为基础节点
        }, {
            // oa区
            id: 'OAArea',
            position: {
                x: 40,
                y: 40
            },
            size: {
                width: 200,
                height: 600
            },
            attrs: {
                label: {
                    refY: 10
                },
                text: {
                    text: 'OA区'
                }
            },
            shape: 'rect',
            zIndex: 1,
            data: {
                fixPos: true,
                parent: true
            },
            movable: 'true' // 判断是否为基础节点
        }, {
            // 核心区
            id: 'coreArea',
            position: {
                x: 250,
                y: 40
            },
            size: {
                width: 500,
                height: 600
            },
            attrs: {
                label: {
                    refY: 10
                },
                text: {
                    text: '核心区'
                }
            },
            shape: 'rect',
            zIndex: 1,
            data: {
                fixPos: true,
                parent: true
            },
            movable: 'true' // 判断是否为基础节点
        }, {
            // DMZ
            id: 'DMZArea',
            position: {
                x: 760,
                y: 40
            },
            size: {
                width: 200,
                height: 600
            },
            attrs: {
                label: {
                    refY: 10
                },
                text: {
                    text: 'DMZ区'
                }
            },
            shape: 'rect',
            zIndex: 1,
            data: {
                fixPos: true,
                parent: true
            },
            movable: 'true' // 判断是否为基础节点
        }, {
            // 公网区
            id: 'publicNetArea',
            position: {
                x: 970,
                y: 40
            },
            size: {
                width: 200,
                height: 295
            },
            attrs: {
                label: {
                    refY: 10
                },
                text: {
                    text: '公网区'
                }
            },
            shape: 'rect',
            zIndex: 1,
            data: {
                fixPos: true,
                parent: true
            },
            movable: 'true' // 判断是否为基础节点
        }, {
            // 专线区
            id: 'lineArea',
            position: {
                x: 970,
                y: 345
            },
            size: {
                width: 200,
                height: 295
            },
            attrs: {
                label: {
                    refY: 10
                },
                text: {
                    text: '专线区'
                }
            },
            shape: 'rect',
            zIndex: 1,
            data: {
                fixPos: true,
                parent: true
            },
            movable: 'true' // 判断是否为基础节点
        }
    ]
};
export default svgData