const path = require('path'); // 引入node的核心模块，路径path，可以使用绝对路径path.resolve(__dirname, 'bundle')

module.exports = {
  mode: 'development', //打包模式默认production（production打包文件会压缩、development不会压缩）
  entry: './src/index.js',// 入口文件
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
      // url-loader和file-loader类似，多了一个limit属性。
      // url-loader会将图片资源翻译成base64打包到js文件中，不会打包在dist文件中。这样就省了image的http请求。
      // 如果文件很大的话，js文件会大加载会很慢,页面会加载很久
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
    ]
  },
  output: { // 打包好的文件（出口文件）
    filename: 'out.js', // js文件名称
    path: path.resolve(__dirname, 'dist') // 打包的文件夹名称
  }
}