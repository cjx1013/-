//要求读取顺序:resource.md-->resource1.md-->resource2.md
const fs = require('fs');

// fs.readFile('resource.md', (err, data1) => {
//     fs.readFile('resource1.md', (err, data2) => {
//         fs.readFile('resource2.md', (err, data3) => {
//             // let result = `${data1}${data2}${data3}`;
//             let result = data1 + '\r\n' + data2 + '\r\n' + data3;
//             console.log(result);
//         })
//     })
// })

const p = new Promise((resolve, reject) => {
    fs.readFile('resource.md', (err, data) => {
        resolve(data);
    })
})

p.then(value => {//value是上面一个promise获得的数据
    // console.log(value.toString());
    return new Promise((resolve, reject) => {
        fs.readFile('resource1.md', (err, data)=>{
            resolve([value, data]);//上一个promise获得的数据及现在获得的数据,返回的是promise对象
            //且状态是成功的，所以上面一个then方法返回的也是成功的，
        })
    })
}).then(value => {//所以这里链式编程再来一个then的状态也是成功的,
    //且value是上面的[value,data]数组，也就是resource.md和resource1.md的内容
    return new Promise((resolve, reject) => {
        fs.readFile('resource2.md', (err, data)=>{
            value.push(data);//将resource2.md的内容也存到数组中
            resolve(value);//状态与上面所说的一样
        })
    })
    
}).then(value => {
    console.log(value.toString());
})