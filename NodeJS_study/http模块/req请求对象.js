const http = require('http')

const server = http.createServer()

server.on('request', (req) => {
    //req是请求对象，它包含了与客户端相关的数据和属性，比如：
    //req.url是客户端请求的url地址
    console.log(`客户端请求的url地址是${req.url}`);
    //req.method是客户端的method请求类型，如post、get等
    console.log(`客户端的method请求类型是${req.method}`);
})

server.listen('80', () => {
    console.log('server running at http://127.0.0.1');
})