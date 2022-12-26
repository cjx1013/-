//导入express
const express = require('express')

//创建web服务器，命名为app
const app = express()

//挂载路由
app.get('/', (req, res)=>{ res.send('hello get'); });
app.post('/', (req, res)=>{ res.send('hello post'); });

//启动web服务器
app.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})