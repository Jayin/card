var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: './app',
        port: 8080
    },
    // entry: [
    //     'webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080',
    //     // path.resolve(__dirname, 'app/main.jsx'),
    //     path.resolve(__dirname, 'app/index.js'),
    //     path.resolve(__dirname, 'app/share.js')
    //
    // ],
    entry:{
        'main': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname, 'app/main.jsx')],
        'index': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname, 'app/index.js')],
        'share': ['webpack/hot/dev-server','webpack-dev-server/client?http://localhost:8080',path.resolve(__dirname, 'app/share.js')],
    },
    output: {
        path: __dirname + '/build',
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            include: path.resolve(__dirname, 'app'),
            loader: 'style-loader!css-loader'
        }, {
            test: /\.js[x]?$/,
            include: path.resolve(__dirname, 'app'),
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    ],
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        // "jquery": "jQuery"
    }
};
