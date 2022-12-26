import * as m1 from "./m1.js";
import * as m2 from "./m2.js";
import * as m3 from "./m3.js";
// console.log(m1);
// console.log(m2);
// console.log(m3);
m1.fn();
m2.fn1();
m3.default.fn();

//引入NPM包
//假设修改body背景颜色
//需要npm i jQuery
//后面导入
import $ from 'jquery';//const $ = require("jquery")
$('body').css('background', 'pink');
//同样要重新执行babel对ES6模块化代码转换.html的2,3代码