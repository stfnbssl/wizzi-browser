/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\ittf\lib\json\directoryTree.js.ittf
*/
'use strict';
// forked from https://raw.githubusercontent.com/mihneadb/node-directory-tree/master/lib/directory-tree.js
const FS = require('fs');
const PATH = require('path');
const constants = {
    DIRECTORY: 1, 
    FILE: 2
};
function safeReadDirSync(path) {
    let dirData = {};
    try {
        dirData = FS.readdirSync(path);
    } 
    catch (ex) {
        if (ex.code == "EACCES") {
            // User does not have permissions, ignore directory
            return null;
        }
        else {
            throw ex;
        }
    } 
    return dirData;
}
function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
function isRegExp(regExp) {
    return typeof regExp === "object" && regExp.constructor == RegExp;
}
function directoryTree(path) {
    const name = PATH.basename(path);
    path = normalizePath(path);
    const item = {
        path, 
        name
    };
    let stats;
    try {
        stats = FS.statSync(path);
    } 
    catch (e) {
        return null;
    } 
    // log 'stats', stats
    if (stats.isFile()) {
        const ext = PATH.extname(path).toLowerCase();
        // Skip if it does not match the extension regex
        // log 'ext', ext
        if (ext != '.ittf') {
            return null;
        }
        // File size in bytes
        // set item.size = stats.size
        // set item.extension = ext
        item.type = constants.FILE;
    }
    else if (stats.isDirectory()) {
        let dirData = safeReadDirSync(path);
        if (dirData === null) {
            return null;
        }
        item.children = [];
        item.type = constants.DIRECTORY;
        var i, i_items=dirData, i_len=dirData.length, child;
        for (i=0; i<i_len; i++) {
            child = dirData[i];
            item.children.push(directoryTree(PATH.join(path, child)));
        }
    }
    else {
        return null;
    }
    return item;
}
module.exports = directoryTree;
