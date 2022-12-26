//导入express
const express = require('express');

//创建web服务器
const app = express();

//监听get请求
app.get('/user', (req, res)=>{
    res.send({name: 'zs', age: 20, gender: '男'})
})

//监听post请求
app.post('/user', (req, res)=>{
    res.send('请求成功')
})


//启动服务器
app.listen('80', ()=>{
    console.log('express server running at http://127.0.0.1');
})