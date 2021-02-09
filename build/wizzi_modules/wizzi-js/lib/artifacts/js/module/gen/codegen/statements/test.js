/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\test.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var verify = require('../util/verify');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.test';
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
    cnt.stm.describe = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.describe');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.describe. Got: ' + callback);
        }
        ctx.w('describe("' + escapename(model.wzName) + '", function() {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('});');
            return callback(null, null);
        });
    };
    cnt.stm.it = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.it');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.it. Got: ' + callback);
        }
        ctx.w('it("' + escapename(model.wzName) + '", function() {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('});');
            return callback(null, null);
        });
    };
    cnt.stm.itAsync = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.itAsync');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.itAsync. Got: ' + callback);
        }
        ctx.w('it("' + escapename(model.wzName) + '", function(done) {');
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('});');
            return callback(null, null);
        });
    };
    cnt.stm.before = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.before');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.before. Got: ' + callback);
        }
        embedFunction('before', ctx, model.statements, cnt, callback);
    };
    cnt.stm.beforeAsync = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.beforeAsync');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.beforeAsync. Got: ' + callback);
        }
        embedFunctionAsync('before', ctx, model.statements, cnt, callback);
    };
    cnt.stm.beforeEach = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.beforeEach');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.beforeEach. Got: ' + callback);
        }
        embedFunction('beforeEach', ctx, model.statements, cnt, callback);
    };
    cnt.stm.after = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.after');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.after. Got: ' + callback);
        }
        embedFunction('after', ctx, model.statements, cnt, callback);
    };
    cnt.stm.afterAsync = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.afterAsync');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.afterAsync. Got: ' + callback);
        }
        embedFunctionAsync('after', ctx, model.statements, cnt, callback);
    };
    cnt.stm.afterEach = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.afterEach');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.afterEach. Got: ' + callback);
        }
        embedFunction('afterEach', ctx, model.statements, cnt, callback);
    };
    function embedFunction(name, ctx, items, cnt, callback) {
        ctx.w((name + '(function() {'));
        cnt.genItems(items, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('});');
            return callback(null, null);
        });
    }
    function embedFunctionAsync(name, ctx, items, cnt, callback) {
        ctx.w(name + '(function(done) {');
        cnt.genItems(items, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('});');
            return callback(null, null);
        });
    }
    function escapename(value) {
        if (verify.isNotEmpty(value)) {
            return verify.replaceAll(verify.replaceAll(value, "\\", "\\\\"), '"', '\\"');
        }
        else {
            return value;
        }
    }
};
