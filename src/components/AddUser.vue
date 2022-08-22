<template>
  <div class="modifyContainer">
    <div class="header">
      <h3>新增用户信息</h3>
      <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="modifyContent">
      <h3>用户信息</h3>
      <el-form
        :model="editMessage"
        :rules="rules"
        ref="edit"
        label-width="100px"
        class="demo-ruleForm"
      >
        <ul>
          <li>
            <el-form-item label="账号/手机号" prop="userAccount">
              <el-input
                v-model="editMessage.userAccount"
                clearable
                placeholder="请填写手机号"
              ></el-input>
            </el-form-item>
          </li>
          <li>
            <el-form-item label="密码" prop="userPassword">
              <el-input
                v-model="editMessage.userPassword"
                placeholder="请填写密码"
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
  name: "AddUser",
  data() {
    // 手机号验证
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空！"));
      } else {
        //校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~173、176~178。14号段为上网卡专属号段
        let regs =
          /^((13[0-9])|(17[0-3,6-8])|(15[^4,\\D])|(18[0-9])|(19[8-9]))\d{8}$/;

        if (value.length != 11 || !regs.test(value)) {
          return callback([new Error("手机号输入不合法！")]);
        } else {
          callback();
        }
      }
    };
    return {
      editMessage: {
        userAccount: "",
        userPassword: "",
      },
      rules: {
        userAccount: [
          {
            validator: checkTel,
            trigger: "blur",
            required: true,
          },
        ],
        userPassword: [
          { trigger: "blur", required: true, message: "密码不能为空" },
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
          this.$bus.$emit("AddUserTable", this.editMessage);
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
  width: 600px;
  height: 300px;
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