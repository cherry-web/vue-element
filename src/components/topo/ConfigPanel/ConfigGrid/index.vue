<template>
  <el-tabs defaultActiveKey="1">
    <el-tab-pane tab="网格" key="1">
      <el-row align="middle">
        <el-col :span="10">Grid Type</el-col>
        <el-col :span="12">
          <el-select
            style="width: 100%"
            :value="globalGridAttr.type"
            @change="
              (val) => {
                globalGridAttr.type = val;
              }
            "
          >
            <el-option :value="GRID_TYPE.DOT">Dot</el-option>
            <el-option :value="GRID_TYPE.FIXED_DOT">Fixed Dot</el-option>
            <el-option :value="GRID_TYPE.MESH">Mesh</el-option>
            <el-option :value="GRID_TYPE.DOUBLE_MESH">Double Mesh</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="10">Grid Size</el-col>
        <el-col :span="10">
          <el-slider
            :min="1"
            :max="20"
            :step="1"
            :value="globalGridAttr.size"
            @change="
              (val) => {
                globalGridAttr.size = val;
              }
            "
          />
        </el-col>
        <el-col :span="2">
          <div class="result">{{ globalGridAttr.size }}</div>
        </el-col>
      </el-row>
      <div v-if="globalGridAttr.type === 'doubleMesh'">
        <el-row align="middle">
          <el-col :span="10">Primary Color</el-col>
          <el-col :span="12">
            <el-input
              type="color"
              :value="globalGridAttr.color"
              style="width: 100%"
              @change="
                (e) => {
                  globalGridAttr.color = e.target.value;
                }
              "
            />
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Primary Thickness</el-col>
          <el-col :span="10">
            <el-slider
              :min="0.5"
              :max="10"
              :step="0.5"
              :value="globalGridAttr.thickness"
              @change="
                (val) => {
                  globalGridAttr.thickness = val;
                }
              "
            />
          </el-col>
          <el-col :span="2">
            <div class="result">{{ globalGridAttr.thickness.toFixed(1) }}</div>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Secondary Color</el-col>
          <el-col :span="12">
            <el-input
              type="color"
              :value="globalGridAttr.colorSecond"
              style="width: 100%"
              @change="
                (e) => {
                  globalGridAttr.colorSecond = e.target.value;
                }
              "
            />
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Secondary Thickness</el-col>
          <el-col :span="10">
            <el-slider
              :min="0.5"
              :max="10"
              :step="0.5"
              :value="globalGridAttr.thicknessSecond"
              @change="
                (val) => {
                  globalGridAttr.thicknessSecond = val;
                }
              "
            />
          </el-col>
          <el-col :span="2">
            <div class="result">
              {{ globalGridAttr.thicknessSecond.toFixed(1) }}
            </div>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Scale Factor</el-col>
          <el-col :span="10">
            <el-slider
              :min="1"
              :max="10"
              :step="1"
              :value="globalGridAttr.factor"
              @change="
                (val) => {
                  globalGridAttr.factor = val;
                }
              "
            />
          </el-col>
          <el-col :span="2">
            <div class="result">{{ globalGridAttr.factor }}</div>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <el-row align="middle">
          <el-col :span="10">Grid Color</el-col>
          <el-col :span="12">
            <el-input
              type="color"
              :value="globalGridAttr.color"
              style="width: 100%"
              @change="
                (e) => {
                  globalGridAttr.color = e.target.value;
                }
              "
            />
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="10">Thickness</el-col>
          <el-col :span="10">
            <el-slider
              :min="0.5"
              :max="10"
              :step="0.5"
              :value="globalGridAttr.thickness"
              @change="
                (val) => {
                  globalGridAttr.thickness = val;
                }
              "
            />
          </el-col>
          <el-col :span="1">
            <div class="result">{{ globalGridAttr.thickness.toFixed(1) }}</div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>

    <el-tab-pane tab="背景" key="2">
      <el-row align="middle">
        <el-col :span="6">Color</el-col>
        <el-col :span="14">
          <el-input
            type="color"
            :value="globalGridAttr.bgColor"
            style="width: 100%"
            @change="
              (e) => {
                globalGridAttr.bgColor = e.target.value;
              }
            "
          />
        </el-col>
      </el-row>
      <el-row align="middle">
        <el-col :span="14" :offset="6">
          <el-checkbox
            :checked="globalGridAttr.showImage"
            @change="
              (e) => {
                globalGridAttr.showImage = e.target.checked;
              }
            "
          >
            Show Image
          </el-checkbox>
        </el-col>
      </el-row>
      <div v-if="globalGridAttr.showImage">
        <el-row align="middle">
          <el-col :span="6">Repeat</el-col>
          <el-col :span="14">
            <el-select
              style="width: 100%"
              :value="globalGridAttr.repeat"
              @change="
                (val) => {
                  globalGridAttr.repeat = val;
                }
              "
            >
              <el-option :value="REPEAT_TYPE.NO_REPEAT">No Repeat</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT">Repeat</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT_X">Repeat X</el-option>
              <el-option :value="REPEAT_TYPE.REPEAT_Y">Repeat Y</el-option>
              <el-option :value="REPEAT_TYPE.ROUND">Round</el-option>
              <el-option :value="REPEAT_TYPE.SPACE">Space</el-option>
              <el-option :value="REPEAT_TYPE.FLIPX">Flip X</el-option>
              <el-option :value="REPEAT_TYPE.FLIPY">Flip Y</el-option>
              <el-option :value="REPEAT_TYPE.FLIPXY">Flip XY</el-option>
              <el-option :value="REPEAT_TYPE.WATERMARK">Watermark</el-option>
            </el-select>
          </el-col>
        </el-row>
        <div v-if="globalGridAttr.repeat === 'watermark'">
          <el-row align="middle">
            <el-col :span="16" :offset="6" style="font-size: 12px">
              Watermark Angle
            </el-col>
            <el-col :span="14" :offset="6">
              <el-slider
                :min="0"
                :max="360"
                :step="1"
                :value="globalGridAttr.angle"
                @change="
                  (val) => {
                    globalGridAttr.angle = val;
                  }
                "
              />
            </el-col>
            <el-col :span="2">
              <div class="result">{{ globalGridAttr.angle }}</div>
            </el-col>
          </el-row>
        </div>

        <el-row align="middle">
          <el-col :span="6">Position</el-col>
          <el-col :span="14">
            <el-select
              style="width: 100%"
              :value="globalGridAttr.position"
              @change="
                (val) => {
                  globalGridAttr.position = val;
                }
              "
            >
              <el-option value="center">center</el-option>
              <el-option value="left">left</el-option>
              <el-option value="right">right</el-option>
              <el-option value="top">top</el-option>
              <el-option value="bottom">bottom</el-option>
              <el-option value="50px 50px">50px 50px</el-option>
              <el-option :value="JSON.stringify({ x: 50, y: 50 })">
                {`{ x: 50, y: 50 }`}
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="6">Size</el-col>
          <el-col :span="14">
            <el-select
              style="width: 100%"
              :value="globalGridAttr.bgSize"
              @change="
                (val) => {
                  globalGridAttr.bgSize = val;
                }
              "
            >
              <el-option value="auto auto">auto auto</el-option>
              <el-option value="cover">cover</el-option>
              <el-option value="contain">contain</el-option>
              <el-option value="30px 30px">30px 30px</el-option>
              <el-option value="100% 100%">100% 100%</el-option>
              <el-option :value="JSON.stringify({ width: 150, height: 150 })">
                {`{width: 150, height: 150 }`}
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="6">Opacity</el-col>
          <el-col :span="12">
            <el-slider
              :min="0.05"
              :max="1"
              :step="0.05"
              :value="globalGridAttr.opacity"
              @change="
                (val) => {
                  globalGridAttr.opacity = val;
                }
              "
            />
          </el-col>
          <el-col :span="4">
            <div class="result">{{ globalGridAttr.opacity.toFixed(2) }}</div>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { gridOpt, backGroundOpt, gridSizeOpt } from './method'
