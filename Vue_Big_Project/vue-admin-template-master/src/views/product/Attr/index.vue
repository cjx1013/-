<template>
  <div>
    <el-card style="margin: 20px 0px"><CategorySelect :show="!showTable" @getCategoryId="getCategoryId"></CategorySelect></el-card>
    <el-card>
      <div v-show="showTable">
        <el-button type="primary" icon="el-icon-edit" :disabled="!category3Id" @click="addAttr">添加属性</el-button>
        <el-table
          :data="attrList"
          style="width: 100%"
          border
        >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column label="属性值列表" width="width">
            <template slot-scope="{row, $index}">
              <el-tag v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" style="margin: 0px 10px" type="success">
                {{attrValue.valueName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{row, $index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!showTable">
        <el-form ref="form" :inline="true" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button :disabled="!attrInfo.attrName" type="primary" icon="el-icon-plus" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="showTable=true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="prop"
            label="属性值名称"
            width="width"
          >
            <template slot-scope="{row, $index}">
              <!--为了获取每个属性值的input，给input用绑定ref，值为index下标-->
              <el-input v-if="row.flag" :ref="$index" v-model="row.valueName" placeholder="请输入属性值名称" size="mini" @blur="toLook(row)" @keyup.native.enter="row.flag=false"></el-input>
              <span v-else style="display:block" @click="toEdit(row, $index)"> {{ row.valueName }} </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="prop"
            label="操作"
            width="width"
          >
            <template slot-scope="{row, $index}">
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" :disabled="attrInfo.attrValueList.length<1" @click="addOrUpdateAttrValue">保存</el-button>
        <el-button @click="showTable=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      // 一级分类id
      category1Id: '',
      // 二级分类id
      category2Id: '',
      // 三级分类id
      category3Id: '',
      // 属性列表
      attrList: [],
      showTable: true,
      // 添加属性或修改属性提交的信息
      attrInfo: {
        // 属性名
        'attrName': '',
        // 属性值
        'attrValueList': [
          // {
          //   'attrId': 0,
          //   'valueName': ''
          // }
        ],
        // 三级分类id
        'categoryId': 0, // 收集三级分类id时，不能'categoryId': this.category3Id,
        // 因为对象存储数据是无序的，也就是data这个对象里存储的数据是无序的，存储的category3Id不一定
        // 在attrInfo前面，所以如果category3Id在attrInfo后面，通过'categoryId': this.category3Id这样是获取不到的
        'categoryLevel': 3
      }
    }
  },
  methods: {
    getCategoryId(category) {
      // console.log(category)
      if (category.level === 1) {
        this.category1Id = category.categoryId
        // 每次重新选择一级分类，那么二级分类和三级分类要置空
        this.category2Id = ''
        this.category3Id = ''
      } else if (category.level === 2) {
        this.category2Id = category.categoryId
        // 每次重新选择二级分类，那么三级分类要置空
        this.category3Id = ''
      } else {
        // 三级分类的信息传递过来了，那么可以发送请求，请求数据了
        this.category3Id = category.categoryId
        // 请求数据
        this.getAttrList()
      }
    },
    async getAttrList() {
      const result = await this.$API.attr.reqAttrList(this.category1Id, this.category2Id, this.category3Id)
      // console.log(result)
      if (result.code === 200) {
        this.attrList = result.data
      }
    },
    // 添加属性值
    addAttrValue() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: '',
        flag: true // 用来控制属性值是显示模式还是修改模式
      })
      // 同样，添加属性值后输入框自动聚焦，添加的属性值总在最后，所以index为length-1
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus()
      })
    },
    // 添加属性值按钮的回调
    addAttr() {
      this.showTable = false
      // 清空旧的操作的数据，收集三级分类的id
      this.attrInfo = {
        'attrName': '',
        'attrValueList': [
        ],
        'categoryId': this.category3Id,
        'categoryLevel': 3
      }
    },
    // 更新属性
    updateAttr(row) {
      this.showTable = false
      // 显示原先属性的数据
      // 这里使用浅拷贝也还是不行，因为这个attrInfo的属性又有数组，数组里又有对象，
      // 使用浅拷贝还是会直接影响源数据，这里使用loadash的深拷贝解决
      // this.attrInfo = { ...row }
      this.attrInfo = cloneDeep(row)
      // 自己添加的属性值有flag，可以实现查看模式和修改模式的切换，但是已有的属性值我们并没有给它加flag
      // 无法实现查看模式和修改模式的切换，所以得给它加，并且flag要是响应式的，因为我们后面修改它要让vue知道
      // 页面上的属性值才能实现查看模式和修改模式的切换
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item, 'flag', false)
      })
    },
    // 属性值变为查看模式
    toLook(row) {
      // 不能输入空格
      if (row.valueName.trim() === '') {
        this.$message({
          type: 'error',
          message: '请输入合法的属性值!'
        })
        return
      }
      // 不能有重复的属性值
      const isRepeat = this.attrInfo.attrValueList.some(item => {
        // 判断除自己之外有没有其他与自己相同的属性值
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })
      if (isRepeat) {
        this.$message({
          type: 'error',
          message: '属性值不能重复!'
        })
        return
      }
      row.flag = false
    },
    // 属性值变为编辑模式
    toEdit(row, index) {
      row.flag = true
      // 自动聚焦，自动聚焦得输入框有了之后才能有用，而当由查看模式转变为编辑模式时，页面的重绘和重排
      // 需要时间，不会一切换就生成了输入框，所以得用nextTick，等输入框DOM生成后，再实现聚焦
      this.$nextTick(() => {
        // 获取相应的input输入框
        this.$refs[index].focus()
      })
    },
    // 删除属性值
    deleteAttrValue(index) {
      // console.log(555)
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存或修改属性值
    async addOrUpdateAttrValue() {
      // 过滤掉空的属性值，因为添加属性时一上来就是空的，以防用户不填写，提交个空的东西给服务器
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        // 如果属性值不是空的
        if (item.valueName !== '') {
          // 删除掉我们用户切换查看模式和编辑模式的flag属性
          delete item.flag
          return true
        }
      })
      // 提交数据
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message({
          type: 'success',
          message: '保存成功!'
        })
        // 重新获取数据
        this.getAttrList()
      } catch (e) {
        // this.$message({
        //   type: 'error',
        //   message: '失败'
        // })
      }
      // 显示table页面
      this.showTable = true
    }
  }
}
</script>

<style>

</style>
