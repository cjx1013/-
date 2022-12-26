const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 入口文件
    entry: './src/index.ts',

    // 指定打包文件输出目录
    output: {
        // 打包文件目录
        path: path.resolve(__dirname, 'dist'),
        // 打包输出文件名
        filename: 'bundle.js',
        // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        // 使用babel处理TS处理不了的兼容性问题
                        loader: 'babel-loader',
                        options: {
                            // 设置预定义环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        targets: {
                                            // 兼容chrome88
                                            "chrome": "88",
                                            // 兼容ie11
                                            "ie": "11"
                                        },
                                        "corejs": "3",
                                        // 使用corejs的方式
                                        "useBuiltIns": "usage" //按需加载
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node-modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],

    resolve: {
        extensions: ['.ts', '.js']
    },
    
    mode: 'development'
}