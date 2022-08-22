<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
