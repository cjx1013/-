//nodejs核心模块os，直接使用
const os = require('os');
//cpu核数
const threads = os.cpus().length;
//引入terser-webpack-plugin插件，webpack内部就有，不需要下载，用于js压缩
const TerserPlugin = require("terser-webpack-plugin");
//引入node.js的内置模块，path
const path = require("path")
//插件需要引入
//引入eslint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
//引入处理html资源的插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入提取css成单独文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//引入css压缩插件
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//引入压缩图片的插件
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
//引入preload/prefetch插件
// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
//引入实现PWA的插件
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
//获取处理样式的loaders
const getStyleLoaders = (preProcessor) => {
  return [
    // "style-loader", //会动态创建一个style标签，里面放置webpack中css模块的内容
    //就不再使用style-loader动态创建一个style标签防止css内容了，而是直接通过link引入css
    MiniCssExtractPlugin.loader,
    "css-loader", //负责将css文件编译成webpack能识别的模块
    //此时样式就会以style标签的形式在页面上生效
    {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: [
              "postcss-preset-env", // 能解决大多数样式兼容性问题
            ],
          },
        },
    },
    preProcessor
  ].filter(Boolean)//prePrecessor可能没有，所以有可能是undefined，通过filter过滤掉
}
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
        path: path.resolve(__dirname, "../dist"),//生产模式需要输出
        //入口文件打包输出文件名
        //将js文件输出到static/js目录中
        // filename: "static/js/main.js",
        // filename: "static/js/[name].js",//入口文件打包输出资源命名方式，为了防止以后变成多入口文件，这里没有写死main.js，而是[name].js
        filename: "static/js/[name].[contenthash:8].js",//使用contenthash，取8位长度
        //动态导入输出资源命名方式，加个chunk来区别打包的入口文件和动态导入的文件
        // chunkFilename: "static/js/[name].chunk.js",
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
        assetModuleFilename: "static/media/[name].[hash][ext]",//图片、字体图标等资源命名方式(注意用hash)
        //自动清空上次打包的内容
        //原理：在打包前，将path整个目录内容清空，再进行打包
        clean: true
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
                        use: getStyleLoaders(),
                    },
                    {
                        test: /\.less$/,
                        //use可以使用多个loader，而loader:xxx 只能使用一个loader
                        use: getStyleLoaders("less-loader"),
                    },
                    {
                        test: /.s[ac]ss$/,
                        use: getStyleLoaders("sass-loader"),
                    },
                    {
                        test: /.styl$/,
                        use: getStyleLoaders("stylus-loader"),
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
                        // loader: "babel-loader",
                        use: [
                            {
                                loader: "thread-loader",//开启多进程
                                options: {
                                    workers: threads, //进程数量
                                },
                            },
                            {
                                loader: "babel-loader",
                                options: {
                                    cacheDirectory: true, //开启babel编译缓存
                                    cacheCompression: false, //缓存文件不要压缩，压缩需要时间，而且缓存文件在代码上线后用不到，所以关闭缓存文件压缩
                                    plugins: ["@babel/plugin-transform-runtime"],//减少代码体积
                                }
                            }
                        ],
                        
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
            cache: true, //开启缓存
            //缓存目录
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"),
            threads, //开启多进程
        }),
        new HtmlWebpackPlugin({
            //以public/index.html为模板创建新的html文件
            //如果没有配置template，那么自己原先在index.html中
            //的结构就不会出现在新的index.html中，结构会丢失
            template: path.resolve(__dirname, "../public/index.html")
            //新的html文件有两个特点：1、内容与源文件一致，2、自定引入打包生成的js等资源
        }),
        //提取css为单独文件
        new MiniCssExtractPlugin({
            //定义输出文件名和目录
            // filename: "static/css/main.css"
            // filename: "static/css/[name].css",
            filename: "static/css/[name].[contenthash:8].css",
            // chunkFilename: "static/css/[name].chunk.css"
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css"
        }),
        //css压缩
        // new CssMinimizerPlugin(),
        // new PreloadWebpackPlugin({
        //     // rel: "preload", //preload兼容性更好
        //     // as: "script",
        //     rel: 'prefetch' //prefetch兼容性更差，它不用as这个配置项
        // })
        new WorkboxWebpackPlugin.GenerateSW({
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        })
    ],
    //生产模式不需要开发服务器，因为开发服务器不糊输出资源，而生产模式需要打包输出文件
    //配置开发服务器，自动编译，不会输出资源，在内存中编译打包的
    // devServer: {
    //     host: "localhost", //启动服务器域名
    //     port: "3000", //启动服务器端口号
    //     open: true, //是否编译完自动打开浏览器
    // },
    //模式
    optimization: {
        minimize: true,
        minimizer: [
            //css压缩也可以写到optimization.minimizer里面，效果一样
            new CssMinimizerPlugin(),
            // 生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
            new TerserPlugin({
                parallel: threads //开启多进程
            }),
            // 压缩图片
            // new ImageMinimizerPlugin({
            //     minimizer: {
            //     implementation: ImageMinimizerPlugin.imageminGenerate,
            //     options: {
            //         plugins: [
            //         ["gifsicle", { interlaced: true }],
            //         ["jpegtran", { progressive: true }],
            //         ["optipng", { optimizationLevel: 5 }],
            //         [
            //             "svgo",
            //             {
            //             plugins: [
            //                 "preset-default",
            //                 "prefixIds",
            //                 {
            //                 name: "sortAttrs",
            //                 params: {
            //                     xmlnsOrder: "alphabetical",
            //                 },
            //                 },
            //             ],
            //             },
            //         ],
            //         ],
            //     },
            //     },
            // }),
        ],
        //代码分割
        splitChunks: {
            chunks: "all", //对所有的模块进行分割
            //其他的用默认值即可
        },
        //提取runtime文件
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}`,//runtime命名规则
        }
    },
    mode: "production",
    devtool: "source-map"
}