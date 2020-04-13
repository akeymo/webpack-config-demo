const webpack = require('webpack');
const path = require('path');
const apiMocker = require('mocker-api');

module.exports = {
    mode: 'development',

    devtool: 'cheap-module-eval-source-map', // 开发环境，原始源代码（仅限行）

    devServer: {
        hot: true, // 更新代码不刷新整个页面
        port: 8081,
        quiet: false, // 默认false，启用后除了初始信息以外的内容都不会被打印
        overlay: false, // 默认false, 当编译出错时，会在浏览器窗口全屏输出
        stats: 'errors-only', // 终端中仅打印出error
        compress: false, // 是否启用gzip压缩
        before(app) { // mock数据
            apiMocker(app, path.resolve(__dirname, '..', 'mock', 'mocker.js'))
        },
        proxy: {
            // 配置代理，解决跨域
            "/api": {
                target: "http://localhost:3000",
                // 如果后端接口不带/api,但为了有一个统计处理的规则
                // pathRewrite: {
                //     '/api': ''
                // }
            }
        }
    },

    optimization: {
        usedExports: true
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
}