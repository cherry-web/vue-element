<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-plus"
        size="mini"
        @click="handleCreate"
      >
        新建
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      size="mini"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="序号"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      />
      <el-table-column
        label="关联名称"
        prop="refName"
        width="120px"
        align="center"
      />
      <el-table-column label="单向/双向" width="100px" align="center">
        <template slot-scope="{ row }">
          <el-tag>{{ row.refMode | modeFilter(row.refMode) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="关联类型"
        prop="refType"
        width="100px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.refType | typeFilter(row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100px" align="center">
        <template slot-scope="{ row }">
          <el-tag>{{ row.status | statusFilter(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        prop="refDesc"
        min-width="140px"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column label="创建时间" align="center" width="140">
        <template slot-scope="{ row }">
          <span>{{ row.createTime | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="140">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="240"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button
            v-if="row.status != 'deleted'"
            type="danger"
            size="mini"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
          <el-button
            v-if="row.status == 'start'"
            size="mini"
            type="warning"
            @click="handleModifyStatus(row, 'end')"
          >
            停用
          </el-button>
          <el-button
            v-if="row.status == 'end'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 'start')"
          >
            启用
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="关联名称" prop="refName">
          <el-input v-model="temp.refName" style="width: 350px" />
        </el-form-item>
        <el-form-item label="单向/双向" prop="refMode">
          <el-select
            v-model="temp.refMode"
            class="filter-item"
            placeholder="Please select"
            style="width: 350px"
          >
            <el-option
              v-for="item in modeOptions"
              :key="item.key"
              :value="item.key"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联类型" prop="refType">
          <el-select
            v-model="temp.refType"
            class="filter-item"
            placeholder="Please select"
            style="width: 350px"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.key"
              :value="item.key"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
            style="width: 350px"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.key"
              :value="item.key"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="refDesc">
          <el-input
            type="textarea"
            v-model="temp.refDesc"
            style="width: 350px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getRefList,getRefDetail,updateRef,createRef} from "@/api/ref";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination";

// 状态-生效、失效
const deployStatusOptions = [
  {key: "end",statusName: "停用"},
  {key: "start",statusName: "启用"}
];
const statusTypeKeyValue = deployStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.statusName;
  return acc;
}, {});

export default {
  name: "RefManger",
  components: { Pagination },
  filters: {
    statusFilter(type) {
      const statusMap = {
        start:'启用',
        end:'停用'
      }
      return statusMap[type];
    },
    modeFilter(type) {
      const modeMap = {
        single:'单向',
        double:'双向'
      }
      return modeMap[type];
    },
    typeFilter(type) {
      const typeMap = {
        '1':'类型一',
        '2':'类型二',
        '3':'类型三'
      }
      return typeMap[type];
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: "+id",
      },
      deployStatusOptions,
      temp: {
        id: undefined,
        refName: "",
        refMode: "",
        refType: "",
        status: "",
        refDesc: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增",
      },
      modeOptions:[{key:'single',label:'单向'},{key:'double',label:'双向'}],
      statusOptions:[{key:'start',label:'启用'},{key:'end',label:'停用'}],
      typeOptions:[{key:'1',label:'类型一'},{key:'2',label:'类型二'},{key:'3',label:'类型三'}],
      rules: {
        refName: [{ required: true, message: "关联名称不能为空", trigger: "change" }],
        refMode: [{ required: true, message: "关联模式不能为空", trigger: "change" }],
        refType: [{ required: true, message: "关联类型不能为空", trigger: "change" }],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getRefList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      row.status = status;
      this.$message({
        message: "操作Success",
        type: "success",
      });
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        refName: "",
        refMode: "",
        refType: "",
        status: "",
        refDesc: ""
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          createRef(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleUpdate(row, index) {
      this.temp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          updateRef(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(row, index){
      this.$notify({
        title: "Success",
        message: "已成功删除",
        type: "success",
        duration: 2000,
      })
      this.list.splice(index,1)
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
