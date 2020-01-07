const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = env => {
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
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
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
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    ]
  };
};
