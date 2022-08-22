<template>
  <div class="hContainer">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
    >
      <el-menu-item index="1" :route="{ path: '/index' }"
        >处理中心</el-menu-item
      >
      <el-menu-item index="2" :route="{ path: '/virtualPost' }">
        虚拟POST机</el-menu-item
      >
      <!-- <el-submenu index="2" disabled>
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu> -->
      <el-menu-item index="5" class="headPho">
        <div>
          <img src="../assets/headPho.jpg" alt="" />
        </div>
      </el-menu-item>
      <el-menu-item class="state">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>开发者信息</el-dropdown-item>
            <el-dropdown-item divided disabled>南风知我意</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang='less' scoped>
.hContainer {
  padding: 0 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;

  .logo {
    flex: 0;
    img {
      height: 35px;
    }
  }
  .el-menu {
    .state {
      padding: 0;
    }

    .headPho {
      display: flex;
      align-items: center;
      padding-right: 0;
      div {
        overflow: hidden;
        width: 40px;
        height: 40px;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          vertical-align: top !important;
        }
      }
    }
  }
}
</style>