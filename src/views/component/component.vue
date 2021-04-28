<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.componentType"
        placeholder="组件选择"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
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
      <el-table-column label="组件名称" min-width="150px">
        <template slot-scope="{ row }">
          <span class="link-type">{{ row.componentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组件类型" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.componentType | typeFilter(row.componentType)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="110px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.owner }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="80px">
        <template slot-scope="{ row }">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(row, $index)"
          >
            编辑
          </el-button>
          <!-- 传递status标识用以判断禁用、启用按钮展示 -->
          <el-button
            v-if="row.status"
            size="mini"
            @click="handleModifyStatus(row, false)"
          >
            禁用
          </el-button>
          <el-button
            v-if="!row.status"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, true)"
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
        <el-form-item label="组件名称">
          <el-input v-model="temp.componentName" />
        </el-form-item>
        <el-form-item label="组件类型" prop="componentType">
          <el-select
            v-model="temp.componentType"
            class="filter-item"
            placeholder="请选择组件类型"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="组件备注">
          <el-input v-model="temp.componentDesc" />
        </el-form-item>
        <el-form-item label="负责人" prop="owner">
          <el-input v-model="temp.owner" />
        </el-form-item>
        <!-- <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="temp.createTime"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item> -->
        <!-- <el-form-item label="更新时间">
          <el-date-picker
            v-model="temp.updateTime"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item> -->
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
  fetchListCom,
  createArticleCom,
  updateArticleCom,
} from "@/api/component";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "run", display_name: "运行时组件" },
  { key: "business", display_name: "业务组件" },
  { key: "base", display_name: "基础组件" },
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "Aicomponent",
  components: { Pagination },
  directives: { waves },
  filters: {
    typeFilter(type) {
      return calendarTypeKeyValue[type];
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
        sort: "+id",
      },
      calendarTypeOptions,
      temp: {
        id: undefined,
        componentName: "",
        componentType: "",
        // createTime: new Date(),
        componentDesc: "",
        owner: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create",
      },
      pvData: [],
      rules: {
        componentType: [
          { required: true, message: "type is required", trigger: "change" },
        ],
        componentName: [
          { required: true, message: "title is required", trigger: "blur" },
        ],
      },
      downloadLoading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 初始化方法
    getList() {
      this.listLoading = true;
      fetchListCom(this.listQuery).then((response) => {
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
    // 判断禁用、启用按钮
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success",
      });
      row.status = status;
    },
    // 排序
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
    // 重置弹框数据
    resetTemp() {
      this.temp = {
        id: undefined,
        componentName: "",
        componentType: "",
        // createTime: new Date(),
        componentDesc: "",
        owner: ""
      };
    },
    // 新增组件
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
        // this.temp.componentType = this.listQuery.componentType;
      });
    },
    // 创建组件
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.createTime = new Date(); // mock a id
          this.temp.updateTime = ""; // mock a id
          createArticleCom(this.temp).then(() => {
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
    // 编辑组件
    handleUpdate(row, index) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.createTime = new Date(this.temp.createTime);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 修改组件
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.createTime = +new Date(tempData.createTime); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticleCom(tempData).then(() => {
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
    // 删除组件
    // handleDelete(row, index) {
    //   this.$notify({
    //     title: "Success",
    //     message: "Delete Successfully",
    //     type: "success",
    //     duration: 2000,
    //   });
    //   this.list.splice(index, 1);
    // },
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },
  },
};
</script>