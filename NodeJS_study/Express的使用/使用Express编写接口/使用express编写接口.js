const express = require('express')
//导入路由模块
const router = require('./apiRouter')

//导入cors中间件
const cors = require('cors')

const app = express()

//配置cors中间件，解决接口跨域问题
app.use(cors())

//导入解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

//注册路由模块
app.use('/api', router)

//启动服务器
app.listen('80', ()=>{
    console.log('express running at http://127.0.0.1');
})