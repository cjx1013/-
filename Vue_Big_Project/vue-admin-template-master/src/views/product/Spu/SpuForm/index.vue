<template>
  <el-form ref="form" label-width="80px" :model="spu">
    <el-form-item label="SPU名称">
      <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select v-model="spu.tmId" placeholder="请选择品牌">
        <el-option v-for="(tradeMark, index) in tradeMarkList" :key="tradeMark.id" :label="tradeMark.tmName" :value="tradeMark.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="label">
      <el-input v-model="spu.description" type="textarea" rows="4" placeholder="描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-success="handleSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select v-model="attrIdAndAttrName" :placeholder="`还有${unselectAttr.length}未选择`">
        <el-option v-for="(unselect, index) in unselectAttr" :key="unselect.id" :label="unselect.name" :value="`${unselect.id}:${unselect.name}`"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addAttr">添加销售属性</el-button>
      <el-table
        style="width: 100%"
        border
        :data="spu.spuSaleAttrList"
      >
        <el-table-column
          type="index"
          align="center"
          label="序号"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="saleAttrName"
          label="属性名"
          width="width"
        >
        </el-table-column>
        <el-table-column
          prop="prop"
          label="属性值名称列表"
          width="width"
        >
          <template slot-scope="{row, $index}">
            <el-tag
              v-for="(saleAttrValue, index) in row.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              closable
              :disable-transitions="false"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
            >
              {{ saleAttrValue.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.inputVisible"
              ref="saveTagInput"
              v-model="row.inputValue"
              class="input-new-tag"
              size="small"
              @blur="toButton(row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="addAttrValue(row)">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="prop"
          label="操作"
          width="width"
        >
          <template slot-scope="{row, $index}">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SpuForm',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      // SPU信息
      spu: {
        // 三级分类id
        category3Id: 0,
        // 描述
        description: '',
        // spu图片
        spuImageList: [
          // {
          //   "id": 0,
          //   "imgName": "string",
          //   "imgUrl": "string",
          //   "spuId": 0
          // }
        ],
        // spu名字
        spuName: '',
        // 销售属性
        spuSaleAttrList: [
          // {
          //   "baseSaleAttrId": 0,
          //   "id": 0,
          //   "saleAttrName": "string",
          //   "spuId": 0,
          //   "spuSaleAttrValueList": [
          //     {
          //       "baseSaleAttrId": 0,
          //       "id": 0,
          //       "isChecked": "string",
          //       "saleAttrName": "string",
          //       "saleAttrValueName": "string",
          //       "spuId": 0
          //     }
          //   ]
          // }
        ],
        // 品牌id
        tmId: ''
      },
      // 品牌信息
      tradeMarkList: [],
      // spu图片的数据
      spuImageList: [],
      // 平台全部的销售属性
      saleAttrList: [],
      // 选择的销售属性id和属性名
      attrIdAndAttrName: ''
    }
  },
  computed: {
    unselectAttr() {
      // 计算还未选择的是哪个属性，平台属性总共有三个，颜色、尺寸、版本
      const result = this.saleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name !== item1.saleAttrName
        })
      })
      return result
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      // 上传图片时要收集数据
      this.spuImageList = fileList
    },
    handleRemove(file, fileList) {
      // 删除图片时也要收集数据
      // console.log(file, fileList)
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 发送请求，获取数据
    async initSpuData(spu) {
      // 获取SPU信息的数据
      const spuResult = await this.$API.spu.reqSpu(spu.id)
      if (spuResult.code === 200) {
        this.spu = spuResult.data
      }

      // 获取品牌信息
      const tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }

      // 获取spu图片的数据
      const spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if (spuImageResult.code === 200) {
        const imageList = spuImageResult.data
        // 按elementui的upload组件的要求整理数据，它要求显示的照片数组
        // 得有name和url属性，不然图片不显示
        imageList.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImageList = imageList
      }

      // 获取平台全部的销售属性
      const saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 添加属性
    addAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      const newAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spu.spuSaleAttrList.push(newAttr)
      // 清空旧的属性
      this.attrIdAndAttrName = ''
    },
    // 添加属性值按钮回调
    addAttrValue(row) {
      // console.log(66)
      // 给该属性添加inputVisible属性，控制button和input的切换，inputVisible需要是响应式的
      this.$set(row, 'inputVisible', true)
      // 收集输入的数据到inputValue
      // 原先属性上没有inputValue这个字段，所以我们给它添加
      this.$set(row, 'inputValue', '')
    },
    // input失去焦点函数
    toButton(row) {
      // 将收集到的数据添加到属性值列表中
      const { baseSaleAttrId, inputValue } = row
      // 输入的不能是空格
      if (inputValue.trim() === '') {
        this.$message({
          type: 'error',
          message: '输入不能为空!'
        })
        return
      }
      // 输入的数据不能与已有的数据重复
      const result = row.spuSaleAttrValueList.every(item => {
        return item.saleAttrValueName !== inputValue
      })
      if (!result) {
        this.$message({
          type: 'error',
          message: '输入的数据不能与已有的数据重复!'
        })
        return
      }
      row.spuSaleAttrValueList.push({ baseSaleAttrId, saleAttrValueName: inputValue })
      // 变成input时就已经添加了inputVisible，而且是响应式的，所以这里变回button时直接赋值就行
      row.inputVisible = false
    },
    // 保存按钮的回调
    async addOrUpdateSpu() {
      // 整理数据
      // map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
      this.spu.spuImageList = this.spuImageList.map(item => {
        // 上传新的图片到服务器时，要另外处理，要包含imgName和imgUrl这两个字段
        return {
          imgName: item.name,
          // 新的图片的url为本地路径，需要变为服务器返回的路径
          imgUrl: (item.response && item.response.data) || item.url
        }
      })
      // 发送请求
      const result = await this.$API.spu.reqAddOrUpdate(this.spu)
      if (result.code === 200) {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      }
      // 回到spu列表页面
      this.$emit('changeScene', { scene: 0, flag: this.spu.id ? '修改' : '添加' })
      // 清空旧数据
      Object.assign(this._data, this.$options.data())
    },
    // 父组件中添加SPU按钮的回调
    async addSpuData(category3Id) {
      this.spu.category3Id = category3Id
      // 获取品牌信息
      const tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if (tradeMarkResult.code === 200) {
        this.tradeMarkList = tradeMarkResult.data
      }
      // 获取平台全部的销售属性
      const saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if (saleResult.code === 200) {
        this.saleAttrList = saleResult.data
      }
    },
    // 取消按钮的回调
    cancel() {
      // 回到spu列表页面
      this.$emit('changeScene', { scene: 0, flag: '' })
      // 清空旧数据
      // Object.assign用来合并对象
      // this._data就是vm或vc身上的那个data
      // this.$options是配置对象
      // this.$options.data()就是这上面的data()函数，
      // data() {return {……}}，这里面的属性的属性值都是初始值，或者空，合并的时候会覆盖掉this._data的数据
      // 达到清空旧数据的目的
      Object.assign(this._data, this.$options.data())
    }
  }
}
</script>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
