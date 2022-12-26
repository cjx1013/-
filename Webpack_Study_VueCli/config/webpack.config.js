//合并生产模式和开发模式配置
const path = require('path')
const EslintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const {DefinePlugin} = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
//引入element-plus(按需引入)
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

//开发模式和生产模式进行合并
//设置变量判断是生产模式还是开发模式
const isProduction = process.env.NODE_ENV === "production"

const getStyleLoaders = (preProcessor) => {
    return [
        //将css提取成单独文件
        //开发模式就用vue-style-loader，生产模式就用css压缩
        isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader", 
        "css-loader",{
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [
                    "postcss-preset-env",//能解决大多数样式兼容性问题
                ]
            }
        }
    }, 
    // preProcessor,
    //配置element-plus的自定义主题样式
    preProcessor && {
        loader: preProcessor,
        options:
            preProcessor === "sass-loader"? {
                //@符是在下面的resolve里配置的路径别名
                additionalData: `@use "@/styles/element/index.scss" as *;`,
            } : {},
    }
    ].filter(Boolean)
}

module.exports = {
    //入口
    entry: "./src/main.js",
    //输出
    output: {
        path: isProduction ? path.resolve(__dirname, "../dist") : undefined,
        filename: isProduction ? "static/js/[name].[contenthash:10].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contenthash:10].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/js/[hash:10][ext][query]",
        clean: true
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
                //开启缓存
                cacheDirectory: true,
                cacheCompression: false //缓存不压缩
            }
        },
        //处理vue文件
        {
            test: /\.vue$/,
            loader: "vue-loader",// 内部会给vue文件注入HMR功能代码
            options: {
                //开启缓存
                cacheDirectory: path.resolve(__dirname, "../node_modules/.cache/vue-loader")
            }
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
        //提取css成为单独文件
        isProduction && new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:10].css",
            chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
        }),
        //处理html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html")
        }),
        //有时会在public文件夹放些favicon.ico或者其他的静态文件，此时打包，这些文件并不会打包到dist目录中
        //这时需要将public下的资源除了index.html(因为上面配置的HtmlWebpackPlugin也会根据public下的index.html生成一份index.html
        //会引起冲突)，其他都原封不动的复制到dist目录下
        isProduction && new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname, "../public") , to: path.resolve(__dirname, "../dist"),
                globOptions: {
                    dot: true,
                    gitignore: true,
                    //忽略index.html
                    ignore: ["**/index.html"],
                },
              },
            ],
          }),
        new VueLoaderPlugin(),
        //cross-env定义的环境变量是给打包工具使用的
        //DefinePlugin定义的环境变量是给源代码使用的，从而解决vue3页面警告的问题
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        }),
        //element-plus按需引入配置
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        //element-plus按需引入配置
        Components({
            resolvers: [ElementPlusResolver({
                //自定义主题，引入sass
                importStyle: "sass"
            })],
        }),
    ].filter(Boolean),
    //模式
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            //组，哪些模块要打包到一个组
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
                    name: "vue-chunk",
                    priority: 40,
                },
                elementPlus: {
                    test: /[\\/]node_modules[\\/]element-plus[\\/]/,
                    name: "elementPlus-chunk",
                    priority: 30,
                },
                libs: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "lib-chunk",
                    priority: 20,
                },
            },
        },
        runtimeChunk: {
            name: (entrypoint) => `runtime~${entrypoint.name}.js`,
        },
        //开发模式不需要压缩，生产模式压缩
        minimize: isProduction,
        minimizer: [
            //css压缩
            new CssMinimizerWebpackPlugin(),
            //js压缩
            new TerserWebpackPlugin(),
            //图片压缩
            new ImageMinimizerPlugin({
                minimizer: {
                  implementation: ImageMinimizerPlugin.imageminGenerate,
                  options: {
                    plugins: [
                      ["gifsicle", { interlaced: true }],
                      ["jpegtran", { progressive: true }],
                      ["optipng", { optimizationLevel: 5 }],
                      [
                        "svgo",
                        {
                          plugins: [
                            "preset-default",
                            "prefixIds",
                            {
                              name: "sortAttrs",
                              params: {
                                xmlnsOrder: "alphabetical",
                              },
                            },
                          ],
                        },
                      ],
                    ],
                  },
                },
              }),
        ]
    },
    //webpack解析模板嘉爱选项
    resolve: {
        //在引入模块时如果没有加文件扩展名，那么自动补全文件扩展名
        extensions: [".vue", ".js", ".json"],//这个意思就是加载文件时先以.vue扩展名加载，如果不行再以.js扩展名加载
        //路径别名
        alias: {
            "@": path.resolve(__dirname, "../src"),
        }
    },
    devServer: {
        host: "localhost",
        port: 4000,
        open: true,
        hot: true,
        historyApiFallback: true, //解决前端路由刷新404问题
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    performance: false //关闭性能分析，提升打包速度
}