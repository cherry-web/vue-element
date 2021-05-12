<template>
  <div class="config">
    <!-- <config-grid v-show="type === 'grid'" :globalGridAttr="globalGridAttr" :id="id"/>-->
    <config-node v-show="type === 'node'" :id="id" :global-grid-attr="globalGridAttr" />
    <config-edge v-show="type === 'edge'" :id="id" :global-grid-attr="globalGridAttr" />
  </div>
</template>

<script>
// import ConfigGrid from './ConfigGrid/index'
import ConfigNode from './ConfigNode/index'
import ConfigEdge from './ConfigEdge/index'
import FlowGraph from '@/views/topo/graph'
// import './index.less'
const globalGridAttr = {
  type: 'mesh',
  size: 10,
  color: '#e5e5e5',
  thickness: 1,
  colorSecond: '#d0d0d0',
  thicknessSecond: 1,
  factor: 4,
  bgColor: '#e5e5e5',
  showImage: true,
  repeat: 'watermark',
  angle: 30,
  position: 'center',
  bgSize: JSON.stringify({ width: 150, height: 150 }),
  opacity: 0.1,

  stroke: 'black',
  strokeWidth: 1,
  strokeDasharray: '0',
  connector: 'normal',
  label: '',

  nodeStroke: '#5F95FF',
  nodeStrokeWidth: 1,
  nodeFill: '#ffffff',
  nodeFontSize: 12,
  nodeColor: '#080808',
  nodeUsers: ''
}

export default {
  name: 'Index',
  components: {
    // ConfigGrid,
    ConfigNode,
    ConfigEdge
  },
  props: {
    cellObj: {
      type: Object,
      default: null,
      require: true
    }
  },
  data() {
    return {
      type: this.cellObj.cellType || '',
      id: this.cellObj.id,
      globalGridAttr: globalGridAttr
    }
  },
  watch: {
    cellObj: {
      handler(nv) {
        this.type = nv.cellType
        this.id = nv.id
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.boundEvent()
    }, 200)
  },
  methods: {
    boundEvent() {
      const { graph } = FlowGraph
      // blank 画布空白区域
      graph.on('blank:click', () => {
        this.type = 'grid'
      })
      // 边点击事件
      graph.on('edge:click', ({ edge }) => {
        // this.type = cell.isNode() ? 'node' : 'edge'
        this.id = edge.id
      })
    }
  }
}
</script>

<style lang="less" scoped>
.config .ant-row {
  line-height: 32px;
  margin: 8px 0;
  .result {
    background: #eee;
    color: #333333;
    padding: 3px 7px;
    border-radius: 10px;
    display: inline-block;
    font-size: 12px;
    margin-left: 8px;
    line-height: 1.25;
    margin-top: 8px;
  }
}
</style>
