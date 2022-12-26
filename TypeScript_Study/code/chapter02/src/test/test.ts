import {b} from '../hello/m'
console.log('test');
console.log(b);

// 这是一条注释

// 配置文件中开启了不允许隐式any
// 这里的a和b都是隐式any，所以会报错
// function fn(a, b) {
//     return a + b
// }

function fn(a:number, b:number) {
    return a + b
}

// 配置文件中开启了不允许不明类型的this
// 这里的fn1函数以后有可能是window调用
// 有可能是对象方法调用，所以是不明类型的this，会报错
// function fn1() {
//     alert(this)
// }

function fn1(this:Window) { //this:any
    alert(this)
}

// 配置文件中开启了严格的空值检查
// 这里的btn有可能是空值，所以这样写会报错
// let btn = document.getElementById('#btn')
// btn.addEventListener('click', function() {
//     alert(123)
// })

let btn = document.getElementById('#btn')
btn?.addEventListener('click', function() {
    alert(123)
})

let btn1 = document.getElementById('#btn')
if(btn1 != null){
    btn1.addEventListener('click', function() {
        alert(123)
    })
}
