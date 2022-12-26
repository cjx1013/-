//引入node.js的内置模块，path
const path = require("path")
//插件需要引入
//引入eslint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
//引入处理html资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //入口
    //相对路径和绝对路径都行
    //这里的相对路径不是以当前这个webpack.dev.js为参照，而是以在终端运行指令的路径为准
    //而终端运行指令的路径为Webpack_Study，所以即使新建了个config文件夹，也是和原先一样的写法
    entry: "./src/main.js",
    //输出
    output: {
        //path: 文件输出目录，必须是绝对路径
        //path.resolve()方法返回一个绝对路径
        //__dirname是当前文件的文件夹绝对路径
        //下面代码表示将webpack编译后的文件输出在当前目录下的dist文件夹下
        path: undefined, //开发模式没有输出，不需要指定输出目录
        //入口文件打包输出文件名
        //将js文件输出到static/js目录中
        // filename: "static/js/main.js",
        filename: "static/js/[name].js",//入口文件打包输出资源命名方式，为了防止以后变成多入口文件，这里没有写死main.js，而是[name].js
        //动态导入输出资源命名方式，加个chunk来区别打包的入口文件和动态导入的文件
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/media/[name].[hash][ext]",//图片、字体图标等资源命名方式(注意用hash)
        //自动清空上次打包的内容
        //原理：在打包前，将path整个目录内容清空，再进行打包
        clean: true//开发模式没有输出，不需要清空输出结果
    },
    //加载器
    module: {
        rules: [
            {
                oneOf: [
                    //想要webpack处理默认不能处理的文件，就需要通过配置loader加载，来编译这些资源
                    //loader的配置
                    {
                        //test用来检测，就是你这个loader想要对那些文件生效，就在test里配置
                        //test的值可以是正则表达式，这里用来匹配.css结尾的文件，
                        test: /\.css$/,
                        // use 数组里面的loader执行顺序是从右往左或从下往上,
                        //这里使用两个loader
                        // use: ["style-loader", "css-loader"]
                        use: [
                            "style-loader", //会动态创建一个style标签，里面放置webpack中css模块的内容
                            "css-loader" //负责将css文件编译成webpack能识别的模块
                            //此时样式就会以style标签的形式在页面上生效
                        ]
                    },
                    {
                        test: /\.less$/,
                        //use可以使用多个loader，而loader:xxx 只能使用一个loader
                        use: ["style-loader", "css-loader", "less-loader"],
                    },
                    {
                        test: /.s[ac]ss$/,
                        use: ["style-loader", "css-loader", "sass-loader"],
                    },
                    {
                        test: /.styl$/,
                        use: ["style-loader", "css-loader", "stylus-loader"],
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp)$/,
                        type: "asset",
                        parser: {
                            dataUrlCondition: {
                                //小于10kb的图片转成base64格式
                                //优点：减少请求数量 缺点：体积会更大
                                maxSize: 10 * 1024, //10kb
                            }
                        },
                        // generator: {
                        //     // 将图片文件输出到 static/imgs 目录中
                        //     // 将图片文件命名 [hash:8][ext][query]
                        //     // [hash:8]: hash值取8位
                        //     // [ext]: 使用之前的文件扩展名
                        //     // [query]: 添加之前的query参数，比如url?后的一些参数
                        //     filename: "static/imgs/[hash:8][ext][query]"
                        // },
                        
                    },
                    {
                        //处理字体图标，音频等其他资源
                        test: /\.(ttf|woff2|mp3|mp4|avi)$/,
                        type: "asset/resource",
                        // generator: {
                        //     filename: "static/media/[hash:8][ext][query]"
                        // }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,//排除node_modules里的代码不编译
                        loader: "babel-loader"
                    }
                ]
            }

        ]
    },
    //插件
    plugins: [
        new ESLintWebpackPlugin({
            //指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",//默认值
        }),
        new HtmlWebpackPlugin({
            //以public/index.html为模板创建新的html文件
            //如果没有配置template，那么自己原先在index.html中
            //的结构就不会出现在新的index.html中，结构会丢失
            template: path.resolve(__dirname, "../public/index.html")
            //新的html文件有两个特点：1、内容与源文件一致，2、自定引入打包生成的js等资源
        })
    ],
    //配置开发服务器，自动编译，不会输出资源，在内存中编译打包的
    devServer: {
        host: "localhost", //启动服务器域名
        port: "3000", //启动服务器端口号
        open: true, //是否编译完自动打开浏览器
        hot: true //开启HMR功能(默认值)（只能用于开发环境，生产环境不需要，生产模式打包就是重新打包
        //没办法利用HMR模块热替换)
    },
    //模式
    mode: "development",
    devtool: "cheap-module-source-map"
}