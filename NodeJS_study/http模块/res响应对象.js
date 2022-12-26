const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    //res是响应对象，它包含了与服务器相关的数据和属性，比如：
    //要发送到客户端的字符串
    const str = `客户端请求的url地址是${req.url}，客户端的method请求类型是${req.method}`;
    //res.end()方法的作用：
    //向客户端发送指定的内容，并结束这次请求的处理过程
    res.end(str);
})

server.listen('80', () => {
    console.log('server running at http://127.0.0.1');
})