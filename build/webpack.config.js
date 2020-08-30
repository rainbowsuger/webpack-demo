// 引入node的核心模块，路径path，可以使用绝对路径path.resolve(__dirname, 'bundle')
const path = require('path');
// 引入HTML插件，打包结束后可以自动生成index.html文件，并且可以将打包生成的out.js引入到HTML中。
// 可以配置index模板teamplate
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
// 运行在打包之前,首先清楚dist目录，然后再打包。
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const webpack = require('webpack');
// 打包生成css文件，不是css in js，需要使用此loader,OptimizeCSSAssetsPlugin是对css进行压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
module.exports = {
  /**
   * dev模式默认不支持tree-shaking，可以设置optimization
   * development/production,production打包会压缩文件,srouce-map更加简单
   *  */ 
  mode: 'development', //打包模式默认production（production打包文件会压缩、development不会压缩）
  /**
   * devtool的source-map映射关系，报错信息直接显示在源码哪一行，不是打包后的js文件。dist文件会有一个map文件，inline-source-map没有map文件，打包在js中，cheap-inline-source-map报错只精确到行，不到列，提高打包性能。
   * eval打包最快。module不止管源码报错还管第三方报错。
   * 建议：1、development：cheap-module-eval-source-map 2、production: cheap-module-source-map
   * */ 
  devtool: "cheap-module-eval-source-map", 
  entry: {
    out: './src/index.js',
    // header: './src/header.js'
  },// 入口文件,可以配置多个，key值为出口文件name
  /**
   * devServer源码改变时，不需要手动打包，再刷新页面,npm run start 不会生成dist目录是因为devServer插件将他放置在电脑内存中，以提高打包速度。
   * 配置webpack --watch即可监听源码变化，自动打包。
   * 配置webpack-dev-server，可以监听代码，自动打包，并且刷新浏览器。
   *  */ 
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    // 启动时自动在浏览器打开启动地址
    open: true,
    port: '8087',
    // css改变不重新加载页面
    hot: true,
    hotOnly: true, //HMR不生效的时候也不刷新浏览器
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  // loader
  module: { // 有些模块webpack不知道怎么打包，需要手动配置打包规则（不然会报错）
    rules: [
      {
        test: /\.(jpg|png|gif)$/, // 以jpg||png||gif结尾的打包规则
        use: {
         // file-loader将项目中静态资源移动到dist文件下,默认会更改名字
          loader: 'file-loader', // 安装file-loader（打包图片Excel等静态文件） npm install file-loader -D(本项目下安装)
          options: {
            // [name]写法是占位符 [name]_[hash].[ext]
            name: '[name].[ext]', // loader配置项，打包后文件名称不变
            outputPath: 'images/' // 将以jpg||png||gif结尾的文件打包到images下
          }
        } 
      },
      /**
       * url-loader和file-loader类似，多了一个limit属性。
       * url-loader会将图片资源翻译成base64打包到js文件中，不会打包在dist文件中。这样就省了image的http请求。
       * 如果文件很大的话，js文件会大加载会很慢,页面会加载很久
       *  */ 
      {
        test: /\.(jpg|png|gif)$/, // 以jpg||png||gif结尾的打包规则
        use: {
         // url-loader默认会将资源打包到js文件中
          loader: 'url-loader', // 安装url-loader（打包图片Excel等静态文件） npm install url-loader -D(本项目下安装)
          options: {
            // [name]写法是占位符 [name]_[hash].[ext]
            name: '[name].[ext]', // loader配置项，打包后文件名称不变
            outputPath: 'images/', // 将以jpg||png||gif结尾的文件打包到images下
            limit: 20480 // 图片大于20kb的时候，会打包到images/文件下
          }
        } 
      },
      /**
       * style-loder和MiniCssExtractPlugin.loader不能同时使用
       */
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
            // only enable hot in development热更新
            hmr: process.env.NODE_ENV === 'development',
          },
        }, 'css-loader']
      },
      /** ES6转ES5,安装npm install babel-loader 
      * 转ES6的语法 npm install @babel/preset-env --save-dev
      * 补充ES5中没有的变量 npm install --save @babel/polyfill，import "@babel/polyfill";适用于业务代码
      * options中的内容可以放置在.babelrc文件当中
      */
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {}
      }
    ]
  },
  // plugins可以在打包运行的某个时刻做一些事情，例如HtmlWebpackPlugin是打包完成后生成模板。
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html'
    }),
    new CleanWebpackPlugin(),
    // HMR当改变文件时，不重新加载页面，只是局部刷新。
    new webpack.HotModuleReplacementPlugin(),
    // css代码切割
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    })
  ],
  /**
   * 使用tree-shaking,packages.json文件中"sideEffects": ["@babel/polyfill"]/false(全部都tree-shaking)
   * 指的是不对@babel/polyfill进行tree-shaking，因为本身它的作用是将一些变量挂载window上（promise），没有export
   * dev环境下会math文件所有方法都会打包进去，但是used只有你使用的add
   */
  optimization: {
    usedExports: true,
    splitChunks: { // 都进行chunk(大块)
      chunks: 'all'
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  output: { // 打包好的文件（出口文件）
    // 当部分打包文件需要放置在cdn上的时候
    // publicPath: 'http://cdn.com',
    filename: '[name].js', // js文件名称,当入口文件只有一个的时候
    chunkFilename: '[name].chunk.js', // 第三方库引入不打包进main.js当中。
    path: path.resolve(__dirname, 'dist') // 打包的文件夹名称-位置
  }
}