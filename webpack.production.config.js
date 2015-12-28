var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  devtool: 'cheap-source-map',
  entry: {
      'main':path.resolve(__dirname, 'app/main.jsx'),
    //   'share':path.resolve(__dirname, 'app/share.jsx')
  },
  output: {
    path: __dirname + '/build/card',
    publicPath: '/card/', //CDN
    filename: '[name].bundle.js'
  },
  module: {
    loaders:[
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=0'
      }
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
      { from: './app/share.html', to: 'share.html' },
      { from: './app/images', to: 'images'}
    ]),
  ]
};
