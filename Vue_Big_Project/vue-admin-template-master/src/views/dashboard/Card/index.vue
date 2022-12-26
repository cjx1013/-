<template>
  <div>
    <!--使用elementui的布局-->
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" count="￥8888">
            <template slot="charts">
              <span>周同比&nbsp;56.78%
                <svg t="1670310237701" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2790" width="16" height="16">
                  <path d="M960 704L512 256l-448 448z" fill="#1afa29" p-id="2791"></path>
                </svg>
              </span>
              <span>日同比&nbsp;19.97%
                <svg t="1670311437557" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5081" width="16" height="16">
                  <path d="M64 320l448 448 448-448z" fill="#d81e06" p-id="5082"></path>
                </svg>
              </span>
            </template>
            <template slot="footer">
              <span>日销售额 ￥4633</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="6666">
            <template slot="charts">
              <LineChart />
            </template>
            <template slot="footer">
              <span>日访问量 7833</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="1234">
            <template slot="charts">
              <BarChart />
            </template>
            <template slot="footer">
              <span>转换率 54%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <ProgressChart />
            </template>
            <template slot="footer">
              <span>周同比&nbsp;56.78%
                <svg t="1670310237701" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2790" width="16" height="16">
                  <path d="M960 704L512 256l-448 448z" fill="#1afa29" p-id="2791"></path>
                </svg>
              </span>
              <span>日同比&nbsp;19.97%
                <svg t="1670311437557" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5081" width="16" height="16">
                  <path d="M64 320l448 448 448-448z" fill="#d81e06" p-id="5082"></path>
                </svg>
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './LineChart'
import BarChart from './BarChart'
import ProgressChart from './ProgressChart'
export default {
  name: 'Card',
  components: { Detail, LineChart, BarChart, ProgressChart }
}
</script>

<style>

</style>
