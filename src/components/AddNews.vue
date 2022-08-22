<template>
  <div class="anContainer">
    <div class="header">
      <h3>新增新闻资讯信息</h3>
      <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="modifyContent">
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
            <el-form-item label="资讯标题" prop="newsTitle">
              <el-input
                v-model="editMessage.newsTitle"
                clearable
                placeholder="请填写资讯标题"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="发布者" prop="newsAuthor">
              <el-input
                v-model="editMessage.newsAuthor"
                placeholder="请填写发布者"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="发布日期" prop="newsDate">
              <el-date-picker
                v-model="editMessage.newsDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="发布内容">
              <el-button @click="editNewsContext">去编写资讯内容</el-button>
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
  name: "AddNews",
  data() {
    return {
      isEditContext: false,
      editMessage: {
        newsTitle: "",
        newsAuthor: "",
        newsDate: "",
        newsContext: "",
        newsContextFormat: "",
      },
      rules: {
        newsTitle: [
          {
            trigger: "blur",
            required: true,
            message: "资讯标题不能省略",
          },
        ],
        newsAuthor: [
          { trigger: "blur", required: true, message: "发布者不能省略" },
        ],
        newsDate: [
          { trigger: "blur", required: true, message: "发布时间不能省略" },
        ],
        newsContext: [
          { trigger: "blur", required: true, message: "内容不能省略" },
        ],
      },
      // 禁用未来选择日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  components: { TestPage },
  methods: {
    close() {
      this.$bus.$emit("closeAdd");
      // 关闭添加并清空表单
      this.$refs["edit"].resetFields();
    },
    editNewsContext() {
      this.isEditContext = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理修改信息的业务
          this.$bus.$emit("AddNewsTable", this.editMessage);
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
      this.editMessage.newsContext = render;
      this.editMessage.newsContextFormat = value;
    });
    this.$bus.$on("closeContext", () => {
      this.isEditContext = false;
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
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 700px;
  height: 420px;
  border-top: 2px solid #409eff;
  background-color: #fff;

  .header {
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
  position: relative;
  padding: 10px 80px 20px 50px;

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