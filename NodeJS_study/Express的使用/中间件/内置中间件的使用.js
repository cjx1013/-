const express = require('express')

const app = express()

//除了错误级别的中间件，其他的中间件都要定义在路由前面
//通过express.json()中间件，解析表单中的json格式的数据
app.use(express.json())
//通过express.urlencoded中间件，解析URL-encoded格式的请求体数据
app.use(express.urlencoded({extended:false}))

app.post('/user', (req, res)=>{
    //在服务器，可以使用req.body这个属性，来接受客户端发送过来的请求体数据
    //获取JSON格式的数据或url-encoded格式的数据
    //默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
    console.log(req.body);
    res.send('hi')
})





app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})