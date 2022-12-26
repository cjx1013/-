## 安装
```
npm install cjx-tools

```

## 导入
```js

const d = require('./cjx-tools')

```

## 格式化时间
```js
//调用dateFormat对时间进行格式化
const dt = new Date();
console.log(d.dateFormat(dt));
//输出结果：2022-10-26 20:35:17
```

## 转义HTML中的特殊字符
```js
//待转换的HTML字符串
const str1 = '<h1>hello<span>"cjx"&nbsp;</span></h1>';
//调用HTMLEscape方法进行转换
console.log(d.htmlEscape(str1));
//输出结果：&lt;h1&gt;hello&lt;span&gt;&quot;cjx&quot;&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;
```

## 还原HTML中的特殊字符
```js
//待还原的字符串
const str2 = '&lt;h1&gt;hello&lt;span&gt;&quot;cjx&quot;&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;';
//调用HTMLUnEscape方法进行转换
console.log(d.htmlUnEscape(str2));
//输出结果：<h1>hello<span>"cjx"&nbsp;</span></h1>;
```

## 开源协议
ISC