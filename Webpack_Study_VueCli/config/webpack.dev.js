const path = require('path')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const {DefinePlugin} = require('webpack')

const getStyleLoaders = (preProcessor) => {
    //使用vue-style-loader
    return ["vue-style-loader", "css-loader",{
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [
                    "postcss-preset-env",//能解决大多数样式兼容性问题
                ]
            }
        }
    }, 
    preProcessor
    ].filter(Boolean)
}

module.exports = {
    //入口
    entry: "./src/main.js",
    //输出
    output: {
        path: undefined,
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
        assetModuleFilename: "static/js/[hash:10][ext][query]",
    },
    //加载器
    module: {
        rules: [
        //处理css
        {
            test: /\.css$/,
            use: getStyleLoaders(),
        },
        //处理less
        {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
        },
        //处理sass
        {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
        },
        //处理stylus
        {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
        },
        //处理图片
        {
            test: /\.(jpe?g|png|gif|webp|svg)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024
                }
            }
        },
        //处理字体图标等其他资源
        {
            test: /\.(woff2?|ttf)$/,
            type: "asset/resource",

        },
        //处理js
        {
            test: /.\js$/,
            include: path.resolve(__dirname, "../src"),
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                cacheCompression: false
            }
        },
        //处理vue文件
        {
            test: /\.vue$/,
            loader: "vue-loader",// 内部会给vue文件注入HMR功能代码
        }
        ]
    },
    //插件
    plugins: [
        //处理js的eslint
        new EslintWebpackPlugin({
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules",
            cache: true,
            cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache")
        }),
        //处理html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new VueLoaderPlugin(),
        //cross-env定义的环境变量是给打包工具使用的
        //DefinePlugin定义的环境变量是给源代码使用的，从而解决vue3页面警告的问题
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ],
    //模式
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        }
    },
    //webpack解析模板嘉爱选项
    resolve: {
        //在引入模块时如果没有加文件扩展名，那么自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],//这个意思就是加载文件时先以.vue扩展名加载，如果不行再以.js扩展名加载
    },
    devServer: {
        host: "localhost",
        port: 4000,
        open: true,
        hot: true,
        historyApiFallback: true, //解决前端路由刷新404问题
    },
    mode: "development",
    devtool: "cheap-module-source-map",
}