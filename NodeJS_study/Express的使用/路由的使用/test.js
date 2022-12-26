//导入express
const express = require('express')

//创建服务器
const app = express()

//导入路由模块
const userRouter = require('./路由模块')

//注册路由模块，并添加前缀，访问路径如：http://127.0.0.1/api/user/list
app.use('/api', userRouter.router)

//启动服务器
app.listen('80', ()=>{
    console.log('express runnning at http://127.0.0.1');
})
