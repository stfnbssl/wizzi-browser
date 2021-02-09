/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\es6\property.js.ittf
*/
'use strict';
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.es6.property';
md.gen = function(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in ' + myname + '.gen');
    }
    if (typeof callback !== 'function') {
        throw new Error('The callback parameter must be a function. In ' + myname + '.gen. Got: ' + callback);
    }
    var hasChildren = model.statements.length > 0;
    if (hasChildren) {
        if (model.static) {
            ctx.write('static ' + model.wzName + ' = ');
        }
        else {
            ctx.write(model.wzName + ' = ');
        }
        ctx.indent();
        var saveName = model.wzName;
        model.wzName = '';
        model.wzElement = 'jsObject';
        statement.gen(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            model.wzElement = 'p';
            model.wzName = saveName;
            ctx.deindent();
            ctx.w('');
            return callback(null, null);
        });
    }
    else {
        if (model.static) {
            ctx.write('static ' + model.wzName + ';');
        }
        else {
            ctx.write(model.wzName + ';');
        }
        ctx.w('');
        return callback(null, null);
    }
};
