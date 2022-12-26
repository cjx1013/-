<template>
  <div>
    <el-table
      style="width: 100%"
      border
      :data="records"
    >
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="150">
        <template slot-scope="{row, $index}">
          <img :src="skuDefaultImg" style="width:80px;height:80px">
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="100"></el-table-column>
      <el-table-column prop="price" label="价格" width="100"></el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="{row, $index}">
          <el-button v-if="row.isSale==0" type="success" icon="el-icon-top" size="mini" @click="onSale(row)"></el-button>
          <el-button v-else type="success" icon="el-icon-bottom" size="mini" @click="cancelSale(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuinfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      style="text-align:center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @current-change="getSkuList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <!--抽屉-->
    <el-drawer
      :visible.sync="drawer"
      size="50%"
    >
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag v-for="(attrValue, index) in skuInfo.skuAttrValueList" :key="attrValue.id" type="success" style="margin-right:10px">{{ attrValue.attrId }}-{{ attrValue.valueId }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="450px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'Sku',
  data() {
    return {
      // 当前页码
      page: 1,
      // 每页展示数量
      limit: 3,
      // 总共数量
      total: '',
      // 当前页sku数据
      records: [],
      // sku详情信息
      skuInfo: {},
      // 控制抽屉显示隐藏
      drawer: false
    }
  },
  mounted() {
    this.getSkuList()
  },
  methods: {
    // 获取sku列表数据
    async getSkuList(pager = 1) {
      this.page = pager
      const result = await this.$API.sku.reqSkuList(this.page, this.limit)
      // console.log(result)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(limit) {
      // console.log(66)
      this.limit = limit
      this.getSkuList()
    },
    // 上架
    async onSale(row) {
      const result = await this.$API.sku.reqOnSale(row.id)
      if (result.code === 200) {
        row.isSale = 1
        this.$message({
          type: 'success',
          message: '上架成功!'
        })
      }
    },
    // 上架
    async cancelSale(row) {
      const result = await this.$API.sku.reqCancelSale(row.id)
      if (result.code === 200) {
        row.isSale = 0
        this.$message({
          type: 'success',
          message: '下架成功!'
        })
      }
    },
    edit() {
      this.$message({
        type: 'info',
        message: '正在开发中'
      })
    },
    // 获取sku详情
    async getSkuinfo(row) {
      // 显示抽屉
      this.drawer = true
      const result = await this.$API.sku.reqGetSkuInfo(row.id)
      // console.log(result)
      if (result.code === 200) {
        this.skuInfo = result.data
      }
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background-color: pink;
    border-radius: 50%;
  }
</style>
<style scoped>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }
  .el-col{
    margin: 10px;
  }
</style>
