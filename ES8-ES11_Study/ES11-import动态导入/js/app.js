//以前的导入方法，静态导入
//import * as m1 from "./hello.js";

const btn = document.querySelector('button');
btn.onclick = function () {
    //import函数动态导入，需要的时候再导入
    import('./hello.js').then(module => {
        module.hello();
    })
}