const fs = require('fs');
function read1() {
    return new Promise((resolve, reject) => {
        fs.readFile('./resource.md', (err, data) => {
            if(err)reject('出错了');
            resolve(data);
        })
    })

}
function read2() {
    return new Promise((resolve, reject) => {
        fs.readFile('./resource1.md', (err, data) => {
            if(err)reject('出错了');
            resolve(data);
        })
    })

}
function read3() {
    return new Promise((resolve, reject) => {
        fs.readFile('./resource2.md', (err, data) => {
            if(err)reject('出错了');
            resolve(data);
        })
    })

}

async function main() {
    let r1 = await read1();
    let r2 = await read2();
    let r3 = await read3();
    console.log(r1.toString());
    console.log(r2.toString());
    console.log(r3.toString());
}
main();