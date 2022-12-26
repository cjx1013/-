//导入内置模块querystring
const qs = require('querystring')

function bodyParser (req, res, next) {
    //定义中间件具体的业务逻辑
    //定义变量，用来存储客户端发送过来的请求体数据
    let str = ''
    //监听req对象的data事件（客户端发送过来的新的请求体数据）
    req.on('data', (chunk)=>{
        //拼接请求体数据，隐式转换为字符串
        str += chunk
    })

    //监听req的end事件
    req.on('end', ()=>{
        //在str中存放的是完整地请求体数据
        //调用parse方法把字符串格式的请求体数据解析成对象格式
        const body = qs.parse(str)
        //将数据挂载到req.body上
        req.body = body
    })
}

module.exports = {
    bodyParser
}