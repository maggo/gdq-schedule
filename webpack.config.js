const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    entry: {
      main: './src/main.js'
    },
    output: {
      path: './dist',
      filename: '[name].bundle.[hash].js',
      publicPath: '/'
    },
    module: {
      loaders: [
        {
          test: /.js$/,
          loader: 'babel'
        },
        {
          test: /.scss$/,
          loader: 'style!css!sass'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  }
}
