/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\call.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.call';
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
    cnt.stm.call = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.call');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.call. Got: ' + callback);
        }
        if (model.__templateChild) {
            ctx.write('${');
        }
        var name = (model.wzName || '').trim();
        var hasParens = u.hasArguments(name);
        // log hasParens, ctx.__artifact, ctx.__functionNames
        if (hasParens == false && ctx.__artifact === 'xittf/document') {
            if (ctx.__functionNames.indexOf(name) < 0) {
                name = ctx.__functionProvider + '.' + name;
            }
        }
        if (model.statements.length > 0) {
            doCallChildStatements_one(model, name, hasParens, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                if (model.__templateChild) {
                    ctx.write('}');
                }
                return callback(null, null);
            });
        }
        else {
            name = hasParens ? name : (name + '()');
            ctx.write(name);
            if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
                ctx.w(u.semicolon(name));
            }
            if (model.__templateChild) {
                ctx.write('}');
            }
            return callback(null, null);
        }
    };
    cnt.stm.memberCall = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.memberCall');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.memberCall. Got: ' + callback);
        }
        var name = (model.wzName || '').trim();
        var hasParens = u.hasArguments(name);
        if (model.statements.length > 0) {
            doCallChildStatements_one(model, ('.' + name), hasParens, ctx, callback);
        }
        else {
            name = hasParens ? ('.' + name) : ('.' + name) + '()';
            ctx.write(name);
            if (u.isTopStatement(model, ctx)) {
                ctx.w(u.semicolon(name));
            }
            return callback(null, null);
        }
    };
    cnt.stm.decoratorCall = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.decoratorCall');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.decoratorCall. Got: ' + callback);
        }
        var name = ('@' + model.wzName).trim();
        var hasParens = u.hasArguments(name);
        if (model.statements.length > 0) {
            doCallChildStatements_one(model, name, hasParens, ctx, callback);
        }
        else {
            name = hasParens ? name : (name + '()');
            ctx.write(name);
            if (u.isTopStatement(model, ctx) && (u.isDescendentOf(model, 'iif') == false)) {
                ctx.w(u.semicolon(name));
            }
            return callback(null, null);
        }
    };
    cnt.stm.callOnValue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.callOnValue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.callOnValue. Got: ' + callback);
        }
        var hasParens = false;
        if (model.wzParent && model.wzParent.wzElement === 'arrowfunction') {
            ctx.write('(' + (model.wzName || ''));
            if (model.statements.length == 1) {
                cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(')');
                    return callback(null, null);
                });
            }
            else {
                ctx.write(')');
                return callback(null, null);
            }
        }
        else if (model.wzParent && model.wzParent.wzElement === 'call' && model.statements.length == 1) {
            ctx.write('(' + (model.wzName || ''));
            cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null, null);
            });
        }
        else if (model.statements.length > 0) {
            doCallChildStatements_one(model, '', hasParens, ctx, callback);
        }
        else {
            ctx.write('()');
            return callback(null, null);
        }
    };
    function doCallChildStatements_one(model, name, hasParens, ctx, callback) {
        ctx.write(name);
        if (model.typeParameterInsts && model.typeParameterInsts.length > 0) {
            ctx.write('<');
            var len_1 = model.typeParameterInsts.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.typeParameterInsts[index_1];
                if (index_1 > 0) {
                    ctx.write(', ');
                }
                if (item_1.statements.length == 0) {
                    ctx.write(item_1.wzName);
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                }
                else if (item_1.statements.length == 1) {
                    cnt.genItem(item_1.statements[0], ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        });
                    });
                }
                else {
                    ctx.write('*** js.module.statements.call.doCallChildStatements_two not managed ***');
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                }
            }
            repeater_1(0);
            function next_1() {
                ctx.write('>');
                doCallChildStatements_two(model, name, hasParens, ctx, callback);
            }
        }
        else {
            doCallChildStatements_two(model, name, hasParens, ctx, callback);
        }
    }
    function doCallChildStatements_two(model, name, hasParens, ctx, callback) {
        if (hasParens === false) {
            ctx.write('(');
            /**
                VIA 20/2/19
                if (name.length > 0) {
                    ctx.write('(');
                }
            */
        }
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if ((u.isCallArgument(item_1) && hasParens) || u.isMemberAccess(item_1)) {
                if ((hasParens === false) && u.isMemberAccess(item_1)) {
                    if (name.length > 0) {
                        ctx.write(')');
                    }
                }
                if (u.isCallArgument(item_1)) {
                    ctx.write('.');
                }
                var remainings = [];
                for (var j = (index_1 + 1); j < model.statements.length; j++) {
                    remainings.push(model.statements[j]);
                }
                return doCallChildStatements_call(item_1, ctx, remainings, callback);
            }
            if (index_1 > 0) {
                ctx.write(', ');
            }
            cnt.genItem(item_1, ctx, function(err, notUsed) {
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
            ;
            if (hasParens === false) {
                ctx.write(')');
            }
            if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
                ctx.w();
            }
            else {
                // 2/11/17 _ ctx.w()
            }
            return callback(null, null);
        }
    }
    function doCallChildStatements_call(model, ctx, remainings, callback) {
        cnt.genItem(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            var len_1 = remainings.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = remainings[index_1];
                if (u.isCallArgument(item_1)) {
                    ctx.write('.');
                }
                cnt.genItem(item_1, ctx, function(err, notUsed) {
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
                if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false && model.wzElement !== 'decoratorCall' && !u.parentIs(model, 'arrowfunction')) {
                    // log 'doCallChildStatements_call. w()', model.wzElement, model.wzName
                    ctx.w(';');
                }
                else {
                    // log 'doCallChildStatements_call. w()', model.wzElement, model.wzName
                    ctx.w();
                    // TODO when inside a statement // 13/6/2018
                    // _ ctx.write()
                }
                return callback(null, null);
            }
        });
    }
    cnt.stm.memberAccess = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.memberAccess');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.memberAccess. Got: ' + callback);
        }
        if (ctx.__inside_html || (model.wzParent.wzElement === 'xreturn' && ctx.__jskind === 'react')) {
            var classTag = ctx.__jskind === 'react' ? 'className' : 'class';
            model.statements.unshift({
                wzElement: 'jsPropertyOrValue', 
                wzName: classTag + ' ' + model.wzName, 
                wzParent: model
            });
            model.wzElement = 'div';
            model.wzName = '';
            cnt.stm.div(model, ctx, callback);
        }
        else {
            ctx.write('.' + model.wzName);
            return callback(null, null);
        }
    };
    cnt.stm.memberAccessComputed = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.memberAccessComputed');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.memberAccessComputed. Got: ' + callback);
        }
        if (!model.statements || model.statements.length < 1) {
            ctx.write('[' + model.wzName + ']');
            return callback(null, null);
        }
        ctx.write('[');
        var first = true;
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (u.isMemberAccess(item_1)) {
                ctx.write(']');
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
                        ctx.w(';');
                    }
                    return callback(null, null);
                });
            }
            else {
                if (!first) {
                    ctx.write(', ');
                }
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.first = false;
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
        }
        repeater_1(0);
        function next_1() {
            ctx.write(']');
            return callback(null, null);
        }
    };
};
