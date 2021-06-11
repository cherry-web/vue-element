<template>
  <div class="wrap">
    <div class="content">
      <!--左侧工具栏-->
      <div id="flowStencil" class="sider" />
      <div class="panel">
        <!--流程图工具栏-->
        <div class="toolbar">
          <tool-bar v-if="isReady" />
        </div>
        <!--流程图画板-->
        <div id="flowContainer" class="x6-graph" />
      </div>
      <!--右侧工具栏-->
      <el-drawer
        placement="right"
        size="20%"
        :closable="true"
        :visible="visible"
        width="100%"
        @close="onClose"
      >
        <div class="config">
          <config-panel v-if="isReady" :cell-obj="cellObj" />
        </div>
      </el-drawer>
    </div>
  </div>
  <!-- </el-drawer> -->
</template>

<script>
// import './index.less'
import FlowGraph from './graph'
import ToolBar from '@/components/topo/ToolBar'
import ConfigPanel from '@/components/topo/ConfigPanel'

export default {
  name: 'Index',
  components: {
    ToolBar,
    ConfigPanel
  },
  data() {
    return {
      visible: false,
      isReady: true,
      cellObj: { id: '', cellType: '' }
    }
  },
  mounted() {
    this.showDrawer()
  },
  methods: {
    showDrawer() {
      setTimeout(() => {
        this.initGraph()
      }, 100)
    },
    onClose() {
      this.visible = false
    },
    getContainerSize() {
      return {
        width: document.body.offsetWidth - 500,
        height: document.body.offsetHeight - 38
      }
    },
    initGraph() {
      const graph = FlowGraph.init()
      graph.on('cell:contextmenu', ({ cell }) => {
        if (cell.isNode()) {
          const idNode = cell.id
          if (
            idNode === 'mainMachineRoom' ||
            idNode === 'OAArea' ||
            idNode === 'coreArea' ||
            idNode === 'DMZArea' ||
            idNode === 'publicNetArea' ||
            idNode === 'lineArea'
          ) {
            return
          }
        }
        if (!this.visible) {
          this.visible = true
        }
        this.cellObj.id = cell.prop('id')
        this.cellObj.cellType = cell.isNode() ? 'node' : 'edge'
      })
      this.isReady = true
      const resizeFn = () => {
        const { width, height } = this.getContainerSize()
        graph.resize(width, height)
      }
      resizeFn()
      window.addEventListener('resize', resizeFn)
      return () => {
        window.removeEventListener('resize', resizeFn)
      }
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    padding-left: 16px;
    padding-right: 32px;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    color: rgba(0, 0, 0, 0.45);
  }
  .content {
    display: flex;
    height: calc(100% - 48px);
    .sider {
      position: relative;
      width: 290px;
      //height: 100%;
      height: 750px;
      border-right: 1px solid rgba(0, 0, 0, 0.08);
    }
    .panel {
      height: 100%;
      .toolbar {
        display: flex;
        align-items: center;
        height: 38px;
        background-color: #f7f9fb;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
    }
    .config {
      box-sizing: border-box;
      width: 290px;
      height: 100%;
      padding: 0 10px;
      // border-left: 1px solid rgba(0, 0, 0, 0.08);
    }
  }
}
// 调整边界
.ant-drawer-body {
  padding: 0;
}
//解决左侧遮罩的问题
.x6-widget-dnd {
  z-index: 1000;
}

// 左侧动画
@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
.animate-text1,
.animate-text2,
.animate-text3,
.animate-text4 {
  font-weight: bold;
  fill: none;
  stroke-width: 2px;
  stroke-dasharray: 90 310;
  animation: stroke 3s infinite linear;
}
.animate-text1 {
  stroke: #873bf4;
  text-shadow: 0 0 2px #873bf4;
  animation-delay: -1.5s;
}
.animate-text2 {
  stroke: #ff6e06;
  text-shadow: 0 0 2px #ff6e06;
  animation-delay: -3s;
}
</style>
