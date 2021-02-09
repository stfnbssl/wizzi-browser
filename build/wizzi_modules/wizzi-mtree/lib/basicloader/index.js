/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\basicloader\index.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
/**
     This basic loader is for testing plugins.
     The loadMTree function loads an mTree from a
     single IttfDocument without include, mix, append and evaluate.
     Does not require a loadContext.
     The IttfDocument must be stored in the
     filesystem (mongodb and localstorage store kinds
     are not supported).
*/
var util = require('util');
var path = require('path');
var file = require('./file');
var liner = require('./liner');
var nodifier = require('./nodifier');
var MTree = require('./mTree').MTree;
var md = module.exports = {};
md.loadMTree = function loadMTree(primaryIttfDocumentUri, notUsed, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'loadMTree', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(primaryIttfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTree', { parameter: 'primaryIttfDocumentUri', message: 'The primaryIttfDocumentUri parameter must be a string. Received: ' + primaryIttfDocumentUri }
        ));
    }
    if (typeof(callback) !== 'function') {
        throw new Error("wizzi-mtree/lib/basicloader/loadMTree. A callback is required. Uri: " + primaryIttfDocumentUri);
    }
    var sourceText = file.read(primaryIttfDocumentUri);
    var mTree = new MTree(primaryIttfDocumentUri);
    mTree.load(sourceText, {
        sourceKey: 's1'
    });
    var nodes = mTree.nodes;
    mTree.nodes = [];
    var i, i_items=nodes, i_len=nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = nodes[i];
        var final_node = _to_final_mtree(null, item);
        mTree.nodes.push(final_node);
    }
    return callback(null, mTree);
};
function _to_final_mtree(parent, node) {
    var final_node = {
        parent: parent, 
        children: [], 
        n: node.name, 
        v: node.value, 
        r: node.row, 
        c: node.col, 
        s: node.brickKey, 
        u: node.sourceKey
    };
    var i, i_items=node.children, i_len=node.children.length, item;
    for (i=0; i<i_len; i++) {
        item = node.children[i];
        var final_node_child = _to_final_mtree(final_node, item);
        final_node.children.push(final_node_child);
    }
    return final_node;
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
        method: 'wizzi.mtree.basicLoader.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
