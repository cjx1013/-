import {sum} from './math'
// import count from './count';

console.log('hello main');
console.log(sum(1, 2, 3));

document.getElementById("btn").onclick = function() {
    //动态导入,实现按需加载
    //即使只被引用了一次，也会代码分割
    import("./count.js").then((res)=>{
        console.log("模块加载成功", res.default(3, 1));//res.default就是引入的默认暴露的模块，这里是个函数
    }).catch((err)=>{
        console.log("模块加载失败", err);
    })
}