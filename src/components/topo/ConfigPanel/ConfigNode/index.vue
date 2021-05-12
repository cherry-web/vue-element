<template>
  <el-tabs default-active-key="1">
    <el-row align="middle">
      <el-col :span="8" align="middle">名称</el-col>
      <el-col :span="14">
        <el-input
          v-model="globalGridAttr.label"
          style="width: 100%"
          @change="onLabelChange"
        />
      </el-col>
    </el-row>
    <el-row align="middle">
      <el-col :span="14">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="deleteEdge"
        >删除节点</el-button>
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import { nodeOpt } from './method'
import FlowGraph from '@/views/topo/graph'

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
      curCel: ''
    }
  },
  computed: {
    nodeIdCpt() {
      return {
        id: this.id
      }
    }
  },
  watch: {
    nodeIdCpt: {
      handler(nv) {
        this.curCel = nodeOpt(nv, this.globalGridAttr)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onLabelChange(val) {
      this.globalGridAttr.label = val
      this.curCel.attr('text/textWrap/text', val)
    },
    deleteEdge() {
      const { graph } = FlowGraph
      const cell = graph.getCellById(this.id)
      this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          graph.removeNode(cell)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
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
.el-row {
  margin: 10px 0;
}
</style>
