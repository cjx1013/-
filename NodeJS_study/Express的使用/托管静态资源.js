//导入express
const express = require('express');

//创建web服务器
const app = express();

//托管静态资源，这里我们将Demo文件下的静态资源托管，对外开放访问
//在访问时，存放静态资源的文件夹Demo不用出现在url中就可以直接访问静态资源
//如；http://127.0.0.1/index.css
app.use(express.static('./Demo'));


//启动服务器
app.listen('80', ()=>{
    console.log('express server running at http://127.0.0.1');
})