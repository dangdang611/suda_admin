<template>
  <div class="homeContainer">
    <div class="items">
      <div>
        <img
          src="https://mapapi.qq.com/web/lbs/console/v/images/todo_order.f979f04.png"
          alt=""
        />
        <h4>今日新增用户</h4>
        <h3>{{ viewData.userAddNums[viewData.userAddNums.length - 1] }}</h3>
        <h6>总用户数：{{ viewData.userNums }}</h6>
      </div>
      <div>
        <img
          src="	https://mapapi.qq.com/web/lbs/console/v/images/todo_ticket.fee2f74.png"
          alt=""
        />
        <h4>今日新增订单</h4>
        <h3>
          {{ viewData.userOrderAddNums[viewData.userOrderAddNums.length - 1] }}
        </h3>
        <h6>总订单数：{{ viewData.userOrderNums }}</h6>
      </div>
      <div>
        <img
          src="https://mapapi.qq.com/web/lbs/console/v/images/todo_monitor.dd6ad34.png"
          alt=""
        />
        <h4>今日网站浏览量</h4>
        <h3>
          {{ viewData.pageViewAddNums[viewData.pageViewAddNums.length - 1] }}
        </h3>
        <h6>总浏览量数：{{ viewData.pageViews }}</h6>
      </div>
    </div>
    <div id="myChart"></div>
  </div>
</template>

<script>
export default {
  name: "MyHome",
  data() {
    return {
      viewData: {
        pageViewAddNums: [12, 19, 21, 1, 3, 23, 12],
        pageViews: 100,
        userAddNums: [1, 2, 3, 5, 2, 3, 4],
        userNums: 4,
        userOrderAddNums: [1, 2, 3, 1, 2, 1, 5],
        userOrderNums: 10,
      },
      sourceData: [
        {
          product: "3/29",
          新增用户: 83.1,
          新增订单: 73.4,
          新增浏览量: 55.1,
        },
        {
          product: "3/30",
          新增用户: 86.4,
          新增订单: 65.2,
          新增浏览量: 82.5,
        },
        {
          product: "3/31",
          新增用户: 72.4,
          新增订单: 53.9,
          新增浏览量: 39.1,
        },
        {
          product: "4/1",
          新增用户: 71.4,
          新增订单: 56,
          新增浏览量: 30,
        },
        {
          product: "4/2",
          新增用户: 22.4,
          新增订单: 51.9,
          新增浏览量: 49.1,
        },
        {
          product: "4/3",
          新增用户: 45.4,
          新增订单: 51.9,
          新增浏览量: 49.1,
        },
        {
          product: "4/4",
          新增用户: 43.3,
          新增订单: 85.8,
          新增浏览量: 93.7,
        },
      ],
    };
  },

  async mounted() {
    // bug:控制台报错
    try {
      // // 获取并更新七天的数据
      this.viewData = await this.$api.home.getData();

      // 处理数据格式
      for (let i = 0; i < 7; i++) {
        this.sourceData[i] = {
          product: "6/" + (1 + i),
          新增用户: this.viewData.userAddNums[i],
          新增订单: this.viewData.userOrderAddNums[i],
          新增浏览量: this.viewData.pageViewAddNums[i],
        };
      }
    } catch (error) {
      this.$message({
        type: "warning",
        message: "连接服务器失败",
      });
    }

    this.drawLine();
  },

  methods: {
    drawLine() {
      let option = {
        title: {
          text: "近七天数据趋势图",
          textStyle: {
            color: "#409eff",
            fontWeight: "normal",
          },
          bottom: 0,
          left: "42%",
        },
        // 调色盘。
        color: ["#5daaff", "#a18aff", "#ff937f"],

        legend: {},
        tooltip: {},
        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射
          dimensions: ["product", "新增用户", "新增订单", "新增浏览量"],
          source: this.sourceData,
        },
        xAxis: {
          type: "category",
          name: "日期",
          axisLine: {
            symbol: ["none", "arrow"],
            lineStyle: {
              type: "solid",
              color: "#666",
            },
          },
        },
        yAxis: {
          name: "数量",
          axisLine: {
            symbol: ["none", "arrow"],
            lineStyle: {
              type: "solid",
              color: "#666",
            },
          },
        },
        series: [
          {
            type: "line",
            label: {
              show: false,
              position: "bottom",
              textStyle: {
                fontSize: 16,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            type: "line",
            label: {
              show: false,
              position: "bottom",
              textStyle: {
                fontSize: 16,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
          {
            type: "line",
            label: {
              show: false,
              position: "bottom",
              textStyle: {
                fontSize: 16,
              },
            },
            emphasis: {
              label: {
                show: true,
              },
            },
          },
        ],
      };

      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
.homeContainer {
  height: 100%;
  display: flex;
  flex-direction: column;

  .items {
    display: flex;
    justify-content: space-around;

    div {
      position: relative;
      flex: 1;
      height: 120px;
      padding: 20px;
      margin-left: 20px;
      border-radius: 15px;
      color: #ffff;

      h3 {
        margin: 10px 0;
      }

      img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 37%;
        max-width: 140px;
      }
    }

    div:nth-child(1) {
      box-shadow: 0 12px 24px 0 rgb(112 183 255 / 50%);
      background-image: linear-gradient(294deg, #5daaff, #3293ff);
    }

    div:nth-child(2) {
      box-shadow: 0 12px 24px 0 rgb(154 139 255 / 50%);
      background-image: linear-gradient(294deg, #a18aff, #a864ff);
    }
    div:nth-child(3) {
      box-shadow: 0 12px 24px 0 rgb(255 152 132 / 50%);
      background-image: linear-gradient(293deg, #ff937f, #ff5957);
    }
  }
  #myChart {
    flex: 1;
    margin-top: 20px;
    width: 100%;

    /deep/ div > canvas {
      top: 20px !important;
    }
  }
}
</style>
