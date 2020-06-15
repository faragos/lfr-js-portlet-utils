var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    path.resolve(path.join(__dirname, 'src/footer.js')),
    process.cwd() + '/src/index.js'
  ],
  output: {
    path: path.resolve(path.join(__dirname, 'build')),
    filename: 'webpack.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new require('copy-webpack-plugin')([path.resolve(path.join(__dirname, 'assets'))]),
    new HtmlWebpackPlugin({template: '.webpack/index.html',})
  ],
  module: {
    rules: [
      {
        test: /src\\.*\.js$/,
        use: 'babel-loader'
      },
      {
        test: /src\\.*\.scss$/,
        use: ['sass-loader']
      }]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      cwd: process.cwd(),
    }
  },
  optimization: {
    minimize: false
  }
}
