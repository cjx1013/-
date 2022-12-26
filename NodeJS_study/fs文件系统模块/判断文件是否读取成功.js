const fs = require('fs')

fs.readFile('./1.txt', 'utf8', function(err, result){
    if(err){
        console.log('文件读取失败' + err.message);
    }
    console.log('文件读取成功，内容是：' + result);
})
