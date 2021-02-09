/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\json\toml\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;

var md = module.exports = {};
var myname = 'wizzi-core.artifacts.json.toml.main';

md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model));
    }
    try {
        // log 'model', model
        delete model.___exportName
        var i, i_items=Object.keys(model), i_len=Object.keys(model).length, key;
        for (i=0; i<i_len; i++) {
            key = Object.keys(model)[i];
            var item = model[key];
            // log 'key', key
            if (verify.isObject(item)) {
                ctx.w('[' + key + ']');
                writeObject(item, ctx, true);
            }
            else if (verify.isArray(item)) {
                ctx.w(key + ' = [' + writeArray(item, ctx) + ']');
            }
            else {
                // log 'key', key, 'value', verify.isString(item) ? '"' + item + '"' : item
                ctx.w(key + ' = ' + (verify.isString(item) ? ('"' + item + '"') : item));
            }
        }
    } 
    catch (ex) {
        return callback(ex);
    } 
    if (ctx.artifactGenerationErrors.length > 0) {
        return callback(ctx.artifactGenerationErrors);
    }
    else {
        return callback(null, ctx);
    }
};
function writeArray(arr, ctx) {
    var first = true;
    var i, i_items=arr, i_len=arr.length, item;
    for (i=0; i<i_len; i++) {
        item = arr[i];
        if (!first) {
            ctx.w(', ');
        }
        if (verify.isObject(item)) {
            ctx.w('{' + writeObject(item, ctx) + '}');
        }
        else if (verify.isArray(item)) {
            ctx.w('[' + writeArray(item, ctx) + ']');
        }
        else {
            ctx.w(verify.isString(item) ? '"' + item + '"' : item);
        }
        first = false;
    }
}
function writeObject(obj, ctx, top) {
    if (top) {
        var i, i_items=Object.keys(obj), i_len=Object.keys(obj).length, key;
        for (i=0; i<i_len; i++) {
            key = Object.keys(obj)[i];
            var item = obj[key];
            if (verify.isObject(item)) {
                ctx.w(key + ' = ');
                writeObject(item, ctx, false);
            }
            else if (verify.isArray(item)) {
                ctx.w(key + ' = [' + writeArray(item, ctx) + ']');
            }
            else {
                ctx.w(key + ' = ' + (verify.isString(item) ? ('"' + item + '"') : item));
            }
        }
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
    return verify.error(innerError, {
            name: ( verify.isNumber(code) ? 'Err-' + code : code ), 
            method: 'wizzi-core/lib/artifacts/json/toml/main.' + method, 
            sourcePath: __filename
        }, message || 'Error message unavailable');
}
