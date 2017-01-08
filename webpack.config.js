const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    entry: {
      main: './src/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.[hash].js',
      publicPath: '/'
    },
    module: {
      loaders: [
        {
          test: /.js$/,
          loader: 'babel-loader'
        },
        {
          test: /.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
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
