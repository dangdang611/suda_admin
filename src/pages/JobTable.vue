<template>
  <div class="tableContainer">
    <div class="search">
      <el-form :inline="true" class="demo-form-inline" label-width="380px">
        <el-form-item>
          <el-input
            v-model="keys"
            placeholder="请输入招聘职位"
            @keyup.enter.native="search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-bottom: 20px">
      <el-button @click="toggleSelection(showData)">全选</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="delSelection()">删除所有选中的数据</el-button>
      <el-button @click="handleAdd()">新增招聘职位</el-button>
    </div>
    <div class="content">
      <el-table
        :data="showData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="职位名称">
                <span>{{ props.row.jobName }}</span>
              </el-form-item>
              <el-form-item label="职位类型">
                <span>{{ props.row.jobType }}</span>
              </el-form-item>
              <el-form-item label="工作地点">
                <span>{{ props.row.jobLocation }}</span>
              </el-form-item>
              <el-form-item label="招聘人数">
                <span>{{ props.row.jobPeopleCount }}</span>
              </el-form-item>
              <el-form-item label="学历要求">
                <span>{{ props.row.jobRequireEducation }}</span>
              </el-form-item>
              <el-form-item label="工作年限">
                <span>{{ props.row.jobRequireYearNum }}</span>
              </el-form-item>
              <el-form-item label="薪资范围">
                <span>{{ props.row.jobSalary }}</span>
              </el-form-item>
              <el-form-item label="截至日期">
                <span>{{ props.row.jobDiedDate }}</span>
              </el-form-item>
              <el-form-item label="联系方式">
                <span>{{ props.row.jobContact }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="职位ID" prop="jobId" align="center" width="180">
        </el-table-column>
        <el-table-column label="职位名称" prop="jobName" align="center">
        </el-table-column>
        <el-table-column label="招聘人数" prop="jobPeopleCount" align="center">
        </el-table-column>
        <el-table-column label="职位类型" prop="jobType" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ItemPage :count="jobCount" v-show="isItemPage" />

    <div class="modify" v-show="isModify">
      <ModifyJobMessage :edit="editMessage" />
    </div>
    <div class="modify" v-show="isAdd">
      <AddJob />
    </div>
  </div>
</template>

<script>
import ItemPage from "../components/ItemPage.vue";
import ModifyJobMessage from "../components/ModifyJobMessage.vue";
import AddJob from "../components/AddJob.vue";
export default {
  name: "JobTable",
  data() {
    return {
      keys: "",
      size: 3,
      currentPage: 1,
      isModify: false,
      isAdd: false,
      isItemPage: true,
      multipleSelection: [],
      currentIndex: 0,
      jobCount: 0,
      showData: [
        {
          jobId: "001",
          jobName: "前端工程师",
          jobPeopleCount: 2,
          jobType: "IT",
          jobLocation: "广东-深圳-南山区",
          jobRequireEducation: "大学本科",
          jobRequireYearNum: "3-5年",
          jobSalary: "面议",
          jobDiedDate: "2022-04-05",
          jobDuty: "打球",
          jobRequire: "拉屎",
          jobContact: "邮箱 3180422969@qq.com",
          jobDutyFormat: "",
          jobRequireFormat: "",
        },
      ],
    };
  },
  components: {
    ItemPage,
    ModifyJobMessage,
    AddJob,
  },
  computed: {
    // 为了解决编辑没有保存，编辑页面不刷新的bug
    editMessage() {
      if (this.isModify) {
        return this.showData[this.currentIndex];
      } else {
        return {};
      }
    },
  },
  methods: {
    tips(code, message) {
      var type = code === "200" ? "success" : "warning";
      this.$message({
        type: type,
        message: message,
      });
    },
    async search() {
      if (this.keys === "") {
        this.refreshData(this.size, this.currentPage);
      } else {
        // 更新页面，展示搜索数据
        this.showData = await this.$api.job.searchJob(this.keys);
        // 隐藏分页器
        this.isItemPage = false;
      }
    },
    handleEdit(index) {
      this.isModify = true;
      this.currentIndex = index;
    },
    handleAdd() {
      this.isAdd = true;
    },
    async handleDelete(index, row) {
      // 向数据库发送删除请求
      var data = await this.$api.job.delJob(row.jobId);
      // console.log(data);
      this.tips(data.code, data.message);

      // 判断一下是正常显示的数据还是查询数据状态
      // 分页器如果是隐藏状态则表示处于查询数据下的操作，如果是显示状态则是分页显示状态
      if (this.isItemPage) {
        // 刷新页面，恢复分页状态
        this.refreshData(this.size, this.currentPage);
      } else {
        // 继续查询状态
        this.search();
      }
    },
    // 切换选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 保存选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 刷新页面，重新请求数据库
    async refreshData(size, currentPage) {
      if (size) {
        this.size = size;
      } else {
        this.currentPage = currentPage;
      }

      // 更新展示数据
      this.showData = await this.$api.job.getJob(this.currentPage, this.size);
      // 更新分页器
      this.getJobCount();
    },

    async updateData(message) {
      // 发送请求修改数据
      // 出错点：刷新数据是同步请求，修改数据是异步请求，可能顺序不同，所以使用await、async把所有请求改为同步
      // 注意点：await的表达式需返回一个promise的返回值否则效
      var data = await this.$api.job.updateJob(message);
      this.tips(data.code, data.message);

      // 判断一下是正常显示的数据还是查询数据状态
      // 分页器如果是隐藏状态则表示处于查询数据下的操作，如果是显示状态则是分页显示状态
      if (this.isItemPage) {
        // 刷新页面，恢复分页状态
        this.refreshData(this.size, this.currentPage);
      } else {
        // 继续查询状态
        this.search();
      }
    },

    // 批量删除
    async delSelection() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "您并未选中任何数据",
        });
      } else {
        let jobIds = [];
        this.multipleSelection.forEach((item) => {
          jobIds.push(item.jobId);
        });
        console.log(jobIds);

        // 向数据库发送删除请求
        var data = await this.$api.job.delJob(jobIds);
        this.tips(data.code, data.message);

        // 判断一下是正常显示的数据还是查询数据状态
        // 分页器如果是隐藏状态则表示处于查询数据下的操作，如果是显示状态则是分页显示状态
        if (this.isItemPage) {
          // 刷新页面，恢复分页状态
          this.refreshData(this.size, this.currentPage);
        } else {
          // 继续查询状态
          this.search();
        }
      }
    },
    // 获取用户总数
    async getJobCount() {
      this.isItemPage = true;
      this.jobCount = await this.$api.job.getJobCount();
    },
    closeModify() {
      this.isModify = false;
    },
    closeAdd() {
      this.isAdd = false;
    },
    async addJob(job) {
      var data = await this.$api.job.addJob(job);
      this.tips(data.code, data.message);

      // 刷新页面
      this.refreshData(this.size, this.currentPage);
    },
  },
  mounted() {
    this.$bus.$on("refreshJobTable", this.refreshData);
    this.$bus.$on("closeModify", this.closeModify);
    this.$bus.$on("updateJobTable", this.updateData);
    this.$bus.$on("AddJobTable", this.addJob);
    this.$bus.$on("closeAdd", this.closeAdd);
    // 手动调用
    this.refreshData(3, 1);
  },
  destroyed() {
    this.$bus.$off("refreshJobTable");
    this.$bus.$off("closeModify");
    this.$bus.$off("updateJobTable");
    this.$bus.$off("AddJobTable");
    this.$bus.$off("closeAdd");
  },
};
</script>

<style lang='less' scoped>
.search /deep/.el-input__inner {
  width: 380px;
}
.modify {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 103;
}
.demo-table-expand {
  font-size: 0;
  padding: 0 100px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>