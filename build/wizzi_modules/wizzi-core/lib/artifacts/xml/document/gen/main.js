/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\xml\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};
var myname = 'xml.document.main';

md.gen = function(model, ctx, callback) {
    if (model.wzElement !== 'xml') {
        console.log('wizzi-core', 'artifact', 'model', model);
        callback(error('Invalid model schema. Expected "xml". Received: ' + model.wzElement));
    }
    ctx.w('<?xml version="1.0"' + (model.encoding ? ' encoding="' + model.encoding + '"' : '') + (model.standalone ? ' standalone="' + model.standalone + '"' : '') + '>');
    var i, i_items=model.elements, i_len=model.elements.length, el;
    for (i=0; i<i_len; i++) {
        el = model.elements[i];
        md.genItem(el, ctx);
    }
    callback(null, ctx);
};
md.genItem = function(model, ctx) {
    if (model.tag) {
        ctx.write('<' + model.tag);
        var i, i_items=model.attributes, i_len=model.attributes.length, item;
        for (i=0; i<i_len; i++) {
            item = model.attributes[i];
            ctx.write(' ' + item.name + '="');
            ctx.write(item.value);
            ctx.write('"');
        }
        if ((model.elements && model.elements.length > 0) || model.text) {
            ctx.write('>');
            if (model.text) {
                ctx.write(model.text);
            }
            if (model.elements && model.elements.length > 0) {
                ctx.w();
                ctx.indent();
                var i, i_items=model.elements, i_len=model.elements.length, item;
                for (i=0; i<i_len; i++) {
                    item = model.elements[i];
                    md.genItem(item, ctx);
                }
                ctx.deindent();
            }
            ctx.w('</' + model.tag + '>');
        }
        else {
            ctx.w(' />');
        }
    }
    else {
        ctx.write(model.text);
    }
};
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/xml/document', 
            message: message
        };
}
