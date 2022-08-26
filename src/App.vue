<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "App",

  async mounted() {
    let result = await this.$api.server.login();

    // 创建一个有效时间为1天的cookie来存储token
    Cookies.set("rootTaken", result.rootTaken, { expires: 1 });
  },

  async unmounted() {
    await this.$api.server.logout();
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul li {
  list-style: none;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
