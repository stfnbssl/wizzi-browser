/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statements\types.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.types';
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
    cnt.stm.typeNumber = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNumber. Got: ' + callback);
        }
        ctx.write('number');
        return callback(null, null);
    };
    cnt.stm.typeString = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeString. Got: ' + callback);
        }
        ctx.write('string');
        return callback(null, null);
    };
    cnt.stm.typeBoolean = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeBoolean. Got: ' + callback);
        }
        ctx.write('boolean');
        return callback(null, null);
    };
    cnt.stm.typeAny = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeAny. Got: ' + callback);
        }
        ctx.write('any');
        return callback(null, null);
    };
    cnt.stm.typeArray = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeArray. Got: ' + callback);
        }
        // log 'typeArray model.statements.length', model.statements.length
        if (model.statements.length == 1) {
            var item = model.statements[0];
            // log 'typeArray item.wzElement', item.wzElement
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write('[]');
                // log 'typeArray item.wzElement exit', item.wzElement
                return callback(null, null);
            });
        }
        else {
            // TODO
            ctx.write('MISSING[]');
            return callback(null, null);
        }
    };
    cnt.stm.typeObject = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeObject. Got: ' + callback);
        }
        ctx.write('object');
        return callback(null, null);
    };
    cnt.stm.typeObjectLiteral = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeObjectLiteral. Got: ' + callback);
        }
        ctx.w('{ ');
        ctx.indent();
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                // log 0
                // (19/1/21 It seems are separated by ';') _ ctx.write(', ')
            }
            // log 'typeObjectLiteral.item_1.wzElement', item_1.wzElement, item_1.wzName
            cnt.genItem(item_1, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                // log 1
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            });
        }
        repeater_1(0);
        function next_1() {
            ctx.deindent();
            ctx.w('} ');
            // log 2
            return callback(null, null);
        }
    };
    cnt.stm.typeVoid = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeVoid. Got: ' + callback);
        }
        ctx.write('void');
        return callback(null, null);
    };
    cnt.stm.typeNull = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNull. Got: ' + callback);
        }
        ctx.write('null');
        return callback(null, null);
    };
    cnt.stm.typeUndefined = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUndefined. Got: ' + callback);
        }
        ctx.write('undefined');
        return callback(null, null);
    };
    cnt.stm.typeNever = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNever. Got: ' + callback);
        }
        ctx.write('never');
        return callback(null, null);
    };
    cnt.stm.typeTypeof = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTypeof. Got: ' + callback);
        }
        ctx.write('typeof ' + model.wzName);
        return callback(null, null);
    };
    cnt.stm.typeReference = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeReference. Got: ' + callback);
        }
        if (model.statements.length == 1) {
            ctx.write('<' + model.wzName + '>');
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback);
        }
        else if (kind === 'typeParameterDecl') {
            ctx.write(' extends ' + model.wzName);
            return callback(null, null);
        }
        else {
            ctx.write(model.wzName);
            if (model.typeParameterInsts.length > 0) {
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
                    if (!cnt.stm[item_1.wzElement]) {
                        console.log('ts.module.gen.item.wzElement not managed', item_1.wzElement);
                    }
                    cnt.stm[item_1.wzElement](item_1, ctx, (err, notUsed) => {
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
                    ctx.write('>');
                    return callback(null, null);
                }
            }
            else {
                return callback(null, null);
            }
        }
    };
    cnt.stm.typeParameterInst = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParameterInst. Got: ' + callback);
        }
        if (model.statements.length == 0) {
            ctx.write(model.wzName);
            return callback(null, null);
        }
        else if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback);
        }
        else {
            return callback(ctx.error(':param typeParameterInst not managed. children: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeConditional = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeConditional. Got: ' + callback);
        }
        var item = model.typeCheck.statements[0];
        if (!cnt.stm[item.wzElement]) {
            console.log('ts.module.gen.typeConditional.wzElement not managed', item.wzElement);
        }
        cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(' extends ');
            var item = model.typeExtends.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.typeExtends.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(' ? ');
                var item = model.typeThen.statements[0];
                if (!cnt.stm[item.wzElement]) {
                    console.log('ts.module.gen.typeThen.wzElement not managed', item.wzElement);
                }
                cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(' : ');
                    var item = model.typeElse.statements[0];
                    if (!cnt.stm[item.wzElement]) {
                        console.log('ts.module.gen.typeElse.wzElement not managed', item.wzElement);
                    }
                    cnt.stm[item.wzElement](item, ctx, callback);
                });
            });
        });
    };
    cnt.stm.typeInfer = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInfer. Got: ' + callback);
        }
        ctx.write(' infer ');
        var item = model.statements[0];
        if (!cnt.stm[item.wzElement]) {
            console.log('ts.module.gen.typeThen.wzElement not managed', item.wzElement);
        }
        cnt.stm[item.wzElement](item, ctx, callback);
    };
    cnt.stm.typeParenthesized = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParenthesized. Got: ' + callback);
        }
        ctx.write('(');
        if (model.statements.length == 1) {
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(')');
                return callback(null, null);
            });
        }
        else {
            return callback(ctx.error(':paren typeParenthesized not managed. children: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeTuple = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeTuple. Got: ' + callback);
        }
        ctx.write('[');
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' , ');
            }
            console.log('typeTuple.item_1.wzElement', item_1.wzElement, item_1.wzName);
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
            ctx.write(']');
            return callback(null, null);
        }
    };
    cnt.stm.typeEnum = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeEnum. Got: ' + callback);
        }
        ctx.write('enum ' + model.wzName + ' {');
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' , ');
            }
            console.log('typeEnum.item_1.wzElement', item_1.wzElement, item_1.wzName);
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
            ctx.w('}');
            return callback(null, null);
        }
    };
    cnt.stm.typeReturn = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeReturn. Got: ' + callback);
        }
        if (model.statements.length == 1) {
            var item = model.statements[0];
            ctx.write(' ');
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback);
        }
        else {
            return callback(ctx.error(':{ typeReturn must have one children. found: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeInitValue = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInitValue. Got: ' + callback);
        }
        if (model.wzName && model.wzName.length > 0) {
            ctx.write(model.wzName);
            return callback(null, null);
        }
        else if (model.statements.length == 1) {
            cnt.genItem(model.statements[0], ctx, callback);
        }
        else if (model.statements.length > 1) {
            cnt.genItems(model.statements, ctx, callback);
        }
        else {
            return callback(ctx.error(':{ typeReturn must have wzName or children. found: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeKeyOf = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeKeyOf. Got: ' + callback);
        }
        if (kind === 'mapped') {
            ctx.write(' in ');
        }
        ctx.write(' keyof ');
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' , ');
            }
            console.log('typeKeyOf.item_1.wzElement', item_1.wzElement, item_1.wzName);
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
    cnt.stm.typeParameterDecl = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeParameterDecl. Got: ' + callback);
        }
        var atype = u.extractTSSimpleType(model);
        ctx.write('<'+ model.wzName + '>');
        if (atype) {
            ctx.write(' extends ');
            if (!cnt.stm[atype.wzElement]) {
                console.log('ts.module.gen.typeParameterDecl.item.wzElement not managed', atype.wzElement);
            }
            cnt.stm[atype.wzElement](atype, ctx, callback);
        }
        else {
            return callback(null, null);
        }
    };
    cnt.stm.typeUnion = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeUnion. Got: ' + callback);
        }
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' | ');
            }
            // log 'typeUnion.item_1.wzElement', item_1.wzElement, item_1.wzName
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
    cnt.stm.typeIntersect = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIntersect. Got: ' + callback);
        }
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (index_1 > 0) {
                ctx.write(' & ');
            }
            console.log('typeIntersect.item_1.wzElement', item_1.wzElement, item_1.wzName);
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
    cnt.stm.typeNotNull = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNotNull. Got: ' + callback);
        }
        ctx.write( model.wzName || '');
        if (model.statements.length == 0) {
            ctx.write('!');
        }
        else {
            cnt.genItems(model.statements, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write('!');
                return callback(null, null);
            });
        }
    };
    cnt.stm.typePredicate = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typePredicate. Got: ' + callback);
        }
        if (model.statements.length == 1) {
            ctx.write(model.wzName + ' is ');
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            cnt.stm[item.wzElement](item, ctx, callback);
        }
        else {
            return callback(ctx.error(':predicate typePredicate must have one children. found: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeIndexedAccess = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIndexedAccess. Got: ' + callback);
        }
        if (model.statements.length == 2) {
            var item = model.statements[0];
            var gr = u.indexedTSNeedsGraphs(item);
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            if (gr) {
                ctx.write('{');
            }
            cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                if (gr) {
                    ctx.write('}');
                }
                ctx.write('[');
                var item = model.statements[1];
                if (!cnt.stm[item.wzElement]) {
                    console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
                }
                cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(']');
                    return callback(null, null);
                });
            });
        }
        else {
            return callback(ctx.error(':mapped typeMapped must have two children. found: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeIndex = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeIndex. Got: ' + callback);
        }
        var atype = u.extractTSSimpleType(model);
        u.genAccessorsAndExtra(model, ctx);
        ctx.write('[');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            console.log('11');
            ctx.write(']');
            if (atype) {
                ctx.write(': ');
                if (!cnt.stm[atype.wzElement]) {
                    console.log('ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
                }
                cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null, null);
                });
            }
            else {
                return callback(null, null);
            }
        });
    };
    cnt.stm.typeAs = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeAs. Got: ' + callback);
        }
        // log 'typeAs.model.statements 1', model.statements
        var atype = u.extractTSSimpleType(model);
        // log 'typeAs atype', atype
        // log 'typeAs.model.statements 2', model.statements
        if (atype) {
            ctx.write(' as ');
            if (!cnt.stm[atype.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', atype.wzElement);
            }
            cnt.stm[atype.wzElement](atype, ctx, callback);
        }
        else {
            return callback(ctx.error('typeAs must have a type.', model));
        }
    };
    cnt.stm.typeLiteral = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeLiteral. Got: ' + callback);
        }
        ctx.write(model.wzName);
        return callback(null, null);
    };
    cnt.stm.typeMapped = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeMapped. Got: ' + callback);
        }
        if (model.statements.length == 2) {
            var item = model.statements[0];
            if (!cnt.stm[item.wzElement]) {
                console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
            }
            ctx.write('[');
            cnt.stm[item.wzElement](item, ctx, 'mapped', (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(']');
                ctx.write(' : ');
                var item = model.statements[1];
                if (!cnt.stm[item.wzElement]) {
                    console.log('ts.module.gen.item.wzElement not managed', item.wzElement);
                }
                cnt.stm[item.wzElement](item, ctx, callback);
            });
        }
        else {
            return callback(ctx.error(':mapped typeMapped must have two children. found: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeArrowFunction = function(model, ctx, kind, callback) {
        if (typeof callback === 'undefined') {
            callback = kind;
            kind = null;
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeArrowFunction. Got: ' + callback);
        }
        var atype = u.extractTSSimpleType(model);
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
                        typeArrowFunction_close(model, ctx, atype, callback);
                    });
                }
                else {
                    typeArrowFunction_close(model, ctx, atype, callback);
                }
            });
        });
    };
    function typeArrowFunction_close(model, ctx, atype, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.typeArrowFunction_close');
        }
        ctx.write(' => ');
        if (atype) {
            if (!cnt.stm[atype.wzElement]) {
                console.log('ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
            }
            cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                cnt.genItems(model.statements, ctx, callback);
            });
        }
        else {
            cnt.genItems(model.statements, ctx, callback);
        }
    }
    cnt.stm.typeExportAssignment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeExportAssignment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeExportAssignment. Got: ' + callback);
        }
        ctx.w('export = ' + model.wzName + ';');
        return callback(null, null);
    };
    cnt.stm.typeImportEqualsDeclaration = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeImportEqualsDeclaration');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeImportEqualsDeclaration. Got: ' + callback);
        }
        ctx.write('import ' + model.wzName + ' = ');
        if (model.statements.length == 1) {
            ctx.w('require( ' + model.statements[0].wzName + ');');
            return callback(null, null);
        }
        else {
            return callback(ctx.error(':import typeImportEqualsDeclaration must have one children. found: ' + model.statements.length, model));
        }
    };
    cnt.stm.typeNamespaceExportDeclaration = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeNamespaceExportDeclaration');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeNamespaceExportDeclaration. Got: ' + callback);
        }
        ctx.w('export as namespace ' + model.wzName + ';');
    };
    cnt.stm.typeCTorDeclare = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeCTorDeclare');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCTorDeclare. Got: ' + callback);
        }
        var atype = u.extractTSSimpleType(model);
        ctx.write('(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (atype) {
                ctx.write(': ');
                if (!cnt.stm[atype.wzElement]) {
                    console.log('ts.module.gen.typeIndex.item.wzElement not managed', atype.wzElement);
                }
                cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null, null);
                });
            }
            else {
                ctx.w(';');
                return callback(null, null);
            }
        });
    };
    cnt.stm.typeCTor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeCTor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCTor. Got: ' + callback);
        }
        ctx.w('*** :ctor ' + model.wzName + ';');
        return callback(null, null);
    };
    cnt.stm.typeConditional = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeConditional');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeConditional. Got: ' + callback);
        }
        if (!model.typeCheck || model.typeCheck.statements.length < 1) {
            return callback(ctx.error('ts.modeule.typeConditional missing typeCheck element', model));
        }
        if (!model.typeThen || model.typeThen.statements.length < 1) {
            return callback(ctx.error('ts.modeule.typeConditional missing typeThen element', model));
        }
        if (!model.typeElse || model.typeElse.statements.length < 1) {
            return callback(ctx.error('ts.modeule.typeConditional missing typeElse element', model));
        }
        var item = model.typeCheck.statements[0];
        cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            typeConditional_extends(model, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                ctx.write(' ? ');
                item = model.typeThen.statements[0];
                cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    ctx.write(' : ');
                    item = model.typeElse.statements[0];
                    cnt.stm[item.wzElement](item, ctx, callback);
                });
            });
        });
    };
    function typeConditional_extends(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.typeConditional_extends');
        }
        if (model.typeExtends) {
            ctx.write(' extends ');
            var item = model.typeExtends.statements[0];
            cnt.stm[item.wzElement](item, ctx, callback);
        }
        else {
            return callback(null, null);
        }
    }
    function doCallMembers_call(model, ctx, remainings, callback) {
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
            return callback(null, null);
        }
    }
};
