const path = require('path');
const isDev = process.env.Node_env === 'development';
const config = {
  target: 'node',
  mode: process.env.Node_env || 'production',
  entry: {
    app: path.resolve(__dirname, '../client/server-entry.js')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    libraryTarget: "commonjs2"
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
  }
};
module.exports = config;
