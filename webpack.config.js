const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const isDev = process.env.NODE_ENV === 'development';
const tempConfig = require('./public/config')[isDev ? 'dev' : 'build'];
const config = require(`./config/webpack.${isDev ? 'dev' : 'prd'}`);

const baseConfig = {
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:6].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, // 替换style-loader
                        options: {
                            hmr: isDev,
                            reladAll: true
                        }
                    },
                    'css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    }, 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192, // 在这个范围内的资源会被转成base64
                            esModule: false, // 否则<img src={require('xxx.jpg')} />会被转成<img src=[Module Object] />
                            name: '[name]_[hash:6].[ext]', // 默认文件名是哈希值
                            outputPath: 'assets' // 指定输出目录
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },

    optimization: {
        splitChunks: { // 分割代码
            cacheGroups: {
                vendor: {
                    // 第三方依赖
                    priority: 1, // 优先级，首先抽离第三方依赖
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 1 // 最少引入了1次
                },
                common: {
                    // 公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 100,
                    minChunks: 3
                }
            }
        },
        runtimeChunk: { // 配置splitChunks时需要配置runtimeChunk
            name: 'manifest'
        }
    },

    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] // 不删除dll目录下的文件
        }),
        new CopyWebpackPlugin([
            {
                from: './public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true // 只拷贝文件，不会把文件夹路径都拷贝上
            }
        ], {
            ignore: ['other.js'] // 过滤的文件
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', // 打包后的文件名
            config: tempConfig.template,
            chunks: ['index'] // 指定引入到html中的JS
        }),
        new HtmlWebpackPlugin({
            template: './public/login.html',
            filename: 'login.html',
            chunks: ['login']
        })
    ]
};

module.exports = merge(baseConfig, config);

