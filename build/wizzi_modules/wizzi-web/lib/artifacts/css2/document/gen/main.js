/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\css2\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var verify = require('wizzi-utils').verify;
var errors = require('../../../../../errors');
var postcss = require("postcss");
var colorFunction = require("postcss-color-function");
var rule = require('./rule');

var myname = 'wizzi-web.artifacts.css.document.gen.main';

var md = module.exports = {};
md.stm = {};

rule.load(md);

md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback, model));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model, model));
    }
    if (model.wzElement !== 'css') {
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "css". Received: ' + model.wzElement, model));
    }
    try {
        ctx.__comment_level = 0;
        md.genItem(model, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            // log 'exit', myname
            try {
                var postCssResult = postcss().use(colorFunction({
                    preserveCustomProps: true
                })).process(ctx.getContent()).css
                ;
            } 
            catch (ex) {
                if (ex.name === 'CssSyntaxError') {
                    return callback(error('CssSyntaxError', 'gen.postcss()', ex.toString(), model, ex));
                }
            } 
            ctx.hydrate({
                lines: [
                    {
                        indentValue: 0, 
                        text: [
                            postCssResult
                        ]
                    }
                ]
            });
            callback(null, ctx);
        });
    } 
    catch (ex) {
        return callback(error('Exception', 'gen', 'An exception encountered during generation', model, ex));
    } 
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
    async.mapSeries(goitems, md.mapItem(ctx), (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        process.nextTick(callback);
    });
};
md.mapItem = function(ctx) {
    return function(model, callback) {
            return md.genItem(model, ctx, callback);
        };
};
md.genItem = function(model, ctx, callback) {
    var method = md.stm[model.wzElement];
    if (method) {
        return method(model, ctx, callback);
    }
    else {
        return callback(error('ArtifactGenerationError', 'genItem', myname + '. Unknown tag/element: ' + model.wzTag + '/' + model.wzElement, model, null));
    }
};
/**
     params
     string errorName
     # the error name or number
     string method
     string message
     # optional
     { model
     # optional
     { innerError
     # optional
*/
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi-web/lib/artifacts/css/document/gen/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
        });
}
md.stm.css = function(model, ctx, callback) {
    // css is container only
    if (model.charset) {
        ctx.write('@charset "' + model.charset + '";');
    }
    emitResources(model.resources, ctx);
    md.stm.defaults(model, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        console.log('css,after defaults', ctx.getContent());
        md.genItems(model.rules, ctx, {
            indent: false
        }, callback);
    });
};
md.stm.defaults = function(model, ctx, callback) {
    var items = [];
    if (model.useNormalize) {
        items.push('normalize.css');
    }
    async.mapSeries(items, (item, callback) => {
        console.log('defaults,appendFile', item);
        ctx.appendFile(path.join(__dirname, 'defaults', item));
        return callback(null);
    }, callback);
};
function emitResources(requestedResources, ctx) {
    if (requestedResources.length > 0 && ctx.values.cssResources) {
        var resourceRepo = ctx.values.cssResources;
        resourceRepo.clearCssDependencies();
        var i, i_items=requestedResources, i_len=requestedResources.length, item;
        for (i=0; i<i_len; i++) {
            item = requestedResources[i];
            resourceRepo.addCssDependency(item.wzName);
        }
        resourceRepo.emitCssDependencies(ctx);
    }
}
