const fs = require('fs')
const util = require('util')

// 将形如以(err, data)=>{……}回调作为最后一个参数的这样一个东西传入promisify，
// 它会返回一个promise版本的新函数
let mineReadFile = util.promisify(fs.readFile)

mineReadFile('./resource.md').then(value=>{
    console.log(value.toString());
},reason=>{
    console.log(reason);
})