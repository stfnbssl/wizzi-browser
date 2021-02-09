/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\svg\document\gen\main.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
// Example of language artifact that targets
// the Scalable Vector Graphics (SVG) 1.1 (Second Edition) specification.
// It implements a minimal set of elements
//
// This is a code write based artifact generator.
//

var myname = 'wizzi-demo.plugins.lib.artifacts.svg.document.main';

var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;

var lineParser = require('../../../util/lineParser');

var md = module.exports = {};
md.stm = {};
md.gen = function gen(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(model) === false) {
        return callback(error(
            'InvalidArgument', 'gen', { parameter: 'model', message: 'The model parameter must be an object. Received: ' + model }
        ));
    }
    if (verify.isObject(ctx) === false) {
        return callback(error(
            'InvalidArgument', 'gen', { parameter: 'ctx', message: 'The ctx parameter must be an object. Received: ' + ctx }
        ));
    }
    // log myname, 'enter', 'ctx.values', ctx.values
    // check the model is a wizzi model of type 'svg'
    if (model.wzElement !== 'svg') {
        return callback(ctx.error(myname + " error: the model paramater should be an 'svg' wizzi model", model));
    }
    md.getGenItem(ctx)(model, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        // log 'exit', myname, 'err', err
        return callback(null, ctx);
    })
};
md.genItems = function(items, ctx, options, callback) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, md.getGenItem(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        return callback();
    });
};
md.getGenItem = function(ctx) {
    return function(model, callback) {
            if (md.stm[model.wzElement]) {
                // log '***** known element', model.wzElement
                md.stm[model.wzElement](model, ctx, function(err, done) {
                    if (err) {
                        return callback(err);
                    }
                    if (done) {
                        // ok, processed
                        return callback();
                    }
                    else {
                        return md.stm.standardElement(model, ctx, callback);
                    }
                });
            }
            else {
                return md.stm.standardElement(model, ctx, callback);
            }
        };
};
md.stm.standardElement = function(model, ctx, callback) {
    // log '***** standard element', model.wzElement
    writeBeginTag(ctx, model.wzTag);
    writeAttributes(model, ctx);
    if (model.items.length > 0) {
        writeCloseBegin(ctx);
        if (model.wzName && model.wzName.length > 0) {
            ctx.write(model.wzName);
        }
        md.genItems(model.items, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            writeEndTag(ctx, model.wzTag);
            return callback();
        });
    }
    else {
        ctx.write(closeSym(ctx));
        ctx.write((model.wzName && model.wzName.length > 0 ? model.wzName : ''));
        writeEndTag(ctx, model.wzTag);
        return callback();
    }
};
md.stm.svg = function(model, ctx, callback) {
    if (ctx.values.forCssImage || ctx.values.forHtmlSvgElement) {
    }
    else {
        ctx.w('<?xml version="1.0"?>');
    }
    writeBeginTag(ctx, 'svg');
    ctx.write(" xmlns='http://www.w3.org/2000/svg'");
    writeAttributes(model, ctx);
    writeCloseBegin(ctx);
    md.genItems(model.items, ctx, {
        indent: true
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        writeEndTag(ctx, 'svg');
        callback(null, true);
    });
};
/**
    md.stm.linearGradient = function(model, ctx, callback) {
        writeBeginTag(ctx, 'linearGradient');
        writeAttributes(model, ctx);
        writeCloseBegin(ctx);
         TODO
        writeEndTag(ctx, 'linearGradient', callback(null, true));
    }*/
function writeAttributes(model, ctx) {
    var v;
    var i, i_items=model.getAttributes(), i_len=model.getAttributes().length, a;
    for (i=0; i<i_len; i++) {
        a = model.getAttributes()[i];
        v = encodeValue(ctx, a.value);
        ctx.write(" " + a.name + "='" + v + "'");
    }
    if (model.attributes) {
        var i, i_items=model.attributes, i_len=model.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = model.attributes[i];
            var p = lineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                ctx.write(" " + p.name() + "='" + p.value() + "'");
            }
            else {
                ctx.write(" " + p.name());
            }
        }
    }
    var styles = model.getStyleAttributes();
    if (styles.length > 0) {
        var sb = [];
        var i, i_items=styles, i_len=styles.length, style;
        for (i=0; i<i_len; i++) {
            style = styles[i];
            v = encodeValue(ctx, style.value);
            sb.push(style.tag + ':' + v + ';');
        }
        ctx.write(" style='" + sb.join('') + "'");
    }
}
function encodeValue(ctx, value) {
    if (ctx.values.forCssImage) {
        var v = verify.replaceAll(value, '%','%25');
        return verify.replaceAll(v, '#','%23');
    }
    else {
        return value;
    }
}
function openSym(ctx) {
    return ctx.values.forCssImage ? '%3C' : '<';
}
function closeSym(ctx) {
    return ctx.values.forCssImage ? '%3E' : '>';
}
function writeBeginTag(ctx, name) {
    ctx.write(openSym(ctx) + name);
}
function writeCloseBegin(ctx) {
    if (ctx.values.forCssImage) {
        ctx.write(closeSym(ctx));
    }
    else {
        ctx.w(closeSym(ctx));
    }
}
function writeEndTag(ctx, name) {
    if (name) {
        __w(ctx, openSym(ctx) + '/' + name + closeSym(ctx));
    }
    else {
        __w(ctx, '/' + closeSym(ctx));
    }
}
function __w(ctx, text) {
    if (ctx.values.forCssImage) {
        ctx.write(text);
    }
    else {
        ctx.w(text);
    }
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-web.lib.artifacts.svg.document.gen.main.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
