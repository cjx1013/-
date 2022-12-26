//自己定义的.js文件就是自定义模块
const age = 18

module.exports.username = 'cjx'

module.exports.sayHello = function() {
    console.log('hello');
}

module.exports.age = age;