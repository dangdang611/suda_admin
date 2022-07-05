<template>
  <div class="anContainer">
    <div class="header">
      <h3>新增岗位资讯信息</h3>
      <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="modifyContent" style="over">
      <h3>资讯信息</h3>
      <el-form
        :model="editMessage"
        ref="edit"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <ul>
          <li>
            <el-form-item label="职位名称" prop="jobName">
              <el-input
                v-model="editMessage.jobName"
                clearable
                placeholder="请填写职位名称"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="职位类型" prop="jobType">
              <el-select
                v-model="editMessage.jobType"
                placeholder="请选择职位类型"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="工作地点" prop="jobLocation">
              <el-input
                v-model="editMessage.jobLocation"
                placeholder="请填写工作地点"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="招聘人数" prop="jobPeopleCount">
              <el-input
                v-model="editMessage.jobPeopleCount"
                placeholder="请填写招聘人数"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="学历要求" prop="jobRequireEducation">
              <el-select
                v-model="editMessage.jobRequireEducation"
                placeholder="请选择学历要求"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="工作年限" prop="jobRequireYearNum">
              <el-input
                v-model="editMessage.jobRequireYearNum"
                placeholder="请填写工作年限"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="薪资范围" prop="jobSalary">
              <el-input
                v-model="editMessage.jobSalary"
                placeholder="请填写薪资范围"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="截至日期" prop="jobDiedDate">
              <el-date-picker
                v-model="editMessage.jobDiedDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="联系方式" prop="jobContact">
              <el-input
                v-model="editMessage.jobContact"
                placeholder="请填写联系方式"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="工作职责" prop="jobDuty">
              <el-button @click="editJobRequire">去编写工作职责</el-button>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="岗位要求" prop="jobRequire">
              <el-button @click="editJobDuty">去编写岗位要求</el-button>
            </el-form-item>
          </li>
        </ul>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="submitForm('edit')">确认</el-button>
      </div>
    </div>
    <div class="modify" v-show="isEditContext">
      <TestPage />
    </div>
  </div>
</template>

<script>
import TestPage from "@/components/TestPage.vue";
export default {
  name: "AddJob",
  data() {
    return {
      isEditContext: false,
      isRequire: false, //标识当前编辑的是岗位要求
      isDuty: false, //标识当前编辑的是工作职责
      editMessage: {
        jobId: "",
        jobName: "",
        jobPeopleCount: 0,
        jobType: "",
        jobLocation: "",
        jobRequireEducation: "",
        jobRequireYearNum: "",
        jobSalary: "",
        jobDiedDate: "",
        jobDuty: "",
        jobRequire: "",
        jobContact: "",
        jobDutyFormat: "",
        jobRequireFormat: "",
      },
      rules: {
        jobName: [
          {
            trigger: "blur",
            required: true,
            message: "职位名称不能省略",
          },
        ],
        jobType: [
          { trigger: "blur", required: true, message: "职位类型不能省略" },
        ],
        jobLocation: [
          { trigger: "blur", required: true, message: "工作地点不能省略" },
        ],
        jobPeopleCount: [
          { trigger: "blur", required: true, message: "招聘人数不能省略" },
        ],
        jobRequireEducation: [
          { trigger: "blur", required: true, message: "学历要求不能省略" },
        ],
        jobDiedDate: [
          { trigger: "blur", required: true, message: "截至日期不能省略" },
        ],
        jobDuty: [
          { trigger: "blur", required: true, message: "工作职责不能省略" },
        ],
        jobRequire: [
          { trigger: "blur", required: true, message: "岗位要求不能省略" },
        ],
        jobSalary: [
          { trigger: "blur", required: true, message: "薪资范围不能省略" },
        ],
        jobContact: [
          { trigger: "blur", required: true, message: "联系方式不能省略" },
        ],
      },
      options1: [
        {
          value: "1",
          label: "IT",
        },
        {
          value: "2",
          label: "人资/行政",
        },
        {
          value: "3",
          label: "市场营销",
        },
        {
          value: "4",
          label: "财务/审计/法务",
        },
        {
          value: "5",
          label: "经营/战略",
        },
        {
          value: "6",
          label: "采购",
        },
        {
          value: "7",
          label: "工建",
        },
        {
          value: "8",
          label: "高级管理",
        },
        {
          value: "9",
          label: "运营",
        },
        {
          value: "10",
          label: "其他",
        },
      ],
      options2: [
        {
          value: "1",
          label: "小学",
        },
        {
          value: "2",
          label: "初中",
        },
        {
          value: "23",
          label: "高中/中职",
        },
        {
          value: "4",
          label: "大专",
        },
        {
          value: "5",
          label: "大学本科",
        },
        {
          value: "6",
          label: "研究生",
        },
        {
          value: "7",
          label: "博士生",
        },
      ],
    };
  },
  components: { TestPage },
  methods: {
    close() {
      this.$bus.$emit("closeAdd");
      // 关闭添加并清空表单
      this.$refs["edit"].resetFields();
    },
    editJobRequire() {
      this.isEditContext = true;
      this.isRequire = true;
    },
    editJobDuty() {
      this.isEditContext = true;
      this.isDuty = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理修改信息的业务
          this.$bus.$emit("AddJobTable", this.editMessage);
          // 关闭弹窗
          this.close();
          // 清空表单
          this.$refs[formName].resetFields();
        } else {
          this.$message({
            message: "请正确输入信息!",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
  mounted() {
    this.$bus.$on("getContext", (value, render) => {
      if (this.isRequire) {
        this.editMessage.jobRequire = render;
        this.editMessage.jobRequireFormat = value;
        this.isRequire = false;
      } else if (this.isDuty) {
        this.editMessage.jobDuty = render;
        this.editMessage.jobDutyFormat = value;
        this.isDuty = false;
      }
    });
    this.$bus.$on("closeContext", () => {
      this.isEditContext = false;
      this.isRequire = false;
      this.isDuty = false;
    });
  },
  beforeDestroy() {
    this.$bus.$off("getContext");
    this.$bus.$off("closeContext");
  },
};
</script>

<style lang="less" scoped>
.anContainer {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 700px;
  height: 475px;
  border-top: 2px solid #409eff;
  background-color: #fff;

  .header {
    flex: 0;
    padding: 10px 10px 10px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #ddd;

    h3 {
      font-weight: normal;
    }

    span {
      font-size: 20px;
      cursor: pointer;
    }
  }
}

.modifyContent {
  flex: 1;
  position: relative;
  padding: 10px 80px 20px 50px;
  overflow: auto;

  h3 {
    margin-bottom: 20px;
    font-weight: normal;
  }

  .btn {
    text-align: right;
    /deep/ .el-button {
      margin-top: 10px;
      padding: 8px 17px;
    }
  }

  /deep/ .el-form-item__label {
    width: 120px !important;
  }

  /deep/ .el-input {
    width: 94% !important;
  }
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
</style>