/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\mocks\repo\errors.js.ittf
*/
'use strict';
var globalErrors = require('../errors');

var md = module.exports = globalErrors;

function RepoIOError(message, uri, innerEx) {
    this.name = 'RepoIOError';
    this.message = message + '\nuri: ' + uri;
}
RepoIOError.prototype.toString = function() {
    return this.message;
};
RepoIOError.prototype = Object.create(Error.prototype);
RepoIOError.prototype.constructor = RepoIOError;
md.RepoIOError = RepoIOError;

