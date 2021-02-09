/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statements\var.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.var';
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
    cnt.stm.xlet = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xlet');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xlet. Got: ' + callback);
        }
        letvarconst(model, ctx, 'let', callback);
    };
    cnt.stm.xconst = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xconst');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xconst. Got: ' + callback);
        }
        letvarconst(model, ctx, 'const', callback);
    };
    cnt.stm.xvar = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xvar');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xvar. Got: ' + callback);
        }
        letvarconst(model, ctx, 'var', callback);
    };
    function letvarconst(model, ctx, symbol, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.letvarconst');
        }
        // set ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false
        ctx.write(symbol + ' ');
        if (model.wzName && model.wzName.length > 0) {
            ctx.write(model.wzName);
        }
        var vtype = u.extractTSSimpleType(model);
        if (vtype) {
            ctx.write(': ');
            cnt.stm[vtype.wzElement](vtype, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                letvarconst_step(model, ctx, callback);
            });
        }
        else {
            letvarconst_step(model, ctx, callback);
        }
    }
    function letvarconst_step(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.letvarconst_step');
        }
        if (hasStatements(model) == false) {
            ctx.w(u.semicolon(model.wzName));
            return callback(null, null);
        }
        if (countStatements(model) == 2 && (model.statements[1].wzElement === 'typeInitValue' || model.statements[1].wzElement === 'initValue')) {
            cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.write(' = ');
                cnt.genItem(model.statements[1], ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    // VIA 1/2/19 _ ctx.w(u.semicolon(model.wzName))
                    ctx.w(';');
                    return callback(null, null);
                });
            });
        }
        else {
            ctx.__inside_expr = true;
            if (model.wzName && model.wzName.length > 0) {
                ctx.write(' = ');
            }
            var indented,
                item = model.statements[0];
            cnt.genItem(item, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                var len_1 = model.statements.length;
                function repeater_1(index_1) {
                    if (index_1 === len_1) {
                        return next_1();
                    }
                    var item_1 = model.statements[index_1];
                    if (ctx.__needs_comma) {
                        ctx.write(',');
                        ctx.__needs_comma = false;
                    }
                    if (ctx.__needs_crlf) {
                        ctx.w();
                        ctx.__needs_crlf = false;
                    }
                    if (index_1 == 1) {
                        ctx.indent();
                        indented = true;
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
                repeater_1(1);
                function next_1() {
                    ctx.w(';');
                    if (indented) {
                        ctx.deindent();
                    }
                    // 3/1/19 set ctx.__needs_crlf = ctx.__needs_comma =
                    ctx.__inside_expr = false;
                    return callback(null, null);
                }
            });
        }
    }
    cnt.stm.initValue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.initValue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.initValue. Got: ' + callback);
        }
        ctx.write(model.wzName);
        if (countStatements(model) > 0) {
            cnt.genItem(model.statements[0], ctx, callback);
        }
        else {
            return callback(null, null);
        }
    };
    cnt.stm.decl = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.decl');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.decl. Got: ' + callback);
        }
        ctx.write(model.wzName);
        if (countStatements(model) > 0) {
            ctx.write(' = ');
            var len_1 = model.statements.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.statements[index_1];
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
                ctx.__needs_comma = true;
                ctx.__needs_crlf = true;
                return callback(null, null);
            }
        }
        else {
            ctx.__needs_comma = true;
            ctx.__needs_crlf = true;
            return callback(null, null);
        }
    };
    cnt.stm.xnew = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xnew');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xnew. Got: ' + callback);
        }
        if (hasStatements(model) == false) {
            if (model.wzName.trim().substr(-1, 1) === ')') {
                ctx.write('new ' + model.wzName);
            }
            else {
                ctx.write('new ' + model.wzName + '()');
            }
            if (u.isTopStatement(model, ctx)) {
                ctx.w(';');
            }
            return callback(null, null);
        }
        ctx.write('new ');
        xnew_type(model, ctx, function(err, startArg) {
            if (err) {
                return callback(err);
            }
            var openParen = false;
            var len_1 = model.statements.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.statements[index_1];
                if (u.isMemberAccess(item_1)) {
                    if (openParen) {
                        ctx.write(')');
                    }
                    return cnt.genItem(item_1, ctx, function(err, notUsed) {
                            if (err) {
                                return callback(err);
                            }
                            if (u.isTopStatement(model, ctx)) {
                                ctx.w(';');
                            }
                            return callback(null, null);
                        });
                }
                if (index_1 == startArg) {
                    ctx.write('(');
                    openParen = true;
                }
                if (index_1 > startArg) {
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
            repeater_1(startArg);
            function next_1() {
                if (openParen) {
                    ctx.write(')');
                }
                if (u.isTopStatement(model, ctx)) {
                    ctx.w(';');
                }
                return callback(null, null);
            }
        });
    };
    function xnew_type(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.xnew_type');
        }
        if (model.statements[0].wzElement === 'type') {
            ctx.write('(');
            cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null, 1);
            });
        }
        else {
            ctx.write(model.wzName);
            return callback(null, 0);
        }
    }
    cnt.stm.type = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.type');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.type. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, callback);
    };
};
