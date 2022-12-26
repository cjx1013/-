<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect :show="scene !== 0" @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene===0">
        <!--展示spu列表-->
        <el-button type="primary" :disabled="!category3Id" icon="el-icon-plus" @click="addSpu">添加SPU</el-button>
        <el-table
          style="width: 100%"
          border
          :data="records"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
          >
            <template slot-scope="{row, $index}">
              <!--hint-button为自己封装的额按钮组件-->
              <hint-button type="success" icon="el-icon-plus" size="mini" title="添加spu" @click="addSku(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler(row)"></hint-button>
              <el-popconfirm
                title="这是一段内容确定删除吗？"
                @onConfirm="deleteSpu(row)"
              >
                <hint-button slot="reference" type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handlerSizeChange"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene===1" ref="spuForm" @changeScene="changeScene" />
      <SkuForm v-show="scene===2" ref="skuForm" @changeScene2="changeScene2" />
    </el-card>
    <el-dialog :title="spu.spuName" :visible.sync="dialogTableVisible" @before-close="close">
      <el-table v-loading="loading" :data="skuList">
        <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
        <el-table-column prop="price" label="价格" width="200"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column prop="prop" label="默认图片">
          <template slot-scope="{row, $index}">
            <img :src="row.skuDefaultImg" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: 'Spu',
  components: { SpuForm, SkuForm },
  data() {
    return {
      // 分别是一级、二级、三级分类id
      category1Id: '',
      category2Id: '',
      category3Id: '',
      // 控制三级联动的可操作性
      show: true,
      // spu列表数据
      records: [],
      // 当前页码
      page: 1,
      // 每页数量
      limit: 3,
      // 总共数量
      total: 0,
      // 控制显示spu列表数据，还是添加sku，还是添加|修改spu
      scene: 0,
      // 控制对话框显示隐藏
      dialogTableVisible: false,
      spu: {},
      // sku列表数据
      skuList: [],
      // 加载效果
      loading: true
    }
  },
  methods: {
    // 三级联动自定义事件，可以把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      // 获取的一级、二级、三级分类id
      if (level === 1) {
        this.category1Id = categoryId
        // 每次重新选择一级分类，就清除二级分类和三级分类
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        // 每次重新选择二级分类，就清除三级分类
        this.category3Id = ''
      } else {
        // 选择好了三级分类，就可以展示数据了
        this.category3Id = categoryId
        // 获取spu列表数据进行展示
        this.getSpuList()
      }
    },
    // 获取spu列表数据的方法
    async getSpuList(pager = 1) {
      this.page = pager
      const result = await this.$API.spu.reqSpuList(this.page, this.limit, this.category3Id)
      // console.log(result)
      if (result.code === 200) {
        this.records = result.data.records
        this.total = result.data.total
      }
    },
    // 每页展示数量变化回调
    handlerSizeChange(limiter) {
      this.limit = limiter
      this.getSpuList()
    },
    // 添加spu
    async addSpu() {
      this.scene = 1
      // 调用SpuForm子组件的方法，发送请求,请求品牌数据和销售属性数据
      // console.log(this.$refs.spuForm)
      this.$refs.spuForm.addSpuData(this.category3Id)
    },
    // 修改spu
    updateSpu(row) {
      this.scene = 1
      // 点击修改按钮时，发送请求，显示SpuForm中品牌的原先数据，为什么不在子组件的mounted函数中
      // 发送请求呢？因为子组件显示不显示是通过v-show,也就是display来控制的，只会执行一次mounted
      // 而我们需要每次显示都要发送请求
      // 获取子组件，并调用子组件的方法
      // console.log(this.$refs.spuForm)
      this.$refs.spuForm.initSpuData(row)
    },
    // 删除spu
    async deleteSpu(row) {
      // console.log(666)
      const result = await this.$API.spu.reqDeleteSpu(row.id)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
      }
    },
    // 添加sku按钮的回调
    addSku(row) {
      this.scene = 2
      // 调用SkuForm子组件的方法发送请求
      this.$refs.skuForm.getData(this.category1Id, this.category2Id, row)
    },
    // 查看sku按钮的回调
    async handler(row) {
      this.dialogTableVisible = true
      this.spu = row
      // 发送请求
      const result = await this.$API.spu.reqSkuList(row.id)
      if (result.code === 200) {
        // console.log(result)
        this.skuList = result.data
        this.loading = false
      }
    },
    // 对话框关闭之前的回调
    close() {
      // 重新让加载效果为真，不然在数据回来后关闭了，后面就没有了
      this.loading = true
      // 清空旧数据（不清除会有数据回显的问题）
      this.skuList = []
    },
    // spuform组件点击取消，回到spu列表页面
    changeScene({ scene, flag }) {
      this.scene = scene
      // 重新获取数据
      // 如果是修改spu，则停留在当前页面
      // 如果是添加spu，则回到第一页
      if (flag === '修改') {
        this.getSpuList(this.page)
      } else {
        // console.log(555)
        this.getSpuList()
      }
    },
    // // skuform组件点击取消，回到spu列表页面
    changeScene2(scene) {
      this.scene = 0
    }
  }
}
</script>

<style>

</style>
