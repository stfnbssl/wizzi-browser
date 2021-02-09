/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-git\.wizzi\ittf\lib\fsGit.js.ittf
*/
'use strict';
var git = require('isomorphic-git');
var u = require('wizzi-utils');
var verify = u.verify;
var BrowserFS = u.BrowserFS;
var fs = null;
var storeName = "wizziRepo";
function initialize(options, callback) {
    if (fs != null) {
        if (verify.isNotEmpty(options.storeName && options.storeName !== storeName)) {
            return callback({
                    __is_error: true, 
                    message: 'In the same process more than one storeNames cannot be used: ' + storeName + ' and ' + options.storeName, 
                    method: 'initialize', 
                    source: 'wizzi-utils.fs.browserRepo'
                });
        }
        return callback(null);
    }
    if (verify.isNotEmpty(options.storeName)) {
        storeName = options.storeName;
    }
    BrowserFS.install(window);
    BrowserFS.configure({
        fs: "MountableFileSystem", 
        options: {
            '/tmp': {
                fs: "InMemory"
            }, 
            '/ixdb': {
                fs: "IndexedDB", 
                options: {
                    storeName: storeName
                }
            }
        }
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        window.fs = fs = BrowserFS.BFSRequire('fs');
        git.plugins.set('fs', window.fs);
        return callback(null);
    });
}
//
module.exports = function(options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    if (callback) {
        initialize(options, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null, {
                    fs: fs, 
                    git: git
                });
        });
    }
    else {
        initialize(options);
        return {
                fs: fs, 
                git: git
            };
    }
};
