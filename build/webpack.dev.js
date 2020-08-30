const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const devConfig = {
  mode: 'development', //打包模式默认production（production打包文件会压缩、development不会压缩）
  devtool: "cheap-module-eval-source-map", 
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    // 启动时自动在浏览器打开启动地址
    open: true,
    port: '8087',
    // css改变不需要重新加载页面
    hot: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    // HMR当改变文件时，不重新加载页面，只是局部刷新。
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    usedExports: true
  }
}
module.exports = merge(commonConfig, devConfig)