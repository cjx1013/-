<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <!--头部左侧内容-->
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>
        <!--头部右侧内容-->
        <div class="right">
          <span @click="setDay">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd"
            class="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          >
          </el-date-picker>
        </div>
      </div>
      <!--中间内容-->
      <div>
        <el-row :gutter="10">
          <el-col :span="16">
            <!-- <span>销售额趋势</span> -->
            <div ref="chart" class="chart"></div>
          </el-col>
          <el-col :span="8">
            <span>门店{{ title }}排名</span>
            <ul>
              <li>
                <span class="number">1</span>
                <span>肯德基</span>
                <span class="saleNum">326541</span>
              </li>
              <li>
                <span class="number">2</span>
                <span>麦当劳</span>
                <span class="saleNum">214684</span>
              </li>
              <li>
                <span class="number">3</span>
                <span>肯德基</span>
                <span class="saleNum">326541</span>
              </li>
              <li>
                <span>4</span>
                <span>肯德基</span>
                <span class="saleNum">326541</span>
              </li>
              <li>
                <span>5</span>
                <span>肯德基</span>
                <span class="saleNum">326541</span>
              </li>
              <li>
                <span>6</span>
                <span>肯德基</span>
                <span class="saleNum">326541</span>
              </li>
              <li>
                <span>7</span>
                <span>肯德基</span>
                <span class="saleNum">326541</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'sale',
      mychart: null,
      date: []
    }
  },
  computed: {
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量'
    },
    ...mapState('home', { 'listState': 'list' })
  },
  watch: {
    title() {
      // console.log(33)
      this.mychart.setOption({
        title: {
          text: this.title + '趋势'
        },
        xAxis: [
          {
            data: this.title === '销售额' ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis,
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.title === '销售额' ? this.listState.orderFullYear : this.listState.userFullYear
          }
        ]
      })
    },
    listState() {
      this.mychart.setOption({
        xAxis: [
          {
            data: this.listState.orderFullYearAxis
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.listState.orderFullYear
          }
        ]
      })
    }
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.chart)
    let option = {
      title: {
        text: this.title + '趋势'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.title === '销售额' ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: this.title === '销售额' ? this.listState.orderFullYear : this.listState.userFullYear
        }
      ]
    }
    this.mychart.setOption(option)
  },
  methods: {
    setDay() {
      // console.log(dayjs().format('YYYY-MM-DD'))
      let now = dayjs().format('YYYY-MM-DD')
      this.date = [now, now]
    },
    setWeek() {
      let start = dayjs().day(1).format('YYYY-MM-DD')
      let end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMonth() {
      let start = dayjs().startOf('month').format('YYYY-MM-DD')
      let end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      let start = dayjs().startOf('year').format('YYYY-MM-DD')
      let end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style scoped>
  .clearfix{
    display: flex;
    position: relative;
    justify-content: space-between;
  }
  .tab{
    width: 100%;
  }
  .right{
    position: absolute;
    right: 0;
  }
  .clearfix span{
    margin: 0px 10px;
    cursor: pointer;
  }
  .date{
    width: 200px;
    margin: 0 20px;
  }
  .chart{
    width: 100%;
    height: 300px;
  }
  ul{
    list-style: none;
    padding: 0;
    widows: 100%;
    height: 300px;
  }
  ul li{
    height: 8%;
    margin: 10px 0;
  }
  ul li span{
    margin: 0 20px;
  }
  .number{
    float: left;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #000;
    color:#fff;
    line-height: 15px;
    text-align: center;
  }
  .saleNum{
    float: right;
  }
</style>
