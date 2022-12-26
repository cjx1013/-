const path = require('path')

const fpath = '/a/b/c/index.html'

var fullName = path.basename(fpath)
console.log(fullName);//输出index.html

var nameWithoutExt = path.basename(fpath, '.html');//获取文件名并去除.html后缀名
console.log(nameWithoutExt);//输出index