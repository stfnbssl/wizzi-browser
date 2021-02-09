/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\expressions.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.expressions';
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
    // void, !, or, and, iif, ==, !=, ===, !==, ||, &&, |, &,
    // -, +, *, /, ^, %,	<, <=, >, >=
    cnt.stm.identifier = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.identifier');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.identifier. Got: ' + callback);
        }
        ctx.write( model.wzName );
        if (model.statements.length > 0) {
            cnt.genItems(model.statements, ctx, callback);
        }
        else {
            return callback(null, null);
        }
    };
    cnt.stm.expressionMember = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.expressionMember');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.expressionMember. Got: ' + callback);
        }
        ctx.write( model.wzName || '');
        cnt.genItems(model.statements, ctx, callback);
    };
    cnt.stm.xvoid = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xvoid');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xvoid. Got: ' + callback);
        }
        ctx.write('void ');
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
            return callback(null, null);
        }
        else if (model.statements.length == 1) {
            cnt.genItem(model.statements[0], ctx, callback);
        }
        else {
            return callback(ctx.error('void statement element requires zero or one child elements', model));
        }
    };
    cnt.stm.not = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.not');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.not. Got: ' + callback);
        }
        ctx.write('!');
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
            return callback(null, null);
        }
        else if (model.statements.length == 1) {
            var saveParenRequired = ctx.parenRequired;
            ctx.parenRequired = true;
            cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.parenRequired = saveParenRequired;
                return callback(null, null);
            });
        }
        else {
            return callback(ctx.error('not/! statement element requires zero or one child elements', model));
        }
    };
    cnt.stm.or = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.or');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.or. Got: ' + callback);
        }
        if (model.statements.length != 2) {
            if (model.statements.length == 0 && ctx.__allowSingleLineOp) {
                ctx.write(' || ' + (model.wzName || ''));
                return callback(null, null);
            }
            else {
                return callback(ctx.error('or/|| statement element requires two child element', model));
            }
        }
        var saveParenRequired = ctx.parenRequired;
        ctx.parenRequired = true;
        cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write(' || ');
            cnt.genItem(model.statements[1], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.parenRequired = saveParenRequired;
                return callback(null, null);
            });
        });
    };
    cnt.stm.and = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.and');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.and. Got: ' + callback);
        }
        if (model.statements.length != 2) {
            if (model.statements.length == 0 && ctx.__allowSingleLineOp) {
                ctx.write(' && ' + (model.wzName || ''));
                return callback(null, null);
            }
            else {
                return callback(ctx.error('and/&& statement element requires two child element', model));
            }
        }
        var saveParenRequired = ctx.parenRequired;
        ctx.parenRequired = true;
        cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write(' && ');
            cnt.genItem(model.statements[1], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.parenRequired = saveParenRequired;
                return callback(null, null);
            });
        });
    };
    cnt.stm.iif = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.iif');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.iif. Got: ' + callback);
        }
        if (model.statements.length < 2) {
            return callback(ctx.error('iif statement element requires at least two child elements', model));
        }
        var paren = ctx.parenRequired || model.statements.length > 2;
        if (paren) {
            ctx.write('(');
        }
        ctx.write(model.wzName + ' ? ');
        cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write(' : ');
            cnt.genItem(model.statements[1], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                if (paren) {
                    ctx.write(')');
                }
                if (model.statements.length > 2) {
                    cnt.genItem(model.statements[2], ctx, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        iif_end(model, ctx, callback);
                    });
                }
                else {
                    iif_end(model, ctx, callback);
                }
            });
        });
    };
    function iif_end(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.iif_end');
        }
        if (u.isTopStatement(model, ctx) && u.isDescendentOf(model, 'iif') == false) {
            console.log('iif', model.wzParent.wzElement, model.wzParent.wzParent ? model.wzParent.wzParent.wzElement : '');
            ctx.w(';');
        }
        return callback(null, null);
    }
    cnt.stm.test = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.test');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.test. Got: ' + callback);
        }
        ctx.write('(');
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            return callback(null, null);
        });
    };
    cnt.stm.then = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.then');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.then. Got: ' + callback);
        }
        if (hasStatements(model) == false) {
            ctx.write(model.wzName);
            return callback(null, null);
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, callback);
    };
    cnt.stm.op_eq = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_eq');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_eq. Got: ' + callback);
        }
        emitOperators(cnt, '==', model, ctx, callback);
    };
    cnt.stm.op_noteq = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_noteq');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_noteq. Got: ' + callback);
        }
        emitOperators(cnt, '!=', model, ctx, callback);
    };
    cnt.stm.op_eq_strict = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_eq_strict');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_eq_strict. Got: ' + callback);
        }
        emitOperators(cnt, '===', model, ctx, callback);
    };
    cnt.stm.op_noteq_strict = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_noteq_strict');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_noteq_strict. Got: ' + callback);
        }
        emitOperators(cnt, '!==', model, ctx, callback);
    };
    cnt.stm.op_or = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_or');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_or. Got: ' + callback);
        }
        emitOperators(cnt, '||', model, ctx, callback);
    };
    cnt.stm.op_and = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_and');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_and. Got: ' + callback);
        }
        emitOperators(cnt, '&&', model, ctx, callback);
    };
    cnt.stm.op_xor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_xor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_xor. Got: ' + callback);
        }
        emitOperators(cnt, '|', model, ctx, callback);
    };
    cnt.stm.op_xand = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_xand');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_xand. Got: ' + callback);
        }
        emitOperators(cnt, '&', model, ctx, callback);
    };
    cnt.stm.op_minus = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_minus');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_minus. Got: ' + callback);
        }
        emitOperators(cnt, '-', model, ctx, callback);
    };
    cnt.stm.op_plus = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_plus');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_plus. Got: ' + callback);
        }
        emitOperators(cnt, '+', model, ctx, callback);
    };
    cnt.stm.op_times = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_times');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_times. Got: ' + callback);
        }
        emitOperators(cnt, '*', model, ctx, callback);
    };
    cnt.stm.op_div = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_div');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_div. Got: ' + callback);
        }
        emitOperators(cnt, '/', model, ctx, callback);
    };
    cnt.stm.op_power = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_power');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_power. Got: ' + callback);
        }
        emitOperators(cnt, '^', model, ctx, callback);
    };
    cnt.stm.op_mod = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_mod');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_mod. Got: ' + callback);
        }
        emitOperators(cnt, '%', model, ctx, callback);
    };
    cnt.stm.op_lt = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_lt');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_lt. Got: ' + callback);
        }
        emitOperators(cnt, '<', model, ctx, callback);
    };
    cnt.stm.op_le = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_le');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_le. Got: ' + callback);
        }
        emitOperators(cnt, '<=', model, ctx, callback);
    };
    cnt.stm.op_gt = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_gt');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_gt. Got: ' + callback);
        }
        emitOperators(cnt, '>', model, ctx, callback);
    };
    cnt.stm.op_ge = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.op_ge');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.op_ge. Got: ' + callback);
        }
        emitOperators(cnt, '>=', model, ctx, callback);
    };
    function emitOperators(cnt, op, model, ctx, callback) {
        if (model.statements[0] && model.statements[1]) {
            var requireParen1 = model.statements.length > 2;
            var requireParena1 = model.statements[0].statements.length > 0;
            var requireParena2 = model.statements[1].statements.length > 0;
            if (requireParen1) {
                ctx.write('(');
            }
            if (requireParena1) {
                ctx.write('(');
            }
            cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                if (requireParena1) {
                    ctx.write(')');
                }
                ctx.write(' ' + op + ' ');
                if (requireParena2) {
                    ctx.write('(');
                }
                cnt.genItem(model.statements[1], ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    if (requireParena2) {
                        ctx.write(')');
                    }
                    if (requireParen1) {
                        ctx.write(')');
                    }
                    if (model.statements[2]) {
                        cnt.genItem(model.statements[2], ctx, function(err, notUsed) {
                            if (err) {
                                return callback(err);
                            }
                            if (u.isTopStatement(model, ctx) && (u.isDescendentOf(model, 'iif') == false)) {
                                ctx.w(';');
                            }
                            return callback(null, null);
                        });
                    }
                    else {
                        if (u.isTopStatement(model, ctx) && (u.isDescendentOf(model, 'iif') == false)) {
                            ctx.w(';');
                        }
                        return callback(null, null);
                    }
                });
            });
        }
        else {
            if (model.statements.length == 0 && ctx.__allowSingleLineOp) {
                ctx.write(' ' + op + ' ' + (model.wzName || ''));
                return callback(null, null);
            }
            else {
                return callback(ctx.artifactGenerationError("Invalid model. Two child statements are required. Model: " + util.inspect(model, {depth: 2}), "wizzi-codegen/lib/js/statements/expressions/emitOperators", model));
            }
        }
    }
};
