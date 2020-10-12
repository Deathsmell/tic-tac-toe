const merge = require('webpack-merge');
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge.merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        compress: true,
        port: 8000,
        allowedHosts: [
            'localhost:8080'
        ],
    },
    plugins:[new webpack.EnvironmentPlugin({
        'NODE_ENV': 'developer'
    })]
})