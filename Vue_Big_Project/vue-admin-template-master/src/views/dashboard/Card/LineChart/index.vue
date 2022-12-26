<template>
  <div ref="chart" class="charts"></div>
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
            color: 'purple'
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
                offset: 0, color: 'purple' // 0% 处的颜色
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
    .charts{
        width: 100%;
        height: 100%;
    }
</style>
