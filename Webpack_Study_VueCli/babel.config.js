module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],//这个预设需要一个环境变量指定是开发环境还是生产环境，
    //可以通过下载cross-env，然后在package.json配置的启动命令前指定该环境变量的值
}