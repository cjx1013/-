"use strict";

var _m = require("./m1.js");

var m1 = _interopRequireWildcard(_m);

var _m2 = require("./m2.js");

var m2 = _interopRequireWildcard(_m2);

var _m3 = require("./m3.js");

var m3 = _interopRequireWildcard(_m3);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
//const $ = require("jquery")
(0, _jquery2.default)('body').css('background', 'pink');
//同样要重新执行babel对ES6模块化代码转换.html的2,3代码