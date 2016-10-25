/*eslint camelcase:0, no-undef:0 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: [
        './app/static/js/main.js',
        './app/static/sass/main.scss'
    ],
    output: {
        filename: './app/static/build/build.js',
        cssFilename: './app/static/build/build.css'
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
        new ExtractTextPlugin('./app/static/build/build.css'),
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
                loaders: ['babel?cacheDirectory=true']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            { 
                test: /\.jsx?$/,         // Match both .js and .jsx files
                exclude: /node_modules/, 
                loader: "babel", 
                query:
                {
                    presets:['react']
                }
            }
        ]
    }
};

module.exports = config;
