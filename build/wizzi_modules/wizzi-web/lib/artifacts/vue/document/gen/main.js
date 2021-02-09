/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\vue\document\gen\main.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;

var myname = 'wizzi-web.lib.artifacts.vue.document.gen.main';

var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var include_writers = require('./include_writers');

var lineParser = require('../../../util/lineParser');

var md = module.exports = {};
var stm = {};
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
    // check the model is a wizzi model of type 'vue'
    if (model.wzElement !== 'vue') {
        return callback(ctx.error(myname + " error: the model paramater should be a 'vue' wizzi model", model));
    }
    getGenItem(ctx)(model, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        console.log(myname, 'exit err', err);
        return callback(null, ctx);
    })
};
function getGenItem(ctx) {
    return function(model, callback) {
            if (stm[model.wzElement]) {
                // log myname, 'known element', model.wzElement
                stm[model.wzElement](model, ctx, function(err, done) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null);
                });
            }
            else {
                callback(ctx.error(myname + " error: model element not managed: " + model.wzElement, model));
            }
        };
}
function genItems(items, ctx, options, callback) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        if (options.sep && i > from) {
            goitems.push({
                wzElement: 'separator', 
                wzName: options.sep
            });
        }
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, getGenItem(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        return callback(null);
    });
}
stm.vue = function(model, ctx, callback) {
    writeComments(ctx, model);
    genItems(model.elements, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};
stm.htmlInclude = function(model, ctx, callback) {
    if (model.get_html) {
        include_writers.writeIncludeHtml(ctx, model, callback);
    }
    else {
        callback(new Error('::template tag has no html element'));
    }
};
stm.jsInclude = function(model, ctx, callback) {
    if (model.get_js) {
        include_writers.writeIncludeJs(ctx, model, callback);
    }
    else {
        callback(new Error('::script tag has no module element'));
    }
};
stm.tsInclude = function(model, ctx, callback) {
    if (model.get_ts) {
        include_writers.writeIncludeTypescript(ctx, model, callback);
    }
    else {
        callback(new Error('::script-ts tag has no module element'));
    }
};
stm.cssInclude = function(model, ctx, callback) {
    if (model.get_css) {
        include_writers.writeIncludeCss(ctx, model, callback);
    }
    else {
        callback(new Error('::style tag has no css element'));
    }
};
function writeComments(ctx, model) {
    if (model.comments.length == 1) {
        ctx.w( '<!-- ' + model.comments[0].wzName + ' -->');
    }
    if (model.comments.length > 1) {
        ctx.w( '<!--' );
        var i, i_items=model.comments, i_len=model.comments.length, item;
        for (i=0; i<i_len; i++) {
            item = model.comments[i];
            ctx.w( item.wzName );
        }
        ctx.w( '-->' );
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
        method: 'wizzi-web.lib.artifacts.vue.document.gen.main.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
