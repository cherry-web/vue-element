<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新建
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
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
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="系统编码" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sysCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应用名称" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.sysName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拓扑名称" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.topoName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="110px" align="center">
        <template slot-scope="{ row }">
          <span style="color: red">{{ row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.status  | statusFilter(row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已部署环境" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.deployEnviron }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <!-- 传递status标识用以判断禁用、启用按钮展示 -->
          <el-button
            v-if="row.status"
            size="mini"
            @click="handleModifyStatus(row, 0)"
          >
            失效
          </el-button>
          <el-button
            v-if="!row.status"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, 1)"
          >
            生效
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
        <el-form-item label="系统编码">
          <el-input v-model="temp.sysCode" />
        </el-form-item>
        <el-form-item label="应用名称">
          <el-input v-model="temp.sysName" />
        </el-form-item>
        <el-form-item label="所属部门">
          <el-input v-model="temp.department" />
        </el-form-item>
        <el-form-item label="拓扑名称">
          <el-input v-model="temp.topoName" />
        </el-form-item>
        <el-form-item label="负责人">
          <el-input v-model="temp.owner" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  topologicalList,
  topologicalPv,
  topologicalCreate,
  topologicalUpdate,
} from "@/api/topological-list";
import waves from "@/directive/waves"; // waves directive
// import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

// 状态-生效、失效
const deployStatusOptions = [
  {key: "0",statusName: "失效"},
  {key: "1",statusName: "生效"}
];
const statusTypeKeyValue = deployStatusOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.statusName;
  return acc;
}, {});

export default {
  name: "topologicalList",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(type) {
      return statusTypeKeyValue[type];
    },
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        status: undefined,
        sort: "+id",
      },
      deployStatusOptions,
      temp: {
        id: undefined,
        sysCode: "",
        sysName: "",
        department: "",
        topoName: "",
        owner: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      rules: {
        status: [
          { required: true, message: "type is required", trigger: "change" },
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      topologicalList(this.listQuery).then((response) => {
        this.list = response.data.items;
        this.total = response.data.total;

        // Just to simulate the time of the request
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
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
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
        sysCode: "",
        sysName: "",
        department: "",
        topoName: "",
        owner: ""
      };
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
          topologicalCreate(this.temp).then(() => {
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
          topologicalUpdate(tempData).then(() => {
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
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>
