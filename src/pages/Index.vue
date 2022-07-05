<template>
  <div class="IndexContainer">
    <Header class="header"></Header>
    <div class="content">
      <Aside class="left"></Aside>
      <div class="right">
        <div class="welcome">您好 ！欢迎来到速达物流服务平台！</div>
        <div class="view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";

export default {
  name: "MyIndex",
  components: { Header, Aside },
  data() {
    return {
      activeIndex: 1,
    };
  },
  mounted() {
    this.$router.replace({
      path: "/home",
    });
  },
};
</script>

<style lang="less" scoped>
.IndexContainer {
  display: flex;
  flex-direction: column; //布局方向为纵向，flex机会代表高度
  height: 100%; //代表整个页面是100%
  background-color: rgb(244, 246, 249);

  .header {
    flex: 0; //header不占任何高度比例
  }
  .content {
    flex: 1; //除header的固定高度外，content占整个父元素container剩下的100%高度
    display: flex; //content容器中的元素横向排列，flex机会代表宽度

    .left {
      height: 100%; //高度为父元素的100%
      width: 18%; //宽度占父元素content的18%
    }
    .right {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%; //高度为父元素的100%
      flex: 1; //宽度是content18%剩下的82%
      padding: 15px;
      box-sizing: border-box; //保证padding和border不会挤大盒子

      .welcome {
        flex: 0; //不占父盒子高度比
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
      }
      .view {
        flex: 1; //除welcome固定高度外，view占整个父元素right剩下的100%高度
        padding: 20px 30px;
        background-color: #fff;
      }
    }
  }
}
</style>