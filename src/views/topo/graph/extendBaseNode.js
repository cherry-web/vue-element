// 扩展基础节点(主机房\oa区\核心区\DMZ\公网区\专线区)
export default class extendBaseNode {
    static extendNode(data, graphData) {
        const node = data
        const { graph } = graphData
        const parent = node.getParent() //获取父节点
        if (parent && parent.isNode()) { // 如果有父节点
            let originSize = parent.prop('originSize')
            if (originSize == null) {
                parent.prop('originSize', parent.getSize())
            }
            originSize = parent.prop('originSize') // 获取到父节点的宽高

            let originPosition = parent.prop('originPosition')
            if (originPosition == null) {
                parent.prop('originPosition', parent.getPosition())
            }
            originPosition = parent.prop('originPosition') // 获取父节点的x,y位置
            let x = originPosition.x  // 父节点x坐标
            let y = originPosition.y  // 父节点y坐标
            let cornerX = originPosition.x + originSize.width // 父节点右下角x坐标
            let cornerY = originPosition.y + originSize.height // 父节点右下角y坐标
            let hasChange = false
            const children = parent.getChildren()
            if (children) {
                // 遍历子节点
                children.forEach((child) => {
                    const bbox = child.getBBox() //获取子节点的宽高和位置
                    const corner = bbox.getCorner() // 获取子节点右下角的位置
                    if (bbox.x < x) { //子节点x位置小于父节点x位置，即超出了
                        x = bbox.x // 父节点位置 = 子节点位置
                        hasChange = true
                    }

                    if (bbox.y < y) {
                        y = bbox.y
                        hasChange = true
                    }

                    if (corner.x > cornerX) {
                        cornerX = corner.x
                        hasChange = true
                    }

                    if (corner.y > cornerY) {
                        cornerY = corner.y
                        hasChange = true
                    }
                })
                if (hasChange) {
                    parent.prop(
                        {
                            position: { x, y },
                            size: { width: cornerX - x, height: cornerY - y },
                        },
                        { skipParentHandler: true },
                    )
                    let nodeList = graph.getNodes()
                    let { relativePos, allData } = this.getRelativepos(graph)
                    if (parent.id == 'OAArea') {
                        nodeList.forEach((ele) => {
                            if (ele.id == 'mainMachineRoom') {
                                let mainX = x - 20
                                let mainY = y - 20
                                let mainWidth = 20 + allData['OAArea'].width + 10 + allData['coreArea'].width + 10 + allData['DMZArea'].width + 10 + allData['publicNetArea'].width + 20
                                let mainHeight = 40 + (cornerY - y)
                                ele.prop(
                                    {
                                        position: { x: mainX, y: mainY },
                                        size: { width: mainWidth, height: mainHeight },
                                    },
                                )
                            } else if (ele.id == 'coreArea') {
                                let b = ele.getSize()
                                let otherX = cornerX + 10
                                let otherY = y
                                let otherWidth = b.width
                                let otherHeight = cornerY - y
                                ele.prop(
                                    {
                                        position: { x: otherX, y: otherY },
                                        size: { width: otherWidth, height: otherHeight },
                                    },
                                )
                            } else if (ele.id == 'DMZArea') {
                                let b = ele.getSize()
                                let otherX = cornerX + allData['coreArea'].width + 20
                                let otherY = y
                                let otherWidth = b.width
                                let otherHeight = cornerY - y
                                ele.prop(
                                    {
                                        position: { x: otherX, y: otherY },
                                        size: { width: otherWidth, height: otherHeight },
                                    },
                                )
                            } else if (ele.id == 'publicNetArea') {
                                let b = ele.getSize()
                                let otherX = cornerX + allData['coreArea'].width + allData['DMZArea'].width + 30
                                let otherY = y
                                let otherWidth = b.width
                                let otherHeight = (cornerY - y - 10) / 2
                                ele.prop(
                                    {
                                        position: { x: otherX, y: otherY },
                                        size: { width: otherWidth, height: otherHeight },
                                    },
                                )
                            } else if (ele.id == 'lineArea') {
                                let b = ele.getSize()
                                let otherX = cornerX + allData['coreArea'].width + allData['DMZArea'].width + 30
                                let otherY = y + (cornerY - y) / 2 + 5
                                let otherWidth = b.width
                                let otherHeight = (cornerY - y - 10) / 2
                                ele.prop(
                                    {
                                        position: { x: otherX, y: otherY },
                                        size: { width: otherWidth, height: otherHeight },
                                    },
                                )
                            }
                            this.setRelativepos(graph, relativePos)
                        })
                    }
                    if (parent.id == 'coreArea') {
                        nodeList.forEach((ele) => {
                            if (parent.id !== ele.id) {
                                if (ele.id == 'mainMachineRoom') {
                                    let mainX = x - 20 - allData['OAArea'].width - 10
                                    let mainY = y - 20
                                    let mainWidth = 20 + allData['OAArea'].width + 10 + allData['coreArea'].width + 10 + allData['DMZArea'].width + 10 + allData['publicNetArea'].width + 20
                                    let mainHeight = 40 + (cornerY - y)
                                    ele.prop(
                                        {
                                            position: { x: mainX, y: mainY },
                                            size: { width: mainWidth, height: mainHeight },
                                        },
                                    )
                                } else if (ele.id == 'OAArea') {
                                    let b = ele.getSize()
                                    let otherX = x - allData['OAArea'].width - 10
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'DMZArea') {
                                    let b = ele.getSize()
                                    let otherX = cornerX + 10
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'publicNetArea') {
                                    let b = ele.getSize()
                                    let otherX = cornerX + 10 + allData['DMZArea'].width + 10
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = (cornerY - y - 10) / 2
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'lineArea') {
                                    let b = ele.getSize()
                                    let otherX = cornerX + 10 + allData['DMZArea'].width + 10
                                    let otherY = y + (cornerY - y) / 2 + 5
                                    let otherWidth = b.width
                                    let otherHeight = (cornerY - y - 10) / 2
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                }
                                this.setRelativepos(graph, relativePos)
                            }
                        })
                    }
                    if (parent.id == 'DMZArea') {
                        nodeList.forEach((ele) => {
                            if (parent.id !== ele.id) {
                                if (ele.id == 'mainMachineRoom') {
                                    let mainX = x - 20 - 10 - allData['coreArea'].width - 10 - allData['OAArea'].width
                                    let mainY = y - 20
                                    let mainWidth = 20 + allData['OAArea'].width + 10 + allData['coreArea'].width + 10 + allData['DMZArea'].width + 10 + allData['publicNetArea'].width + 20
                                    let mainHeight = 40 + (cornerY - y)
                                    ele.prop(
                                        {
                                            position: { x: mainX, y: mainY },
                                            size: { width: mainWidth, height: mainHeight },
                                        },
                                    )
                                } else if (ele.id == 'OAArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['coreArea'].width - 10 - allData['OAArea'].width
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'coreArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['coreArea'].width
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'publicNetArea') {
                                    let b = ele.getSize()
                                    let otherX = cornerX + 10
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = (cornerY - y - 10) / 2
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'lineArea') {
                                    let b = ele.getSize()
                                    let otherX = cornerX + 10
                                    let otherY = y + (cornerY - y) / 2 + 5
                                    let otherWidth = b.width
                                    let otherHeight = (cornerY - y - 10) / 2
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                }
                            }
                            this.setRelativepos(graph, relativePos)
                        })
                    }
                    if (parent.id == 'publicNetArea') {
                        nodeList.forEach((ele) => {
                            if (parent.id !== ele.id) {
                                if (ele.id == 'mainMachineRoom') {
                                    let mainX = x - 20 - 10 - allData['DMZArea'].width - 10 - allData['coreArea'].width - 10 - allData['OAArea'].width//- 210 - 510 - 210
                                    let mainY = y - 20
                                    let mainWidth = 20 + allData['OAArea'].width + 10 + allData['coreArea'].width + 10 + allData['DMZArea'].width + 10 + allData['publicNetArea'].width + 20
                                    let mainHeight = 40 + (cornerY - y) + allData['lineArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: mainX, y: mainY },
                                            size: { width: mainWidth, height: mainHeight },
                                        },
                                    )
                                } else if (ele.id == 'OAArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['DMZArea'].width - 10 - allData['coreArea'].width - 10 - allData['OAArea'].width
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y + allData['lineArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'coreArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['DMZArea'].width - 10 - allData['coreArea'].width
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y + allData['lineArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'DMZArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['DMZArea'].width
                                    let otherY = y
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y + allData['lineArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'lineArea') {
                                    let b = ele.getSize()
                                    let otherX = x
                                    let otherY = cornerY + 10
                                    let otherWidth = cornerX - x
                                    let otherHeight = allData['lineArea'].height
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                }
                            }
                            this.setRelativepos(graph, relativePos)
                        })
                    }
                    if (parent.id == 'lineArea') {
                        nodeList.forEach((ele) => {
                            if (parent.id !== ele.id) {
                                if (ele.id == 'mainMachineRoom') {
                                    let mainX = x - 20 - 10 - allData['DMZArea'].width - 10 - allData['coreArea'].width - 10 - allData['OAArea'].width
                                    let mainY = y - 20 - allData['publicNetArea'].height - 10
                                    let mainWidth = 20 + allData['OAArea'].width + 10 + allData['coreArea'].width + 10 + allData['DMZArea'].width + 10 + allData['lineArea'].width + 20
                                    let mainHeight = 40 + (cornerY - y) + allData['publicNetArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: mainX, y: mainY },
                                            size: { width: mainWidth, height: mainHeight },
                                        },
                                    )
                                } else if (ele.id == 'OAArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['DMZArea'].width - 10 - allData['coreArea'].width - 10 - allData['OAArea'].width
                                    let otherY = y - allData['publicNetArea'].height - 10
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y + allData['publicNetArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'coreArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['DMZArea'].width - 10 - allData['coreArea'].width
                                    let otherY = y - allData['publicNetArea'].height - 10
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y + allData['publicNetArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'DMZArea') {
                                    let b = ele.getSize()
                                    let otherX = x - 10 - allData['DMZArea'].width
                                    let otherY = y - 10 - allData['publicNetArea'].height
                                    let otherWidth = b.width
                                    let otherHeight = cornerY - y + allData['publicNetArea'].height + 10
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                } else if (ele.id == 'publicNetArea') {
                                    let b = ele.getSize()
                                    let otherX = x
                                    let otherY = y - allData['publicNetArea'].height - 10
                                    let otherWidth = cornerX - x
                                    let otherHeight = allData['publicNetArea'].height
                                    ele.prop(
                                        {
                                            position: { x: otherX, y: otherY },
                                            size: { width: otherWidth, height: otherHeight },
                                        },
                                    )
                                }
                            }
                            this.setRelativepos(graph, relativePos)
                        })
                    }
                }
            }
        }
    }
    // 获取父子节点相对位置
    static getRelativepos(graph) {
        let nodeList = graph.getNodes()
        let allData = new Array()
        let relativePos = new Array()
        nodeList.forEach((ele) => {
            let sonNode = ele.getChildren()
            if (sonNode) {
                sonNode.forEach((val) => {
                    if (val.isNode()) {
                        relativePos[val.id] = val.position({ relative: true })
                    }
                })
            }
            allData[ele.id] = ele.getBBox()
        })
        return { relativePos, allData }
    }
    // 设置子节点相对位置
    static setRelativepos(graph, relativePos) {
        // 子节点相对位置
        let nodeList = graph.getNodes()
        nodeList.forEach((ele) => {
            let sonNode = ele.getChildren() // 获取子节点
            if (sonNode) {
                sonNode.forEach((sonEle) => {
                    if (sonEle.isNode()) {
                        sonEle.position(relativePos[sonEle.id].x, relativePos[sonEle.id].y, { relative: true })
                    }
                })
            }
        })
    }
}