/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statement.js.ittf
*/
'use strict';

var myname = 'wizzi.ts.artifacts.module.gen.codegen.statement';

var zvar = require('./statements/var');
var types = require('./statements/types');
var xmodule = require('./statements/module');
var xinterface = require('./statements/interface');
var objects = require('../../../../js/module/gen/codegen/statements/objects');
var xfunction = require('./statements/function');
var xclass = require('./statements/class');
var ifswitch = require('../../../../js/module/gen/codegen/statements/if-switch');
var statements = require('../../../../js/module/gen/codegen/statements/statements');
var expressions = require('../../../../js/module/gen/codegen/statements/expressions');
var call = require('../../../../js/module/gen/codegen/statements/call');
var tscall = require('../../../../ts/module/gen/codegen/statements/call');
var loops = require('../../../../js/module/gen/codegen/statements/loops');
var arrays = require('../../../../js/module/gen/codegen/statements/arrays');
var exceptions = require('../../../../js/module/gen/codegen/statements/exceptions');
var debug = require('../../../../js/module/gen/codegen/statements/debug');
var template = require('../../../../js/module/gen/codegen/statements/template');
var react = require('./statements/react');
var html = require('./statements/html');
var xittf = require('../../../../js/module/gen/codegen/statements/xittf_extensions');

var include_writers = require('../../../../js/module/gen/codegen/include_writers');

var u = require('../../../../js/module/gen/codegen/util/stm');

var md = module.exports = {};
md.stm = {};

zvar.load(md);
types.load(md);
xmodule.load(md);
xinterface.load(md);
objects.load(md);
xfunction.load(md);
xclass.load(md);
ifswitch.load(md);
statements.load(md);
expressions.load(md);
call.load(md);
tscall.load(md);
loops.load(md);
arrays.load(md);
exceptions.load(md);
debug.load(md);
template.load(md);
react.load(md);
html.load(md);
xittf.load(md);

md.gen = function(model, ctx, callback) {
    md.genItem(model, ctx, callback);
};
md.genMany = function(models, ctx, callback) {
    var len_1 = models.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = models[index_1];
        md.genItem(item_1, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
        });
    }
    repeater_1(0);
    function next_1() {
        return callback(null, null);
    }
};
md.genItem = function(model, ctx, callback) {
    var key = model.wzElement;
    if (['styleJsx'].indexOf(key) >= 0 && model.get_css) {
        var global = model.global ? ' global' : '';
        ctx.write("<style jsx");
        if (model.global) {
            ctx.write(" global");
        }
        ctx.w(">{`");
        include_writers.writeIncludeCss(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("`}</style>");
            return callback(null, null);
        });
    }
    else {
        var stm = md.stm[key];
        if (stm) {
            stm(model, ctx, callback);
        }
        else {
            console.log(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
            throw ctx.error(myname + '. Unknown statement tag/element: ' + model.wzTag + '/' + model.wzElement, model);
        }
    }
};
md.genItemAs = function(model, asWzElement, ctx, callback) {
    var save = model.wzElement;
    model.wzElement = asWzElement;
    md.genItem(model, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        model.wzElement = save;
        return callback(null, null);
    });
};
md.genItems = function(statements, ctx, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent,
        first = true;
    if (indent) {
        ctx.indent();
    }
    var len_1 = statements.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = statements[index_1];
        if (options.sep && !first) {
            ctx.write(options.sep);
        }
        md.genItem(item_1, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            first = false;
            process.nextTick(function() {
                repeater_1(index_1 + 1);
            });
        });
    }
    repeater_1(from);
    function next_1() {
        if (indent) {
            ctx.deindent();
        }
        return callback(null, null);
    }
};
md.stm.codeline = function(model, ctx, callback) {
    console.log('codeline ', model.wzName);
    // 4/2/19 _ ctx.write(model.wzName)
    ctx.w(model.wzName);
    md.genItems(model.items, ctx, callback);
};
