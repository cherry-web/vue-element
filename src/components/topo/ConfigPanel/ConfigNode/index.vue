<template>
  <el-tabs default-active-key="1">
    <el-form :model="globalGridAttr" label-width="80px">
      <el-form-item label="名称 :">
        {{ globalGridAttr.label }}
        <!-- <el-input
          disabled
          v-model="globalGridAttr.label"
          size="mini"
          style="width: 100px"
          @change="onLabelChange"
        /> -->
      </el-form-item>
      <el-form-item
        v-for="item in globalGridAttr.attributeList"
        :key="item"
        :label="item + ' :'"
        :value="item"
        >{{ item }}</el-form-item
      >
    </el-form>
    <el-row>
      <el-col :span="8" align="middle">相关操作 : </el-col>
      <el-col :span="14">
        <el-button type="text" icon="el-icon-delete" @click="deleteNode"
          >删除节点</el-button
        >
      </el-col>
    </el-row>
  </el-tabs>
</template>

<script>
import { nodeOpt } from './method'
import FlowGraph from '@/views/main/topo-construct/graph'

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
      console.log(this.globalGridAttr.attributeList);
    },
    deleteNode() {
      const { graph } = FlowGraph
      console.log(this.id)
      const cell = graph.getCellById(this.id)
      let cells = []
      if(cell.children !== null && cell.children.length){
      cells = [].concat(cell.children)
      }
      cells.push(cell)
      this.$confirm('此操作将永久删除该节点及其子节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          graph.removeCells(cells)
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
  margin: 10px 5px;
}
.el-col {
  line-height: 36px;
}
</style>
