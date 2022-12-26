//1.1、导入path路径模块
const path = require('path')
//1.2、导入fs文件系统模块
const fs = require('fs')
//1.3、定义正则表达式，分别匹配<style></style>和<script></script>标签
//\s表示空白字符，\S表示非空白字符
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/

//2.1、读取文件内容
fs.readFile(path.join(__dirname, '/Demo/MyDemo.html'), 'utf8', function(err, dataStr){
    if(err){
        //2.2、读取文件失败
        return console.log(err.message);
    }
    // console.log(dataStr);
    //2.3、读取文件成功后，调用对应的方法，拆解出css、js和html文件
    resolveCSS(dataStr);
    resolveScript(dataStr);
    resolveHTML(dataStr);
})

//3.1、定义处理css样式的方法
function resolveCSS(htmlStr) {
    //3.2、使用正则提取需要的内容，返回的是个数组，提取内容就存在数组下标为0的元素中
    const r1 = regStyle.exec(htmlStr);
    //3.3、将提取出来的样式字符串，进行字符串的replace替换操作
    const newCSS = r1[0].replace('<style>', '').replace('</style>', '');
    //3.4、调用writeFile方法将得到的样式写入到Demo文件夹的index.css文件中
    fs.writeFile(path.join(__dirname, '/Demo/index.css'), newCSS, function(err){
        if(err){
            return console.log('文件写入失败');
        }
        console.log('文件写入成功');
    })
}

//4.1、定义处理js代码的方法
function resolveScript(htmlStr) {
    //3.2、使用正则提取需要的内容，返回的是个数组，提取内容就存在数组下标为0的元素中
    const r2 = regScript.exec(htmlStr);
    //3.3、将提取出来的js字符串，进行字符串的replace替换操作
    const newScript = r2[0].replace('<script>', '').replace('</script>', '');
    //3.4、调用writeFile方法将得到的样式写入到Demo文件夹的index.js文件中
    fs.writeFile(path.join(__dirname, '/Demo/index.js'), newScript, function(err){
        if(err){
            return console.log('文件写入失败');
        }
        console.log('文件写入成功');
    })
}

//5.1、定义处理html代码的方法
function resolveHTML(htmlStr) {
    //5.2、将html文件中的style和script标签的内容替换成link外部引入
    const newHTML = htmlStr.replace(regStyle, '<link ref="stylesheet" href="./index.css">').
    replace(regScript, '<script src="./index.js"></script>');
    //5.3、将得到的html内容写入到Demo文件夹下的index.html中
    fs.writeFile(path.join(__dirname, '/Demo/index.html'), newHTML, function(err){
        if(err){
            return console.log('文件写入失败');
        }
        console.log('文件写入成功');
    })
}


