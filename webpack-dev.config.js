/*eslint camelcase:0, no-undef:0 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:6120',
        'webpack/hot/only-dev-server',
        './static/js/main.js',
        './static/sass/main.scss'
    ],
    output: {
        path: path.join(__dirname, 'static/build'),
        filename: 'build.js',
        publicPath: 'http://localhost:6120/static/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'static')
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        },
        {
            test: /\.svg$/,
            loader: 'svg-url'
        },
        {
            test: /\.woff$/,
            loader: 'url?limit=100000'
        },
        {
            test: /\.woff2($|\?)/,
            loader: 'url?limit=100000'
        }]
    }
};
