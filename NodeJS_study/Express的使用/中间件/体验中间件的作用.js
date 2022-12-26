const express = require('express')

const app = express()

//定义中间件的简写方式
//多个中间件之间，共享同一份req和res，基于这样的特性，我们可以在上游的中间件中
//统一为req或res对象添加自定义的属性或方法，供下面的中间件或路由进行使用
app.use(function(req, res, next){
    console.log('这是一个中间件');
    req.name = 'cjx';
    next()
})

app.get('/', (req, res)=>{
    console.log('get' + req.name);
    res.send('Get')
})

app.get('/user', (req, res)=>{
    console.log('get user' + req.name);
    res.send('Get')
})
app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})