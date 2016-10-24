/*eslint camelcase:0, no-undef:0 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: [
        './static/js/main.js',
        './static/sass/main.scss'
    ],
    output: {
        filename: './static/build/build.js',
        cssFilename: './static/build/build.css'
    },
    resolve: {
        extensions: [ '', '.js', '.json'],
        modulesDirectories: [
            'static/js',
            'node_modules'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({process: {env: {NODE_ENV: JSON.stringify('production')}}}),
        new ExtractTextPlugin('./static/build/build.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                keep_fnames: true,
                warnings: false
            },
            sourceMap: false,
            mangle: true,
            output: {
                comments: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel?cacheDirectory=true'],
                include: path.join(__dirname, 'static/js')
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                include: [
                    path.join(__dirname, 'static/js/fixtures'),
                    path.join(__dirname, 'node_modules/moment-timezone/data/packed')
                    ]
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass'),
                include: path.join(__dirname, 'static/sass')
            },
            {
                test: /\.svg$/,
                loader: 'svg-url',
                include: path.join(__dirname, 'static/img')
            },
            {
                test: /\.woff$/,
                loader: 'url?limit=100000',
                include: path.join(__dirname, 'static/fonts')
            },
            {
                test: /\.woff2($|\?)/,
                loader: 'url?limit=100000',
                include: path.join(__dirname, 'static/fonts')
            }]
    }
};


module.exports = config;
