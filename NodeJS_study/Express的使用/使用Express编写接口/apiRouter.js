//路由模块
const express = require('express')

const router = express.Router()

//挂载对应路由
router.get('/get', (req, res)=>{
    //获取客户端通过查询字符串发送到服务器的数据
    const query = req.query
    //调用res.send()方法，把数据响应给客户端
    res.send({
        status: 0, //状态，0表示成功，1表示失败
        msg: 'GET请求成功', //状态描述
        data: query //需要响应给客户端的具体数据
    })
})

router.post('/post', (req, res)=>{
    //通过req.body获取请求体中包含的url-encoded格式的数据
    const body = req.body
    //调用res.send()方法，把数据响应给客户端
    res.send({
        status: 0, //状态，0表示成功，1表示失败
        msg: 'POST请求成功', //状态描述
        data: body //需要响应给客户端的具体数据
    })
})


module.exports = router