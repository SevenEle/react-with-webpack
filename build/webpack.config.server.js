const path = require('path');
const isDev = process.env.Node_env === 'development';
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const config = webpackMerge(baseConfig, {
  target: 'node',
  entry: {
    app: path.resolve(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    libraryTarget: "commonjs2"
  }
});
module.exports = config;
