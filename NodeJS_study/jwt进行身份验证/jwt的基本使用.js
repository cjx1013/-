const express = require('express')
//导入生成jwt字符串的包
const jwt = require('jsonwebtoken')
//导入用于将客户端发来的jwt字符串解析还原成JSON对象的包
const expressJwt = require('express-jwt')

const app = express()
app.use(express.urlencoded({extended:false}))
//定义secret密钥
const secret = 'haha666'

//注册express-jwt中间件，用来将将客户端发来的jwt字符串解析还原成JSON对象，
//并且还可以指定哪些接口不用发送token验证就能通过，这里指定api路径的接口都能直接通过，不用验证
app.use(expressJwt({secret: secret}).unless({path: [/^\/api\//]}))

//使用全局错误处理中间件，捕获解析jwt失败后产生的错误
app.use((err, req, res, next)=>{
    //错误是由token解析失败导致的
    if(err.name === 'UnauthorizedError'){
        return res.send({
            status: 401,
            message: '无效的token'
        })
    }
    res.send({
        status: 500,
        message: '未知的错误'
    })
})

app.post('/api/login', (req, res)=>{
    if(req.body.username !== 'admin' || req.body.password !== '123'){
      return res.send({status: 1, msg: '登录失败'})
    }
    //用户登录成功，通过jwt.sign()方法将用户的信息加密成jwt字符串，通过token属性响应给客户端
    res.send({
        status: 0, 
        msg: '登录成功',
        //jwt.sign()，第一个参数是用户信息对象，第二个参数是secret密钥，第三个参数是配置对象，
        //这里在对象里举例设置密钥有效时间属性
        //记住千万不要把密码之类的数据加密到token中
        token: jwt.sign({username: req.body.username}, secret, {expiresIn: '30s'})
    })
    
})

//这是一个有权限的api接口
app.get('/admin/userinfo', (req, res)=>{
    res.send({
        status: 200,
        msg: 'success',
        //只要配置成功了express-jwt这个中间件，就可以把解析出来的用户信息，挂载到req.user属性上
        data: req.user
            
    })
})



app.listen('80', ()=>{
    console.log('express running at http://127.0.0.1');
})