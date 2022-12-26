//这是一个路由模块

//导入express
const express = require('express');

//创建路由对象
const router = express.Router();

//挂载路由
router.get('/user/list', (req, res)=>{
    res.send('Get user list')
})

router.post('/user/add', (res, req)=>{
    res.send('add a user');
})

//向外暴露路由对象
module.exports = {
    router
}