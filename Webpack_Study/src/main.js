//全部引入，体积太大，我们指向引入promise的polyfill
// import "core-js"
//按需引入，但是万一有其他es6以上语法，又得一个一个引入，太麻烦
// import "core-js/es/promise"
//自动按需引入，在babel.config.js中配置即可

import count from './js/count';
import sum from './js/sum';
// import {mul} from './js/cal'

//引入css资源，webpack才会对其打包
import "./css/index.css";
//引入less资源
import "./less/index.less";
//引入sass资源
import "./sass/index.sass";
import "./sass/index2.scss";
//引入stylus资源
import "./stylus/index.styl"
//引入字体图标资源
import "./font-awesome-4.7.0/css/font-awesome.min.css"

// var result1 = count(2, 1);//eslint 检查会报错，因为这里用var定义变量了，
// console.log(result1);
//而在eslint的配置文件中配置了rules不能用var定义变量，实现了在webpack中eslint的使用
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4, 5));
// console.log(mul(1, 2));

//如果想js实现热替换，则可以使用下面的代码
//判断是否支持HMR功能
if(module.hot) {
    //这表示当count.js或者sum.js发生变化时，只更新这两个文件，其他文件不变
    module.hot.accept("./js/count.js")
    module.hot.accept("./js/sum.js")
}

document.getElementById("btn").onclick = function () {
    // eslint会对动态导入语法报错，需要修改eslint配置文件
    // webpackChunkName: "cal"：这是webpack动态导入模块命名的方式
    // "cal"将来就会作为[name]的值显示。
    import(/* webpackChunkName: "cal" */"./js/cal").then(({mul})=>{
        console.log(mul(1, 2));
    })
}

//添加promise代码
const promise = Promise.resolve();
promise.then(() => {
    console.log('hello promise');
})

const arr = [1, 2, 3, 4]
console.log(arr.includes(1));

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
}