/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\xittf_extensions.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.xittf_extensions';
var md = module.exports = {};

function hasStatements(model) {
    return countStatements(model) > 0;
}
function countStatements(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement != 'comment') {
            count++;
        }
    }
    return count;
}
md.load = function(cnt) {
    cnt.stm.expr = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.expr');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.expr. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, callback);
    };
    cnt.stm.number = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.number');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.number. Got: ' + callback);
        }
        ctx.write(model.wzName);
        return callback(null, null);
    };
    cnt.stm.percent = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.percent');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.percent. Got: ' + callback);
        }
        ctx.write(model.wzName + '%');
        return callback(null, null);
    };
    cnt.stm.singleQuoteLiteral = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.singleQuoteLiteral');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.singleQuoteLiteral. Got: ' + callback);
        }
        ctx.write("'" + model.wzName + "'");
        return callback(null, null);
    };
    cnt.stm.doubleQuoteLiteral = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.doubleQuoteLiteral');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.doubleQuoteLiteral. Got: ' + callback);
        }
        ctx.write('"' + model.wzName + '"');
        return callback(null, null);
    };
    cnt.stm.color = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.color');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.color. Got: ' + callback);
        }
        ctx.write('#' + model.wzName);
        return callback(null, null);
    };
    cnt.stm.cssLength = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.cssLength');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.cssLength. Got: ' + callback);
        }
        var f = ctx.__functionProvider ? ctx.__functionProvider + '.' : '';
        ctx.write(f + 'dim("' + model.wzName + '")');
        return callback(null, null);
    };
    cnt.stm.xnull = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xnull');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xnull. Got: ' + callback);
        }
        ctx.write('null');
        return callback(null, null);
    };
    cnt.stm.false = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.false');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.false. Got: ' + callback);
        }
        ctx.write('false');
        return callback(null, null);
    };
    cnt.stm.true = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.true');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.true. Got: ' + callback);
        }
        ctx.write('true');
        return callback(null, null);
    };
};
