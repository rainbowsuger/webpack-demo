 /**
	* 使用webpack-merge将common和dev/prod结合
	* npm install webpack-merge -D
	*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
	entry: {
    lodash: './src/common/lodash.js',
		out: './src/index.js',
	},
    // loader
  module: { // 有些模块webpack不知道怎么打包，需要手动配置打包规则（不然会报错）
		rules: [
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
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
          },
        }, 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {}
      }
    ]
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
    })
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist')
  }
}