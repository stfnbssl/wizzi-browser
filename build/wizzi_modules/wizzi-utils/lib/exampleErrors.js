/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\exampleErrors.js.ittf
*/
'use strict';
var util = require('util');
var fail = require('./fail');

var md = module.exports = {};

function NotImplementedError(message) {
    this.name = 'NotImplementedError';
    console.log('message', message);
    this.message = message;
}
NotImplementedError.prototype.toString = function() {
    return this.message;
};
NotImplementedError.prototype = Object.create(Error.prototype);
NotImplementedError.prototype.constructor = NotImplementedError;
md.NotImplementedError = NotImplementedError;


function InvalidRequestError(message, code) {
    this.name = 'InvalidRequestError';
    console.log('message', message);
    this.message = message;
    this.code = code;
}
InvalidRequestError.prototype.toString = function() {
    return this.message;
};
InvalidRequestError.prototype = Object.create(Error.prototype);
InvalidRequestError.prototype.constructor = InvalidRequestError;
md.InvalidRequestError = InvalidRequestError;

function NodeError(message, node) {
    this.name = 'NodeError';
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
            msg.push((' at row: ' + info.row));
            msg.push((', col: ' + info.col));
            msg.push((', source: ' + info.sourceKey));
            msg.push((', in file: ' + filePath));
        }
        else if (node.row) {
            msg.push((' at row: ' + node.row));
            msg.push((', col: ' + node.col));
        }
    }
    this.message = msg.join('');
    console.log('NodeError', this.message);
    // set this.node = node
}
NodeError.prototype.toString = function() {
    return this.message;
};
NodeError.prototype = Object.create(Error.prototype);
NodeError.prototype.constructor = NodeError;
md.NodeError = NodeError;

function NotFoundError(resourceType, name, message) {
    this.name = 'NotFoundError';
    this.message = resourceType + ': ' + name +' not found, message ' + message;
}
NotFoundError.prototype.toString = function() {
    return this.message;
};
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;
md.NotFoundError = NotFoundError;

function IttfNotFoundError(resourceType, name, sourceUri) {
    this.name = 'IttfNotFoundError';
    this.message = resourceType + ': ' + name +' not found, processing document ' + md.getSrcPathInfo(sourceUri);
}
IttfNotFoundError.prototype.toString = function() {
    return this.message;
};
IttfNotFoundError.prototype = Object.create(Error.prototype);
IttfNotFoundError.prototype.constructor = IttfNotFoundError;
md.IttfNotFoundError = IttfNotFoundError;

function IttfLoadError(message, srcPath, node, ex) {
    this.name = 'IttfLoadError';
    if (!(ex)) {
        ex = node;
        node = null;
    }
    this.message = 'Error: ' + message + '\nLoading ittf document ' + md.getSrcPathInfo(srcPath);
    if (node) {
        this.message += ('\n' + new NodeError('', node).message);
    }
}
IttfLoadError.prototype.toString = function() {
    return this.message;
};
IttfLoadError.prototype = Object.create(Error.prototype);
IttfLoadError.prototype.constructor = IttfLoadError;
md.IttfLoadError = IttfLoadError;

function WizziModelLoadError(message, srcPath, ex) {
    this.name = 'WizziModelLoadError';
    this.message = 'Error: ' + message + '\nLoading ittf document ' + md.getSrcPathInfo(srcPath);
}
WizziModelLoadError.prototype.toString = function() {
    return this.message;
};
WizziModelLoadError.prototype = Object.create(Error.prototype);
WizziModelLoadError.prototype.constructor = WizziModelLoadError;
md.WizziModelLoadError = WizziModelLoadError;

function ModelTransformationError(message, generation, srcPath, ex) {
    this.name = 'ModelTransformationError';
    this.message = 'Error: ' + message + '\nDuring generation:' + generation + ', processing document ' + md.getSrcPathInfo(srcPath);
}
ModelTransformationError.prototype.toString = function() {
    return this.message;
};
ModelTransformationError.prototype = Object.create(Error.prototype);
ModelTransformationError.prototype.constructor = ModelTransformationError;
md.ModelTransformationError = ModelTransformationError;

function ArtifactGenerationError(message, generation, srcPath, ex) {
    this.name = 'ArtifactGenerationError';
    this.message = 'Error: ' + message +'\nDuring generation:' + generation +', processing document ' + md.getSrcPathInfo(srcPath);
    console.log('wizzi.artifact.errors.artifactGenerationError.message', this.message);
}
ArtifactGenerationError.prototype.toString = function() {
    return this.message;
};
ArtifactGenerationError.prototype = Object.create(Error.prototype);
ArtifactGenerationError.prototype.constructor = ArtifactGenerationError;
md.ArtifactGenerationError = ArtifactGenerationError;

function WizziInvalidRequestError(message, srcPath, ex) {
    this.name = 'WizziInvalidRequestError';
    this.message = message;
}
WizziInvalidRequestError.prototype.toString = function() {
    return this.message;
};
WizziInvalidRequestError.prototype = Object.create(Error.prototype);
WizziInvalidRequestError.prototype.constructor = WizziInvalidRequestError;
md.WizziInvalidRequestError = WizziInvalidRequestError;

function RunnerServerError(message) {
    this.name = 'RunnerServerError';
    this.message = message;
}
RunnerServerError.prototype.toString = function() {
    return this.message;
};
RunnerServerError.prototype = Object.create(Error.prototype);
RunnerServerError.prototype.constructor = RunnerServerError;
md.RunnerServerError = RunnerServerError;

md.artifactGenerationError = function(message, generation, node) {
    var error = new md.ArtifactGenerationError(message, generation, node);
    return error;
};
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
        if (node.wzSourceLineInfo) {
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
function FileError(message, ex) {
    this.name = 'FileError';
    this.message = message;
    this.inner = ex;
}
FileError.prototype.toString = function() {
    return this.message;
};
FileError.prototype = Object.create(Error.prototype);
FileError.prototype.constructor = FileError;
md.FileError = FileError;

