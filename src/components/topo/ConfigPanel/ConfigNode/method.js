import FlowGraph from '@/views/topo/graph'

export function nodeOpt(id, globalGridAttr) {
  let curCel = null
  if (id) {
    const { graph } = FlowGraph
    const cell = graph.getCellById(id)
    if (!cell || !cell.isNode()) {
      return
    }
    curCel = cell
    globalGridAttr.label = cell.attr('text/textWrap/text')
  }
  return curCel
}
