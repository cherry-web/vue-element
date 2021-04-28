<template>
  <el-tabs defaultActiveKey="1">
    <el-tab-pane tab="节点" key="1">
      <el-row align="middle">
        <el-col :span="8">Border Color</el-col>
        <el-col :span="14">
          <el-input type="color" :value="globalGridAttr.nodeStroke" style="width: 100%" @change="onStrokeChange"/>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Border Width</el-col>
        <el-col :span="12">
          <el-slider :min="1" :max="5" :step="1" :value="globalGridAttr.nodeStrokeWidth" @change="onStrokeWidthChange"/>
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.nodeStrokeWidth }}</div>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Fill</el-col>
        <el-col :span="14">
          <el-input type="color" :value="globalGridAttr.nodeFill" style="width: 100%" @change="onFillChange"/>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane tab="文本" key="2">
      <el-row align="middle">
        <el-col :span="8">Font Size</el-col>
        <el-col :span="12">
          <el-slider :min="8" :max="16" :step="1" :value="globalGridAttr.nodeFontSize" @change="onFontSizeChange"/>
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.nodeFontSize }}</div>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Font Color</el-col>
        <el-col :span="14">
          <el-input type="color" :value="globalGridAttr.nodeColor" style="width: 100%" @change="onColorChange"/>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane tab="属性" key="3">
      <el-row align="middle">
        <el-col :span="8">Assign Users</el-col>
        <el-col :span="14">
          <el-input :value="globalGridAttr.nodeUsers" style="width: 100%" @change="onUsersChange"/>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { nodeOpt } from './method'

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
  data () {
    return {
      curCel: ''
    }
  },
  computed: {
    nodeIdCpt () {
      return {
        id: this.id
      }
    }
  },
  watch: {
    nodeIdCpt: {
      handler (nv) {
        this.curCel = nodeOpt(nv, this.globalGridAttr)
      },
      immediate: false,
      deep: false
    }
  },
  methods: {
    onStrokeChange (e) {
      const val = e.target.value
      this.globalGridAttr.nodeStroke = val
      this.curCel.attr('body/stroke', val)
    },
    onStrokeWidthChange (val) {
      this.globalGridAttr.nodeStrokeWidth = val
      this.curCel.attr('body/strokeWidth', val)
    },
    onFillChange (e) {
      const val = e.target.value
      this.globalGridAttr.nodeFill = val
      this.curCel.attr('body/fill', val)
    },
    onFontSizeChange (val) {
      this.globalGridAttr.nodeFontSize = val
      this.curCel.attr('text/fontSize', val)
    },
    onColorChange (e) {
      const val = e.target.value
      this.globalGridAttr.nodeColor = val
      this.curCel.attr('text/fill', val)
    },
    onUsersChange (e) {
      const val = e.target.value
      this.globalGridAttr.nodeUsers = val
      this.curCel.attr('approve/users', val)
    }

  }
}
</script>

<style lang="less" scoped>

</style>
