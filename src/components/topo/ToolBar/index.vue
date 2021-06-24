<template>
  <div class="bar">
    <el-button name="delete" class="item-space" size="small" icon="delete" @click.prevent.stop="handleClick">
      清除
    </el-button>

    <!-- <el-button :disabled="!canUndo" name="undo" @click="handleClick" class="item-space" size="small" icon="undo">
      撤销
      </el-button>
      <el-button :disabled="!canRedo" name="redo" @click="handleClick" class="item-space" size="small" icon="redo">
      重做
      </el-button>

      <el-button name="copy" @click="handleClick" class="item-space" size="small" icon="copy">
      复制
      </el-button>

      <el-button name="cut" @click="handleClick" class="item-space" size="small" icon="scissor">
      剪切
      </el-button>

      <el-button name="paste" @click="handleClick" class="item-space" size="small" icon="snippets">
      粘贴
      </el-button> -->

    <el-button name="savePNG" class="item-space" size="small" icon="download" @click="handleClick">
      保存PNG
    </el-button>

    <el-button name="saveSVG" class="item-space" size="small" icon="download" @click="handleClick">
      保存SVG
    </el-button>

    <el-button name="print" class="item-space" size="small" icon="printer" @click="handleClick">
      打印
    </el-button>

    <el-button name="toJSON" class="item-space" size="small" @click="handleClick">
      导出toJSON
    </el-button>

  </div>
</template>

<script>
import FlowGraph from '@/views/main/topo-construct/graph'
import { DataUri } from '@antv/x6'
import svgData from '@/views/main/topo-construct/graph/svgData'

export default {
  name: 'Index',
  components: {
  },
  data() {
    return {
      canUndo: '',
      canRedo: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.initEvent()
    }, 200)
  },
  methods: {
    initEvent() {
      const { graph } = FlowGraph
      const { history } = graph
      history.on('change', () => {
        this.canUndo = history.canUndo() // 是否能撤销
        this.canRedo = history.canRedo() // 是否能重做
      })
      graph.bindKey('ctrl+z', () => {
        if (history.canUndo()) {
          history.undo() // 撤销
        }
        return false
      })
      graph.bindKey('ctrl+shift+z', () => {
        if (history.canRedo()) {
          history.redo() // 重做
        }
        return false
      })
      graph.bindKey('ctrl+d', () => {
        graph.clearCells() // 清空画布
        return false
      })
      graph.bindKey('ctrl+s', () => {
        // 导出 PNG/JPEG
        graph.toPNG((datauri) => {
          DataUri.downloadDataUri(datauri, 'chart.png')
        })
        return false
      })
      graph.bindKey('ctrl+p', () => {
        graph.printPreview() // 打印
        return false
      })
      graph.bindKey('ctrl+c', this.copy)
      graph.bindKey('ctrl+v', this.paste)
      graph.bindKey('ctrl+x', this.cut)
    },
    copy() {
      const { graph } = FlowGraph
      const cells = graph.getSelectedCells() // 获取选中的节点/边
      if (cells.length) {
        graph.copy(cells) // 复制
      }
      return false
    },
    cut() {
      const { graph } = FlowGraph
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells) // 剪切
      }
      return false
    },
    paste() {
      const { graph } = FlowGraph
      if (!graph.isClipboardEmpty()) { // 返回剪切板是否为空
        const cells = graph.paste({ offset: 32 }) // 粘贴到画布的节点/边的偏移量
        graph.cleanSelection() // 清空选区
        // graph.select选中指定的节点/边。需要注意的是，该方法不会取消选中当前选中的节点/边，
        // 而是将指定的节点/边追加到选区中。
        // 如果同时需要取消选中当前选中的节点/边，请使用 resetSelection(...) 方法。
        graph.select(cells)
      }
      return false
    },
    handleClick(event) {
      const { graph } = FlowGraph
      const name = event.currentTarget.name
      switch (name) {
        case 'undo':
          graph.history.undo()
          break
        case 'redo':
          graph.history.redo()
          break
        case 'delete':
          graph.clearCells()
          this.$nextTick(function() {
            graph.fromJSON(svgData)
          })
          break
        case 'savePNG':
          graph.toPNG((dataUri) => {
            // 下载
            DataUri.downloadDataUri(dataUri, 'chartx.png')
          }, {
            backgroundColor: 'white',
            padding: {
              top: 20,
              right: 30,
              bottom: 40,
              left: 50
            },
            quality: 1
          })
          break
        case 'saveSVG':
          graph.toSVG((dataUri) => {
            // 下载
            DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg')
          })
          break
        case 'print':
          graph.printPreview()
          break
        case 'copy':
          this.copy()
          break
        case 'cut':
          this.cut()
          break
        case 'paste':
          this.paste()
          break
        case 'toJSON':
          console.log(graph.toJSON())
          console.log(graph.fromJSON({ cells: [graph.toJSON().cells[0], graph.toJSON().cells[1]] }))
          // graph.fromJSON按照指定的 JSON 数据渲染节点和边
          // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
          this.$nextTick(function() {
            graph.fromJSON(svgData)
          })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
button {
  margin-right: 8px;
}
.bar{
  margin-left:16px;
  margin-right:16px;
}
.item-space{
  //margin-left:16px;
}
</style>
