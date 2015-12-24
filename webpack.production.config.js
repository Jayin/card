var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  devtool: 'cheap-source-map',
  entry: {
      'main':path.resolve(__dirname, 'app/main.jsx'),
      'index':path.resolve(__dirname, 'app/index.js'),
      'share':path.resolve(__dirname, 'app/share.js')
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
      { from: './app/main.css', to: 'main.css' },
      { from: './app/share.html', to: 'share.html' }
    ]),
  ]
};
