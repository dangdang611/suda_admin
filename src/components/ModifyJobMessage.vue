<template>
  <div class="anContainer">
    <div class="header">
      <h3>修改岗位资讯信息</h3>
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
      <TestPage :contextFormat="contextFormat" />
    </div>
  </div>
</template>

<script>
import TestPage from "@/components/TestPage.vue";
import _ from "lodash";
export default {
  name: "ModifyJobMessage",
  data() {
    return {
      isEditContext: false,
      isRequire: false, //标识当前编辑的是岗位要求
      isDuty: false, //标识当前编辑的是工作职责
      editMessage: this.edit,
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
  props: ["edit"],
  components: { TestPage },
  watch: {
    // 注意点：
    // 1.props原则上只读不改，但是把props的值赋值给局部变量确实避免了props的修改，但是这个局部变量只能获取props的初始值，
    // 虽然props会持续更新，但是局部变量无法获取，因此可以监听props，当其更改时，手动将props的新值赋值给局部变量
    // 2.props带过来的这个值是引用变量，将其赋值给局部变量，那么局部变量也指向这个数据，他的更改也会影响到源数据的变化

    //所以这里存在一些bug
    // 1. editmessage会影响edit的值，也会影响edit指向的值
    // 解决方法：使用深度拷贝，props的edit值拷贝给editMessage，使得editMessage和edit没有关系
    // 2.props值只能获取到初始值，父组件点击别的列表，编辑框数据没有更新
    // 解决方法：使用watch监听props的值，当其发生更新，深度拷贝给子组件的局部变量edit,edit会更新编辑页面
    // 3.当用户编辑没有保存，而又再次点击同样一个数据列表，打开的编辑框显示的数据是上次编辑没有保存的数据
    //原因：因为props没有发生更新，所以不会触发这里的监听事件，editMessage自然也没有得到更新，因此展示的还是上一次用户编辑过的editMessage，
    //     在testPage中显示空也是一样的道理，之所以没有显示上次修改的没有保存的数据，是因为是关闭TestPage时我进行了value赋空值的操作
    // 解决方案：在父组件中，对传过来的props使用计算属性，当编辑框显示，则计算属性触发，props更新值，watch就能够被触发，editMessge就能够被更新

    // 4.使用原生的深度拷贝函数，props更新了也无法更新editMessage，editMessage始终为空，
    // 原因：父组件中的计算属性的设定是，当编辑框打开时更新props，关闭时改props的值为空字符串。原生的深度拷贝函数无法将初始化绑定给空字符串的editMessage拷贝新值，而lodash深度拷贝可以完成
    // 解决方案：
    // 1.使用lodash深度拷贝
    // 2.父组件的计算属性中，当编辑框关闭状态是默认返回的是一个对象（默认值对象），保证和后面更新的数据是相同的数据结构
    edit: {
      immediate: true,
      deep: true,
      handler(newValue) {
        console.log("触发更新");
        // 深度拷贝，不影响父组件数据
        // this.deepcopy(this.editMessage, newValue);

        // 初始值的问题，一旦绑定空，后期原生的深度拷贝无法更新数据，loash可以
        this.editMessage = _.cloneDeep(newValue);
      },
    },
  },
  computed: {
    contextFormat() {
      if (this.isRequire) {
        return this.editMessage.jobRequireFormat;
      } else if (this.isDuty) {
        return this.editMessage.jobDutyFormat;
      } else {
        return "";
      }
    },
  },
  methods: {
    close() {
      this.$bus.$emit("closeModify");
    },
    editJobRequire() {
      this.isEditContext = true;
      this.isRequire = true;
    },
    editJobDuty() {
      this.isEditContext = true;
      this.isDuty = true;
    },
    // 深度拷贝函数
    deepcopy(newobj, oldobj) {
      for (var k in oldobj) {
        //判断我们的属性值属于哪种数据类型
        // 1．获取属性值oldobj[k]
        var item = oldobj[k];
        // 2．判断这个值是否是数组
        if (item instanceof Array) {
          newobj[k] = [];
          this.deepcopy(newobj[k], item);
        } else if (item instanceof Object) {
          // 3．判断这个值是否是对象
          newobj[k] = {};
          this.deepCopy(newobj[k], item);
        } else {
          //4．属于简单数据类型
          newobj[k] = item;
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理修改信息的业务
          this.$bus.$emit("updateJobTable", this.editMessage);
          // 关闭弹窗
          this.close();
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