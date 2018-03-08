const path = require('path');
module.exports = {
  mode: process.env.Node_env || 'production',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '../dist')
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
