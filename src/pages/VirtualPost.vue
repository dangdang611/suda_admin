<template>
  <div class="vpContainer">
    <div class="content">
      <h3>虚拟POST机</h3>
      <div class="dispose">
        <el-form :inline="true" class="demo-form-inline" label-width="380px">
          <el-form-item>
            <el-input v-model="orderId" placeholder="请输入订单ID"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="commit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="tips">该订单到达下一站点：{{ location }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualPost",
  data() {
    return {
      orderId: "",
      location: "",
    };
  },
  methods: {
    async commit() {
      console.log(this.orderId);
      this.location = await this.$api.post.postSend(this.orderId);
    },
  },
};
</script>

<style lang='less' scoped>
.vpContainer {
  overflow: hidden;
  background: whitesmoke;
  width: 100%;
  height: 100%;

  .content {
    margin: 0px auto;
    width: 600px;
    height: 100%;
    padding: 30px;
    background-color: #fff;

    h3 {
      margin: 10px;
      font-weight: normal;
    }

    .dispose /deep/.el-input__inner {
      width: 400px;
    }

    .tips {
      font-size: 12px;
      color: #5e5a5a8c;
    }
  }
}
</style>