/**
 * npm run server
 * 手动实现一个webpack-dev-server,监听源码改变自动打包，
 * 但是需要手动刷新浏览器。还是用webpack-dev-server,现在已经很成熟。
 */
// 开一个服务器
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
// webpack使用：1、命令行中webpack index.js  2、node中运行webpack
// 利用webpack和webpack的配置生成一个webpack的编译器
const complier = webpack(config);
// 利用express起一个应用，HTTP的服务器，启动在3000端口上
const app = express();
app.use(webpackDevMiddleware(complier, {}));

app.listen(3000, () => {
    // 启动完成后的一个回调
    console.log('server is running');
});
