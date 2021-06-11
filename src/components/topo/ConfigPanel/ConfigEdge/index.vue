<template>
  <!-- <el-tabs default-active-key="1">
    <el-tab-pane key="1" tab="线条"> -->
  <div class="config">
    <el-row align="middle">
      <el-col :span="8" align="middle">事件类型 : </el-col>
      <el-col :span="14">
        <el-select
          v-model="value"
          size="mini"
          style="width: 100%"
          @change="onConnectorChange"
        >
          <el-option
            v-for="(item, index) in connectorOptions"
            :key="index"
            :value="item.key"
            :label="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" align="middle">相关操作 : </el-col>
      <el-col :span="14">
        <el-button type="text" icon="el-icon-delete" @click="deleteEdge">删除边</el-button>
      </el-col>
    </el-row>
  </div>
  <!-- </el-tab-pane>
  </el-tabs> -->
</template>

<script>
import FlowGraph from '@/views/main/topo-construct/graph'

const connectorOptions = [
  { key: 'blackSolidLine', value: '类型一' },
  { key: 'redSolidLine', value: '类型二' },
  { key: 'blackDottedLine', value: '类型三' },
  { key: 'redDottedLine', value: '类型四' }
]
// const connectorValue = connectorOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.value
//   return acc
// }, {})
export default {
  name: 'Index',
  props: {
    globalGridAttr: {
      type: Object,
      default: null,
      require: true
    },
    id: {
      type: String,
      default: null,
      require: true
    }
  },
  data() {
    return {
      connectorOptions,
      curCell: '',
      value: ''
    }
  },
  computed: {
    edgeIdCpt() {
      return {
        id: this.id
      }
    }
  },
  watch: {
    edgeIdCpt: {
      handler(nv) {
        const { graph } = FlowGraph
        const cell = graph.getCellById(nv.id)
        if (!cell || !cell.isEdge()) {
          return
        }
        this.curCell = cell
        // const connector = cell.getConnector() || {
        //   name: 'normal'
        // }

        this.globalGridAttr.stroke = cell.attr('line/stroke')
        this.globalGridAttr.strokeDasharray = cell.attr('line/strokeDasharray')
        this.keyLineChange()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onConnectorChange(val) {
      if (val === 'blackSolidLine') {
        // 黑实线
        this.curCell.attr('line/stroke', 'black')
        this.curCell.attr('line/strokeDasharray', '0')
      } else if (val === 'redSolidLine') {
        // 红实线
        this.curCell.attr('line/stroke', 'red')
        this.curCell.attr('line/strokeDasharray', '0')
      } else if (val === 'blackDottedLine') {
        // 黑虚线
        this.curCell.attr('line/stroke', 'black')
        this.curCell.attr('line/strokeDasharray', '5')
      } else if (val === 'redDottedLine') {
        // 红虚线
        this.curCell.attr('line/stroke', 'red')
        this.curCell.attr('line/strokeDasharray', '5')
      }
    },
    keyLineChange() {
      const strokeData = this.globalGridAttr.stroke
      const strokeDasharrayData = this.globalGridAttr.strokeDasharray
      let keyLine = ''
      if (strokeData === 'red') {
        if (strokeDasharrayData === '5') {
          keyLine = 'redDottedLine'
        } else {
          keyLine = 'redSolidLine'
        }
      } else {
        if (strokeDasharrayData === '5') {
          keyLine = 'blackDottedLine'
        } else {
          keyLine = 'blackSolidLine'
        }
      }
      this.value = keyLine
    },
    deleteEdge() {
      const { graph } = FlowGraph
      const cell = graph.getCellById(this.id)
      this.$confirm('此操作将永久删除该边, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        graph.removeEdge(cell)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.config {
  line-height: 32px;
  margin: 10px 0;
}
.el-row {
  margin: 10px 5px;
}
.el-col{
  line-height: 36px;
}
</style>
