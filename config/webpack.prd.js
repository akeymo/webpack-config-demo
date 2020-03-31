const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',

    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '..', 'dist', 'dll', 'manifest.json')
        }),

        new UglifyJsPlugin({
            
        })
    ]
}