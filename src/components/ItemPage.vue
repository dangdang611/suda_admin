<template>
  <div class="itemPage">
    <el-pagination
      background
      layout="prev, pager, next, sizes"
      :total="count"
      :page-size="3"
      :page-sizes="[3, 5]"
      @size-change="sizeChange"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ItemPage",
  props: ["count"],
  methods: {
    sizeChange(size) {
      if (this.$route.name === "userLists") {
        this.$bus.$emit("refreshUserTable", size, undefined);
      } else if (this.$route.name === "productLists") {
        this.$bus.$emit("refreshProductTable", size, undefined);
      } else if (this.$route.name === "packageLists") {
        this.$bus.$emit("refreshPackageTable", size, undefined);
      } else if (this.$route.name === "newsLists") {
        this.$bus.$emit("refreshNewsTable", size, undefined);
      } else if (this.$route.name === "jobLists") {
        this.$bus.$emit("refreshJobTable", size, undefined);
      } else {
        this.$bus.$emit("refreshOrderTable", size, undefined);
      }
    },
    currentChange(currentPage) {
      if (this.$route.name === "userLists") {
        this.$bus.$emit("refreshUserTable", undefined, currentPage);
      } else if (this.$route.name === "productLists") {
        this.$bus.$emit("refreshProductTable", undefined, currentPage);
      } else if (this.$route.name === "packageLists") {
        this.$bus.$emit("refreshPackageTable", undefined, currentPage);
      } else if (this.$route.name === "newsLists") {
        this.$bus.$emit("refreshNewsTable", undefined, currentPage);
      } else if (this.$route.name === "jobLists") {
        this.$bus.$emit("refreshJobTable", undefined, currentPage);
      } else {
        this.$bus.$emit("refreshOrderTable", undefined, currentPage);
      }
    },
  },
};
</script>

<style lass="less" scoped>
.itemPage {
  margin-top: 30px;
  width: 100%;
  text-align: center;
}
</style>