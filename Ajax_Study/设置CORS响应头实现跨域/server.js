//1、引入express
const { request, response } = require('express');
const express = require('express');

//2、创建应用对象
const app = express();

//3、创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装

app.all('/cors', (request, response)=>{
    // 设置CORS响应头，告诉浏览器，请求跨域
    response.setHeader('Access-Control-Allow-Origin', '*');// "*" 表示所有
    // response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5000/');
    //设置允许的请求方法
    // response.setHeader('Access-Control-Allow-Methods', '*');
    //设置允许客户端发送任意的请求头
    // response.setHeader('Access-Control-Allow-Headers', '*');
    response.send('hello cors');
});

//4、监听端口启动服务
app.listen(8000, ()=>{
    console.log("服务已经启动，8000端口监听中……")
});