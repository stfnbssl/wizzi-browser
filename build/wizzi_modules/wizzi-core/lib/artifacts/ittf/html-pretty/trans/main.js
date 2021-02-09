/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\ittf\html-pretty\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var verify = require('../../../../util/verify');
var lineparser = require('../../../../util/lineParser');
var HtmlBuilder = require('./htmlbuilder').HtmlBuilder;

var md = module.exports = {};
var myname = 'ittf.document.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'ittf') {
        console.log('wizzi-core', 'transformer', 'model', model);
        callback(error('Invalid model schema. Expected "ittf". Received: ' + model.wzElement));
    }
    ctx.__ittfNode = {
        line: 0, 
        indent: 0
    };
    ctx.hb = new HtmlBuilder();
    toHtmlPretty(model, ctx);
    transformedModel = ctx.hb.toLines();
    callback(null, transformedModel);
};
var STYLE_DOCS_ITTF_TREE_PANEL = 'docs-ittf-tree-panel';
var STYLE_DOCS_ITTF_TREE_LINE = 'docs-ittf-tree-line';
var STYLE_DOCS_ITTF_NODE_LINENUMS = 'docs-ittf-node-linenums';
var STYLE_DOCS_ITTF_NODE_INDENT = 'docs-ittf-node-indent-';
var STYLE_DOCS_ITTF_NODE_NAME = 'docs-ittf-node-name';
var STYLE_DOCS_ITTF_NODE_VALUE = 'docs-ittf-node-value';
// pretty print
var STYLE_DOCS_ITTF_TREE_PANEL = 'linenums';
var STYLE_DOCS_ITTF_TREE_LINE = 'docs-ittf-tree-line';
var STYLE_DOCS_ITTF_NODE_LINENUMS = 'docs-ittf-node-linenums';
var STYLE_DOCS_ITTF_NODE_INDENT = 'docs-ittf-node-indent-';
var STYLE_DOCS_ITTF_NODE_COMMAND = 'kwd';
var STYLE_DOCS_ITTF_NODE_NAME = 'tag';
var STYLE_DOCS_ITTF_NODE_VALUE = 'pln';
var STYLE_DOCS_ITTF_NODE_EXPR = 'expr';
var STYLE_DOCS_ITTF_NODE_MIX = 'mix';
function toHtmlPretty(node, ctx) {
    ctx.__ittfNode.line++;
    var name = node.n || node.name,
        value = node.v || node.value,
        children = node.children,
        is_command = name && name.substr(0,1) === '$',
        is_code = name === '$' || name === '$global',
        name_style = STYLE_DOCS_ITTF_NODE_NAME,
        value_style = STYLE_DOCS_ITTF_NODE_VALUE;
    if (['$if', '$elif', '$'].indexOf(name) >= 0) {
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (ctx.__insideCode) {
        name_style = STYLE_DOCS_ITTF_NODE_EXPR;
        value_style = STYLE_DOCS_ITTF_NODE_EXPR;
    }
    else if (name && name.substr(-1,1) === '(') {
        name_style = STYLE_DOCS_ITTF_NODE_MIX;
    }
    ctx.hb.openTag('li');
    ctx.hb.writeAttribute('class', 'L' + ('' + ctx.__ittfNode.line).substr(-1,1));
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', 'pnl');
    ctx.hb.writeText(spaces(ctx.__ittfNode.indent * 4));
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    if (is_command) {
        ctx.hb.writeAttribute('class', STYLE_DOCS_ITTF_NODE_COMMAND);
    }
    else {
        ctx.hb.writeAttribute('class', name_style);
    }
    ctx.hb.writeText(name);
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.openTag('span', { inline: true });
    ctx.hb.writeAttribute('class', value_style);
    ctx.hb.writeText(' ' + verify.htmlEscape(value));
    ctx.hb.closeTag('span', { inline: true });
    ctx.hb.closeTag('li');
    if (is_code) {
        ctx.__insideCode = true;
    }
    ctx.__ittfNode.indent++;
    var i, i_items=children, i_len=children.length, child;
    for (i=0; i<i_len; i++) {
        child = children[i];
        toHtmlPretty(child, ctx);
    }
    ctx.__ittfNode.indent--;
    if (is_code) {
        ctx.__insideCode = false;
    }
}
function formatLineNum(line) {
    if (line < 10) {
        return '00' + line;
    }
    if (line < 100) {
        return '0' + line;
    }
    return line;
}
function spaces(num) {
    if (num < 1) {
        return '';
    }
    return Array(num + 1).join(" ");
}
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/ittf/document', 
            message: message
        };
}
