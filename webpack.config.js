let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

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
    new HtmlWebpackPlugin({template: './.webpack/index.html',}),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      cwd: process.cwd(),
    }
  },
  resolveLoader: {
    modules: ['node_modules', 'node_modules/@clavis/lfr-js-portlet-utils/node_modules'],
  }
}
