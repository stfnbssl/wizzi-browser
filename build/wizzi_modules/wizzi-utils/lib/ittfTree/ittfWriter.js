/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\ittfTree\ittfWriter.js.ittf
*/
'use strict';
function ittfWriter(node) {
    var sb = [];
    writeNode(node, sb, 0);
    return sb.join('');
}
function writeNode(node, sb, indent) {
    sb.push(new Array(1 + indent * 4).join(' '));
    if (node.tag) {
        sb.push(node.tag);
        if (node.name) {
            sb.push(' ', node.name);
        }
    }
    else if (node.name) {
        sb.push(node.name);
        if (node.value) {
            sb.push(' ', node.value);
        }
    }
    else {
        throw new Error('wizzi-utils.ittfWriter. Invalid node: missing tag or name property.');
    }
    sb.push('\n');
    if (node.children) {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            writeNode(item, sb, indent + 1);
        }
    }
    else {
        throw new Error('wizzi-utils.ittfWriter. Invalid node: missing tag or name property.');
    }
}
module.exports = ittfWriter;
