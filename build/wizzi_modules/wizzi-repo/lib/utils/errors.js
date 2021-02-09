/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\ittf\lib\utils\errors.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};

function RepoCollectionError(message) {
    this.name = 'RepoCollectionError';
    console.log('message', message);
    this.message = message;
    // 5/8/17 set this.stack = (new Error()).stack
}
RepoCollectionError.prototype.toString = function() {
    return this.message;
};
RepoCollectionError.prototype = Object.create(Error.prototype);
RepoCollectionError.prototype.constructor = RepoCollectionError;
md.RepoCollectionError = RepoCollectionError;

