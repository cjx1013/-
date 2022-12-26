const fs = require('fs');

//当提供的路径是./或../开头的相对路径，那么就会容易出现动态拼接路径问题
// fs.readFile('./2.txt', 'utf8', function(err, result){
//     if(err){
//         console.log('文件读取失败');
//     }
//     console.log('文件读取成功:\r\n' + result);
// })

//第一个解决办法是不要提供./或../开头的相对路径，而是提供完整路径，直接右击复制完整路径
//但是在js中\是转移符，需要在其后再加个\
// fs.readFile('D:\study\NodeJS_study\fs文件系统模块\2.txt', 'utf8', function(err, result){
//但是这种方法移植性非常差，不利于维护
// fs.readFile('D:\\study\\NodeJS_study\\fs文件系统模块\\2.txt', 'utf8', function(err, result){
//     if(err){
//         console.log('文件读取失败');
//     }
//     console.log('文件读取成功:\r\n' + result);
// })


//第二个解决办法就是使用__dirname，它表示当前文件所处的目录
//它不会出现动态拼接路径问题
fs.readFile(__dirname + '/2.txt', 'utf8', function(err, result){
    if(err){
        console.log('文件读取失败');
    }
    console.log('文件读取成功:\r\n' + result);
})
