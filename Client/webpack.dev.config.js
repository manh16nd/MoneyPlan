var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        login: path.resolve(__dirname, 'src/client/src/jslogin', 'main.jsx')
    },
    output: {
        path: path.join(__dirname, './public/build/js'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css']
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel'},
            { test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass'] },
            { test: /\.(?:png|jpg|svg)$/, loader: 'url-loader', query: {}}
        ],
    },
    plugins: [
        new webpack.IgnorePlugin(/jsdom$/)
    ]
};