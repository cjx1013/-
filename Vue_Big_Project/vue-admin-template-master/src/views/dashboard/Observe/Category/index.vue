<template>
  <el-card style="margin-top:10px">
    <div slot="header" class="header">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="value">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div ref="charts" class="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Category',
  data() {
    return {
      value: '全部渠道'
    }
  },
  mounted() {
    let myChart = echarts.init(this.$refs.charts)
    myChart.setOption({
      title: {
        text: 'Search Engine',
        subText: '1048',
        left: 'center',
        top: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
    // 绑定事件
    myChart.on('mouseover', (params) => {
      // 获取鼠标移上去的那条数据
      const { name, value } = params.data
      myChart.setOption({
        title: {
          text: name,
          subText: value
        }
      })
    })
  }
}
</script>

<style>
  .category-header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header{
    border-bottom: 1px solid #eee;
  }
  .charts{
    width: 100%;
    height: 237px;
  }
</style>
