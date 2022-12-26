//包的入口文件

//导入自己定义的包
const dt = require('./src/dateFormat')
const ht = require('./src/htmlEscape')

//暴露
module.exports = {
    ...dt,
    ...ht
}