/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\prettifiers\ittfHtmlPrettifier.js.ittf
*/
'use strict';
// pretty print
var STYLE_DOCS_ITTF_NODE_LINENUM = 'pp-ln';
var STYLE_DOCS_ITTF_NODE_COMMAND = 'pp-kwd';
var STYLE_DOCS_ITTF_NODE_NAME = 'pp-tag';
var STYLE_DOCS_ITTF_NODE_VALUE = 'pp-pln';
var STYLE_DOCS_ITTF_NODE_EXPR = 'pp-expr';
var STYLE_DOCS_ITTF_NODE_MIX = 'pp-mix';
var STYLE_DOCS_ITTF_NODE_ARG = 'pp-arg';
var verify = require('../verify');
var HtmlBuilder = require('./utils/htmlbuilder').HtmlBuilder;
var IttfMTreeEx = require('../ittfTree/ittfMTreeEx');
/**
     prettify an mTree for documentation pourposes
     params
     choice rootNode
     { api-ref wizzi-utils.ittfMTreeEx
     string ittf document uri
     { options
     { ittfFsNode
     string ittfBasePath
     number indentSpaces
     default 2
    
*/
module.exports = function(rootNode, options, callback) {
    getRootNode(rootNode, options, function(err, rootNode) {
        if (err) {
            return callback(err);
        }
        var ctx = {
            __ittfNode: {
                line: 0, 
                indent: 0
            }, 
            hb: new HtmlBuilder(true), 
            fragments: {}, 
            ittfFsNode: options.ittfFsNode, 
            ittfBasePath: options.ittfBasePath, 
            indentSpaces: options.indentSpaces || 2
        };
        rootNode.analize(ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            toHtmlPretty(rootNode, ctx);
            return callback(null, {
                    prettyLines: ctx.hb.toLines(), 
                    ittfMTreeEx: rootNode, 
                    fragments: ctx.fragments
                });
        });
    });
};
function getRootNode(rootNode, options, callback) {
    if (verify.isObject(rootNode) == false && verify.isNotEmpty(rootNode)) {
        // 'rootNode' should be an ittf document uri
        // load from source ittf document
        IttfMTreeEx.createFrom(rootNode, options, callback);
    }
    else {
        callback(null, rootNode);
    }
}
function toHtmlPretty(node, ctx) {
    ctx.__ittfNode.line++;
    var name = node.n || node.name,
        value = node.v || node.value,
        children = node.children,
        name_style = STYLE_DOCS_ITTF_NODE_NAME,
        value_style = STYLE_DOCS_ITTF_NODE_VALUE;
    if (node.isExpressionCommand()) {
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (node.isCode()) {
        name_style = STYLE_DOCS_ITTF_NODE_EXPR;
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (node.isMixinCall()) {
        name_style = STYLE_DOCS_ITTF_NODE_MIX;
    }
    var class_even_odd = 'L' + ('' + ctx.__ittfNode.line).substr(-1,1);
    // _ ctx.hb.openTag('li')
    // _ ctx.hb.writeAttribute('class', 'L' + ('' + ctx.__ittfNode.line).substr(-1,1))
    ctx.hb.openTag('div');
    ctx.hb.writeAttribute('class', class_even_odd );
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_LINENUM);
    ctx.hb.writeText(formatLineNum(ctx.__ittfNode.line) + ' ');
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_VALUE);
    ctx.hb.writeText(spaces(ctx.__ittfNode.indent * ctx.indentSpaces));
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    if (node.isCommand()) {
        ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_COMMAND);
    }
    else {
        if (node.isMixinCall()) {
            ctx.hb.writeAttribute('class', name_style + ' frag-to-link-a');
        }
        else {
            ctx.hb.writeAttribute('class', name_style);
        }
    }
    if (node.isMixinCall()) {
        // log 'wizzi-utils.ittfHtmlPrettifier.fragmentName', node.fragmentName, ctx.fragments
        var dId = ctx.fragments[node.fragmentName] ? ctx.fragments[node.fragmentName].id : null;
        if (dId) {
            ctx.hb.writeAttribute('data-frag-id', dId);
        }
    }
    ctx.hb.writeText(name);
    ctx.hb.closeTag('span', { inline: true });
    if (node.isMixinCall()) {
        var items = node.getMixinArgs();
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            ctx.hb.openTag('span', { inline: true });
            ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_ARG);
            ctx.hb.writeText(' ' + verify.htmlEscape(item));
            ctx.hb.closeTag('span', { inline: true });
            if (i < items.length -1) {
                ctx.hb.openTag('span', { inline: true });
                ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_VALUE);
                ctx.hb.writeText(',');
                ctx.hb.closeTag('span', { inline: true });
            }
        }
        ctx.hb.openTag('span', { inline: true });
        ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_MIX);
        ctx.hb.writeText(')');
        ctx.hb.closeTag('span', { inline: true });
    }
    else if (node.isIncludeCall()) {
        ctx.hb.openTag('span', { inline: true });
        ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_MIX + ' frag-to-link-a');
        var dId = ctx.fragments[node.fragmentName] ? ctx.fragments[node.fragmentName].id : null;
        if (dId) {
            ctx.hb.writeAttribute('data-frag-id', dId);
        }
        ctx.hb.writeText(' ' + verify.htmlEscape(node.value));
        ctx.hb.closeTag('span', { inline: true });
    }
    else {
        var items = node.getValueParsed();
        var sp = ' ';
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            if (item.t == 0) {
                ctx.hb.openTag('span', { inline: true });
                ctx.hb.writeAttribute('class', value_style);
                ctx.hb.writeText(sp + verify.htmlEscape(item.v));
                ctx.hb.closeTag('span', { inline: true });
                sp = '';
            }
            else {
                ctx.hb.openTag('span', { inline: true });
                ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_COMMAND);
                ctx.hb.writeText(sp + '${');
                ctx.hb.closeTag('span', { inline: true });
                sp = '';
                ctx.hb.openTag('span', { inline: true });
                ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_EXPR);
                ctx.hb.writeText(verify.htmlEscape(item.v));
                ctx.hb.closeTag('span', { inline: true });
                ctx.hb.openTag('span', { inline: true });
                ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_COMMAND);
                ctx.hb.writeText('}');
                ctx.hb.closeTag('span', { inline: true });
            }
        }
    }
    ctx.hb.closeTag('li');
    ctx.__ittfNode.indent++;
    var i, i_items=children, i_len=children.length, child;
    for (i=0; i<i_len; i++) {
        child = children[i];
        toHtmlPretty(child, ctx);
    }
    ctx.__ittfNode.indent--;
}
function formatLineNum(line) {
    if (line < 10) {
        return '   ' + line;
    }
    else if (line < 100) {
        return '  ' + line;
    }
    else if (line < 1000) {
        return ' ' + line;
    }
    else {
        return line;
    }
}
function spaces(num) {
    if (num < 1) {
        return '';
    }
    return Array(num + 1).join(" ");
}
