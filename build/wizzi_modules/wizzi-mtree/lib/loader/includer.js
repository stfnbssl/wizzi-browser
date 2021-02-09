/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\loader\includer.js.ittf
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
     $include
     $json
     $fragment
*/
var includer = module.exports = function(primaryMTreeBrick, mTreeBrickProvider, callback) {
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
    if (verify.isObject(mTreeBrickProvider) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mTreeBrickProvider', message: 'The mTreeBrickProvider parameter must be an object. Received: ' + mTreeBrickProvider }
        ));
    }
    var includes = [];
    var jsons = [];
    var fragments = [];
    var i, i_items=primaryMTreeBrick.nodes, i_len=primaryMTreeBrick.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = primaryMTreeBrick.nodes[i];
        searchCommands(node, includes, jsons, fragments);
    }
    // log 'wizzi-mtree.includer.fragments before', primaryMTreeBrick.documentFragments
    primaryMTreeBrick.documentFragments = fragments;
    // log 'wizzi-mtree.includer.fragments after', primaryMTreeBrick.documentFragments
    async.mapSeries(includes, function(item, callback) {
        var v = item.value.trim();
        var mixeruri = item.model.uri;
        var mixerbasedir = path.dirname(mixeruri);
        mTreeBrickProvider.get({
            from: 'store', 
            basedir: mixerbasedir, 
            relpath: v, 
            include: true, 
            includerBrickKey: item.model.brickKey, 
            includerMTreeBrick: primaryMTreeBrick
        }, function(err, includedWipNodifiedMTree) {
            if (err) {
                return callback(local_error('IttfIncludeError', 'includer', 'Fragment to include not found', item, err, {
                        includerUri: mixeruri, 
                        includedRelPath: v
                    }));
            }
            mTreeBrickProvider.enterFragmentCall(mixeruri, includedWipNodifiedMTree.uri);
            if (mTreeBrickProvider.checkForRecursion()) {
                return callback(local_error('InvalidIttfError', 'default', 'Recursive mixin or include: ' + v, node));
            }
            includer(includedWipNodifiedMTree, mTreeBrickProvider, function(err, includeResult) {
                if (err) {
                    return callback(err);
                }
                mTreeBrickProvider.exitFragmentCall();
                // _ mTreeBrickProvider.callChain.pop()
                utilnode.replace(item, includeResult.nodes);
                return callback(null);
            });
        });
    }, function(err, results) {
        if (err) {
            return callback(err);
        }
        var i, i_items=jsons, i_len=jsons.length, item;
        for (i=0; i<i_len; i++) {
            item = jsons[i];
            var json = JSON.parse(item.value);
            if (verify.isArray(json)) {
                var normalized = [];
                var j, j_items=json, j_len=json.length, jsonitem;
                for (j=0; j<j_len; j++) {
                    jsonitem = json[j];
                    normalized.push(normalizeNode(jsonitem, item.parent, item.model, item.row, item.col, item.sourceKey));
                }
                utilnode.replace(item, normalized);
            }
            else {
                var normalized = normalizeNode(json, item.parent, item.model, item.row, item.col, item.sourceKey);
                utilnode.replace(item, [
                    normalized
                ]);
            }
        }
        callback(null, primaryMTreeBrick);
    });
};
function searchCommands(item, includes, jsons, fragments) {
    if (item.name === '$include') {
        includes.push(item);
    }
    else if (item.name === '$json') {
        jsons.push(item);
    }
    else if (item.name === '$fragment') {
        fragments.push(item);
    }
    var i, i_items=item.children, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        searchCommands(child, includes, jsons, fragments);
    }
}
function normalizeNode(node, parent, model, r, c, u) {
    node.parent = parent;
    node.model = model;
    node.row = r;
    node.col = c;
    node.souceKey = u;
    if (node.children) {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            normalizeNode(item, node, model, r, c, u);
        }
    }
    else {
        node.children = [];
    }
}
function local_error(name, method, message, node, inner, other) {
    return new errors.WizziError(message, node, node ? node.mTreeBrick || node.model : null, {
            errorName: name, 
            method: method, 
            inner: inner, 
            ...other||{}
        });
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
        method: 'wizzi-mtree@0.7.11.loader.includer.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
