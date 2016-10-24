var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack-dev.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    inline: true,
    progress: true,
    hot: true,
    historyApiFallback: true
}).listen(6120, 'localhost', function(err, result) {
    if (err) {
        console.log(err, result);
    }
    console.log('Listening at localhost:6120');
});
