<template>
  <div class="modifyContainer">
    <div class="header">
      <h3>修改产品信息</h3>
      <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="modifyContent">
      <h3>产品信息</h3>
      <el-form
        :model="editMessage"
        ref="edit"
        label-width="100px"
        class="demo-ruleForm"
      >
        <ul>
          <li>
            <el-form-item label="产品ID" prop="expressId">
              <el-input
                v-model="editMessage.expressId"
                clearable
                disabled
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="产品名" prop="expressProduct">
              <el-input
                v-model="editMessage.expressProduct"
                clearable
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
                placeholder="请省外计费规则"
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
import _ from "lodash";
export default {
  name: "ModifyProductMessage",
  data() {
    return {
      editMessage: this.edit,
    };
  },
  props: ["edit"],
  watch: {
    edit: {
      immediate: true,
      deep: true,
      handler(newValue) {
        // 深度拷贝，不影响父组件数据
        this.editMessage = _.cloneDeep(newValue);
      },
    },
  },
  methods: {
    close() {
      this.$bus.$emit("closeModify");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 处理修改信息的业务
          this.$bus.$emit("updateProductTable", this.editMessage);
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
};
</script>

<style lang="less" scoped>
.modifyContainer {
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
}
</style>