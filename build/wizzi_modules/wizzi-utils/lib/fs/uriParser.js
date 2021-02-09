/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\fs\uriParser.js.ittf
*/
'use strict';
var verify = require('wizzi-helpers').verify;
var path = require('path');
var url = require('url');
// var verify = require('../verify')
/**
     params
     string uri
     returns
     {
     string originalUri
     string protocol
     one-of 'db', 'ls', drive letter
     string storeKind
     one-of 'mongodb', 'localstorage', 'filesystem', 'memory', 'json', 'indexeddb'
     string userId
     # if storeKind === 'mongodb'
     string projectId
     # if storeKind === 'mongodb'
     string path
     boolean isIttfDocument
     string basename
     string schema
     # if isIttfDocument === true
     string extension
     # if isIttfDocument === false
    
*/
module.exports = function parse(uri, callback) {
    if (verify.isNotEmpty(uri) === false) {
        return error(
            'InvalidArgument', 'parse', { parameter: 'uri', message: 'The uri parameter must be a string. Received: ' + uri }
        );
    }
    // set uri = uri.toLowerCase()
    var ret = {
        originalUri: uri, 
        browser: false
    };
    var parsedUri = url.parse(uri);
    // log 'wizzi-utils.uriParser.parsedUri', '\n', JSON.stringify(parsedUri, null, 2)
    ret._protocol = parsedUri.protocol;
    ret._hostname = parsedUri.hostname;
    ret._pathname = parsedUri.pathname;
    // uniform protocol:xxx protocol:/xxx protocol://xxx and protocol:\xxx
    var pathname = parsedUri.pathname && parsedUri.pathname[0] === '/' ? parsedUri.pathname.substr(1) : parsedUri.pathname;
    // log 'pathname', parsedUri.pathname, pathname
    // hostname is part of path
    ret.pathname = parsedUri.hostname && parsedUri.hostname.length > 0 ? pathname && pathname.length > 0 ? parsedUri.hostname + '/' + pathname : parsedUri.hostname : pathname || '';
    // log 'ret.pathname', parsedUri.hostname, pathname, ret.pathname
    if (typeof(parsedUri.protocol) !== 'string') {
        ret.browser = true;
        ret.storeKind = null;
        if (verify.startsWith(parsedUri.path, '/tmp')) {
            ret.protocol = 'tmp';
            ret.storeKind = 'browser';
        }
        else if (verify.startsWith(parsedUri.path, '/ixdb')) {
            ret.protocol = 'ixdb';
            ret.storeKind = 'browser';
        }
        else {
            if (callback) {
                return callback(error('InvalidArgument', 'parse', 'Uri must have a protocol (must be an absolute url). Received: ' + uri));
            }
            else {
                return error('InvalidArgument', 'parse', 'Uri must have a protocol (must be an absolute url). Received: ' + uri);
            }
        }
        setParsed(ret, parsedUri);
        // log 'wizzi-utils.uriParser.parsed', '\n', JSON.stringify(ret, null, 2)
        return returnOrCb(ret, callback);
    }
    var protocol = parsedUri.protocol.substr(-1, 1) === ':' ? parsedUri.protocol.substr(0, (parsedUri.protocol.length - 1)) : parsedUri.protocol;
    ;
    // log 'parsed.protocol', protocol
    ret.protocol = protocol;
    ret.storeKind = 'filesystem';
    if (protocol === 'db') {
        ret.storeKind = 'mongodb';
    }
    if (protocol === 'json') {
        ret.storeKind = 'json';
    }
    setParsed(ret, parsedUri);
    // log 'parsed.result', ret
    return returnOrCb(ret, callback);
};
function setParsed(parsed, parsedUri) {
    var name,
        parts = parsed.pathname ? parsed.pathname.split('/') : [];
    parsed._parts = parts;
    // log 'wizzi-utils.fs.uriParser.parsedUri.parts', parts
    if (parts.length > 0) {
        name = parts[parts.length-1];
        parsed.basename = name;
        var nameparts = name.split('.');
        if (nameparts.length > 2 && nameparts[nameparts.length -1] === 'ittf') {
            parsed.isIttfDocument = true;
            parsed.schema = nameparts[nameparts.length -2];
        }
        else {
            parsed.isIttfDocument = false;
            if (nameparts.length > 1) {
                parsed.extension = nameparts[nameparts.length -1];
            }
            else {
                parsed.extension = '';
            }
        }
        parts.pop();
    }
    else {
        parsed.basename = '';
        parsed.isIttfDocument = false;
        parsed.extension = '';
    }
    parsed.userId = '';
    parsed.projectId = '';
    if (parsed.browser) {
        parts.shift();
        if (parts.length > 2) {
            parsed.userId = parts[0];
            parts.shift();
            parsed.projectId = parts[0];
            parts.shift();
        }
        parsed.path = parts.join('/');
    }
    else {
        if (parts.length > 0) {
            parsed.userId = parts[0];
            parts.shift();
            if (parts.length > 0) {
                parsed.projectId = parts[0];
                parts.shift();
            }
        }
        parsed.path = parts.join('/');
    }
    parsed.parts = [];
    if (parsed.protocol === 'db') {
    }
    else {
        if (parsed.userId.length > 0) {
            parsed.parts.push(parsed.userId);
        }
        if (parsed.projectId.length > 0) {
            parsed.parts.push(parsed.projectId);
        }
    }
    var i, i_items=parts, i_len=parts.length, part;
    for (i=0; i<i_len; i++) {
        part = parts[i];
        parsed.parts.push(part);
    }
    if (parsed.basename.length > 0) {
        parsed.parts.push(parsed.basename);
    }
    parsed.internalPath = [parsed.protocol + ':'].concat(parsed.parts).join('/');
}
function returnOrCb(ret, callback) {
    if (callback) {
        return callback(null, ret);
    }
    else {
        return ret;
    }
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-utils.fs.uriParser.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
