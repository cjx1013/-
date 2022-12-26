const express = require('express')

const app = express()

// //定义中间件
// const mw = function(req, res, next){
//     console.log('这是一个中间件');
//     //把流转关系交给下一个中间件或路由
//     next()
// }

// //全局生效的中间件
// app.use(mw)

//定义中间件的简写方式
app.use(function(req, res, next){
    console.log('这是一个中间件');
    next()
})

app.get('/', (req, res)=>{
    console.log('get');
    res.send('Get')
})
app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})