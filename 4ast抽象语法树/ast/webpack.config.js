const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // 虚拟打包路径，就是说文件不会真正生成，而是在8080端口虚拟生成
    publicPath: '/xuni/',
    // 打包出来的文件名
    filename: 'bundle.js'
  },
  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件夹
    contentBase: path.join(__dirname, 'www')
    // static: '/www/index.html'
  }
}