<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg t="1670310330305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3801" width="26" height="26">
        <path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" p-id="3802" fill="#8a8a8a"></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">4654</span>
      <span class="main-content">4774</span>
      <svg t="1670310237701" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2790" width="16" height="16">
        <path d="M960 704L512 256l-448 448z" fill="#1afa29" p-id="2791"></path>
      </svg>
      <svg t="1670311437557" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5081" width="16" height="16">
        <path d="M64 320l448 448 448-448z" fill="#d81e06" p-id="5082"></path>
      </svg>
    </div>
    <div class="footer">
      <div ref="chart" class="chart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  mounted() {
    let lineChart = echarts.init(this.$refs.chart)
    let option = {
      xAxis: {
        // 隐藏x轴
        show: false,
        // 类目轴，适用于离散的类目数据
        type: 'category'
      },
      yAxis: {
        // 隐藏y轴
        show: false
      },
      series: [
        {
          type: 'line',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          // 设置拐点样式
          itemStyle: {
            opacity: 0
          },
          // 设置线条样式
          lineStyle: {
            color: 'skyblue'
          },
          // 区域填充样式
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'skyblue' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          // 是否平滑曲线显示
          smooth: true
        }
      ],
      // 设置坐标轴样式
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
    lineChart.setOption(option)
  }
}
</script>

<style>
  .header{
    display: flex;
    align-items: center;
  }
  .search-header{
    margin-right: 20px;
  }
  .main{
    margin: 10px 0;
  }
  .main-title{
    margin-right: 30px
  }
  .main-content{
    margin-right: 10px
  }
  .chart{
    width: 100%;
    height: 50px;
  }
</style>
