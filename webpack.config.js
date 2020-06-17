let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    path.resolve(path.join(__dirname, 'src/footer.js'))
  ],
  output: {
    path: path.resolve(path.join(__dirname, 'build')),
    filename: 'webpack.bundle.js',
    publicPath: '/',
  },
  plugins: [
    new require('copy-webpack-plugin')([process.cwd() + '/assets']),
    new HtmlWebpackPlugin({template: './.webpack/index.html',})
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: ['sass-loader']
      }]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      cwd: process.cwd(),
    }
  }
}
