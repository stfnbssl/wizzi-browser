/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\ittf\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};
var myname = 'ittf.document.main';

md.gen = function(model, ctx, callback) {
    toIttf(model, ctx);
    callback(null, ctx);
};
function toIttf(node, ctx) {
    if (node.n) {
        ctx.write(node.n);
    }
    else {
        ctx.write(node.name);
    }
    if (node.v && node.v.length > 0) {
        ctx.w(' ' + node.v);
    }
    else if (node.value && node.value.length > 0) {
        ctx.w(' ' + node.value);
    }
    else {
        ctx.w();
    }
    if (node.children && node.children.length > 0) {
        ctx.indent();
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            toIttf(child, ctx);
        }
        ctx.deindent();
    }
}
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/ittf/document', 
            message: message
        };
}
