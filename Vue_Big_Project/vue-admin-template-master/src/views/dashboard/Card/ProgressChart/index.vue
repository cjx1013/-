<template>
  <div ref="chart" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'ProgressChart',
  mounted() {
    let lineChart = echarts.init(this.$refs.chart)
    let option = {
      xAxis: {
        // 隐藏x轴
        show: false,
        // 设置最小值和最大值
        min: 0,
        max: 100
      },
      yAxis: {
        // 隐藏y轴
        show: false,
        // y轴均分
        type: 'category',
      },
      series: [
        {
          type: 'bar',
          data: [78],
          // 设置柱状图宽度
          barWidth: 10,
          // 设置颜色
          color: 'yellowgreen',
          // 展示背景色
          showBackground: true,
          // 设置背景颜色
          backgroundStyle: {
            color: '#eee'
          },
          // 图形的文本标签
          label: {
            show: true,
            // 设置标签内容
            formatter: '|',
            // 设置标签位置
            position: 'right'
          }
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
