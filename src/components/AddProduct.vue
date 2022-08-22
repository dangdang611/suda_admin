<template>
  <div class="modifyContainer">
    <div class="header">
      <h3>新增产品信息</h3>
      <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="modifyContent">
      <h3>产品信息</h3>
      <el-form
        :model="editMessage"
        ref="edit"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <ul>
          <li>
            <el-form-item label="产品名" prop="expressProduct">
              <el-input
                v-model="editMessage.expressProduct"
                clearable
                placeholder="请填写产品名"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="省内计费规则" prop="expressAccountingRuleIn">
              <el-input
                v-model="editMessage.expressAccountingRuleIn"
                placeholder="请填写省内计费规则"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="省外计费规则" prop="expressAccountingRuleOut">
              <el-input
                v-model="editMessage.expressAccountingRuleOut"
                placeholder="请填写省外计费规则"
              ></el-input>
            </el-form-item>
          </li>
        </ul>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="submitForm('edit')">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProduct",
  data() {
    return {
      editMessage: {
        expressProduct: "",
        expressAccountingRuleIn: "",
        expressAccountingRuleOut: "",
      },
      rules: {
        expressProduct: [
          {
            trigger: "blur",
            required: true,
            message: "产品名不能省略",
          },
        ],
        expressAccountingRuleIn: [
          { trigger: "blur", required: true, message: "省内计费规则不能省略" },
        ],
        expressAccountingRuleOut: [
          { trigger: "blur", required: true, message: "省外计费规则不能省略" },
        ],
      },
    };
  },
  methods: {
    close() {
      this.$bus.$emit("closeAdd");
      // 关闭添加并清空表单
      this.$refs["edit"].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理修改信息的业务
          this.$bus.$emit("AddProductTable", this.editMessage);
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
};
</script>

<style lang="less" scoped>
.modifyContainer {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 620px;
  height: 360px;
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
</style>