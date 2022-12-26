const express = require('express')

const app = express()

//导入自定义的中间件
const bp = require('./content-body-parser')

//注册中间件
app.use(bp.bodyParser)

app.post('/user', (req, res)=>{
    console.log(req.body);
})

app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})