/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\root\webpack.config.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:29 GMT
*/
'use strict';
const path = require('path');
module.exports = {
    entry: [
        './src/index.js'
    ], 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            }, 
            {
                test: /\.css$/, 
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            }, 
            {
                test: /(\.scss)$/, 
                exclude: /(node_modules)/, 
                use: [
                    'style-loader', 
                    'css-loader', 
                    'sass-loader'
                ]
            }
        ]
    }, 
    resolve: {
        extensions: [
            '*', 
            '.js', 
            '.jsx'
        ]
    }, 
    output: {
        path: path.resolve(__dirname, '..', 'app', 'wizzifactory.github.io', 'scripts'), 
        filename: 'wizzi-play.js'
    }, 
    node: {
        fs: 'empty', 
        'fs-extra': 'empty', 
        'fs-graceful': 'empty', 
        module: 'empty', 
        'mongodb': 'empty', 
        'mongodb-core': 'empty'
    }, 
    plugins: [
        
    ], 
    devServer: {
        contentBase: './dist'
    }
};
