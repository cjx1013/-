const express = require('express')

const app = express()
//定义局部中间件
const mw1 = function (req, res, next) {
    console.log('调用了第一个局部中间件处理函数');
    next();
}
const mw2 = function (req, res, next) {
    console.log('调用了第二个局部中间件处理函数');
    next();
}

// app.get('/', mw1, mw2, (req, res)=>{
app.get('/', [mw1, mw2], (req, res)=>{
    console.log('get');
    res.send('Get')
})

app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})