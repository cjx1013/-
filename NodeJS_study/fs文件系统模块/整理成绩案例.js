//1、导入fs文件系统模块
const fs = require('fs');

//2、读取1.txt文件
fs.readFile('./1.txt', 'utf8', function(err, result){
    if(err){
        console.log('文件读取失败');
    }
    // console.log(result);
    //3、将读取的字符串按空格分隔成数组
    const oldArr = result.split(' ');
    // console.log(oldArr);
    //4、将=号替换成: 并存入新数组
    const newArr = [];
    oldArr.forEach(item=>{
        newArr.push(item.replace('=',':'));
    })
    // console.log(newArr);
    //5、将新数组中的每一项用换行符进行合并，得到一个新的字符串
    const newStr = newArr.join('\r\n');
    //6、将新字符串写入2.txt文件中
    fs.writeFile('./2.txt', newStr, function(err){
        if(err){
            console.log('文件写入失败');
        }
        console.log('文件写入成功');
    })
})