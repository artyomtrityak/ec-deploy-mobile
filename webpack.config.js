var webpack = require('webpack'),
    path = require('path'),
    AnybarWebpackPlugin = require('anybar-webpack');

module.exports = {
    watch: true,
    entry: path.join(__dirname, '/app/index.jsx'),
    module: {
        preLoaders: [
          {
            test: /\.jsx$|\.js$/,
            loaders: ['eslint'],
            exclude: /node_modules/
          }
        ],
        loaders: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?optional=runtime']
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/'),
        filename: 'index.ios.js',
        libraryTarget: 'commonjs'
    },
    externals: [require('./ignore-modules')],
    eslint: {
        configFile: '.eslintrc',
        emitError: true
    },
    resolve: {
        root: path.resolve('./app'),
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new AnybarWebpackPlugin()
    ]
};