/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\html\document\gen\main.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var async = require('async');
var include_writers = require('./include_writers');
var verify = require('wizzi-utils').verify;
var utilNode = require('../../../util/utilNode');
var lineParser = require('../../../util/lineParser');
var lorem = require('wizzi-utils').lorem;
var prettify = require('wizzi-utils').prettifyFromString;
var myname = 'wizzi-web.htm1.document.main';
var md = module.exports = {};
md.stm = {};
var genItemsStackCount = 0;
md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(model) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'model', message: 'The model parameter must be an object. Received: ' + model }
        ));
    }
    if (verify.isObject(ctx) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'ctx', message: 'The ctx parameter must be an object. Received: ' + ctx }
        ));
    }
    // log myname, 'enter', 'ctx.values', ctx.values
    // log myname, 'enter', 'model', util.inspect(model, { depth: 1 })
    main_init(model, ctx);
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
    genItemsStackCount++;
    async.mapSeries(goitems, md.getGenItem(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        genItemsStackCount--;
        return callback();
    });
};
md.getGenItem = function(ctx) {
    return function(model, callback) {
            // log 'wizzi-web.artifacts.html.main', model.wzElement
            if (['_text','_textLF'].indexOf(model.wzElement) >= 0) {
                // model.wzName is a TEXTNODE
                // VIA 22/10/18 see wizzi-mtree.loader.nodifier blank escapes ( \b )
                // preserve a blank first char (coded between single hyphens)
                // var text = verify.startsWith(model.wzName, "' '") ? '&nbsp;' + model.wzName.substr(3) : model.wzName;
                var text = model.wzName;
                // log 'text', text
                if (ctx.__iscode || model.wzElement === '_textLF') {
                    ctx.w(text);
                }
                else {
                    ctx.write(text);
                }
                return md.genItems(model.elements, ctx, {
                        indent: false
                    }, callback);
            }
            else if (['_style'].indexOf(model.wzElement) >= 0 && model.get_css) {
                // must be here because _style with model.get_css undefined
                // has its handler
                include_writers.writeIncludeCss(ctx, model, callback);
            }
            else if (md.stm[model.wzElement]) {
                md.stm[model.wzElement](model, ctx, function(err, done) {
                    if (err) {
                        return callback(err);
                    }
                    if (done) {
                        // ok, processed
                        return callback();
                    }
                    else {
                        return process.nextTick(() =>
                                md.stm.standardElement(model, ctx, callback));
                    }
                });
            }
            else {
                return process.nextTick(() =>
                        md.stm.standardElement(model, ctx, callback));
            }
        };
};
md.stm.standardElement = function(model, ctx, callback) {
    // log myname, 'standardElement', 'model.wzTag', model.wzTag
    preprocess(model, ctx);
    var voidEl = (model.wzTag in voidElements);
    ctx.write('<' + model.wzTag);
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    if (voidEl) {
        ctx.w(' />');
        postprocess(model, ctx);
        return callback();
    }
    ctx.write('>');
    // check if the element has text line coded as children of the $. ittf command
    // FIXME this hack require refactoring
    var lt;
    if (model.wzName === '__TS__') {
        lt = {
            text: model.wzName
        };
    }
    else {
        lt = utilNode.inlinedTextToTextLines(model.wzName);
    }
    if (lt.text) {
        // preserve a blank first char (coded between single hyphens)
        var text = verify.startsWith(lt.text, "' '") ? '&nbsp;' + lt.text.substr(3) : lt.text;
        ctx.write(text);
    }
    if (lt.lines) {
        ctx.w();
        var saveIndent;
        if (ctx.__iscodeTag) {
            // we are inside a pre element, temporaly reset
            // to 0 the indentation depending from the node depth
            saveIndent = ctx.forceIndent(0);
        }
        else {
            ctx.indent();
        }
        var i, i_items=lt.lines, i_len=lt.lines.length, line;
        for (i=0; i<i_len; i++) {
            line = lt.lines[i];
            ctx.w(line);
        }
        if (ctx.__iscodeTag) {
            // restore indentation
            ctx.forceIndent(saveIndent);
        }
        else {
            ctx.deindent();
        }
    }
    if (model.elements && model.elements.length > 0) {
        if (ctx.__iscodeTag && !ctx.__iscodeTag_started) {
            ctx.w('');
            ctx.__iscodeTag_started = true;
            var saveIndent = ctx.forceIndent(0);
            md.genItems(model.elements, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.forceIndent(saveIndent);
                ctx.__iscodeTag_started = false;
                ctx.w('</' + model.wzTag + '>');
                postprocess(model, ctx);
                return callback();
            });
        }
        else {
            var noinline = inline.indexOf(model.wzTag) < 0;
            if (noinline) {
                ctx.w('');
            }
            md.genItems(model.elements, ctx, {
                indent: noinline
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w('</' + model.wzTag + '>');
                postprocess(model, ctx);
                return callback();
            });
        }
    }
    else {
        ctx.w('</' + model.wzTag + '>');
        postprocess(model, ctx);
        return callback();
    }
};
md.stm.html = function(model, ctx, callback) {
    if (!!ctx.values.forVueTemplate == false) {
        if (model.doctype) {
            ctx.w('<!doctype ' + model.doctype + '>');
        }
        else {
            ctx.w('<!doctype html>');
        }
        ctx.write('<html');
        var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
        for (i=0; i<i_len; i++) {
            a = getAttrs(model)[i];
            if (a.name != 'doctype') {
                if ((a.name in attrsneedsvalue) || a.value && a.value.length > 0) {
                    ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
                }
                else {
                    ctx.write(' ' + a.name);
                }
            }
        }
        ctx.w('>');
    }
    async.mapSeries(model.elements, md.getGenItem(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w();
        if (!!ctx.values.forVueTemplate == false) {
            ctx.w('</html>');
        }
        return callback(null, true);
    });
};
md.stm.jsBabel = function(model, ctx, callback) {
    if (model.statements.length === 0) {
        // is link to a js file not a script element
        return callback(null, false);
    }
    ctx.w("<script>");
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        js_statement.gen(item, ctx);
    }
    ctx.w("</script>");
    return callback(null, true);
};
md.stm.cssInclude = function(model, ctx, callback) {
    ctx.write('<style');
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.w('>');
    if (model.get_css) {
        include_writers.writeIncludeCss(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("</style>");
            return callback(null, true);
        });
    }
    else {
        ctx.w("</style>");
        return callback(null, true);
    }
};
md.stm.script = function(model, ctx, callback) {
    // log myname, 'enter script, model.get_js', model.get_js
    ctx.write('<' + model.wzTag);
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.w('>');
    if (model.get_js) {
        include_writers.writeIncludeJs(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        });
    }
    else {
        md.genItems(model.elements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        });
    }
};
md.stm.jsInclude = function(model, ctx, callback) {
    ctx.write('<script');
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.w('>');
    if (model.get_js) {
        include_writers.writeIncludeJs(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("</script>");
            return callback(null, true);
        });
    }
    else {
        ctx.w("</script>");
        return callback(null, true);
    }
};
md.stm.readyInclude = function(model, ctx, callback) {
    ctx.write('<script');
    var i, i_items=getAttrs(model), i_len=getAttrs(model).length, a;
    for (i=0; i<i_len; i++) {
        a = getAttrs(model)[i];
        if ((a.name in attrsneedsvalue) || (a.value && a.value.length > 0)) {
            ctx.write(' ' + a.name + '="' + verify.unquote(a.value || '') + '"');
        }
        else {
            ctx.write(' ' + a.name);
        }
    }
    ctx.w('>');
    if (model.get_js) {
        if (model.kind === 'jquery') {
            ctx.w('$(function() {');
            ctx.indent().include_writers.writeIncludeJs(ctx, model, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.w('});');
                ctx.w("</script>");
                return callback(null, true);
            })
        }
        else {
            ctx.w('window.onload = function() {');
            ctx.indent();
            include_writers.writeIncludeJs(ctx, model, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.w('};');
                ctx.w("</script>");
                return callback(null, true);
            });
        }
    }
    else {
        ctx.w("</script>");
        return callback(null, true);
    }
};
md.stm.img = function(model, ctx, callback) {
    // log '***** known element', model.wzElement, model.get_svg
    // may be here because img with model.get_svg undefined
    // has no specific handler (is standard element)
    if (model.get_svg) {
        return include_writers.writeIncludeSvg(ctx, model, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                return callback(null, true);
            });
    }
    else {
        return callback(null, false);
    }
};
md.stm.svgInclude = function(model, ctx, callback) {
    // log '***** known element', model.wzElement, model.get_svg
    if (model.get_svg) {
        return include_writers.writeIncludeSvg(ctx, model, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                return callback(null, true);
            });
    }
    else {
        return callback(null, false);
    }
};
md.stm.jsonObjectInclude = function(model, ctx, callback) {
    // log '***** known element', model.wzElement, model.get_json
    if (model.get_json) {
        ctx.w('<script type="application/json" id="' + model.wzName + '" >');
        include_writers.writeIncludeJson(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('</script>');
            return callback(null, true);
        });
    }
    else {
        return callback(null, false);
    }
};
md.stm.jsonArrayInclude = function(model, ctx, callback) {
    // log '***** known element', model.wzElement, model.get_json
    if (model.get_json) {
        ctx.w('<script type="application/json" id="' + model.wzName + '" >');
        include_writers.writeIncludeJson(ctx, model, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('</script>');
            return callback(null, true);
        });
    }
    else {
        return callback(null, false);
    }
};
md.stm.lorem = function(model, ctx, callback) {
    var count = parseInt(model.wzName.trim());
    var string = lorem({
        count: count, 
        units: model.units, 
        htmlTag: model.htmlTag, 
        sentenceLowerBound: model.minWords, 
        sentenceUpperBound: model.maxWords, 
        paragraphLowerBound: model.minSentences, 
        paragraphUpperBound: model.maxSentences
    });
    ctx.w(string);
    return callback(null, true);
};
md.stm.ready = function(model, ctx, callback) {
    ctx.w("<script>");
    ctx.indent();
    if (model.kind === 'jquery') {
        ctx.w('$(function() {');
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            js_statement.gen(item, ctx);
        }
        ctx.deindent();
        ctx.w('});');
    }
    else {
        ctx.w('window.onload = function() {');
        ctx.indent();
        var i, i_items=model.statements, i_len=model.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = model.statements[i];
            js_statement.gen(item, ctx);
        }
        ctx.deindent();
        ctx.w('};');
    }
    ctx.deindent();
    ctx.w("</script>");
    return callback(null, true);
};
md.stm.ittfPanel = function(model, ctx, callback) {
    ctx.w("<div class='ittf-panel'>");
    if (model.wzMTreeData.title) {
        ctx.w("<div class='ittf-panel-title'>" + model.wzMTreeData.title + "</div>");
    }
    ctx.w("<pre class='prettyprint'><code>");
    prettifyIttf(model.wzMTreeData, (err, result) => {
        if (err) {
            return callback(err);
        }
        ctx.w("<div>" + result.ittfPretty + '</div>');
        ctx.w("</code></pre></div>");
        return callback(null, true);
    });
};
md.stm.comment = function(model, ctx, callback) {
    if (ctx.__iscode) {
        ctx.w("// " + model.wzName);
        return callback(null, true);
    }
    if (model.elements.length == 0) {
        if (ctx.__inside_comment) {
            ctx.w(model.wzName ? (' ' + model.wzName) : '');
        }
        else {
            ctx.w("<!-- " + model.wzName + " -->");
        }
        ctx.__needs_crlf = false;
        return callback(null, true);
    }
    var enter_inside_comment = ctx.__inside_comment;
    if (!ctx.__inside_comment) {
        ctx.w('<!-- ');
    }
    ctx.indent();
    if (model.wzName.length > 0) {
        ctx.w(model.wzName);
    }
    ctx.__inside_comment = true;
    md.genItems(model.elements, ctx, {
        indent: false
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.__inside_comment = enter_inside_comment;
        ctx.deindent();
        if (!enter_inside_comment) {
            ctx.w(' -->');
        }
        ctx.__needs_crlf = false;
        return callback(null, true);
    });
};
function main_init(model, ctx) {
    if ((!!ctx.values.noGeneratorComments) == false) {
        ctx.w('<!--');
        ctx.w('    artifact generator: ' + __filename);
        ctx.w('    package: wizzi-web@0.7.8');
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        if ((!!ctx.values.isPackageDeploy) == false) {
            ctx.w('    utc time: ' + new Date().toUTCString());
        }
        ctx.w('-->');
    }
}
function prettifyIttf(mTreeData, callback) {
    var schema = mTreeData.schema;
    var title = mTreeData.title;
    var mTree = mTreeData.mTree;
    var item = mTreeData.ittf;
    var itemResult = {};
    if (item.children.length == 1) {
        if ((schema === 'json' && (item.children[0].n === '{' || item.children[0].n === '[')) || item.children[0].n === ittfRootFromSchema(schema) || ittfRootFromSchema(schema) === 'any') {
            // is already ok, has the correct root
            itemResult[item.n] = mTree.toIttf(item.children[0]);
            itemResult[item.n + 'Wrapped'] = itemResult[item.n];
        }
        else {
            // wrap it
            var ittfNode = wrapperForSchema(schema);
            var i, i_items=item.children, i_len=item.children.length, node;
            for (i=0; i<i_len; i++) {
                node = item.children[i];
                ittfNode.children.push(node);
            }
            itemResult[item.n] = mTree.toIttf(item.children[0]);
            itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
        }
    }
    else {
        // wrap them
        var ittfNode = wrapperForSchema(schema);
        var i, i_items=item.children, i_len=item.children.length, node;
        for (i=0; i<i_len; i++) {
            node = item.children[i];
            ittfNode.children.push(node);
        }
        itemResult[item.n] = mTree.toIttf(item.children[0]);
        itemResult[item.n + 'Wrapped'] = mTree.toIttf(ittfNode);
    }
    prettify(itemResult.ittf, function(err, pretty) {
        if (err) {
            return callback(err);
        }
        itemResult.ittfPretty = pretty;
        console.log('prettifyIttf', itemResult);
        return callback(null, itemResult);
    });
}
function wrapperForSchema(schema) {
    if (schema === 'js') {
        return {
                n: 'module', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react', 
                        children: [
                            
                        ]
                    }
                ]
            };
    }
    else if (schema === 'ts') {
        return {
                n: 'module', 
                children: [
                    
                ]
            };
    }
    else {
        return {
                n: schema, 
                children: [
                    
                ]
            };
    }
}
var schemaIttfRootMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'module', 
    json: '{', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'module', 
    vtt: 'vtt'
};
function ittfRootFromSchema(schema) {
    // log 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}
var schemaPrismLanguageMap = {
    css: 'css', 
    graphql: 'graphql', 
    ittf: 'any', 
    html: 'html', 
    js: 'javascript', 
    json: 'json', 
    md: 'vtt', 
    scss: 'scss', 
    svg: 'svg', 
    ts: 'typescript', 
    vtt: 'vtt'
};
function preprocess(model, ctx) {
    if (model.wzTag == '.') {
        model.wzTag = 'div';
        model.class = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '#') {
        model.wzTag = 'div';
        model.id = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag == '<') {
        var p = lineParser.parseNameValueRaw(model.wzName, model);
        model.wzTag = p.name();
        if (p.hasValue()) {
            model.wzName = p.value();
        }
        else {
            model.wzName = null;
        }
    }
    else if (model.wzTag == 'js') {
        model.wzTag = 'script';
        model.src = model.wzName;
        model.wzName = null;
    }
    else if (model.wzTag === 'css') {
        model.wzTag = 'link';
        model.href = model.wzName;
        model.rel = 'stylesheet';
        model.wzName = null;
    }
    else if (model.wzTag === '@title') {
        model.wzTag = 'title';
    }
    else if (model.wzTag === '@style') {
        model.wzTag = 'style';
    }
    else if (model.wzTag === 'js-babel') {
        model.wzTag = 'script';
        model.src = model.wzName;
        model.type = 'text/babel';
    }
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = true;
    }
    if (['code'].indexOf(model.wzTag) > -1) {
        ctx.__iscodeTag = true;
    }
}
function postprocess(model, ctx) {
    if (incode.indexOf(model.wzTag) > -1) {
        ctx.__iscode = false;
    }
    if (['code'].indexOf(model.wzTag) > -1) {
        ctx.__iscodeTag = false;
    }
}
var noattrs = [
    'wzTag', 
    'wzName', 
    'wzElement', 
    'wzParent', 
    'wzSourceLineInfo', 
    '___exportName'
];
function isAttrValue(a, v) {
    if (noattrs.indexOf(a) > -1) {
        return false;
    }
    if (v == null || verify.isArray(v) || verify.isObject(v) || verify.isFunction(v)) {
        return false;
    }
    return true;
}
function getAttrs(e) {
    var retval = [];
    for (var a in e) {
        if (isAttrValue(a, e[a])) {
            retval.push({ name: verify.replaceAll(a, '_', '-'), value: e[a] });
        }
        else if (a.substr(0, 3) === 'ng-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'data-') {
            retval.push({ name: a, value: e[a] });
        }
        else if (a.substr(0, 5) === 'aria-') {
            retval.push({ name: a, value: e[a] });
        }
    }
    if (e.attributes) {
        var i, i_items=e.attributes, i_len=e.attributes.length, a;
        for (i=0; i<i_len; i++) {
            a = e.attributes[i];
            var p = lineParser.parseNameValueRaw(a.wzName, a);
            if (p.hasValue()) {
                retval.push({ name: p.name(), value: p.value() });
            }
            else {
                retval.push({ name: p.name() });
            }
        }
    }
    return retval;
}
var inline = [
    'a', 
    'img', 
    'input', 
    'li', 
    'textarea'
];
var incode = [
    'js', 
    'css', 
    'script', 
    'style', 
    'ready'
];
var attrsneedsvalue = {
    __proto__: null
};
var voidElements = {
    __proto__: null, 
    area: true, 
    base: true, 
    basefont: true, 
    br: true, 
    col: true, 
    command: true, 
    embed: true, 
    frame: true, 
    hr: true, 
    img: true, 
    input: true, 
    isindex: true, 
    keygen: true, 
    link: true, 
    meta: true, 
    param: true, 
    source: true, 
    track: true, 
    wbr: true, 
    // common self closing svg elements
    path: true, 
    circle: true, 
    ellipse: true, 
    line: true, 
    rect: true, 
    use: true, 
    stop: true, 
    polyline: true, 
    polygone: true
};
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
        method: 'wizzi-web@0.7.8.lib.artifacts.html.document.gen.main.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
