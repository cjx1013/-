const http = require('http');
const fs = require('fs');
const path = require('path');

const  server = http.createServer();

server.on('request', (req, res)=>{
    //获取用户请求的url
    const url = req.url;
    //定义读取文件路径
    let fpath = '';

    //如果访问的是/，直接读取Demo文件夹下的index.html内容响应给客户端
    if(url === '/'){
        //将读取文件路径设置为Demo文件夹下的index.html
        fpath = path.join(__dirname, '/Demo/index.html');
    }else{
        //如果访问的不是/，将读取文件的路径拼接一个Demo路径，以及用户请求的url
        fpath = path.join(__dirname, 'Demo', url);
    }
    fs.readFile(fpath, 'utf8', (err, dataStr)=>{
        if(err){
            return res.end('404 Not Found!')
        }
        //当读取的内容响应给客户端
        res.end(dataStr);
    })
})

server.listen('80', ()=>{
    console.log('server running at http://127.0.0.1');
})