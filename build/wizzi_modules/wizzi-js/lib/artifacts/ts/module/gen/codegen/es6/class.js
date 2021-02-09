/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\es6\class.js.ittf
*/
'use strict';
var u = require('../../../../../js/module/gen/codegen/util/stm');
var statement = require('../statement');
var method = require('./method');
var handler = require('./handler');
var property = require('./property');
var xget = require('./get');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.es6.class';
md.gen = function(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in ' + myname + '.gen');
    }
    if (typeof callback !== 'function') {
        throw new Error('The callback parameter must be a function. In ' + myname + '.gen. Got: ' + callback);
    }
    var zclass = model.wzName,
        zsuper = model.super;
    // log 'ts.es6.class', model
    classDecorators(model, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        u.genAccessorsAndExtra(model, ctx);
        ctx.write('class ' + zclass);
        // log myname, zclass, model.extends
        u.genTSTypeParameters(model, ctx, statement, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            classSuper(model, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                classImplements(model, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(' {');
                    ctx.indent();
                    classCTor(model, ctx, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        classMembers(model, ctx, function(err, notUsed) {
                            if (err) {
                                return callback(err);
                            }
                            ctx.deindent();
                            ctx.w('}');
                            return callback(null, null);
                        });
                    });
                });
            });
        });
    });
};
function classDecorators(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classDecorators');
    }
    var count = 0;
    var len_1 = model.statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.statements[index_1];
        if (item_1.wzElement == 'decoratorCall') {
            if (count > 0) {
                ctx.write(', ');
            }
            count++;
            statement.genItem(item_1, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.w();
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            });
        }
        else {
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
        }
    }
    repeater_1(0);
    function next_1() {
        return callback(null, null);
    }
}
function classImplements(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classImplements');
    }
    if (model.implements.length == 0) {
        return callback(null, null);
    }
    ctx.write( ' implements ' );
    var len_1 = model.implements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.implements[index_1];
        if (index_1 > 0) {
            ctx.write(', ');
        }
        ctx.write( item_1.wzName );
        process.nextTick(function() {
            repeater_1(index_1 + 1);
        });
    }
    repeater_1(0);
    function next_1() {
        return callback(null, null);
    }
}
function classSuper(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classSuper');
    }
    if (model.super) {
        ctx.write(' extends ' + model.super);
        if (model.superType && model.superType.typeParameterInsts.length > 0) {
            ctx.write('<');
            var len_1 = model.superType.typeParameterInsts.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.superType.typeParameterInsts[index_1];
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
                    statement.genItem(item_1.statements[0], ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        });
                    });
                }
                else {
                    ctx.write('x');
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                }
            }
            repeater_1(0);
            function next_1() {
                ctx.write('>');
                return callback(null, null);
            }
        }
        else {
            return callback(null, null);
        }
    }
    else {
        return callback(null, null);
    }
}
function classCTor(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classCTor');
    }
    // log 'classCTor'
    var zsuper = model.super,
        ctor = model.findCtor();
    if (ctor) {
        u.genAccessorsAndExtra(ctor, ctx);
        ctx.write('constructor');
        u.genTSTypeParameters(ctor, ctx, statement, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write('(');
            u.genTSParams(ctor, ctx, statement, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                ctx.w(' {');
                ctx.indent();
                classCTor_end(model, ctx, callback);
            });
        });
    }
    else {
        return callback(null, null);
    }
}
function classCTor_end(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classCTor_end');
    }
    // log 'classCTor_end'
    var zsuper = model.super,
        ctor = model.findCtor(),
        superArgs = ctor == null ? '' : (ctor.getBaseArgs() || '');
    if (zsuper && superArgs.length > 0) {
        ctx.w('super(' + superArgs + ');');
    }
    if (ctor) {
        statement.genMany(ctor.statements, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null, null);
        });
    }
    else if (zsuper) {
        ctx.deindent();
        ctx.w('}');
        return callback(null, null);
    }
    else {
        return callback(null, null);
    }
}
function classMembers(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in fn: ' + myname + '.classMembers');
    }
    // log 'classMembers'
    var len_1 = model.statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.statements[index_1];
        console.log('ts.es6.class.classMembers', item_1.wzElement);
        var generator = null;
        var done = false;
        if (item_1.wzElement === 'ctor') {
            // done already
            done = true;
        }
        else if (item_1.wzElement === 'decoratorCall') {
            // done already
            done = true;
        }
        else if (item_1.wzElement === 'method' || item_1.wzElement === 'typeMethod') {
            generator = method;
        }
        else if (item_1.wzElement === 'arrowfunction') {
            generator = handler;
        }
        else if (item_1.wzElement === 'property' || item_1.wzElement === 'p') {
            generator = property;
        }
        else if (item_1.wzElement === 'get') {
            generator = xget;
        }
        else {
            generator = null;
        }
        if (generator) {
            generator.gen(item_1, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            });
        }
        else {
            if (done == false) {
                statement.genItem(item_1, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            else {
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            }
        }
    }
    repeater_1(0);
    function next_1() {
        console.log('ts.es6.class.classMembers end');
        return callback(null, null);
    }
}
function generateReturnType(model, ctx) {
    var rtype = u.extractTS(model, 'typeReturn');
    if (rtype) {
        cnt.stm[rtype.wzElement](rtype, ctx, () => {});
    }
}
function generateParams(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
    return callback(null, null);
}
