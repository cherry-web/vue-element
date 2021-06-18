import { Graph, ToolsView, EdgeView } from '@antv/x6'
import vue from 'vue'
export default class extendEdgeData {
    static extendEdgeData(graphData) {
        const { graph } = graphData
        class ContextMenuTool extends ToolsView.ToolItem {
            render() {
                super.render()
                this.knob = ToolsView.createElement('div', false)
                this.knob.style.position = 'absolute'
                this.container.appendChild(this.knob)
                this.updatePosition(this.options)
                setTimeout(() => {
                    this.toggleTooltip(true)
                })
                return this
            }

            toggleTooltip(visible) {
                document.removeEventListener('mousedown', this.onMouseDown)

                if (visible) {
                    // vue.render(
                    //     <Dropdown
                    //         visible={true}
                    //         trigger={['contextMenu']}
                    //         overlay={this.options.menu}
                    //     >
                    //         <a />
                    //     </Dropdown>,
                    //     this.knob,
                    // )
                    const htmlData = "<Dropdown visible={true} trigger={['contextMenu']} overlay={"+this.options.menu+"}>" + "</Dropdown>"
                    vue.render(function(h){
                        return h(htmlData,this.knob)
                    })
                    document.addEventListener('mousedown', this.onMouseDown)
                }
            }

            updatePosition(pos) {
                const style = this.knob.style
                if (pos) {
                    style.left = `${pos.x}px`
                    style.top = `${pos.y}px`
                } else {
                    style.left = '-1000px'
                    style.top = '-1000px'
                }
            }

            onMouseDown = (e) => {
                setTimeout(() => {
                    this.updatePosition()
                    this.toggleTooltip(false)
                    if (this.options.onHide) {
                        this.options.onHide.call(this)
                    }
                }, 200)
            }
        }
        ContextMenuTool.config({
            tagName: 'div',
            isSVGElement: false,
        })
        const onMenuClick = (e) => {
            console.log('menu click ', e)
        }
        const menu = "<Menu onClick={onMenuClick}>" +
            "<Menu.Item>颜色</Menu.Item>" +
            "<Menu.Item>线</Menu.Item>" +
            "<Menu.Item>箭头</Menu.Item>" +
            "</Menu>"

        Graph.registerEdgeTool('contextmenu', ContextMenuTool, true)
        Graph.registerNodeTool('contextmenu', ContextMenuTool, true)

        graph.on('cell:contextmenu', ({ cell, e }) => {
            const p = graph.clientToGraph(e.clientX, e.clientY)
            cell.addTools([
                {
                    name: 'contextmenu',
                    args: {
                        menu,
                        x: p.x,
                        y: p.y,
                        onHide() {
                            this.cell.removeTools()
                        },
                    },
                },
            ])
        })
    }
}