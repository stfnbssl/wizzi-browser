/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\util\node.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var assert = require('assert');
var verify = require('wizzi-utils').verify;
var md = module.exports = {};
/**
     { item (Node)
     string name
     string value
     object parent
     [ children
*/
/**
     IttfCommands are nodes which name
     starts with the char "$"
     The search go down to descendants
*/
md.findIttfCommand = function(item, cmdname, cmdtype, startItem, multi) {
    if (startItem && item.id === startItem.id) {
        // searching the hook for an append command
        // when descending from a parent we encounter startItem
        // or a sibling we skip it and its descendants
        return null;
    }
    // log 'util.node.findIttfCommand', cmdtype, item.name, cmdname, item.value
    if (item.name === ('$' + cmdtype)) {
        if (item.value && item.value.trim() === cmdname) {
            if (multi) {
                multi.push(item);
                return ;
            }
            else {
                return item;
            }
        }
        if (!item.value && cmdname === 'default') {
            if (multi) {
                multi.push(item);
                return ;
            }
            else {
                return item;
            }
        }
    }
    var found,
        i,
        l = item.children.length;
    for (i = 0; i < l; i++) {
        found = md.findIttfCommand(item.children[i], cmdname, cmdtype, startItem, multi);
        if (found && !multi) {
            return found;
        }
    }
    return null;
};
md.findIttfCommandMulti = function(item, cmdname, cmdtype) {
    var commands = [];
    md.findIttfCommand(item, cmdname, cmdtype, null, commands);
    return commands;
};
/**
     Search a $hook node command going down deep
*/
md.findHookExtDeep = function(item, hookname, searchType, startAppendNode, mixedNode) {
    if (typeof mixedNode === 'undefined') {
        // log 'md.findHookExtDeep.enter first', item.name, item.value, item.model.brickKey
        // this must be the first call for a new mixed node
        assert.ok(typeof(item.model.$mixerBrickKey) !== 'undefined', 'wizzi-mtree.util.node.findHookExtDeep Error. In a first call the paramater item must be the root node of a mixed document. Found: ' + item.model.$mixerBrickKey);
        mixedNode = item;
    }
    if (startAppendNode && item.id === startAppendNode.id) {
        //  || (startAppendNode && item.parent && item.parent.id === startAppendNode.parent.id)
        // searching the hook for an append command
        // when descending from a parent we encounter startAppendNode
        // or a sibling we skip it and its descendants
        return null;
    }
    if (searchType == 1) {
        if (item.model.brickKey == mixedNode.model.brickKey) {
            if (item.name === ('$hook')) {
                if (item.value && item.value.trim() === hookname) {
                    // log 'md.findHookExtDeep.found', item.name, item.value, item.model.brickKey, 'mixedNode', mixedNode.name, mixedNode.value, mixedNode.model.brickKey
                    return item;
                }
                if (!item.value && hookname === 'default') {
                    // log 'md.findHookExtDeep.found', item.name, item.value, item.model.brickKey, 'mixedNode', mixedNode.name, mixedNode.value, mixedNode.model.brickKey
                    return item;
                }
            }
        }
    }
    else {
        if (item.name === ('$hook')) {
            if (item.value && item.value.trim() === hookname) {
                return item;
            }
            if (!item.value && hookname === 'default') {
                return item;
            }
        }
    }
    var found,
        i,
        l = item.children.length;
    for (i = 0; i < l; i++) {
        found = md.findHookExtDeep(item.children[i], hookname, searchType, startAppendNode, mixedNode);
        if (found) {
            return found;
        }
    }
    return null;
};
/**
     Start the search of a $hook node command from a $append node command.
     The search start going up to ancestor mixed fragments.
*/
md.findHookExt = function(item, hookname, searchType, startAppendNode) {
    // log 'md.findHookExt.enter:', item.name, item.value, 'id', item.id, 'brickKey', item.model.brickKey
    // the startitem (the $append node command) is saved
    // and will be checked when the search descends, to avoid
    // searching descendants of the $append node command itself.
    if (typeof startAppendNode === 'undefined') {
        startAppendNode = item;
    }
    // var prn = item.parent
    var prn = md.findParentMixinRoot(item);
    if (!prn) {
        return null;
    }
    else {
        // log 'md.findHookExt.parent.mixin', prn.name, prn.value, 'id', prn.id, 'brickKey', prn.model.brickKey, 'mixed by', prn.model.$mixerBrickKey
        var hook = md.findHookExtDeep(prn, hookname, searchType, startAppendNode);
        if (hook) {
            return hook;
        }
        return md.findHookExt(prn, hookname, searchType, startAppendNode);
    }
};
/**
     find a $virtual command
     The search go up to ancestors
*/
md.findVirtual = function(item, virtname) {
    var prn = item.parent;
    if (!prn) {
        return null;
    }
    var virt = md.findIttfCommand(prn, virtname, 'virtual');
    if (virt) {
        return virt;
    }
    return md.findVirtual(prn, virtname);
};
/**
     find the first parent node that is
     the root of a mixin
*/
md.findParentMixinRoot = function(item) {
    var prn = item.parent;
    // log 'util.node.findParentMixinRoot', prn.model.$mixerBrickKey
    while (prn != null && ( typeof(prn.model) === 'undefined' || typeof(prn.model.$mixerBrickKey) === 'undefined' )) {
        prn = prn.parent;
        // log 'util.node.findParentMixinRoot', prn ? prn.model.$mixerBrickKey : prn
    }
    return prn;
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
md.inlinedTextToTextLines = function(text) {
    if (typeof(text) === 'undefined' || text == null) {
        return {
                text: text, 
                lines: null
            };
    }
    var text = verify.replaceAll(text, work.textSep, '\n');
    var ss = text.split('\n');
    if (ss.length == 1) {
        return {
                text: ss[0], 
                lines: null
            };
    }
    else {
        var lines = verify.replaceAll(ss[1], work.lineSep, '\n').split('\n')
        ;
        return {
                text: ss[0], 
                lines: lines
            };
    }
};
md.isParentOfName = function(parsernode, nameOrArray) {
    var test = parsernode.parent;
    while (test) {
        if (verify.isArray(nameOrArray)) {
            var match = false;
            var i, i_items=nameOrArray, i_len=nameOrArray.length, value;
            for (i=0; i<i_len; i++) {
                value = nameOrArray[i];
                match = match || test.name === value;
            }
            if (match) {
                return match;
            }
        }
        else {
            if (test.name === nameOrArray) {
                return true;
            }
        }
        test = test.parent;
    }
    return false;
};
md.jsonifyProperty = function(node) {
    if (verify.isObject(node) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'node', message: 'The node parameter must be an object. Received: ' + node }
        );
    }
    var ret = { name: node.name };
    if (node.children && node.children.length > 0) {
        if (node.name === '[') {
            ret = { name: node.value, value: [] };
            var i, i_items=node.children, i_len=node.children.length, child;
            for (i=0; i<i_len; i++) {
                child = node.children[i];
                var value = md.jsonifyValue(child);
                if (value && value.__is_error) {
                    return value;
                }
                ret.value.push(value);
            }
        }
        else if (node.name === '{') {
            ret = { name: node.value, value: {} };
            var i, i_items=node.children, i_len=node.children.length, child;
            for (i=0; i<i_len; i++) {
                child = node.children[i];
                var prop = md.jsonifyProperty(child);
                if (prop && prop.__is_error) {
                    return prop;
                }
                ret.value[prop.name] = prop.value;
            }
        }
    }
    else {
        var value;
        try {
            value = JSON.parse(node.value);
        } 
        catch (ex) {
            ex.__is_error = true;
            ex.__errItem = node;
            return ex;
        } 
        if (value && value.__is_error) {
            value.__errItem = node;
            return value;
        }
        ret.value = value;
    }
    return ret;
};
md.jsonifyValue = function(node) {
    if (verify.isObject(node) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'node', message: 'The node parameter must be an object. Received: ' + node }
        );
    }
    var ret;
    if (node.name === '[') {
        ret = [];
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            var value = md.jsonifyValue(child);
            if (value && value.__is_error) {
                return value;
            }
            ret.value.push(value);
        }
    }
    else if (node.name === '{') {
        ret = {};
        var i, i_items=node.children, i_len=node.children.length, child;
        for (i=0; i<i_len; i++) {
            child = node.children[i];
            var prop = md.jsonifyProperty(child);
            if (prop && prop.__is_error) {
                return prop;
            }
            ret.value[prop.name] = prop.value;
        }
    }
    else {
        var value;
        try {
            value = JSON.parse(node.name + (node.value && node.value.length > 0 ? ' ' + node.value : ''));
        } 
        catch (ex) {
            ex.__is_error = true;
            ex.__errItem = node;
            return ex;
        } 
        if (value && value.__is_error) {
            value.__errItem = node;
            return value;
        }
        ret = value;
    }
    return ret;
};
function spaces(num) {
    return Array(num + 1).join(" ")
    ;
}
function _dumpNodeDeep(node, indent) {
    console.log(spaces(indent) + node.name + ' ' + (node.value || '') + ' ids: ' + node.parsedId + ' ' + node.id);
    if (node.$args || node.$params) {
        console.log(spaces(indent) + ' $args: ' + node.$args + ' $params: ' + node.$params);
    }
    indent++;
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        _dumpNodeDeep(child, indent);
    }
}
md.dump = function(nodes) {
    var i, i_items=nodes, i_len=nodes.length, node;
    for (i=0; i<i_len; i++) {
        node = nodes[i];
        _dumpNodeDeep(node, 1);
    }
};
var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";
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
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
