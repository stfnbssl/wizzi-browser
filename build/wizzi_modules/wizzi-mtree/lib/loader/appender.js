/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\loader\appender.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var errors = require('../errors');
var utilnode = require('../util/node');
/**
     Ittf commands
     $group
     $append
     $override
     $fragment (searched and removed only, processing is by includer and mixer)
*/
module.exports = function(mixedMTreePiece, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(mixedMTreePiece) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'mixedMTreePiece', message: 'The mixedMTreePiece parameter must be an object. Received: ' + mixedMTreePiece }
        ));
    }
    var appends = {};
    var groups = [];
    var overrides = [];
    var fragments = [];
    var ctx = {
        id: 1
    };
    var i, i_items=mixedMTreePiece.nodes, i_len=mixedMTreePiece.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedMTreePiece.nodes[i];
        assignId(node, ctx);
    }
    var errors = [];
    var i, i_items=mixedMTreePiece.nodes, i_len=mixedMTreePiece.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedMTreePiece.nodes[i];
        searchAppend(node, node, appends, groups, overrides, fragments, errors, mixedMTreePiece);
        if (errors.length > 0) {
            return callback(errors[0]);
        }
    }
    for (var key in appends) {
        // log 'wizzi-mtree.loader.appender.appends.key', key, appends[key]
        var appobj = appends[key];
        utilnode.replace(appobj.appto, appobj.items);
    }
    for (var key in overrides) {
        var overobj = overrides[key];
        utilnode.replace(overobj.virt, overobj.items);
    }
    for (var key in fragments) {
        var fragobj = fragments[key];
        utilnode.remove(fragobj.frag);
    }
    var i, i_items=groups, i_len=groups.length, item;
    for (i=0; i<i_len; i++) {
        item = groups[i];
        if (!item.parent) {
            return callback(local_error('InvalidIttfError', 'appender', "The tag $group must have a parent and cannot be the root of a primary ittf document. Hint: check for ittf fragments not in a tfolder.", item));
        }
        utilnode.replace(item, item.children);
    }
    var toremove = [];
    var i, i_items=mixedMTreePiece.nodes, i_len=mixedMTreePiece.nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = mixedMTreePiece.nodes[i];
        searchPendingNodes(node, toremove);
    }
    var i, i_items=toremove, i_len=toremove.length, item;
    for (i=0; i<i_len; i++) {
        item = toremove[i];
        utilnode.remove(item);
    }
    callback(null, mixedMTreePiece);
};
function searchAppend(item, root, appends, groups, overrides, fragments, errors, mixedMTreePiece) {
    if (item.name === '$group') {
        groups.push(item);
    }
    else if (item.name === '$append') {
        if (!item.value) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', "The tag $append requires a node-value.", item));
            return ;
        }
        var appto = utilnode.findHookExt(item, item.value.trim(), 1);
        if (appto == null) {
            appto = utilnode.findHookExt(item, item.value.trim(), 0);
            if (appto == null) {
                console.log('mixedMTreePiece.dump\n', mixedMTreePiece.toText());
                errors.push(local_error('InvalidIttfError', 'searchAppend', 'Cannot find hook ' + (item.value || '') + ', root is ' + root.name + ' ' + (root.value || '') + ', in ' + item.model.uri + ', brickKey ' + item.model.brickKey + ', remember that $hook/$append does not work between sibling nodes.' + 'After mixup the $hook node must be a parent node or a descendant of a parent node of $append' + ', but not a sibling node.', item));
                return ;
            }
        }
        var appobj = appends[item.id];
        if (appobj) {
            appobj.items = appobj.items.concat(item.children);
        }
        else {
            appobj = {
                appto: appto, 
                items: item.children
            };
            appends[item.id] = appobj;
        }
    }
    else if (item.name === '$override') {
        if (!(item.value)) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', "The tag $override requires a value.", item));
            return ;
        }
        var virt = utilnode.findVirtual(item, item.value.trim());
        if (virt == null) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', 'Cannot find virtual to override ' + (item.value || '') + ', root is ' + root.name + ' ' + root.value, item));
            return ;
        }
        var overobj = overrides[item.value];
        if (overobj) {
            errors.push(local_error('InvalidIttfError', 'searchAppend', 'The virtual node ' + item.value + ' has already been overridden. Root is ' + root.name + ' ' + root.value, item));
            return ;
        }
        else {
            overobj = {
                virt: virt, 
                over: item, 
                items: item.children
            };
            overrides[item.value] = overobj;
        }
    }
    else if (item.name === '$fragment') {
        var fragobj = {
            frag: item
        };
        fragments[item.value] = fragobj;
    }
    var i, i_items=item.children, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        searchAppend(child, root, appends, groups, overrides, fragments, errors, mixedMTreePiece);
    }
}
function searchPendingNodes(item, toremove) {
    if (['$hook', '$append', '$override'].indexOf(item.name) >= 0) {
        toremove.push(item);
    }
    var i, i_items=item.children, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        searchPendingNodes(child, toremove);
    }
}
function assignId(item, ctx) {
    item._id = ctx.id++;
    var i, i_items=item.children, i_len=item.children.length, child;
    for (i=0; i<i_len; i++) {
        child = item.children[i];
        assignId(child, ctx);
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
        method: 'wizzi-mtree@0.7.11.loader.appender.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
