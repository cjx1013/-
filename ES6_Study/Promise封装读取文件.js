const fs = require('fs');
// fs.readFile('resource.md', (err, data) => {
//     if(err)throw err;
//     console.log(data.toString());
// })

const p = new Promise((resolve, reject) => {
    fs.readFile('resource.md', (err, data) => {
        if (err) reject(err);
        resolve(data);
    })
})
p.then(function (value) {
    console.log(value.toString());
}, function (reason) {
    console.log('读取失败！');
})

