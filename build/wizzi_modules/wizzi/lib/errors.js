/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\lib\errors.js.ittf
*/
'use strict';
var util = require('util');
var fail = require('wizzi-utils').fail;
var utilsErrors = require('wizzi-utils').errors;
var pkgVersioned = ' (@wizzi.0.7.22)';

var md = module.exports = {};

function NotImplementedError(message) {
    this.name = 'NotImplementedError';
    // log 'message', message
    this.message;
    this.message += pkgVersioned;
    // 5/10/17 set this.stack = (new Error()).stack
}
NotImplementedError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
NotImplementedError.prototype = Object.create(Error.prototype);
NotImplementedError.prototype.constructor = NotImplementedError;
md.NotImplementedError = NotImplementedError;


function InvalidRequestError(message, code) {
    this.name = 'InvalidRequestError';
    // log 'message', message
    this.message = message;
    this.message += pkgVersioned;
    this.code = code;
    // 5/10/17 set this.stack = (new Error()).stack
}
InvalidRequestError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
InvalidRequestError.prototype = Object.create(Error.prototype);
InvalidRequestError.prototype.constructor = InvalidRequestError;
md.InvalidRequestError = InvalidRequestError;

md.NodeError = utilsErrors.NodeError;
function NotFoundError(resourceType, name, message) {
    this.name = 'NotFoundError';
    this.message = resourceType + ': ' + name +' not found, message ' + message;
    this.message += pkgVersioned;
    // 5/10/17 set this.stack = (new Error()).stack
}
NotFoundError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;
md.NotFoundError = NotFoundError;

function IttfNotFoundError(resourceType, name, sourceUri) {
    this.name = 'IttfNotFoundError';
    this.message = resourceType + ': ' + name +' not found, processing document ' + md.getSrcPathInfo(sourceUri);
    this.message += pkgVersioned;
    // 5/10/17 set this.stack = (new Error()).stack
}
IttfNotFoundError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
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
    this.message += pkgVersioned;
    // 5/10/17 set this.stack = (new Error()).stack
}
IttfLoadError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
IttfLoadError.prototype = Object.create(Error.prototype);
IttfLoadError.prototype.constructor = IttfLoadError;
md.IttfLoadError = IttfLoadError;

function WizziModelLoadError(message, srcPath, ex) {
    this.name = 'WizziModelLoadError';
    this.message = 'Error: ' + message + '\nLoading ittf document ' + md.getSrcPathInfo(srcPath);
    this.message += pkgVersioned;
    this.inner = ex;
    // 5/10/17 set this.stack = (new Error()).stack
}
WizziModelLoadError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
WizziModelLoadError.prototype = Object.create(Error.prototype);
WizziModelLoadError.prototype.constructor = WizziModelLoadError;
md.WizziModelLoadError = WizziModelLoadError;

function ModelTransformationError(message, generation, srcPath, ex) {
    this.name = 'ModelTransformationError';
    this.message = 'Error: ' + message + '\nDuring generation:' + generation + ', processing document ' + md.getSrcPathInfo(srcPath);
    this.message += pkgVersioned;
    this.inner = ex;
    // 5/10/17 set this.stack = (new Error()).stack
}
ModelTransformationError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
ModelTransformationError.prototype = Object.create(Error.prototype);
ModelTransformationError.prototype.constructor = ModelTransformationError;
md.ModelTransformationError = ModelTransformationError;

function ArtifactGenerationError(message, generation, srcPath, ex) {
    this.name = 'ArtifactGenerationError';
    this.message = 'Error: ' + message +'\nDuring generation:' + generation +', processing document ' + md.getSrcPathInfo(srcPath);
    this.message += pkgVersioned;
    this.inner = ex;
    // log 'wizzi.artifact.errors.artifactGenerationError.message', this.message
    // 5/10/17 set this.stack = (new Error()).stack
}
ArtifactGenerationError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
ArtifactGenerationError.prototype = Object.create(Error.prototype);
ArtifactGenerationError.prototype.constructor = ArtifactGenerationError;
md.ArtifactGenerationError = ArtifactGenerationError;

function WizziInvalidRequestError(message, srcPath, ex) {
    this.name = 'WizziInvalidRequestError';
    this.message = message;
    this.message += pkgVersioned;
    this.inner = ex;
    // 5/10/17 set this.stack = (new Error()).stack
}
WizziInvalidRequestError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
WizziInvalidRequestError.prototype = Object.create(Error.prototype);
WizziInvalidRequestError.prototype.constructor = WizziInvalidRequestError;
md.WizziInvalidRequestError = WizziInvalidRequestError;

function RunnerServerError(message) {
    this.name = 'RunnerServerError';
    this.message = message;
    this.message += pkgVersioned;
    // 5/10/17 set this.stack = (new Error()).stack
}
RunnerServerError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
RunnerServerError.prototype = Object.create(Error.prototype);
RunnerServerError.prototype.constructor = RunnerServerError;
md.RunnerServerError = RunnerServerError;

md.artifactGenerationError = function(message, generation, node) {
    var error = new md.ArtifactGenerationError(message, generation, node);
    return error;
};
function FileError(message, ex) {
    this.name = 'FileError';
    this.message = message;
    this.message += pkgVersioned;
    this.inner = ex;
    // 5/10/17 set this.stack = (new Error()).stack
}
FileError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
FileError.prototype = Object.create(Error.prototype);
FileError.prototype.constructor = FileError;
md.FileError = FileError;

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
