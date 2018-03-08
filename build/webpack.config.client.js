const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const isDev = process.env.Node_env === 'development';
const config = {
  mode: process.env.Node_env || 'production',
  entry: {
    app: path.resolve(__dirname, '../client/app.js')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/i,
        loader: 'eslint-loader',
        exclude: path.join(__dirname, '../node_modules/')
      },
      {
        test: /\.jsx?$/i,
        loader: 'babel-loader',
        exclude: path.join(__dirname, '../node_modules/')
      }
    ]
  },

  plugins: [
    new htmlPlugin({
      template: path.resolve(__dirname, '../client/template.html'),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    })
  ]
};

if (isDev) {
  config.devServer = {
    host: '0.0.0.0',
    port: 8888,
    contentBase: path.join(__dirname, '../dist'),
    publicPath: '/public/',
    overlay: true,
    compress: true,
    historyApiFallback: {
      index: '/public/index.html'
    },
    hot: true
  };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
