/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\if-switch.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.if-switch';
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
    cnt.stm.xif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xif. Got: ' + callback);
        }
        u.emitBlock(cnt, 'if', model, model.statements, model.statements.length, ctx, callback);
    };
    cnt.stm.elif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.elif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.elif. Got: ' + callback);
        }
        u.emitBlock(cnt, 'else if', model, model.statements, model.statements.length, ctx, callback);
    };
    cnt.stm.xelse = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xelse');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xelse. Got: ' + callback);
        }
        if (model.wzParent.wzElement === 'iif') {
            if (model.statements.length > 0) {
                cnt.genItems(model.statements, ctx, {
                    indent: true
                }, callback);
            }
            else {
                ctx.write(model.wzName);
                return callback(null, null);
            }
        }
        else {
            u.emitBlock(cnt, 'else', model, model.statements, model.statements.length, ctx, callback);
        }
    };
    cnt.stm.xswitch = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xswitch');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xswitch. Got: ' + callback);
        }
        ctx.w('switch (' + u.unparen(model.wzName) + ') {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            return callback(null, null);
        });
    };
    cnt.stm.xcase = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xcase');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xcase. Got: ' + callback);
        }
        var items = model.statements,
            count = model.statements.length,
            tag = 'case';
        if (count === 0) {
            ctx.w(tag + ' ' + model.wzName + ':');
            return callback(null, null);
        }
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w(tag + ' ' + model.wzName + ': {');
            }
            else {
                ctx.w(tag + ' ' + model.wzName + ':');
            }
        }
        else {
            ctx.w(tag + ' ' + model.wzName + ': {');
        }
        cnt.genItems(items, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (ctx.values.__preserveBlock) {
                if (count > 0 && items[0].wzElement === 'block') {
                    ctx.w('}');
                }
                else {
                    ;
                }
            }
            else {
                ctx.w('}');
            }
            return callback(null, null);
        });
    };
    cnt.stm.xdefault = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdefault');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdefault. Got: ' + callback);
        }
        var items = model.statements,
            count = model.statements.length,
            tag = 'default';
        if (ctx.values.__preserveBlock) {
            if (count > 0 && items[0].wzElement === 'block') {
                ctx.w(tag + ': {');
            }
            else {
                ctx.w(tag + ':');
            }
        }
        else {
            ctx.w(tag + ': {');
        }
        cnt.genItems(items, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (ctx.values.__preserveBlock) {
                if (count > 0 && items[0].wzElement === 'block') {
                    ctx.w('}');
                }
                else {
                    ;
                }
            }
            else {
                ctx.w('}');
            }
            return callback(null, null);
        });
    };
};
