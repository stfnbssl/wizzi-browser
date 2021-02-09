/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-browser\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-browser\packages\wizzi-standalone\.wizzi\root\webpack.config.js.ittf
*/
'use strict';
const path = require('path');
const resolve = path.resolve;
const webpack = require('webpack');
module.exports = {
    mode: "development", 
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
            }
        ]
    }, 
    resolve: {
        modules: [
            path.resolve(__dirname, "src"), 
            "node_modules"
        ], 
        extensions: [
            ".js", 
            ".json"
        ], 
        alias: {
            chalk: false, 
            constants: false, 
            fs: false, 
            'fs-extra': false, 
            'fs-graceful': false, 
            'graceful-fs': false, 
            'mongodb': false, 
            'mongodb-core': false, 
            os: false
        }, 
        fallback: {
            assert: require.resolve("assert/"), 
            buffer: require.resolve("buffer/"), 
            crypto: require.resolve("crypto-browserify"), 
            events: require.resolve("events/"), 
            path: require.resolve("path-browserify"), 
            stream: require.resolve("stream-browserify"), 
            process: require.resolve("process/browser"), 
            url: require.resolve("url/"), 
            util: require.resolve("util/")
        }
    }, 
    output: {
        path: path.resolve(__dirname, '..', 'dist', 'scripts'), 
        filename: 'wizzi-standalone.js', 
        library: 'wizziStandalone', 
        libraryTarget: 'var'
    }, 
    node: {
        
    }, 
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser', 
            Buffer: [
                'Buffer', 
                'buffer'
            ], 
            console: 'console-browserify'
        })
    ], 
    devtool: 'cheap-module-source-map', 
    externals: [
        {
            'lodash': '_'
        }
    ], 
    devServer: {
        
    }
};
