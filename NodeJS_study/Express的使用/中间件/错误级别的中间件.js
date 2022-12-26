const express = require('express')

const app = express()

app.get('/', (req, res)=>{
    throw new Error('服务器内部出错！')
    res.send('hi')
})

//定义错误级别中间件，捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题
app.use(function (err, req, res, next) {
    console.log('发生了错误:' + err.message);
    res.send('Error:' + err.message)
})



app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})