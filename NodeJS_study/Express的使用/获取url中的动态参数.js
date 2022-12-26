//导入express
const express = require('express');

//创建web服务器
const app = express();

//监听get请求
//这里的 :id是一个动态参数，名字可以任意写，而且可以写多个，如/user/:id/:username
app.get('/user/:id', (req, res)=>{
    //req.params默认是一个空对象
    //客户端使用如http://127.0.0.1:8080/user/18 发送到服务器的参数，这里发送了个18,
    //可以通过req.params.id对象访问到
    console.log(req.params.id);
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