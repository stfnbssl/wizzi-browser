/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statements\module.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.module';
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
    cnt.stm.typeDeclare = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeDeclare');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeDeclare. Got: ' + callback);
        }
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            ctx.write('declare ');
            cnt.genItem(item_1, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            });
        }
        repeater_1(0);
        function next_1() {
            return callback(null, null);
        }
    };
    cnt.stm.typeModule = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeModule');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeModule. Got: ' + callback);
        }
        ctx.write('module ' + model.wzName);
        ctx.w(' {');
        cnt.genItems(model.statements, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            return callback(null, null);
        });
    };
    cnt.stm.typeTypeAlias = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeTypeAlias');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTypeAlias. Got: ' + callback);
        }
        ctx.write('type ' + model.wzName);
        u.genTSTypeParameters(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            if (model.statements.length == 1) {
                ctx.write(' = ');
                cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null, null);
                });
            }
            else {
                return callback(ctx.error(':type typeTypeAlias must have one children. found: ' + model.statements.length, model));
            }
        });
    };
    cnt.stm.typeFunctionDeclare = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeFunctionDeclare');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeFunctionDeclare. Got: ' + callback);
        }
        ctx.write('function ' + model.wzName);
        // log 'typeFunctionDeclare enter 1'
        u.genTSTypeParameters(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            // log 'typeFunctionDeclare enter 2'
            ctx.write('(');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                // log 'typeFunctionDeclare cb 1'
                ctx.write(')');
                if (model.typeReturn) {
                    // log 'typeFunctionDeclare typeReturn', model.typeReturn.wzElement
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        // log 'typeFunctionDeclare exit 1'
                        return callback(null, null);
                    });
                }
                else {
                    // log 'typeFunctionDeclare exit 2'
                    return callback(null, null);
                }
            });
        });
    };
};
