/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\node.js.ittf
*/
'use strict';

var verify = require('./verify');

var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";

var md = module.exports = {};
/**
     inline a node hierarchy in a single text line
     separated by the "__LS__" sequence
*/
md.nodeToTextLine = function(node) {
    var acc = [];
    if (node.children) {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            textline(item, acc, '');
        }
    }
    return acc.join(work.lineSep);
};
function textline(node, acc, indent) {
    var open = node.tagSuffix == '(' ? '(' : ' ';
    acc.push(indent + node.name + open + (node.value || ''));
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        textline(item, acc, (indent + '  '));
    }
}
/**
     extract the text lines from a text string inlined with `nodeToTextLine`
*/
md.inlinedTextToTextLines = function(text, options) {
    options = options || {};
    if (typeof(text) === 'undefined' || text == null) {
        if (options.singleLine) {
            return text;
        }
        else {
            return {
                    text: text, 
                    lines: null
                };
        }
    }
    var text = verify.replaceAll(text, work.textSep, '\n');
    var ss = text.split('\n');
    if (ss.length == 1) {
        if (options.singleLine) {
            return ss[0];
        }
        else {
            return {
                    text: ss[0], 
                    lines: null
                };
        }
    }
    else {
        if (options.singleLine) {
            var para = verify.replaceAll(ss[1], work.lineSep, '\n');
            return ss[0] + para;
        }
        else {
            var lines = verify.replaceAll(ss[1], work.lineSep, '\n').split('\n')
            ;
            return {
                    text: ss[0], 
                    lines: lines
                };
        }
    }
};
md.replace = function(item, replacers) {
    if (!item.parent) {
        // log 'util/node/replace/item', item
        var i, i_items=replacers, i_len=replacers.length, repl;
        for (i=0; i<i_len; i++) {
            repl = replacers[i];
            // log 'util/node/replace/repl', repl
        }
    }
    var nodes = item.parent.children;
    item.parent.children = [];
    var i, i_items=nodes, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child === item) {
            var j, j_items=replacers, j_len=replacers.length, replchild;
            for (j=0; j<j_len; j++) {
                replchild = replacers[j];
                replchild.parent = item.parent;
                item.parent.children.push(replchild);
            }
        }
        else {
            item.parent.children.push(child);
        }
    }
};
md.remove = function(item) {
    var nodes = item.parent.children;
    item.parent.children = [];
    var i, i_items=nodes, i_len=nodes.length, child;
    for (i=0; i<i_len; i++) {
        child = nodes[i];
        if (child !== item) {
            item.parent.children.push(child);
        }
    }
};
