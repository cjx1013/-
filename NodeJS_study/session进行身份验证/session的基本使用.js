const express = require('express')
//导入express-session中间件
var session = require('express-session')

const app = express()

//注册并配置session中间件
app.use(session({
    secret: 'cjx', //secret属性值可以为任意字符串
    resave: false,  //固定写法
    saveUninitialized: true //固定写法

}))

//向session中存数据
app.post('/api/login', (req, res)=>{
    if(req.body.username !== 'admin' || req.body.password !== '123'){
      return res.send({status: 1, msg: '登录失败'})
    }
    req.session.user = req.body //将用户信息存储到session中
    req.session.isLogin = true  //将用户的登录状态存储到session中

    res.send({status: 0, msg: '登录成功'})
    
})

//从session中取数据
app.get('/api/username', (req, res)=>{
    if(!req.session.isLogin){
        return res.send({status: 1, msg: 'fail'})
    }

    res.send({
        status: 0,
        msg: 'success',
        username: req.session.user.username
    })
})

//清空当前用户的session
app.get('/api/logout', (req, res)=>{
    req.session.destroy()
    res.send({
        status: 0,
        msg: '退出成功'
    })
})

app.listen('80', ()=>{
    console.log('express running at http://127.0.0.1');
})