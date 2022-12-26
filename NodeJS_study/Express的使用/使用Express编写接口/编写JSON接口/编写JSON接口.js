const express = require('express')
//导入路由模块
const router = require('./apiRouter')

//导入cors中间件
const cors = require('cors')

const app = express()
//为了防止JSONP和cors发生冲突，必须在配置cors中间件之前声明JSONP的接口
//优先创建JSONP接口，这个接口不会被处理成cors接口
app.get('/api/jsonp', (req, res)=>{
    //获取客户发送过来的回调函数的名字
    const funcName = req.query.callback
    //定义要发送到客户端的数据对象
    const data = {name: 'zs', age: 22}
    //拼接出一个函数的调用
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    //把拼接的字符串，响应给客户端
    res.send(scriptStr)

})

//配置cors中间件，解决接口跨域问题
//后续的所有接口，都会被处理车行cors接口
app.use(cors())

//导入解析表单数据的中间件
app.use(express.urlencoded({extended: false}))

//注册路由模块
app.use('/api', router)

//启动服务器
app.listen('80', ()=>{
    console.log('express running at http://127.0.0.1');
})