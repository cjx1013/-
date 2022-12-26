//导入express
const express = require('express');

//创建web服务器
const app = express();

//监听get请求
app.get('/user', (req, res)=>{
    //req.query默认是一个空对象
    //客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数可以通过req.query对象访问到
    //例如：req.query.name  req.query.age
    console.log(req.query);
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