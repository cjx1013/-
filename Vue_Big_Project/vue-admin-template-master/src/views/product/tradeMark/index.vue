<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <!--按钮-->
    <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
    <!--
        表格组件
        它是一列一列的展示数据
    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="date" label="品牌LOGO" width="width">
        <!--自定义列中的内容，slot-scope可以一个对象，对象包含
        :data="list"中list数组中的每条数据，及下标$index-->
        <template slot-scope="{row, $index}">
          <!-- {{row}} -->
          <img :src="row.logoUrl" style="width:100px;height:100px">
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" width="width">
        <template slot-scope="{row, $index}">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页器-->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :pager-count="7"
      :page-sizes="[3, 5, 10]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      @current-change="getTradeMarkList"
      @size-change="handlerSizeChange"
    >
    </el-pagination>

    <!--对话框
     visible.sync：控制对话框显示和隐藏
     Form组件提供了表单验证的功能，只需要通过rules属性传入约定的验证规则，并将Form-item的prop属性
     设置为需校验的字段名即可
    -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" style="width:80%" :model="tmForm" :rules="rules">
        <!--:model的作用就是将表单的数据收集到哪个对象身上-->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--利用form表单提交数据，这里的action为上传地址，要加上dev-api，而
          利用axios发送Ajax不用加是因为axios在二次封装中配置了baseUrl会自动帮你
          加上dev-api，而且这里提交数据不能用v-model，它是图片-->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TradeMark',
  data() {
    var validateTmName = (rule, value, callback) => {
      if (value.length >= 2 && value.length <= 10) {
        callback()
      } else {
        callback(new Error('品牌名称长度在2~10个字符之间!'))
      }
    }
    return {
      // 当前页码
      page: 1,
      // 每页显示数目
      limit: 3,
      // 总共数目
      total: 0,
      // 品牌数据
      list: [],
      // 控制显示隐藏对话框
      dialogFormVisible: false,
      // 表单提交的数据
      tmForm: {
        // 手机的数据名不能乱写，得看接口文档，服务器要求的名字
        // 品牌id
        id: '',
        // 品牌名称
        tmName: '',
        // 上传的logo图片
        logoUrl: ''
      },
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          // 自定义规则
          { validator: validateTmName, trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请上传品牌图片' }
        ]
      }
    }
  },
  mounted() {
    // console.log(this.$API)
    this.getTradeMarkList()
  },
  methods: {
    // 获取品牌列表的数据，而且current-change事件会在点击页码时触发，
    // 会有一个参数pager，即当前点击的页码
    async getTradeMarkList(pager = 1) {
      this.page = pager
      const { page, limit } = this
      const result = await this.$API.tradeMark.reqTradeMarkList(page, limit)
      // console.log(result)
      if (result.code === 200) {
        this.list = result.data.records
        this.total = result.data.total
      }
    },
    // 当分页器每页展示数据的数量改变时被触发
    handlerSizeChange(limit) {
      this.limit = limit
      this.getTradeMarkList()
    },
    // 点击添加品牌按钮
    showDialog() {
      // 显示对话框之前清空对话框的旧数据
      this.tmForm = { tmName: '', logoUrl: '' }
      // 显示添加或更新对话框
      this.dialogFormVisible = true
    },
    updateTradeMark(row) {
      // 显示修改对话框
      this.dialogFormVisible = true
      this.tmForm = { ...row }// 点击修改某个品牌时，显示该品牌信息，
      // 所以这里直接修改tmForm赋值为服务器返回的数据，但是不能直接this.tmForm = row
      // 因为如果这样使tmForm和row指向的是同一对象，会导致修改该品牌时还未提交，但是页面上的数据就已经做出相应的变化了
      // 相当于直接修改页面上的数据，会影响到源数据，所以这里使用解构赋值，相当于浅拷贝，
      // 不会影响到源数据
    },
    // 上传图片成功的回调
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      // res和file都是服务器返回的前端数据
      // console.log(res, file)
      this.tmForm.logoUrl = res.data
    },
    // 上传图片之前的回调
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 添加或修改品牌
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async(valid) => {
        if (valid) {
          this.dialogFormVisible = false
          const result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm)
          if (result.code === 200) {
            this.$message({
              type: 'success',
              message: this.tmForm.id ? '修改成功!' : '添加成功!'
            })
            // 如果是修改品牌，则停留在修改的品牌的那一页，如果是添加，则回到第一页
            this.getTradeMarkList(this.tmForm.id ? this.page : 1)
          } else {
            this.$message({
              type: 'error',
              message: this.tmForm.id ? '修改失败' : '添加失败'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除品牌
    deleteTradeMark(row) {
      this.$confirm(`您确定要删除${row.tmName}吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 点击确定的回调
        const result = await this.$API.tradeMark.reqDeleteTradeMark(row)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getTradeMarkList(this.list.length > 1 ? this.page : this.page - 1)
        } else {
          this.$message({
            type: 'error',
            message: '失败'
          })
        }
      }).catch(() => {
        // 点击取消的回调
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
