//导入自己开发的包
const d = require('./cjx-tools')

const dt = new Date();
console.log(d.dateFormat(dt));

const str1 = '<h1>hello<span>"cjx"&nbsp;</span></h1>';
console.log(d.htmlEscape(str1));

const str2 = '&lt;h1&gt;hello&lt;span&gt;&quot;cjx&quot;&amp;nbsp;&lt;/span&gt;&lt;/h1&gt;';
console.log(d.htmlUnEscape(str2));

