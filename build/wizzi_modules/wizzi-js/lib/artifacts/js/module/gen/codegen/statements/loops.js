/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\loops.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.loops';
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
    cnt.stm.xfor = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xfor');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xfor. Got: ' + callback);
        }
        u.emitBlock(cnt, 'for', model, model.statements, model.statements.length, ctx, callback);
    };
    cnt.stm.foreach = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.foreach');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.foreach. Got: ' + callback);
        }
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length != 3 || ss[1] !== 'in') {
            return callback(ctx.error("Malformed foreach. Should be: foreach <item> in <coll>. Is " + model.wzName, model));
        }
        var item = ss[0],
            coll = ss[2];
        var nidif = (ctx.__for_nidif || 0);
        if (nidif >= max_for_nidif) {
            return callback(ctx.error(myname + '. Maximum number of nested foreach loop is ' + max_for_nidif, model));
        }
        var letter = forloopLetters[nidif];
        var items = (letter + '_items');
        var len = (letter + '_len');
        ctx.__for_nidif = (nidif + 1);
        ctx.w('var ' + letter + ', ' + items + '=' + coll + ', ' + len + '=' + coll + '.length, ' + item + ';');
        ctx.w('for (' + letter + '=0; ' + letter + '<' + len + '; ' + letter + '++) {');
        ctx.w('    ' + item + ' = ' + coll + '[' + letter + '];');
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            ctx.__for_nidif = (ctx.__for_nidif - 1);
            return callback(null, null);
        });
    };
    cnt.stm.backeach = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.backeach');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.backeach. Got: ' + callback);
        }
        var ss = model.wzName.trim().split(' ')
        ;
        if (ss.length != 3 || ss[1] !== 'in') {
            return callback(ctx.error("Malformed backeach. Should be: backeach <item> in <coll>. Is " + model.wzName, model));
        }
        var item = ss[0],
            coll = ss[2];
        var nidif = (ctx.__for_nidif || 0);
        if (nidif >= max_for_nidif) {
            return callback(ctx.error(myname + '. Maximum number of nested backeach loop is ' + max_for_nidif, model));
        }
        var letter = forloopLetters[nidif];
        var len = (letter + '_len');
        ctx.__for_nidif = (nidif + 1);
        ctx.w('var ' + letter + ', ' + len + '=' + coll + '.length, ' + item + ';');
        ctx.w('for (' + letter + '= (' + len + '-1); ' + letter + '>-1; ' + letter + '--) {');
        ctx.w('    ' + item + ' = ' + coll + '[' + letter + '];');
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            ctx.__for_nidif = ctx.__for_nidif - 1;
            return callback(null, null);
        });
    };
    cnt.stm.xbreak = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xbreak');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xbreak. Got: ' + callback);
        }
        ctx.write('break');
        ctx.write((model.wzName || '').trim().length > 0 ? (' ' + model.wzName) : '');
        ctx.w(';');
        return callback(null, null);
    };
    cnt.stm.xcontinue = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xcontinue');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xcontinue. Got: ' + callback);
        }
        ctx.write('continue');
        ctx.write((model.wzName || '').trim().length > 0 ? (' ' + model.wzName) : '');
        ctx.w(';');
        return callback(null, null);
    };
    cnt.stm.xwhile = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xwhile');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xwhile. Got: ' + callback);
        }
        u.emitBlock(cnt, 'while', model, model.statements, model.statements.length, ctx, callback);
    };
    cnt.stm.xdo = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdo');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdo. Got: ' + callback);
        }
        var items = model.statements;
        var count = model.statements.length;
        ctx.write('do');
        if (ctx.values.__preserveBlock) {
            if ((count > 1) || (count == 1 && items[0].wzElement === 'block')) {
                ctx.w(' {');
            }
            else {
                ctx.w('');
            }
        }
        else {
            ctx.w(' {');
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (ctx.values.__preserveBlock) {
                if ((count > 1) || (count == 1 && items[0].wzElement === 'block')) {
                    ctx.write('}');
                }
            }
            else {
                ctx.write('}');
            }
            ctx.w(' while (' + u.unparen(model.wzName) + ')');
            return callback(null, null);
        });
    };
    cnt.stm.xlabel = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xlabel');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xlabel. Got: ' + callback);
        }
        ctx.w(model.wzName + ':');
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, callback);
    };
    var forloopLetters = "ijklmn";
    var max_for_nidif = forloopLetters.length;
};
