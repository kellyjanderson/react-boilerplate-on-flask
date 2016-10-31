/*eslint camelcase:0, no-undef:0 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:6120/',
        './app/static/js/main.js',
        './app/static/sass/main.scss'
    ],
    output: {
        path: path.join(__dirname, 'app/static/build'),
        filename: 'build.js',
        publicPath: 'http://localhost:6120/static/build/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react']
        },
        {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        }
        ]
    }
};
