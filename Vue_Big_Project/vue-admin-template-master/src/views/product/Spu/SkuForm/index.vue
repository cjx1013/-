<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="SPU名称"> {{ spu.spuName }} </el-form-item>
    <el-form-item label="SKU名称">
      <el-input v-model="skuInfo.skuName" placeholder="sku名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input v-model="skuInfo.price" placeholder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input v-model="skuInfo.weight" placeholder="重量(千克)"></el-input>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input v-model="skuInfo.skuDesc" type="textarea" row="4"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item v-for="(attr, index) in attrInfoList" :key="attr.id" :label="attr.attrName">
          <el-select v-model="attr.attrIdAndAttrValueId" placeholder="请选择">
            <el-option v-for="(attrValue, index) in attr.attrValueList" :key="attrValue.id" :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form ref="form" :inline="true" label-width="80px">
        <el-form-item v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
          <el-select v-model="saleAttr.attrIdAndAttrValueId" placeholder="请选择">
            <el-option v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`"> </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelection">
        <el-table-column type="selection" prop="prop" label="label" width="80">
        </el-table-column>
        <el-table-column prop="prop" label="图片" width="width">
          <template slot-scope="{row, $index}">
            <img :src="row.imgUrl" style="width:100px; height:100px">
          </template>
        </el-table-column>
        <el-table-column prop="imgName" label="名称" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{row, $index}">
            <el-button v-if="row.isDefault===0" type="primary" @click="setDefault(row)">设置默认</el-button>
            <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addSku">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SkuForm',
  data() {
    return {
      // 图片数据
      spuImageList: [],
      // 销售属性数据
      spuSaleAttrList: [],
      // 平台属性数据
      attrInfoList: [],
      // 收集sku数据
      skuInfo: {
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        price: 0,
        skuDefaultImg: '',
        skuDesc: '',
        skuName: '',
        weight: '',
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: '',
          //   id: 0,
          //   skuId: 0,
          //   valueId: 0,
          //   valueName: ''
          // }
        ],
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: '',
          //   imgUrl: '',
          //   isDefault: '',
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: '',
          //   saleAttrValueId: 0,
          //   saleAttrValueName: '',
          //   skuId: 0,
          //   spuId: 0
          // }
        ]
      },
      // spu数据
      spu: {},
      // 收集图片的数组字段
      imageList: []
    }
  },
  methods: {
    // 发送请求获取数据
    async getData(category1Id, category2Id, spu) {
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.skuInfo.category3Id = spu.category3Id
      // console.log(spu)
      this.spu = spu
      // console.log(666)
      // 获取图片数据
      const result1 = await this.$API.spu.reqSpuImageLIst(spu.id)
      if (result1.code === 200) {
        var imgList = result1.data
        imgList.forEach(item => {
          // 给每个图片添加isDefault字段，用户判断是否是默认图片
          item.isDefault = 0
        })
        this.spuImageList = imgList
      }
      // 获取销售属性的数据
      const result2 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if (result2.code === 200) {
        this.spuSaleAttrList = result2.data
      }
      // 获取平台属性的数据
      const result3 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      )
      if (result3.code === 200) {
        this.attrInfoList = result3.data
      }
    },
    // table表格复选框按钮的事件
    handleSelection(selections) {
      // 获取到用户选中图片的数据信息
      this.imageList = selections
    },
    // 设置默认按钮
    setDefault(row) {
      // 排他
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
    },
    // 取消按钮的回调
    cancel() {
      // 回到spu列表页面
      this.$emit('changeScene2', 0)
      // 清空旧数据
      Object.assign(this._data, this.$options.data())
    },
    // 添加sku的回调
    async addSku() {
      // 整理数据
      // 平台属性数据
      this.skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev, item) => {
        // 将选择的平台属性收集在一个数组中，赋值给skuInfo.skuAttrValueList
        if (item.attrIdAndAttrValueId) {
          const [attrId, valueId] = item.attrIdAndAttrValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])
      // 销售属性数据
      this.skuInfo.skuSaleAttrValueList = this.spuSaleAttrList.reduce((prev, item) => {
        // 将选择的销售属性收集在一个数组中，赋值给skuInfo.skuSaleAttrValueList
        if (item.attrIdAndAttrValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndAttrValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])
      // 图片数据
      this.skuInfo.skuImageList = this.imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      // 发送请求
      const result = await this.$API.spu.reqAddSku(this.skuInfo)
      // console.log(result)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        // 回到spu列表页面
        this.$emit('changeScene2', 0)
      }
    }
  }
}
</script>

<style></style>
