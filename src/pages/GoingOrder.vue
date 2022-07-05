<template>
  <div class="tableContainer">
    <div class="search">
      <el-form :inline="true" class="demo-form-inline" label-width="380px">
        <el-form-item>
          <el-input
            v-model="keys"
            placeholder="请输入寄件账户"
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
    </div>
    <div class="content">
      <el-table
        :data="showData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单ID">
                <span>{{ props.row.orderId }}</span>
              </el-form-item>
              <el-form-item label="总计运费">
                <span>￥{{ props.row.orderPrice }}</span>
              </el-form-item>
              <el-form-item label="支付方式">
                <span>{{ props.row.orderPayment == 1 ? "到付" : "现付" }}</span>
              </el-form-item>
              <el-form-item label="物品类型">
                <span>{{ props.row.orderItemType }}</span>
              </el-form-item>
              <el-form-item label="物品重量">
                <span>{{ props.row.orderWeight }}KG</span>
              </el-form-item>
              <el-form-item label="快递服务">
                <span>{{ props.row.expressProduct }}</span>
              </el-form-item>
              <el-form-item label="寄件地址">
                <span>{{ props.row.orderAddressFrom }}</span>
              </el-form-item>
              <el-form-item label="收件地址">
                <span>{{ props.row.orderAddressTo }}</span>
              </el-form-item>
              <el-form-item label="用户备注">
                <span>{{ props.row.orderUserDetail }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="寄件账户"
          prop="userAccount"
          align="center"
          width="200"
        >
        </el-table-column>
        <el-table-column label="寄件人" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.orderNameFrom }}</div>
            <span>{{ scope.row.orderPhoneFrom }}</span>
          </template>
        </el-table-column>
        <el-table-column label="收件人" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.orderNameTo }}</div>
            <span>{{ scope.row.orderPhoneTo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发往地" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.orderAddressFrom[0] }}</span>
            —— <span>{{ scope.row.orderAddressTo[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
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
    <ItemPage :count="orderCount" v-show="isItemPage" />
  </div>
</template>

<script>
import ItemPage from "../components/ItemPage.vue";

export default {
  name: "FinishedOrder",
  data() {
    return {
      keys: "",
      size: 3,
      currentPage: 1,
      isItemPage: true,
      multipleSelection: [],
      orderCount: 0,
      showData: [
        {
          expressProduct: "速达特快",
          orderAddressFrom: "上海-黄浦区-星光大道",
          orderAddressTo: "广东-广州市",
          orderCompanyFrom: "",
          orderCompanyTo: "",
          orderFixedPhoneFrom: "",
          orderFixedPhoneTo: "",
          orderId: 123,
          orderItemType: "衣服",
          orderNameFrom: "李丹",
          orderNameTo: "张三",
          orderPayment: 0,
          orderPhoneFrom: "18613832197",
          orderPhoneTo: "1728392121",
          orderPrice: 12,
          orderUserDetail: "小心",
          orderWeight: 1.5,
          userAccount: "18613832197",
        },
      ],
    };
  },
  components: {
    ItemPage,
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
        this.showData = await this.$api.order.searchOrder(this.keys, 2);
        // 隐藏分页器
        this.isItemPage = false;
      }
    },
    async handleDelete(index, row) {
      // 向数据库发送删除请求
      var data = await this.$api.order.delOrder(row.orderId);
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
      this.showData = await this.$api.order.getOrder(
        2,
        this.currentPage,
        this.size
      );

      // 为了省市区的回显，将大地址转化为数组
      this.showData.forEach((item) => {
        item.orderAddressFrom = item.orderAddressFrom.split(",");
        item.orderAddressTo = item.orderAddressTo.split(",");
      });

      // 更新分页器
      this.getOrderCount();
    },

    async updateData(message) {
      // 发送请求修改数据
      // 出错点：刷新数据是同步请求，修改数据是异步请求，可能顺序不同，所以使用await、async把所有请求改为同步
      // 注意点：await的表达式需返回一个promise的返回值否则效
      var data = await this.$api.order.updateOrder(message);
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
        let orderIds = [];
        this.multipleSelection.forEach((item) => {
          orderIds.push(item.orderId);
        });
        console.log(orderIds);

        // 向数据库发送删除请求
        var data = await this.$api.order.delOrders(orderIds);
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
    async getOrderCount() {
      this.isItemPage = true;
      this.orderCount = await this.$api.order.getOrderCount();
    },
    closeModify() {
      this.isModify = false;
    },
  },
  mounted() {
    this.$bus.$on("refreshOrderTable", this.refreshData);
    this.$bus.$on("closeModify", this.closeModify);
    this.$bus.$on("updateOrderTable", this.updateData);
    // 手动调用
    this.refreshData(3, 1);
  },
  destroyed() {
    this.$bus.$off("refreshOrderTable");
    this.$bus.$off("closeModify");
    this.$bus.$off("updateOrderTable");
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
.demo-table-expand {
  font-size: 0;
  padding: 0 100px;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>