<template>
  <div class="tableContainer">
    <div class="search">
      <el-form :inline="true" class="demo-form-inline" label-width="380px">
        <el-form-item>
          <el-input
            v-model="keys"
            placeholder="请输入产品名"
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
      <el-button @click="handleAdd()">新增产品</el-button>
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
          prop="expressId"
          label="产品ID"
          sortable
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="expressProduct"
          label="产品名"
          sortable
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="expressAccountingRuleIn"
          label="省内计费规则"
          sortable
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="expressAccountingRuleOut"
          label="省外计费规则"
          sortable
          width="200"
          align="center"
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
    <ItemPage :count="productCount" v-show="isItemPage" />

    <div class="modify" v-show="isModify">
      <ModifyProductMessage :edit="editMessage" />
    </div>
    <div class="modify" v-show="isAdd">
      <AddProduct />
    </div>
  </div>
</template>

<script>
import ItemPage from "../components/ItemPage.vue";
import ModifyProductMessage from "../components/ModifyProductMessage.vue";
import AddProduct from "../components/AddProduct.vue";
export default {
  name: "ProductTable",
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
      productCount: 0,
      showData: [
        {
          expressId: "001",
          expressProduct: "速达标快",
          expressAccountingRuleIn: 16,
          expressAccountingRuleOut: 15,
        },
      ],
    };
  },
  components: {
    ItemPage,
    ModifyProductMessage,
    AddProduct,
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
        this.showData = await this.$api.product.searchProduct(this.keys);
        // 隐藏分页器
        this.isItemPage = false;
      }
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
      var data = await this.$api.product.delProduct(row.expressId);
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
      this.showData = await this.$api.product.getProduct(
        this.currentPage,
        this.size
      );
      // 更新分页器
      this.getProductCount();
    },

    async updateData(message) {
      // 发送请求修改数据
      // 出错点：刷新数据是同步请求，修改数据是异步请求，可能顺序不同，所以使用await、async把所有请求改为同步
      // 注意点：await的表达式需返回一个promise的返回值否则效
      var data = await this.$api.product.updateProduct(message);
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
        let expressIds = [];
        this.multipleSelection.forEach((item) => {
          expressIds.push(item.expressId);
        });
        console.log(expressIds);

        // 向数据库发送删除请求
        var data = await this.$api.product.delProducts(expressIds);
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
    // 获取产品总数
    async getProductCount() {
      this.isItemPage = true;
      this.productCount = await this.$api.product.getProductCount();
    },

    closeModify() {
      this.isModify = false;
    },
    closeAdd() {
      this.isAdd = false;
    },
    async addProduct(product) {
      var data = await this.$api.product.addProduct(product);
      this.tips(data.code, data.message);

      // 刷新页面
      this.refreshData(this.size, this.currentPage);
    },
  },
  mounted() {
    this.$bus.$on("refreshProductTable", this.refreshData);
    this.$bus.$on("closeModify", this.closeModify);
    this.$bus.$on("updateProductTable", this.updateData);
    this.$bus.$on("AddProductTable", this.addProduct);
    this.$bus.$on("closeAdd", this.closeAdd);
    // 手动调用
    this.refreshData(3, 1);
  },
  destroyed() {
    this.$bus.$off("refreshProductTable");
    this.$bus.$off("closeModify");
    this.$bus.$off("updateProductTable");
    this.$bus.$off("AddProductTable");
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