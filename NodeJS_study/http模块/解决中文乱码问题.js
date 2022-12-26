const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    const str = `客户端请求的url地址是${req.url}，客户端的method请求类型是${req.method}`;
    //为了防止中文显示乱码问题，需要设置响应头Content-Type的值为text/html; charset=utf-8
    //注意charset=utf-8的等号两边不要打空格，即不要写成charset = utf-8
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(str);
})

server.listen('80', () => {
    console.log('server running at http://127.0.0.1');
})