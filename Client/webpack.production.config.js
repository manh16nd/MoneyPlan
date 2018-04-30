var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/client/src/jslogin', 'main.jsx'),
        path.resolve(__dirname, 'src/client/src/css', 'app.scss')
    ],
    output: {
        filename: 'login.js', 
        path: path.resolve(__dirname, 'public/build/js/')
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css']
    },
    module: {
        loaders: [
            {
                test: /node_modules\/entities\/.*\.json|\.jsx?$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.md$/,
                loader: 'babel!markdown-loader'
            },
            { 
                test: /\.json$/, 
                loader: 'json-loader'
            },
            {
                test: /\.scss$/i, 
                loader: 'style!css!sass'
            }
        ]
    },
    plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false
          }),
          new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
          }),
          new webpack.IgnorePlugin(/jsdom$/)
    ]
};