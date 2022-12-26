//1、导入fs文件系统模块
const fs = require('fs');

//2、调用fs.writeFile()方法，向文件写入内容
//参数1：表示文件的存放路径
//参数2：表示要写入的内容
//参数3：回调函数
fs.writeFile('./1.txt', 'avsdf', function(err){
    //2.1、如果文件写入成功，则err的值等于null
    //2.2、如果文件写入失败，则err的值是一个错误对象
    // console.log(err);
    if(err){
        console.log('文件写入失败');
    }
    console.log('文件写入成功');
})