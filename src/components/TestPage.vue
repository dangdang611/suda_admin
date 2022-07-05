<template>
  <div class="tpContainer">
    <mavon-editor
      v-model="value"
      @save="save"
      ref="md"
      :scrollStyle="true"
      :shortCut="false"
    />
    <div class="btn">
      <el-button @click="cancelEdit">取消编辑</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestPage",
  data() {
    return {
      value: "",
    };
  },
  props: ["contextFormat"],
  watch: {
    contextFormat: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          //保证子组件挂载完成之后赋值
          this.value = newValue;
        });
      },
    },
  },
  methods: {
    save(value, render) {
      this.$bus.$emit("getContext", value, render);
      this.$bus.$emit("closeContext");
      this.value = "";
    },
    cancelEdit() {
      this.$bus.$emit("closeContext");
      this.value = "";
    },
  },
};
</script>

<style lang="less" scoped>
.tpContainer {
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 800px;
  height: 500px;
  border-top: 2px solid #409eff;
  background-color: #fff;

  .v-note-wrapper {
    width: 800px !important;
    height: 450px !important;
  }

  .btn {
    text-align: right;
    margin-right: 10px;
    /deep/ .el-button {
      margin-top: 10px;
      padding: 8px 17px;
    }
  }
}
</style>