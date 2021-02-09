/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\es6\html.js.ittf
*/
'use strict';
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.es6.html';
md.gen = function(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in ' + myname + '.gen');
    }
    if (typeof callback !== 'function') {
        throw new Error('The callback parameter must be a function. In ' + myname + '.gen. Got: ' + callback);
    }
    var method = model.wzName,
        args = (model.getParams && model.getParams()) || '';
    ctx.w(method + '(' + args + ') {');
    ctx.indent();
    ctx.w('var __html = [];');
    ctx.__inside_html = true;
    statement.genMany(model.statements, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.__inside_html = false;
        ctx.w("return __html.join('');");
        ctx.deindent();
        ctx.w('}');
        return callback(null, null);
    });
};
