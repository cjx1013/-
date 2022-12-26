//导入express
const express = require('express');

//创建web服务器
const app = express();

//托管静态资源，这里我们将Demo文件下的静态资源托管，对外开放访问
//并且挂载路径前缀
//在访问时，存放静态资源的文件夹Demo不用出现在url中就可以直接访问静态资源
//但要加上挂载的路径前缀
app.use('/hahaha', express.static('./Demo'));
//如；http://127.0.0.1/haha/index.css


//启动服务器
app.listen('80', ()=>{
    console.log('express server running at http://127.0.0.1');
})