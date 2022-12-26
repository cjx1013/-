const express = require('express')

const app = express()

//导入第三方中间件 body-parser
const bodyParser = require('body-parser')

//注册中间件body-parser
app.use(bodyParser.urlencoded({extended:false}))

app.post('/user', (req, res)=>{
    //在服务器，可以使用req.body这个属性，来接受客户端发送过来的请求体数据
    //获取url-encoded格式的数据
    //默认情况下，如果不配置解析表单数据的中间件，则req.body默认等于undefined
    console.log(req.body);
    res.send('hi')
})


app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})