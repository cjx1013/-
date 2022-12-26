//导入express
const express = require('express')
//导入cors中间件
const cors = require('cors')
//导入用户登录注册路由模块
const userRouter = require('./router/user')
//导入用户信息路由模块
const userinfoRouter = require('./router/userinfo')
//导入文章分类路由模块
const artCateRouter = require('./router/artcate')
//导入文章路由模块
const articleRouter = require('./router/article')
//导入验证表单数据模块
const Joi = require('joi')
//导入加密和还原token字符串的配置
const config = require('./schema/config')
//导入解析token字符串的中间件
const expressJwt = require('express-jwt')

//创建服务器
const app = express()

//将cors配置为全局中间件，解决跨域问题
app.use(cors())
//配置解析application/x-www-form-urlencoded格式是表单数据的中间件
app.use(express.urlencoded({extended: false}))
//声明一个全局中间件，一定要在路由之前，为res对象挂载一个res.cc()函数封装res.send()
app.use(function(req, res, next){
    res.cc = function(err, status=1){
        res.send({
            //状态
            status,
            //状态描述，判断err是错误对象还是字符串
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//解析用户发送的token字符串
app.use(expressJwt({secret: config.jwtSecretKey}).unless({path: [/^\/api\//]}))

//注册用户登录注册路由模块
app.use('/api', userRouter)
//注册用户信息路由模块
app.use('/my', userinfoRouter)
//注册文章分类路由模块
app.use('/my/article', artCateRouter)
//注册文章路由模块
app.use('/my/article', articleRouter)

//定义全局错误级别中间件，错误级别中间件要定义在路由之后，捕获验证失败的错误
app.use(function(err, req, res, next){
    //验证表单数据失败
    if(err instanceof Joi.ValidationError) return res.cc(err) 
    //捕获token解析不正确，身份认证失败的错误
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
    res.cc('未知错误')
})


//启动服务器
app.listen('3007', ()=>{
    console.log('api server running at http://127.0.0.1:3007');
})