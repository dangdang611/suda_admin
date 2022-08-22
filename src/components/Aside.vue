<template>
  <div class="asContainer">
    <el-menu
      default-active="1"
      :router="true"
      :unique-opened="true"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <!-- 当el-menu开启了vue-router模式，那么默认以index的值为路径跳转，但如果index对应的el-menu-item配置了route对象，则以整个路由对象的配置为准 -->
      <el-menu-item index="1" :route="{ path: '/home' }">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-folder"></i>
          <span>数据管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">用户数据</template>
          <el-menu-item index="2-1" :route="{ path: '/userLists' }"
            >用户列表</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">产品与服务数据</template>
          <el-menu-item index="2-2" :route="{ path: '/productLists' }"
            >产品列表</el-menu-item
          >
          <el-menu-item index="2-3" :route="{ path: '/packageLists' }"
            >服务列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="3-1" :route="{ path: '/undisposedOrder' }"
          >待处理订单</el-menu-item
        >
        <el-menu-item index="3-2" :route="{ path: '/goingOrder' }"
          >进行中订单</el-menu-item
        >
        <el-menu-item index="3-3" :route="{ path: '/finishedOrder' }"
          >已完成订单</el-menu-item
        >
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">新闻资讯</template>
          <el-menu-item index="4-1" :route="{ path: '/newsLists' }"
            >资讯列表</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">招聘信息</template>
          <el-menu-item index="4-3" :route="{ path: '/jobLists' }"
            >招聘信息列表</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MyAside",
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.active {
  color: #409eff;
}
.asContainer {
  /deep/ .el-menu {
    height: 100%;
  }
}
</style>
