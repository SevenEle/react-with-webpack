const path = require('path');
const webpack = require('webpack');
const htmlPlugin = require('html-webpack-plugin');
const isDev = process.env.Node_env === 'development';
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.resolve(__dirname, '../client/app.js')
  },

  output: {
    filename: '[name].[hash].js',
    publicPath: '/public/'
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
});

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