// import { globalGridAttr } from '../../../models/global'

const GRID_TYPE_ENUM = {
  DOT: 'dot',
  FIXED_DOT: 'fixedDot',
  MESH: 'mesh',
  DOUBLE_MESH: 'doubleMesh'
}
const REPEAT_TYPE_ENUM = {
  NO_REPEAT: 'no-repeat',
  REPEAT: 'repeat',
  REPEAT_X: 'repeat-x',
  REPEAT_Y: 'repeat-y',
  ROUND: 'round',
  SPACE: 'space',
  FLIPX: 'flipX',
  FLIPY: 'flipY',
  FLIPXY: 'flipXY',
  WATERMARK: 'watermark'
}
export default {
  name: 'Index',
  props: {
    globalGridAttr: {
      type: Object,
      default: null,
      required: true
    }
  },
  data() {
    return {
      GRID_TYPE: GRID_TYPE_ENUM,
      REPEAT_TYPE: REPEAT_TYPE_ENUM
    }
  },
  mounted() {
    gridOpt(this.globalGridAttr)
    gridSizeOpt(this.globalGridAttr)
    backGroundOpt(this.globalGridAttr)
  },
  computed: {
    gridOptCpt() {
      return {
        type: this.globalGridAttr.type,
        color: this.globalGridAttr.color,
        thickness: this.globalGridAttr.thickness,
        thicknessSecond: this.globalGridAttr.thicknessSecond,
        colorSecond: this.globalGridAttr.colorSecond,
        factor: this.globalGridAttr.factor
      }
    },
    gridSizeOptCpt() {
      return {
        size: this.globalGridAttr.size
      }
    },
    backGroundOpt() {
      return {
        bgColor: this.globalGridAttr.bgColor,
        showImage: this.globalGridAttr.showImage,
        repeat: this.globalGridAttr.repeat,
        angle: this.globalGridAttr.angle,
        bgSize: this.globalGridAttr.bgSize,
        position: this.globalGridAttr.position,
        opacity: this.globalGridAttr.opacity
      }
    }
  },
  watch: {
    // 监听网格变化
    gridOptCpt: {
      handler(nv) {
        gridOpt(nv)
      },
      immediate: false,
      deep: false
    },
    // 监听网格大小变化
    gridSizeOptCpt: {
      handler(nv) {
        gridSizeOpt(nv)
      },
      immediate: false,
      deep: false
    },
    // 监听背景变化
    backGroundOpt: {
      handler(nv) {
        backGroundOpt(nv)
      },
      immediate: false,
      deep: true
    }
  }

}
</script>

<style lang="less" scoped>
</style>
