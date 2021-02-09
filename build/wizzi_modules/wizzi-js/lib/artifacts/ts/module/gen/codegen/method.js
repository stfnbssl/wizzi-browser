/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\method.js.ittf
*/
'use strict';
var statement = require('./statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.method';
md.gen = function(model, ctx, callback) {
    var clazz = model.wzParent.wzName,
        method = model.wzName;
    if (ctx.__jskind == 'react' || ctx.__jskind == 'es6') {
        if (model.static) {
            ctx.write('static ');
        }
        if (model.async) {
            ctx.write('async ');
        }
    }
    if (ctx.__is_react_class) {
        ctx.w(method + '(' + model.paramNames.join(', ') + ') {');
    }
    else if (model.static) {
        ctx.w(clazz + '.' + method + ' = function(' + model.paramNames.join(', ') + ') {');
    }
    else {
        ctx.w(clazz + '.prototype.' + method + ' = function(' + model.paramNames.join(', ') + ') {');
    }
    ctx.indent();
    generateParams(model.wzName, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        statement.genMany(model.statements, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null, null);
        });
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
