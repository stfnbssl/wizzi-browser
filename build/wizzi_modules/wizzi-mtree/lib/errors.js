/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\errors.js.ittf
*/
'use strict';
var util = require('util');
var chalk = require('chalk');
var md = module.exports = {};
function NodeError(message, node) {
    this.name = 'NodeError';
    this.message = message;
    this.node = node;
    this.__is_error = true;
    var msg = [
        message
    ];
    if (node) {
        if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            var filePath = 'TODO';
            if (node.wzSourceFilepath) {
                filePath = node.wzSourceFilepath(info.sourceKey);
            }
            msg.push(' at row: ' + info.row);
            msg.push(', col: ' + info.col);
            msg.push(', source: ' + info.sourceKey);
            msg.push(', in file: ' + filePath);
        }
        else if (node.row) {
            msg.push(' at row: ' + node.row);
            msg.push(', col: ' + node.col);
            msg.push(', source: ' + node.sourceKey);
            msg.push(', in file: ' + (node.model ? node.model.uri : 'unavailable'));
        }
    }
    this.message = msg.join('');
    // 5/8/17 set this.stack = (new Error()).stack
}
NodeError.prototype.toString = function() {
    return this.message;
};
NodeError.prototype = Object.create(Error.prototype);
NodeError.prototype.constructor = NodeError;
md.NodeError = NodeError;

function IttfNotFoundError(resourceType, name, sourceUri) {
    this.name = 'IttfNotFoundError';
    this.resourceType = resourceType;
    this.name = name;
    this.sourceUri = sourceUri;
    this.__is_error = true;
    this.message = resourceType + ': ' + name +' not found, processing document ' + md.getSrcPathInfo(sourceUri);
    // 5/8/17 set this.stack = (new Error()).stack
}
IttfNotFoundError.prototype.toString = function() {
    return this.message;
};
IttfNotFoundError.prototype = Object.create(Error.prototype);
IttfNotFoundError.prototype.constructor = IttfNotFoundError;
md.IttfNotFoundError = IttfNotFoundError;

function IttfLoadError(message, srcPath, node, ex) {
    this.name = 'IttfLoadError';
    this.message = message;
    this.srcPath = srcPath;
    this.node = node;
    this.ex = ex;
    this.__is_error = true;
    this.message = message;
    if (srcPath) {
        this.message += '\nLoading ittf document ' + md.getSrcPathInfo(srcPath);
    }
    if (node) {
        // TODO set this.nodeInfo = new NodeError('', node)
        this.message += ('\n' + new NodeError('', node).message);
    }
    // TODO set this.inner = ex ???
    // 5/8/17 set this.stack = (new Error()).stack
}
IttfLoadError.prototype.toString = function() {
    return this.message;
};
IttfLoadError.prototype = Object.create(Error.prototype);
IttfLoadError.prototype.constructor = IttfLoadError;
md.IttfLoadError = IttfLoadError;

function RepoIOError(message, uri, innerEx) {
    this.name = 'RepoIOError';
    this.message = message;
    this.uri = uri;
    this.innerEx = innerEx;
    this.__is_error = true;
    this.message = message + '\nuri: ' + uri;
    // 5/8/17 set this.stack = (new Error()).stack
}
RepoIOError.prototype.toString = function() {
    return this.message;
};
RepoIOError.prototype = Object.create(Error.prototype);
RepoIOError.prototype.constructor = RepoIOError;
md.RepoIOError = RepoIOError;

class WizziError extends Error {
    constructor(message, node, mTreeBrick, other) {
        super(message);
        // legacy error test
        this.name = "WizziError";
        this.__is_error = true;
        this.data = {
            ...other||{}
        };
        if (node) {
            this.data.node = {
                name: node.name, 
                row: node.row, 
                col: node.col, 
                sourceKey: node.sourceKey
            };
            if (node.wzSourceLineInfo) {
                var info = node.wzSourceLineInfo;
                this.node.filePath = node.wzRoot().wzSourceFilepath(info.sourceKey);
            }
        }
        Error.captureStackTrace(this, this.constructor);
        if (mTreeBrick) {
            this.data.mTreeBrick = {
                uri: mTreeBrick.uri
            };
            this.errorLines = mTreeBrick.loadHistory.getIttfDocumentErrorLines(node.sourceKey, {
                row: node.row, 
                col: node.col, 
                pos: node.col + node.name.length + 1, 
                description: message
            }, true);
        }
    }
    toString() {
        var msg = [];
        msg.push(chalk.red('Error: ' + this.message));
        msg.push(chalk.red('  name: ' + this.data.errorName));
        if (this.data.node) {
            msg.push(chalk.yellow('  row: ' + this.data.node.row + ', col: ' + this.data.node.col));
        }
        if (this.data.mTreeBrick) {
            msg.push(chalk.yellow('  uri: ' + this.data.mTreeBrick.uri));
        }
        else if (this.data.uri) {
            msg.push(chalk.yellow('  uri: ' + this.data.uri));
        }
        else {
            msg.push(chalk.yellow('  uri: unknown'));
        }
        if (this.errorLines) {
            var i, i_items=this.errorLines, i_len=this.errorLines.length, line;
            for (i=0; i<i_len; i++) {
                line = this.errorLines[i];
                msg.push(chalk.yellow('  ' + line));
            }
        }
        if (this.data.errorName === 'JsWizziError') {
            msg.push(chalk.yellow('  onStatement: ' + this.data.onStatement));
        }
        if (this.data.inner) {
            msg.push(chalk.magenta('  Inner error: ' + this.data.inner.name + ': ' + this.data.inner.message));
        }
        return msg.join('\n');
    }
}
md.WizziError = WizziError;
class InternalError extends WizziError {
    constructor(error) {
        super(error.message);
        this.data = {
            error
        };
    }
}
md.InternalError = InternalError;
md.getSrcPathInfo = function(srcPath) {
    if (typeof (srcPath) === 'string') {
        return srcPath;
    }
    if (srcPath && (typeof (srcPath) === 'object')) {
        var msg = md.getSrcPathInfoFromNode(srcPath);
        return msg ? msg : srcPath.toString();
    }
    return 'unavailable';
};
md.getSrcPathInfoFromNode = function(node) {
    var msg = [];
    if (node) {
        if (node.WmtSourceLineInfo) {
            var info = node.WmtSourceLineInfo;
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.source));
            msg.push((', in file: ' + 'TODO'));
        }
        else if (node.wzSourceLineInfo) {
            var info = node.wzSourceLineInfo;
            var filePath = 'TODO';
            if (node.wzSourceFilepath) {
                filePath = node.wzSourceFilepath(info.sourceKey);
            }
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + filePath));
        }
    }
    return msg.length == 0 ? null : msg.join('');
};
