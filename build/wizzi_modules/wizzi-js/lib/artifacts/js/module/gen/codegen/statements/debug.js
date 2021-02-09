/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\debug.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.debug';
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
    cnt.stm.inspect = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.inspect');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.inspect. Got: ' + callback);
        }
        var ss = model.wzName.split(','), name, value;
        if (ss.length == 2) {
            name = u.unquote(ss[0].trim());
            value = ss[1].trim();
        }
        else {
            var nv = lineParser.parseNameValueRaw(ss[0], model);
            if (nv.name() && nv.value()) {
                name = u.unquote(nv.name().trim());
                value = nv.value().trim();
            }
            else {
                name = ss[0];
                value = ss[0];
            }
        }
        ctx.w('console.log("' + name + '" + " " + util.inspect(' + value + ', { depth: null } ))');
        return callback(null, null);
    };
    cnt.stm.debug = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.debug');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.debug. Got: ' + callback);
        }
        ctx.w('debug(' + model.wzName + ')' + u.semicolon(model.wzName));
        return callback(null, null);
    };
    cnt.stm.log = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.log');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.log. Got: ' + callback);
        }
        ctx.w('console.log(' + model.wzName + ')' + u.semicolon(model.wzName));
        // log 151
        return callback(null, null);
    };
    cnt.stm.warn = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.warn');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.warn. Got: ' + callback);
        }
        ctx.w('console.warn(' + model.wzName + ')' + u.semicolon(model.wzName));
        return callback(null, null);
    };
    cnt.stm.error = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.error');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.error. Got: ' + callback);
        }
        ctx.w('console.error(' + model.wzName + ')' + u.semicolon(model.wzName));
        return callback(null, null);
    };
    cnt.stm.chalk = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.chalk');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.chalk. Got: ' + callback);
        }
        var sw = [];
        var i, i_items=model.wzName.split(','), i_len=model.wzName.split(',').length, item;
        for (i=0; i<i_len; i++) {
            item = model.wzName.split(',')[i];
            var nv = lineParser.parseNameValueRaw(item, model);
            if (nv.value()) {
                sw.push('chalk.' + nv.name() + '(' + nv.value() + ')');
            }
            else {
                sw.push('chalk.red(' + nv.name() + ')');
            }
        }
        ctx.w('console.log(' + sw.join(', ') + ')');
        return callback(null, null);
    };
};
