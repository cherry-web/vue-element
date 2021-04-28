<template>
  <el-tabs defaultActiveKey="1">
    <el-tab-pane tab="线条" key="1">
      <el-row align="middle">
        <el-col :span="8">宽度</el-col>
        <el-col :span="12">
          <el-slider
            :min="1"
            :max="5"
            :step="1"
            v-model="globalGridAttr.strokeWidth"
            @change="onStrokeWidthChange"
          />
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.strokeWidth }}</div>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">颜色</el-col>
        <el-col :span="14">
          <el-input
            type="color"
            v-model="globalGridAttr.stroke"
            style="width: 100%"
            @change="onStrokeChange"
          />
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">连接器</el-col>
        <el-col :span="14">
          <el-select
            style="width: 100%"
            v-model="value"
            @change="onConnectorChange"
          >
            <el-option
              v-for="(item, index) in connectorOptions"
              :key="index"
              :value="item.key"
              :label="item.statusName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">虚实线</el-col>
        <el-col :span="14">
          <el-select
            style="width: 100%"
            v-model="valueDash"
            @change="onDashChange"
          >
            <el-option
              v-for="(item, index) in dashOptions"
              :key="index"
              :value="item.key"
              :label="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="8">Label</el-col>
        <el-col :span="14">
          <el-input
            v-model="globalGridAttr.label"
            style="width: 100%"
            @change="onLabelChange"
          />
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import FlowGraph from "@/views/topo/graph";

const connectorOptions = [
  { key: "normal", statusName: "常规", label: "常规" },
  { key: "smooth", statusName: "光滑", label: "光滑" },
  { key: "rounded", statusName: "圆角", label: "圆角" },
];
const connectorValue = connectorOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.statusName;
  return acc;
}, {});
const dashOptions = [
  { key: "0", value: "实线" },
  { key: "5", value: "虚线" },
];
const dashValue = dashOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.value;
  return acc;
}, {});
export default {
  name: "Index",
  props: {
    globalGridAttr: {
      type: Object,
      default: null,
      require: true,
    },
    id: {
      type: String,
      default: null,
      require: true,
    },
  },
  data() {
    return {
      connectorOptions,
      dashOptions,
      curCell: "",
      value: connectorValue[this.globalGridAttr.connector],
      valueDash:
        this.globalGridAttr.strokeDasharray == undefined
          ? dashValue["0"]
          : this.globalGridAttr.strokeDasharray == "0"
          ? dashValue["0"]
          : dashValue["5"],
    };
  },
  computed: {
    edgeIdCpt() {
      return {
        id: this.id,
      };
    },
  },
  watch: {
    edgeIdCpt: {
      handler(nv) {
        const { graph } = FlowGraph;
        const cell = graph.getCellById(nv.id);
        if (!cell || !cell.isEdge()) {
          return;
        }
        this.curCell = cell;
        const connector = cell.getConnector() || {
          name: "normal",
        };
        this.globalGridAttr.stroke = cell.attr("line/stroke");
        this.globalGridAttr.strokeWidth = cell.attr("line/strokeWidth");
        this.globalGridAttr.strokeDasharray =
          cell.attr("line/strokeDasharray") == undefined
            ? "0"
            : cell.attr("line/strokeDasharray") == "0"
            ? "0"
            : "5";
        this.valueDash = dashValue[this.globalGridAttr.strokeDasharray];
        this.globalGridAttr.connector = connector.name;
        this.globalGridAttr.label = cell.getLabels()[0]?.attrs.text.text || "";
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onStrokeWidthChange(val) {
      this.globalGridAttr.strokeWidth = val;
      this.curCell.attr("line/strokeWidth", val);
    },
    onStrokeChange(e) {
      this.globalGridAttr.stroke = e;
      this.curCell.attr("line/stroke", e);
    },
    onConnectorChange(val) {
      this.globalGridAttr.connector = val;
      this.curCell.setConnector(val);
    },
    onDashChange(val) {
      this.globalGridAttr.strokeDasharray = val;
      this.curCell.attr("line/strokeDasharray", val);
    },
    onLabelChange(e) {
      this.globalGridAttr.label = e;
      this.curCell.setLabels([
        {
          attrs: {
            text: {
              text: e,
            },
          },
          position: {
            distance: 0.5,
          },
        },
      ]);
      // curCell.appendLabel({
      //   attrs: {
      //     text: {
      //       text: val,
      //     },
      //   },
      //   position: {
      //     distance: 0.25,
      //   },
      // })
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin:10px 0;
}
</style>
