const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    //默认显示404
    let content = '<h1>404 Not Found!</h1>'
    //如果请求的url为/或者是/index.html则显示主页
    if(req.url === '/' || req.url === '/index.html'){
        content = '<h1>主页</h1>'
    }else if(req.url === '/about.html'){
        //如果请求的url为/about.html则显示关于
        content = '<h1>关于</h1>'
    }
    //设置响应头，防止中文乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(content);
})

server.listen('80', () => {
    console.log('server running at http://127.0.0.1');
})