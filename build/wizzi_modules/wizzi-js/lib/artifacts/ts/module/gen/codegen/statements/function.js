/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statements\function.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');
var lineParser = require('../../../../../js/module/gen/codegen/util/lineParser');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.function';
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
    cnt.stm.exportfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.exportfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.exportfunction. Got: ' + callback);
        }
        var xdefault = model.__default ? 'default ' : '';
        var name = (model.__name || '');
        ctx.write('export ' + xdefault + 'function ' + name + '(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (model.typeReturn) {
                ctx.write(': ');
                cnt.stm.typeReturn(model.typeReturn, ctx, () => {});
            }
            ctx.w(' {');
            ctx.indent();
            cnt.genItems(model.statements, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.write('}');
                return callback(null, null);
            });
        });
    };
    cnt.stm.xfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xfunction. Got: ' + callback);
        }
        var name = model.wzName.trim(),
            aster = ctx.__aster || '',
            xasync = model.xasync ? 'async ' : '';
        var f,
            iifeInvoke,
            iife = model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'memberCall';
        if (iife) {
            f = '(' + (name.length > 0 ? (xasync + 'function' + aster + ' ' + name) : (xasync + 'function'));
            iifeInvoke = model.statements[(model.statements.length - 1)];
            iifeInvoke.wzParent = {
                wzElement: 'call'
            };
            model.statements.splice((model.statements.length - 1), 1);
        }
        else {
            f = name.length > 0 ? (xasync + 'function' + aster + ' ' + name) : (xasync + 'function' + aster);
        }
        ctx.write(f);
        u.genTSTypeParameters(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                if (model.typeReturn) {
                    ctx.write(': ');
                    cnt.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        xfunction_end(model, ctx, iife, callback);
                    });
                }
                else {
                    xfunction_end(model, ctx, iife, callback);
                }
            });
        });
    };
    function xfunction_end(model, ctx, iife, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.xfunction_end');
        }
        ctx.w(' {');
        ctx.indent();
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.write('}');
            if (iife) {
                return cnt.genItems([
                        iifeInvoke
                    ], ctx, {
                        indent: false
                    }, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        ctx.write(')');
                        if (u.isTopStatement(model, ctx)) {
                            ctx.w('');
                        }
                        return callback(null, null);
                    });
            }
            if (u.isTopStatement(model, ctx)) {
                ctx.w('');
            }
            return callback(null, null);
        });
    }
    cnt.stm.iife = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.iife');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.iife. Got: ' + callback);
        }
        var invokeCall = null;
        if (model.statements.length > 0 && model.statements[(model.statements.length - 1)].wzElement === 'callOnValue') {
            invokeCall = model.statements[model.statements.length - 1];
            model.statements.splice(model.statements.length - 1, 1);
        }
        if (model.unary_prefix) {
            ctx.write(model.unary_prefix);
        }
        ctx.write('(function(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (model.typeReturn) {
                ctx.write(': ');
                cnt.stm.typeReturn(model.typeReturn, ctx, () => {});
            }
            ctx.w(' {');
            ctx.indent();
            cnt.genItems(model.statements, ctx, {
                indent: false
            }, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.write('})');
                if (invokeCall) {
                    cnt.genItem(invokeCall, ctx, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        return callback(null, null);
                    });
                }
                else {
                    ctx.w('();');
                    return callback(null, null);
                }
            });
        });
    };
    cnt.stm.generatorfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.generatorfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.generatorfunction. Got: ' + callback);
        }
        ctx.__aster = '*';
        cnt.stm.xfunction(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.__aster = null;
            return callback(null, null);
        });
    };
    cnt.stm.asyncfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.asyncfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.asyncfunction. Got: ' + callback);
        }
        model.xasync = true;
        cnt.stm.xfunction(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.__aster = null;
            return callback(null, null);
        });
    };
    cnt.stm.xyield = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xyield');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xyield. Got: ' + callback);
        }
        var name = model.wzName.trim();
        if (hasStatements(model) == false) {
            ctx.w('yield ' + name + u.semicolon(name));
            return callback(null, null);
        }
        ctx.write('yield ');
        cnt.genItems(model.statements, ctx, callback);
    };
    cnt.stm.xawait = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xawait');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xawait. Got: ' + callback);
        }
        ctx.write('await ');
        var name = model.wzName.trim();
        if (hasStatements(model) == false) {
            ctx.write(name);
            if (u.isTopStatement(model, ctx)) {
                ctx.w(u.semicolon(name));
            }
            return callback(null, null);
        }
        else {
            cnt.genItems(model.statements, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                if (u.isTopStatement(model, ctx)) {
                    ctx.w(u.semicolon(name));
                }
                return callback(null, null);
            });
        }
    };
    cnt.stm.asyncarrowfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.asyncarrowfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.asyncarrowfunction. Got: ' + callback);
        }
        model.xasync = true;
        cnt.stm.arrowfunction(model, ctx, callback);
    };
    cnt.stm.arrowfunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.arrowfunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.arrowfunction. Got: ' + callback);
        }
        var async_str = model.xasync ? 'async ' : '';
        if (ctx.__is_react_class && model.wzParent.wzElement == 'reactComponent') {
            var save1 = ctx.arrowFunctionNoGraphs;
            ctx.arrowFunctionNoGraphs = !u.arrowFunctionRequiresGraphs(model);
            var openGraph = ctx.arrowFunctionNoGraphs ? '' : ' {';
            ctx.w(async_str + model.wzName + ' = (');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.w(') =>' + openGraph);
                ctx.indent();
                cnt.genItems(model.statements, ctx, {
                    indent: false
                }, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.deindent();
                    if (ctx.arrowFunctionNoGraphs == false) {
                        ctx.w('}');
                    }
                    ctx.arrowFunctionNoGraphs = save1;
                    return callback(null, null);
                });
            });
        }
        else if (u.onlyChildIs(model, 'callOnValue') || u.onlyChildIsHtmlElement(model)) {
            ctx.write(async_str + '(');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(') => ');
                // TODO what if it needs generateParams ?
                cnt.genItems(model.statements, ctx, {
                    indent: true
                }, callback);
            });
        }
        else if (u.onlyChildIs(model, 'arrowfunction')) {
            ctx.write(async_str + '(');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(') => ');
                cnt.genItems(model.statements, ctx, {
                    indent: true
                }, callback);
            });
        }
        else {
            var save1 = ctx.arrowFunctionNoGraphs;
            ctx.arrowFunctionNoGraphs = !u.arrowFunctionRequiresGraphs(model);
            var openGraph = ctx.arrowFunctionNoGraphs ? '' : ' {';
            ctx.write(async_str + '(');
            u.genTSParams(model, ctx, cnt, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.w(') =>' + openGraph);
                cnt.genItems(model.statements, ctx, {
                    indent: true
                }, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    if (ctx.arrowFunctionNoGraphs == false) {
                        ctx.write('}');
                    }
                    ctx.arrowFunctionNoGraphs = save1;
                    return callback(null, null);
                });
            });
        }
    };
    cnt.stm.xreturn = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xreturn');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xreturn. Got: ' + callback);
        }
        if (hasStatements(model) == false) {
            ctx.w('return ' + (model.wzName || '') + u.semicolon(model.wzName));
            return callback(null, null);
        }
        ctx.write('return ');
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (model.statements.length == 1) {
                ctx.w(';');
            }
            return callback(null, null);
        });
    };
    function generateReturnType(model, ctx) {
        var rtype = u.extractTS(model, 'typeReturn');
        if (rtype) {
            cnt.stm[rtype.wzElement](rtype, ctx, () => {});
        }
    }
    function generateParams(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
        return callback(null, null);
    }
};
