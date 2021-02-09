/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\json\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var stringify = require('json-stringify-safe');
var lineParser = require('../../../../util/lineParser');

var md = module.exports = {};
var myname = 'json.document.main';

md.gen = function(model, ctx, callback) {
    if (model.n && model.r && model.c && model.sourceKey) {
        // deprecated old ittf schema
        md.genItem(model, ctx);
    }
    else {
        delete model.___exportName
        ctx.w(stringify(model, null, 4));
    }
    callback(null, ctx);
};
md.genItem = function(model, ctx) {
    var n = model.n.trim();
    if (n === '#') {
        return false;
    }
    if (model.children.length > 0) {
        if (n === '{' || n === '[') {
            ctx.w(n);
            md.genItems(model.children, ctx, { parent: n });
        }
        else {
            ctx.w('"' + model.n + '":');
            md.genItems(model.children, ctx, { parent: null });
        }
        if (n === '{') {
            ctx.write('}');
        }
        else if (n === '[') {
            ctx.write(']');
        }
    }
    else {
        if (n === '{') {
            ctx.w('{}');
        }
        else if (n === '[') {
            ctx.w('[]');
        }
        else {
            if (model.parent === '{') {
                if (model.n === '@') {
                    var nv = lineParser.parseNameValueRaw(model.v);
                    ctx.write('"' + nv.name() + '": ' + nv.value());
                }
                else {
                    ctx.write('"' + model.n + '": ' + model.v);
                }
            }
            else if (model.parent === '[') {
                if (model.n === '@') {
                    var nv = lineParser.parseNameValueRaw(model.v);
                    ctx.write(model.v);
                }
                else {
                    ctx.write(model.n);
                }
            }
            else {
                ctx.write(model.n);
            }
        }
    }
    return true;
};
md.genItems = function(items, ctx, options) {
    ctx.indent();
    var first = true;
    var written = false;
    var i, i_items=items, i_len=items.length, item;
    for (i=0; i<i_len; i++) {
        item = items[i];
        if (!first && written) {
            ctx.w(',');
        }
        first = false;
        if (options.parent) {
            item.parent = options.parent;
        }
        written = md.genItem(item, ctx);
    }
    ctx.w('');
    ctx.deindent();
};
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/json/document', 
            message: message
        };
}
