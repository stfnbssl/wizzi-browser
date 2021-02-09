/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\loader\frontMatter.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var path = require('path');
var async = require('async');
var errors = require('../errors');
var verify = require('wizzi-utils').verify;
var utilnode = require('../util/node');
/**
     Ittf commands
     $---       // the front-matter root node.
     // Children nodes are front-matter named values
     // Name - value syntax is the same of a json ittf document
*/
module.exports = function(primaryMTreeBrick, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(primaryMTreeBrick) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'primaryMTreeBrick', message: 'The primaryMTreeBrick parameter must be an object. Received: ' + primaryMTreeBrick }
        ));
    }
    var frontmatters = [];
    var i, i_items=primaryMTreeBrick.nodes, i_len=primaryMTreeBrick.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = primaryMTreeBrick.nodes[i];
        searchCommands(node, frontmatters);
    }
    var i, i_items=frontmatters, i_len=frontmatters.length, item;
    for (i=0; i<i_len; i++) {
        item = frontmatters[i];
        var j, j_items=item.children, j_len=item.children.length, node;
        for (j=0; j<j_len; j++) {
            node = item.children[j];
            var prop = utilnode.jsonifyProperty(node);
            if (prop.__is_error) {
                console.log('wizzi-mtree.includer.jsonifyProperty.err', prop);
                var errItem = prop.__errItem ? prop.__errItem : node;
                prop.errorLines = item.model.loadHistory.getIttfDocumentErrorLines(item.sourceKey, {
                    row: errItem.row, 
                    col: errItem.col + errItem.name.length + 1, 
                    description: 'jsonify error in front matter'
                }, true);
                console.log('wizzi-mtree.includer.jsonifyProperty.lineErrors', prop.errorLines);
                return callback(prop);
            }
            primaryMTreeBrick.frontMatter[prop.name] = prop.value;
        }
        utilnode.remove(item);
    }
    callback(null, primaryMTreeBrick);
};
function searchCommands(item, frontmatters) {
    if (item.name === '$---') {
        frontmatters.push(item);
    }
    else {
        var i, i_items=item.children, i_len=item.children.length, child;
        for (i=0; i<i_len; i++) {
            child = item.children[i];
            searchCommands(child, frontmatters);
        }
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
        method: 'wizzi-mtree.loader.frontMatter.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
