/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\lib\io\errors.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};
var pkgVersioned = ' (@wizzi.0.7.22)';

function NotImplementedError(message) {
    this.name = 'NotImplementedError';
    console.log('message', message);
    this.message = message;
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
    console.log('message', message);
    this.message = message;
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

function FsItemNotFoundError(resourceType, uri) {
    this.name = 'FsItemNotFoundError';
    this.message = resourceType + ': ' + uri + ' not found ';
    // 5/10/17 set this.stack = (new Error()).stack
}
FsItemNotFoundError.prototype.toString = function() {
    var msg = [this.message];
    if (this.inner) {
        msg.push('Inner error:');
        msg.push(this.inner.toString());
    }
    return msg.join('\n');
};
FsItemNotFoundError.prototype = Object.create(Error.prototype);
FsItemNotFoundError.prototype.constructor = FsItemNotFoundError;
md.FsItemNotFoundError = FsItemNotFoundError;

