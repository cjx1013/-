<template>
  <div ref="chart" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarChart',
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
          type: 'bar',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44, 23, 16, 21],
        }
      ],
      // 设置坐标轴样式
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      // 提示信息
      tooltip: {}
    }
    lineChart.setOption(option)
  }
}
</script>

<style>
    .charts{
        width: 100%;
        height: 100%;
    }
</style>
