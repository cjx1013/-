<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" :disabled="show" placeholder="请选择" @change="handler1">
          <el-option v-for="(c1, index) in list1" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" :disabled="show" placeholder="请选择" @change="handler2">
          <el-option v-for="(c2, index) in list2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" :disabled="show" placeholder="请选择" @change="handler3">
          <el-option v-for="(c3, index) in list3" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      // 存储一级分类数据
      list1: [],
      // 存储二级分类数据
      list2: [],
      // 存储三级分类数据
      list3: [],
      // 提交的数据
      cForm: {
        // 一级分类的id
        category1Id: '',
        // 二级分类的id
        category2Id: '',
        // 三级分类的id
        category3Id: ''
      }
    }
  },
  mounted() {
    // 获取一级分类的数据
    this.getCategory1List()
  },
  methods: {
    // 获取一级分类的数据
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      // console.log(result)
      if (result.code === 200) {
        this.list1 = result.data
      }
    },
    // 根据一级分类获取二级分类数据
    async handler1() {
      // 每次重新选择一级分类，那么二级分类和三级分类要置空
      this.list2 = []
      this.list3 = []
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      // 触发自定义事件，向父组件传递选择的一级分类信息
      this.$emit('getCategoryId', { categoryId: this.cForm.category1Id, level: 1 })
      const result = await this.$API.attr.reqCategory2List(this.cForm.category1Id)
      // console.log(result)
      if (result.code === 200) {
        this.list2 = result.data
      }
    },
    // 根据二级分类获取三级分类数据
    async handler2() {
      // 每次重新选择二级分类，那么三级分类要置空
      this.list3 = []
      this.cForm.category3Id = ''
      // 触发自定义事件，向父组件传递选择的二级分类信息
      this.$emit('getCategoryId', { categoryId: this.cForm.category2Id, level: 2 })
      const result = await this.$API.attr.reqCategory3List(this.cForm.category2Id)
      // console.log(result)
      if (result.code === 200) {
        this.list3 = result.data
      }
    },
    // 三级分类的处理函数
    handler3() {
      // 选择完三级分类，向父组件传递选择的一级、二级、三级分类信息
      // 触发自定义事件，向父组件传递选择的三级分类信息
      this.$emit('getCategoryId', { categoryId: this.cForm.category3Id, level: 3 })
    }
  }
}
</script>

<style>

</style>
