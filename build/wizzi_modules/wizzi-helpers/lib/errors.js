/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-helpers\.wizzi\ittf\lib\errors.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};

function FileError(message, ex) {
    this.name = 'FileError';
    this.message = message;
    this.inner = ex;
    this.stack = (new Error()).stack;
}
FileError.prototype.toString = function() {
    return this.message;
};
FileError.prototype = Object.create(Error.prototype);
FileError.prototype.constructor = FileError;
md.FileError = FileError;

function NodeError(message, node) {
    this.name = 'NodeError';
    var msg = [
        message
    ];
    if (node) {
        this.ittfDocumentUri = 'Unavailable';
        if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            if (node.wzSourceFilepath) {
                this.ittfDocumentUri = node.wzSourceFilepath(info.sourceKey);
            }
            this.row = info.row;
            this.col = info.col;
            this.sourceKey = info.sourceKey;
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + this.ittfDocumentUri));
        }
        else if (node.row) {
            this.row = node.row;
            this.col = node.col;
            msg.push((' at row: ' + node.row));
            msg.push((', col: ' + node.col));
        }
    }
    this.message = msg.join('');
    // log 'NodeError', this.message
    // VIA set this.node = node
    this.stack = (new Error()).stack;
}
NodeError.prototype.toString = function() {
    return this.message;
};
NodeError.prototype = Object.create(Error.prototype);
NodeError.prototype.constructor = NodeError;
md.NodeError = NodeError;

/**
     params
     { node
     @ description
    
*/
md.getErrorLinesFromMTreeNode = function(node, description) {
    var errorData = {
        row: node.r, 
        col: node.c, 
        description: description
    };
    while (node.parent) {
        node = node.parent;
    }
    var data = node.__mTree.loadHistory.ittfDocumentDatas[node.u];
    return md.getErrorLines(errorData, data.content, true);
};
/**
     params
     { errorData
     @ row
     @ col
     @ description
     string source
     boolean json
    
*/
md.getErrorLines = function(errorData, source, json) {
    var statements = source.split('\n');
    var start = Math.max(0, (errorData.row - 4));
    var end = Math.min(statements.length, (errorData.row + 4));
    var ret = [];
    for (var i = start; i < end; i++) {
        ret.push(formatLineNumber(i + 1) + ' ' + statements[i]);
        if (i == errorData.row - 1) {
            var col = errorData.col;
            ret.push(spaces(col + 4) + '^ ' + (errorData.description + '  <--- --- --- --- --- ERROR' || ''));
        }
    }
    return json ? ret : ret.join('\n');
};
function spaces(num) {
    if (num < 1) {
        return '';
    }
    return Array(num + 1).join(" ");
}
function formatLineNumber(num) {
    if (num > 999) {
        return num;
    }
    if (num > 99) {
        return ('0' + num);
    }
    if (num > 9) {
        return ('00' + num);
    }
    return ('000' + num);
}
