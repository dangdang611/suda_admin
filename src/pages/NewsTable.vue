<template>
  <div class="tableContainer">
    <div class="search">
      <el-form :inline="true" class="demo-form-inline" label-width="380px">
        <el-form-item>
          <el-input
            v-model="keys"
            placeholder="请输入资讯标题"
            @keyup.enter.native="search"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-bottom: 20px">
      <el-button @click="toggleSelection(showData)">全选</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="delSelection()">删除所有选中的数据</el-button>
      <el-button @click="handleAdd()">新增资讯</el-button>
    </div>
    <div class="content">
      <el-table
        :data="showData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column
          prop="newsId"
          label="资讯ID"
          sortable
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="newsTitle"
          label="资讯标题"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="newsAuthor"
          label="发布者"
          sortable
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="insertTime"
          label="发布时间"
          sortable
          width="180"
          align="center"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ItemPage :count="newsCount" v-show="isItemPage" />

    <div class="modify" v-show="isModify">
      <ModifyNewsMessage :edit="editMessage" />
    </div>
    <div class="modify" v-show="isAdd">
      <AddNews />
    </div>
  </div>
</template>

<script>
import ItemPage from "../components/ItemPage.vue";
import ModifyNewsMessage from "../components/ModifyNewsMessage.vue";
import AddNews from "../components/AddNews.vue";
export default {
  name: "NewsTable",
  data() {
    return {
      keys: "",
      size: 3,
      currentPage: 1,
      isModify: false,
      isAdd: false,
      isItemPage: true,
      multipleSelection: [],
      currentIndex: 0,
      newsCount: 0,
      showData: [
        {
          newsId: "001",
          newsTitle: "测试数据",
          newsAuthor: "国家局",
          insertTime: "2021-05-13",
          newsContext: "123",
          newsContextFormat: "123",
        },
      ],
    };
  },
  components: {
    ItemPage,
    ModifyNewsMessage,
    AddNews,
  },
  computed: {
    // 为了解决编辑没有保存，编辑页面不刷新的bug
    editMessage() {
      if (this.isModify) {
        return this.showData[this.currentIndex];
      } else {
        return {};
      }
    },
  },
  methods: {
    tips(code, message) {
      var type = code === "200" ? "success" : "warning";
      this.$message({
        type: type,
        message: message,
      });
    },
    async search() {
      if (this.keys === "") {
        this.refreshData(this.size, this.currentPage);
      } else {
        // 更新页面，展示搜索数据
        this.showData = await this.$api.news.searchNews(this.keys);
        // 隐藏分页器
        this.isItemPage = false;
      }
    },
    formatter(row) {
      return row.insertTime.substr(0, 10);
    },
    handleEdit(index) {
      this.isModify = true;
      this.currentIndex = index;
    },
    handleAdd() {
      this.isAdd = true;
    },
    async handleDelete(index, row) {
      // 向数据库发送删除请求
      var data = await this.$api.news.delNews(row.newsId);
      // console.log(data);
      this.tips(data.code, data.message);

      // 判断一下是正常显示的数据还是查询数据状态
      // 分页器如果是隐藏状态则表示处于查询数据下的操作，如果是显示状态则是分页显示状态
      if (this.isItemPage) {
        // 刷新页面，恢复分页状态
        this.refreshData(this.size, this.currentPage);
      } else {
        // 继续查询状态
        this.search();
      }
    },
    // 切换选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 保存选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 刷新页面，重新请求数据库
    async refreshData(size, currentPage) {
      if (size) {
        this.size = size;
      } else {
        this.currentPage = currentPage;
      }

      // 更新展示数据
      this.showData = await this.$api.news.getNews(this.currentPage, this.size);
      // 更新分页器
      this.getNewsCount();
    },

    async updateData(message) {
      // 发送请求修改数据
      // 出错点：刷新数据是同步请求，修改数据是异步请求，可能顺序不同，所以使用await、async把所有请求改为同步
      // 注意点：await的表达式需返回一个promise的返回值否则效
      var data = await this.$api.news.updateNews(message);
      this.tips(data.code, data.message);

      // 判断一下是正常显示的数据还是查询数据状态
      // 分页器如果是隐藏状态则表示处于查询数据下的操作，如果是显示状态则是分页显示状态
      if (this.isItemPage) {
        // 刷新页面，恢复分页状态
        this.refreshData(this.size, this.currentPage);
      } else {
        // 继续查询状态
        this.search();
      }
    },

    // 批量删除
    async delSelection() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "您并未选中任何数据",
        });
      } else {
        let newsIds = [];
        this.multipleSelection.forEach((item) => {
          newsIds.push(item.newsId);
        });
        console.log(newsIds);

        // 向数据库发送删除请求
        var data = await this.$api.news.delNewss(newsIds);
        this.tips(data.code, data.message);

        // 判断一下是正常显示的数据还是查询数据状态
        // 分页器如果是隐藏状态则表示处于查询数据下的操作，如果是显示状态则是分页显示状态
        if (this.isItemPage) {
          // 刷新页面，恢复分页状态
          this.refreshData(this.size, this.currentPage);
        } else {
          // 继续查询状态
          this.search();
        }
      }
    },
    // 获取用户总数
    async getNewsCount() {
      this.isItemPage = true;
      this.newsCount = await this.$api.news.getNewsCount();
    },
    closeModify() {
      this.isModify = false;
    },
    closeAdd() {
      this.isAdd = false;
    },
    async addNews(news) {
      var data = await this.$api.news.addNews(news);
      this.tips(data.code, data.message);

      // 刷新页面
      this.refreshData(this.size, this.currentPage);
    },
  },
  mounted() {
    this.$bus.$on("refreshNewsTable", this.refreshData);
    this.$bus.$on("closeModify", this.closeModify);
    this.$bus.$on("updateNewsTable", this.updateData);
    this.$bus.$on("AddNewsTable", this.addNews);
    this.$bus.$on("closeAdd", this.closeAdd);
    // 手动调用
    this.refreshData(3, 1);
  },
  destroyed() {
    this.$bus.$off("refreshNewsTable");
    this.$bus.$off("closeModify");
    this.$bus.$off("updateNewsTable");
    this.$bus.$off("AddNewsTable");
    this.$bus.$off("closeAdd");
  },
};
</script>

<style lang='less' scoped>
.search /deep/.el-input__inner {
  width: 380px;
}
.modify {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 103;
}
</style>