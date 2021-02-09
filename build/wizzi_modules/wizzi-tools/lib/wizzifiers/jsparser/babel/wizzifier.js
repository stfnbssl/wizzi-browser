/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\wizzifiers\jsparser\babel\wizzifier.js.ittf
*/
'use strict';
var util = require('util');
var path = require('path');
var async = require('async');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;
var parser = require("@babel/parser");
var ittfwriter = require("../../../util/ittfwriter");
var cleanBabel = require('./cleanBabel');
var codeReplacer = require('../../../util/jsCodeReplacer');
var CommentManager = require('../../../util/commentManager');
var csswizzifier = null;
var htmlwizzifier = null;
var format = function(parent, ast, options) {
    if (!ast) {
        throw new Error('missing ast. parent is: ' + util.inspect(parent, { depth: 2 }));
    }
    if (parent === null) {
        if (options.starter) {
            options.starter = false;
        }
        else if (options.returnText) {
            // ok
        }
        else {
            showstack(options);
            throw new Error('parent is null.' + util.inspect(ast, 4));
        }
    }
    if (options.verbose) {
        // log 'ast.type', ast.type
    }
    var formatter = format[ast.type];
    if (formatter) {
        options.stack.push(ast);
        var result = formatter(parent, ast, options);
        options.stack.pop();
        return result;
    }
    else {
        throw new Error('no formatter for type: ' + ast.type);
    }
};
var formatText = function(parent, ast, options, node) {
    var saveReturnText = options.returnText;
    options.returnText = true;
    if (node) {
        options.formatTextNodes.push(node);
    }
    var value = format(parent, ast, options);
    if (node) {
        options.formatTextNodes.pop();
    }
    options.returnText = saveReturnText;
    return value;
};
// process AST node File
format.File = function(parent, node, options) {
    var __isText = false;
    // log 'node : File ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property program and append ittfNode to `ret`
    if (node.program) {
        if (!node.program.type) {
            throw 'Node program has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.program, options);
    }
    else {
        throw new Error('AST-node-property program undefined: ' + JSON.stringify(node, null, 2));
    }
    // TODO VIA f_a( comments
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node Program
format.Program = function(parent, node, options) {
    var __isText = false;
    // log 'node : Program ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // s( sourceType, "script" | "module"
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
    if (node.directives) {
        if (typeof node.directives.length === 'undefined') {
            throw new Error('Property node.directives must be an array');
        }
        var i, i_items=node.directives, i_len=node.directives.length, item;
        for (i=0; i<i_len; i++) {
            item = node.directives[i];
            item.__parent = {
                name: 'directives', 
                len: node.directives.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection directives undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node Identifier
format.Identifier = function(parent, node, options) {
    var __isText = true;
    // log 'node : Identifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@id', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'Identifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 't/name.node.name, value: ', node.name, '
    if (typeof node.name !== 'undefined') {
        ret.name = node.name.toString();
    }
    // log 't/name ittf.ret', ret
    // An identifier. Note that an identifier may be an expression or a destructuring pattern.
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    if (node.optional) {
        ret.children.push({
            tag: ':optional', 
            name: '', 
            children: [
                
            ]
        });
    }
    if (ret.children.length > 0) {
        __isText = false;
        ret.isText = false;
        ret.textified = null;
        ret.CICCIO = "MAGIC";
    }
    // log 'Identifier', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node PrivateName
format.PrivateName = function(parent, node, options) {
    var __isText = false;
    // log 'node : PrivateName ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'PrivateName', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property Identifier and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.Identifier) {
        if (!node.Identifier.type) {
            throw 'Node Identifier has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempIdentifier = {
            children: [
                
            ]
        };
        format(tempIdentifier, node.Identifier, options);
        /**
            if (tempIdentifier .children.length > 0) {
                throw 'node.Identifier must result zero node, returned: ' + tempIdentifier.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempIdentifier.children.length > 0) {
            appto.name = tempIdentifier.children[0].name;
        }
        else {
            appto.name = tempIdentifier.name;
        }
    }
    // A Private Name Identifier.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node RegExpLiteral
format.RegExpLiteral = function(parent, node, options) {
    var __isText = true;
    // log 'node : RegExpLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'RegExpLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    ret.name = '/' + node.pattern + '/';
    if (node.flags && node.flags.length > 0) {
        ret.name += node.flags;
        // log '*************** RegExpLiteral.ret.name', ret.name
    }
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node NullLiteral
format.NullLiteral = function(parent, node, options) {
    var __isText = true;
    // log 'node : NullLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'NullLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    ret.name = 'null';
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node StringLiteral
format.StringLiteral = function(parent, node, options) {
    var __isText = true;
    // log 'node : StringLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'StringLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    ret.name = node.extra.raw;
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node BooleanLiteral
format.BooleanLiteral = function(parent, node, options) {
    var __isText = true;
    // log 'node : BooleanLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'BooleanLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 't/name.node.value, value: ', node.value, '
    if (typeof node.value !== 'undefined') {
        ret.name = node.value.toString();
    }
    // log 't/name ittf.ret', ret
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node NumericLiteral
format.NumericLiteral = function(parent, node, options) {
    var __isText = true;
    // log 'node : NumericLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'literal', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'NumericLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 't/name.node.value, value: ', node.value, '
    if (typeof node.value !== 'undefined') {
        ret.name = node.value.toString();
    }
    // log 't/name ittf.ret', ret
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Function
format.Function = function(parent, node, options) {
    var __isText = false;
    // log 'node : Function ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'function', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Function', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A function [declaration](#functiondeclaration) or [expression](#functionexpression).
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // [ Pattern ]
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    // b( generator
    // b( async
    /**
        VIA
        replaceChildrenOfChildWhenText(ret, getChildPosByTag(ret, 'params'), 'param')*/
    if (node.generator) {
        ret.tag = 'function*';
    }
    if (node.async) {
        ret.tag = 'async-function';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExpressionStatement
format.ExpressionStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExpressionStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'stm', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExpressionStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // An expression statement, i.e., a statement consisting of a single expression.
    // process AST-node-property expression and append ittfNode to `ret`
    if (node.expression) {
        if (!node.expression.type) {
            throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.expression, options);
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    if (replaceWithSingleChild(ret, 'set')) {
    }
    else {
        replaceWithSingleChild(ret, '_');
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node BlockStatement
format.BlockStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : BlockStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection directives and append ittfNode(s) to `ret`
    if (node.directives) {
        if (typeof node.directives.length === 'undefined') {
            throw new Error('Property node.directives must be an array');
        }
        var i, i_items=node.directives, i_len=node.directives.length, item;
        for (i=0; i<i_len; i++) {
            item = node.directives[i];
            item.__parent = {
                name: 'directives', 
                len: node.directives.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection directives undefined: ' + JSON.stringify(node, null, 2));
    }
    // A block statement, i.e., a sequence of statements surrounded by braces.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node EmptyStatement
format.EmptyStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : EmptyStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'EmptyStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // An empty statement, i.e., a solitary semicolon.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node DebuggerStatement
format.DebuggerStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : DebuggerStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'debugger', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DebuggerStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A `debugger` statement.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node WithStatement
format.WithStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : WithStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'with', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'WithStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property object and append ittfNode to `ret`
    if (node.object) {
        if (!node.object.type) {
            throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.object, options);
    }
    else {
        throw new Error('AST-node-property object undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    // A `with` statement.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ReturnStatement
format.ReturnStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : ReturnStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'return', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ReturnStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property argument and append ittfNode to `ret`
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options);
    }
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // log 'ReturnStatement', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node LabeledStatement
format.LabeledStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : LabeledStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'label', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'LabeledStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property label and set it in a var
    var p_label = null;
    if (typeof(node.label) !== 'undefined') {
        p_label = {
            textified: null, 
            isText: false, 
            ASTProp: 'label', 
            children: [
                
            ]
        };
        if (node.label == null) {
            p_label.text = "null";
        }
        else {
            if (!node.label.type) {
                throw 'Node label has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp label before format'
            format(p_label, node.label, options);
            // log 'f_p_temp label after format', p_label
            if (p_label.children.length == 1) {
                p_label.tag = p_label.children[0].tag;
                if (!(p_label.children[0].isText || p_label.children[0].textified)) {
                    p_label.name = p_label.children[0].name;
                    p_label.source = p_label.children[0].source;
                    p_label.children = p_label.children[0].children;
                }
                else {
                    if (p_label.children[0].textified) {
                        p_label.textified = p_label.children[0].textified;
                        p_label.name = p_label.children[0].name;
                        p_label.source = p_label.children[0].source;
                    }
                    if (p_label.children[0].isText) {
                        p_label.isText = true;
                        p_label.name = p_label.children[0].name;
                        p_label.source = p_label.children[0].source;
                    }
                    p_label.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property label undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = getNodeText(p_label);
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node BreakStatement
format.BreakStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : BreakStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'break', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BreakStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property label and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.label) {
        if (!node.label.type) {
            throw 'Node label has no type: ' + JSON.stringify(node, null, 2);
        }
        var templabel = {
            children: [
                
            ]
        };
        format(templabel, node.label, options);
        /**
            if (templabel .children.length > 0) {
                throw 'node.label must result zero node, returned: ' + templabel.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (templabel.children.length > 0) {
            appto.name = templabel.children[0].name;
        }
        else {
            appto.name = templabel.name;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ContinueStatement
format.ContinueStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : ContinueStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'continue', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ContinueStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property label and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.label) {
        if (!node.label.type) {
            throw 'Node label has no type: ' + JSON.stringify(node, null, 2);
        }
        var templabel = {
            children: [
                
            ]
        };
        format(templabel, node.label, options);
        /**
            if (templabel .children.length > 0) {
                throw 'node.label must result zero node, returned: ' + templabel.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (templabel.children.length > 0) {
            appto.name = templabel.children[0].name;
        }
        else {
            appto.name = templabel.name;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node IfStatement
format.IfStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : IfStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'if', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'IfStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
    };
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options);
        p_test.tag = 'test';
        ret.children.push(p_test);
        if (p_test.children.length == 1) {
            // log '*** f_p_tag test children[0].textified', p_test.children[0].textified
            // log '*** f_p_tag test children[0].isText', p_test.children[0].isText
            // log '*** f_p_tag test children[0].name', p_test.children[0].name
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property test/test not managed by f_p_tag');
            }
        */
    }
    setNameFromChildByTag(ret, 'test', true);
    if (node.consequent) {
        // process AST-node-property consequent and set it in a var
        var p_consequent = null;
        if (typeof(node.consequent) !== 'undefined') {
            p_consequent = {
                textified: null, 
                isText: false, 
                ASTProp: 'consequent', 
                children: [
                    
                ]
            };
            if (node.consequent == null) {
                p_consequent.text = "null";
            }
            else {
                if (!node.consequent.type) {
                    throw 'Node consequent has no type: ' + JSON.stringify(node, null, 2);
                }
                // log 'f_p_temp consequent before format'
                format(p_consequent, node.consequent, options);
                // log 'f_p_temp consequent after format', p_consequent
                if (p_consequent.children.length == 1) {
                    p_consequent.tag = p_consequent.children[0].tag;
                    if (!(p_consequent.children[0].isText || p_consequent.children[0].textified)) {
                        p_consequent.name = p_consequent.children[0].name;
                        p_consequent.source = p_consequent.children[0].source;
                        p_consequent.children = p_consequent.children[0].children;
                    }
                    else {
                        if (p_consequent.children[0].textified) {
                            p_consequent.textified = p_consequent.children[0].textified;
                            p_consequent.name = p_consequent.children[0].name;
                            p_consequent.source = p_consequent.children[0].source;
                        }
                        if (p_consequent.children[0].isText) {
                            p_consequent.isText = true;
                            p_consequent.name = p_consequent.children[0].name;
                            p_consequent.source = p_consequent.children[0].source;
                        }
                        p_consequent.children = [];
                    }
                }
            }
        }
        else {
            throw new Error('AST-node-property consequent undefined: ' + JSON.stringify(node, null, 2));
        }
        // log 'IfStatement', p_consequent
        if (p_consequent.tag && p_consequent.tag.length > 0) {
            ret.children.push(p_consequent);
        }
        else {
            var i, i_items=p_consequent.children, i_len=p_consequent.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_consequent.children[i];
                ret.children.push(item);
            }
        }
    }
    if (node.alternate) {
        // process AST-node-property alternate and set it in a var
        var p_alternate = null;
        if (typeof(node.alternate) !== 'undefined') {
            p_alternate = {
                textified: null, 
                isText: false, 
                ASTProp: 'alternate', 
                children: [
                    
                ]
            };
            if (node.alternate == null) {
                p_alternate.text = "null";
            }
            else {
                if (!node.alternate.type) {
                    throw 'Node alternate has no type: ' + JSON.stringify(node, null, 2);
                }
                // log 'f_p_temp alternate before format'
                format(p_alternate, node.alternate, options);
                // log 'f_p_temp alternate after format', p_alternate
                if (p_alternate.children.length == 1) {
                    p_alternate.tag = p_alternate.children[0].tag;
                    if (!(p_alternate.children[0].isText || p_alternate.children[0].textified)) {
                        p_alternate.name = p_alternate.children[0].name;
                        p_alternate.source = p_alternate.children[0].source;
                        p_alternate.children = p_alternate.children[0].children;
                    }
                    else {
                        if (p_alternate.children[0].textified) {
                            p_alternate.textified = p_alternate.children[0].textified;
                            p_alternate.name = p_alternate.children[0].name;
                            p_alternate.source = p_alternate.children[0].source;
                        }
                        if (p_alternate.children[0].isText) {
                            p_alternate.isText = true;
                            p_alternate.name = p_alternate.children[0].name;
                            p_alternate.source = p_alternate.children[0].source;
                        }
                        p_alternate.children = [];
                    }
                }
            }
        }
        else {
            throw new Error('AST-node-property alternate undefined: ' + JSON.stringify(node, null, 2));
        }
        var p_else = {
            tag: 'else', 
            children: [
                
            ]
        };
        // log 'IfStatement', p_consequent
        if (p_alternate.tag && p_alternate.tag.length > 0) {
            p_else.children.push(p_alternate);
        }
        else {
            var i, i_items=p_alternate.children, i_len=p_alternate.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_alternate.children[i];
                p_else.children.push(item);
            }
        }
        ret = [ret, p_else];
    }
    else {
        ret = [ret];
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            var i, i_items=ret, i_len=ret.length, item;
            for (i=0; i<i_len; i++) {
                item = ret[i];
                parent.children.push(item);
            }
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node SwitchStatement
format.SwitchStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : SwitchStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'switch', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SwitchStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A `switch` statement.
    // process AST-node-property discriminant and set it in a var
    var p_discriminant = null;
    if (typeof(node.discriminant) !== 'undefined') {
        p_discriminant = {
            textified: null, 
            isText: false, 
            ASTProp: 'discriminant', 
            children: [
                
            ]
        };
        if (node.discriminant == null) {
            p_discriminant.text = "null";
        }
        else {
            if (!node.discriminant.type) {
                throw 'Node discriminant has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp discriminant before format'
            format(p_discriminant, node.discriminant, options);
            // log 'f_p_temp discriminant after format', p_discriminant
            if (p_discriminant.children.length == 1) {
                p_discriminant.tag = p_discriminant.children[0].tag;
                if (!(p_discriminant.children[0].isText || p_discriminant.children[0].textified)) {
                    p_discriminant.name = p_discriminant.children[0].name;
                    p_discriminant.source = p_discriminant.children[0].source;
                    p_discriminant.children = p_discriminant.children[0].children;
                }
                else {
                    if (p_discriminant.children[0].textified) {
                        p_discriminant.textified = p_discriminant.children[0].textified;
                        p_discriminant.name = p_discriminant.children[0].name;
                        p_discriminant.source = p_discriminant.children[0].source;
                    }
                    if (p_discriminant.children[0].isText) {
                        p_discriminant.isText = true;
                        p_discriminant.name = p_discriminant.children[0].name;
                        p_discriminant.source = p_discriminant.children[0].source;
                    }
                    p_discriminant.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property discriminant undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_discriminant)) {
        ret.name = p_discriminant.textified || p_discriminant.name;
        ret.textified = ret.name;
    }
    else {
        ret.children.push(p_discriminant);
    }
    // process AST-node-property-collection cases and append ittfNode(s) to `ret`
    if (node.cases) {
        if (typeof node.cases.length === 'undefined') {
            throw new Error('Property node.cases must be an array');
        }
        var i, i_items=node.cases, i_len=node.cases.length, item;
        for (i=0; i<i_len; i++) {
            item = node.cases[i];
            item.__parent = {
                name: 'cases', 
                len: node.cases.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection cases undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node SwitchCase
format.SwitchCase = function(parent, node, options) {
    var __isText = false;
    // log 'node : SwitchCase ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'case', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SwitchCase', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property test and set it in a var
    var p_test = null;
    if (typeof(node.test) !== 'undefined') {
        p_test = {
            textified: null, 
            isText: false, 
            ASTProp: 'test', 
            children: [
                
            ]
        };
        if (node.test == null) {
            p_test.text = "null";
        }
        else {
            if (!node.test.type) {
                throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp test before format'
            format(p_test, node.test, options);
            // log 'f_p_temp test after format', p_test
            if (p_test.children.length == 1) {
                p_test.tag = p_test.children[0].tag;
                if (!(p_test.children[0].isText || p_test.children[0].textified)) {
                    p_test.name = p_test.children[0].name;
                    p_test.source = p_test.children[0].source;
                    p_test.children = p_test.children[0].children;
                }
                else {
                    if (p_test.children[0].textified) {
                        p_test.textified = p_test.children[0].textified;
                        p_test.name = p_test.children[0].name;
                        p_test.source = p_test.children[0].source;
                    }
                    if (p_test.children[0].isText) {
                        p_test.isText = true;
                        p_test.name = p_test.children[0].name;
                        p_test.source = p_test.children[0].source;
                    }
                    p_test.children = [];
                }
            }
        }
    }
    // process AST-node-property-collection consequent and append ittfNode(s) to `ret`
    if (node.consequent) {
        if (typeof node.consequent.length === 'undefined') {
            throw new Error('Property node.consequent must be an array');
        }
        var i, i_items=node.consequent, i_len=node.consequent.length, item;
        for (i=0; i<i_len; i++) {
            item = node.consequent[i];
            item.__parent = {
                name: 'consequent', 
                len: node.consequent.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection consequent undefined: ' + JSON.stringify(node, null, 2));
    }
    // A `case` (if `test` is an `Expression`) or `default` (if `test === null`) clause in the body of a `switch` statement.
    //
    if (node.test == null) {
        ret.tag = 'default';
    }
    else {
        if (p_test.textified || p_test.isText) {
            ret.name = p_test.textified || p_test.name;
            ret.textified = ret.name;
        }
        else {
            throw new Error('SwitchCase.test must be textual:' + JSON.stringify(node, null, 2));
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ThrowStatement
format.ThrowStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : ThrowStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'throw', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ThrowStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property argument and set it in a var
    var p_argument = null;
    if (typeof(node.argument) !== 'undefined') {
        p_argument = {
            textified: null, 
            isText: false, 
            ASTProp: 'argument', 
            children: [
                
            ]
        };
        if (node.argument == null) {
            p_argument.text = "null";
        }
        else {
            if (!node.argument.type) {
                throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp argument before format'
            format(p_argument, node.argument, options);
            // log 'f_p_temp argument after format', p_argument
            if (p_argument.children.length == 1) {
                p_argument.tag = p_argument.children[0].tag;
                if (!(p_argument.children[0].isText || p_argument.children[0].textified)) {
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = p_argument.children[0].children;
                }
                else {
                    if (p_argument.children[0].textified) {
                        p_argument.textified = p_argument.children[0].textified;
                        p_argument.name = p_argument.children[0].name;
                        p_argument.source = p_argument.children[0].source;
                    }
                    if (p_argument.children[0].isText) {
                        p_argument.isText = true;
                        p_argument.name = p_argument.children[0].name;
                        p_argument.source = p_argument.children[0].source;
                    }
                    p_argument.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // A `throw` statement.
    if (isTextualNode(p_argument)) {
        ret.name = getNodeText(p_argument);
    }
    else {
        ret.children.push(p_argument);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TryStatement
format.TryStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : TryStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'try', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TryStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 'wizzifiers.js.TryStatement', JSON.stringify(node, null, 2)
    // process AST-node-property block and append ittfNode to `ret`
    if (node.block) {
        if (!node.block.type) {
            throw 'Node block has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.block, options);
    }
    else {
        throw new Error('AST-node-property block undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property handler and set it in a var
    var p_handler = null;
    if (typeof(node.handler) !== 'undefined') {
        p_handler = {
            textified: null, 
            isText: false, 
            ASTProp: 'handler', 
            children: [
                
            ]
        };
        if (node.handler == null) {
            p_handler.text = "null";
        }
        else {
            if (!node.handler.type) {
                throw 'Node handler has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp handler before format'
            format(p_handler, node.handler, options);
            // log 'f_p_temp handler after format', p_handler
            if (p_handler.children.length == 1) {
                p_handler.tag = p_handler.children[0].tag;
                if (!(p_handler.children[0].isText || p_handler.children[0].textified)) {
                    p_handler.name = p_handler.children[0].name;
                    p_handler.source = p_handler.children[0].source;
                    p_handler.children = p_handler.children[0].children;
                }
                else {
                    if (p_handler.children[0].textified) {
                        p_handler.textified = p_handler.children[0].textified;
                        p_handler.name = p_handler.children[0].name;
                        p_handler.source = p_handler.children[0].source;
                    }
                    if (p_handler.children[0].isText) {
                        p_handler.isText = true;
                        p_handler.name = p_handler.children[0].name;
                        p_handler.source = p_handler.children[0].source;
                    }
                    p_handler.children = [];
                }
            }
        }
    }
    // process AST-node-property finalizer and set it in a var
    var p_finalizer = null;
    if (typeof(node.finalizer) !== 'undefined') {
        p_finalizer = {
            textified: null, 
            isText: false, 
            ASTProp: 'finalizer', 
            children: [
                
            ]
        };
        if (node.finalizer == null) {
            p_finalizer.text = "null";
        }
        else {
            if (!node.finalizer.type) {
                throw 'Node finalizer has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp finalizer before format'
            format(p_finalizer, node.finalizer, options);
            // log 'f_p_temp finalizer after format', p_finalizer
            if (p_finalizer.children.length == 1) {
                p_finalizer.tag = p_finalizer.children[0].tag;
                if (!(p_finalizer.children[0].isText || p_finalizer.children[0].textified)) {
                    p_finalizer.name = p_finalizer.children[0].name;
                    p_finalizer.source = p_finalizer.children[0].source;
                    p_finalizer.children = p_finalizer.children[0].children;
                }
                else {
                    if (p_finalizer.children[0].textified) {
                        p_finalizer.textified = p_finalizer.children[0].textified;
                        p_finalizer.name = p_finalizer.children[0].name;
                        p_finalizer.source = p_finalizer.children[0].source;
                    }
                    if (p_finalizer.children[0].isText) {
                        p_finalizer.isText = true;
                        p_finalizer.name = p_finalizer.children[0].name;
                        p_finalizer.source = p_finalizer.children[0].source;
                    }
                    p_finalizer.children = [];
                }
            }
        }
    }
    var tempRet = [ ret ];
    // log 'TryStatement.p_handler', p_handler
    // log 'TryStatement.p_finalizer', p_finalizer
    if (p_handler) {
        tempRet.push(p_handler);
    }
    if (p_finalizer) {
        if (p_finalizer.children.length > 0) {
            p_finalizer.tag = 'finally';
            tempRet.push(p_finalizer);
        }
        else {
            if (p_finalizer.tag) {
                tempRet.push({
                    tag: 'finally', 
                    name: '', 
                    children: [
                        p_finalizer
                    ]
                });
            }
        }
    }
    ret = tempRet;
    // A `try` statement. If `handler` is `null` then `finalizer` must be a `BlockStatement`.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            var i, i_items=ret, i_len=ret.length, item;
            for (i=0; i<i_len; i++) {
                item = ret[i];
                parent.children.push(item);
            }
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node CatchClause
format.CatchClause = function(parent, node, options) {
    var __isText = false;
    // log 'node : CatchClause ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'catch', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CatchClause', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A `catch` clause following a `try` block.
    // Process AST-node-property param and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.param) {
        if (!node.param.type) {
            throw 'Node param has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempparam = {
            children: [
                
            ]
        };
        format(tempparam, node.param, options);
        /**
            if (tempparam .children.length > 0) {
                throw 'node.param must result zero node, returned: ' + tempparam.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempparam.children.length > 0) {
            appto.name = tempparam.children[0].name;
        }
        else {
            appto.name = tempparam.name;
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'CatchClause.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node WhileStatement
format.WhileStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : WhileStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'while', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'WhileStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
    };
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options);
        p_test.tag = 'test';
        ret.children.push(p_test);
        if (p_test.children.length == 1) {
            // log '*** f_p_tag test children[0].textified', p_test.children[0].textified
            // log '*** f_p_tag test children[0].isText', p_test.children[0].isText
            // log '*** f_p_tag test children[0].name', p_test.children[0].name
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property test/test not managed by f_p_tag');
            }
        */
    }
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node DoWhileStatement
format.DoWhileStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : DoWhileStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'do', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DoWhileStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
    };
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options);
        p_test.tag = 'test';
        ret.children.push(p_test);
        if (p_test.children.length == 1) {
            // log '*** f_p_tag test children[0].textified', p_test.children[0].textified
            // log '*** f_p_tag test children[0].isText', p_test.children[0].isText
            // log '*** f_p_tag test children[0].name', p_test.children[0].name
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property test/test not managed by f_p_tag');
            }
        */
    }
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ForStatement
format.ForStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : ForStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'for', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ForStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    var p_init = {
        textified: null, 
        isText: false, 
        ASTProp: 'init', 
        children: [
            
        ]
    };
    if (node.init) {
        if (!node.init.type) {
            throw 'Node init has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_init, node.init, options);
        p_init.tag = 'init';
        ret.children.push(p_init);
        if (p_init.children.length == 1) {
            // log '*** f_p_tag init children[0].textified', p_init.children[0].textified
            // log '*** f_p_tag init children[0].isText', p_init.children[0].isText
            // log '*** f_p_tag init children[0].name', p_init.children[0].name
            if (p_init.children[0].textified) {
                p_init.textified = p_init.children[0].textified;
            }
            if (p_init.children[0].isText) {
                p_init.isText = true;
                p_init.name = p_init.children[0].name;
                p_init.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property init/init not managed by f_p_tag');
            }
        */
    }
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
    };
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options);
        p_test.tag = 'test';
        ret.children.push(p_test);
        if (p_test.children.length == 1) {
            // log '*** f_p_tag test children[0].textified', p_test.children[0].textified
            // log '*** f_p_tag test children[0].isText', p_test.children[0].isText
            // log '*** f_p_tag test children[0].name', p_test.children[0].name
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property test/test not managed by f_p_tag');
            }
        */
    }
    var p_update = {
        textified: null, 
        isText: false, 
        ASTProp: 'update', 
        children: [
            
        ]
    };
    if (node.update) {
        if (!node.update.type) {
            throw 'Node update has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_update, node.update, options);
        p_update.tag = 'update';
        ret.children.push(p_update);
        if (p_update.children.length == 1) {
            // log '*** f_p_tag update children[0].textified', p_update.children[0].textified
            // log '*** f_p_tag update children[0].isText', p_update.children[0].isText
            // log '*** f_p_tag update children[0].name', p_update.children[0].name
            if (p_update.children[0].textified) {
                p_update.textified = p_update.children[0].textified;
            }
            if (p_update.children[0].isText) {
                p_update.isText = true;
                p_update.name = p_update.children[0].name;
                p_update.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property update/update not managed by f_p_tag');
            }
        */
    }
    // log 'p_init.textified', p_init.textified
    var c1 = p_init.isText ? p_init.name : (p_init.textified ? p_init.textified : '');
    var c2 = p_test.isText ? p_test.name : (p_test.textified ? p_test.textified : '');
    var c3 = p_update.isText ? p_update.name : (p_update.textified ? p_update.textified : '');
    ret.name = c1 + '; ' + c2 + '; ' + c3;
    removeChildByTag(ret, 'init');
    removeChildByTag(ret, 'test');
    removeChildByTag(ret, 'update');
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ForInStatement
format.ForInStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : ForInStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'for', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ForInStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined') {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
        };
        if (node.left == null) {
            p_left.text = "null";
        }
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp left before format'
            format(p_left, node.left, options);
            // log 'f_p_temp left after format', p_left
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    p_left.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined') {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
        };
        if (node.right == null) {
            p_right.text = "null";
        }
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp right before format'
            format(p_right, node.right, options);
            // log 'f_p_temp right after format', p_right
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    p_right.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left);
    }
    if (isTextualNode(p_right)) {
        ret.name += ' in ' + getNodeText(p_right);
    }
    else {
        ret.children.push({
            tag: 'in', 
            children: [
                p_right
            ]
        });
    }
    // log 'node.await', node.await
    if (!!node.await == true) {
        ret.children.push({
            tag: 'await', 
            children: [
                
            ]
        });
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ForOfStatement
format.ForOfStatement = function(parent, node, options) {
    var __isText = false;
    // log 'node : ForOfStatement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'for', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ForOfStatement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined') {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
        };
        if (node.left == null) {
            p_left.text = "null";
        }
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp left before format'
            format(p_left, node.left, options);
            // log 'f_p_temp left after format', p_left
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    p_left.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined') {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
        };
        if (node.right == null) {
            p_right.text = "null";
        }
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp right before format'
            format(p_right, node.right, options);
            // log 'f_p_temp right after format', p_right
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    p_right.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left);
    }
    if (isTextualNode(p_right)) {
        ret.name += ' of ' + getNodeText(p_right);
    }
    else {
        ret.children.push({
            tag: 'of', 
            children: [
                p_right
            ]
        });
    }
    // log 'node.await', node.await
    if (!!node.await == true) {
        ret.children.push({
            tag: 'await', 
            children: [
                
            ]
        });
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node FunctionDeclaration
format.FunctionDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : FunctionDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'function', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'FunctionDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A function [declaration](#functiondeclaration) or [expression](#functionexpression).
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        // log 'p_returnType', JSON.stringify(p_returnType)
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    // process AST-node-property predicate and append ittfNode to `ret`
    if (node.predicate) {
        if (!node.predicate.type) {
            throw 'Node predicate has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.predicate, options);
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.generator) {
        ret.tag = 'function*';
    }
    if (node.async) {
        ret.tag = 'async-function';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node VariableDeclaration
format.VariableDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : VariableDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'VariableDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // enum "var" | "let" | "const"
    // process AST-node-property-collection declarations and append ittfNode(s) to `ret`
    if (node.declarations) {
        if (typeof node.declarations.length === 'undefined') {
            throw new Error('Property node.declarations must be an array');
        }
        var i, i_items=node.declarations, i_len=node.declarations.length, item;
        for (i=0; i<i_len; i++) {
            item = node.declarations[i];
            item.__parent = {
                name: 'declarations', 
                len: node.declarations.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection declarations undefined: ' + JSON.stringify(node, null, 2));
    }
    // log '=== VariableDeclaration ittf result 1', JSON.stringify(ret, null, 2)
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // log '=== VariableDeclaration ittf result 2', ret, 'got_text_1', got_text_1
    if (got_text_1) {
        ret.textified = node.kind + ' ' + ret.textified;
    }
    else if (ret.children.length == 1) {
        // log 'VariableDeclaration.ret.children[0].children.length', ret.children[0].children.length
        if (ret.children[0].children.length == 0) {
            ret.name = ret.children[0].name;
            ret.children = [];
            // no init value
        }
        else if (ret.children[0].children.length == 1) {
            ret.name = ret.children[0].name;
            ret.children[0] = ret.children[0].children[0];
            // set ret.textified = node.kind + ' ' + ret.name
        }
        else if (ret.children[0].children.length == 2) {
            var child1 = ret.children[0].children[0];
            var child2 = ret.children[0].children[1];
            // log 'ret.name', ret.name
            // log 'ret.children[0].name', ret.children[0].name
            // log 'child1.tag.name', child1.tag, child1.name
            // log 'child2.tag.name', child2.tag, child2.name
            if (child2.tag === '=' || isTypeReference(child1.tag)) {
                ret.name = ret.children[0].name;
                ret.children = [];
                ret.children.push(child1);
                ret.children.push(child2);
            }
            else {
                if (child1.name && child1.name.length > 0 && child1.children.length > 0) {
                    ret.name = child1.name;
                    ret.children = [];
                    var i, i_items=child1.children, i_len=child1.children.length, item;
                    for (i=0; i<i_len; i++) {
                        item = child1.children[i];
                        ret.children.push(item);
                    }
                    ret.children.push(child2);
                }
                else {
                    ret.name = ret.children[0].name;
                    ret.children = [];
                    ret.children.push(child1);
                    ret.children.push(child2);
                }
            }
        }
        else {
            console.log('Error VariableDeclaration. Case not managed.',);
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                console.log('VariableDeclaration.child', item);
            }
            throw new Error("VariableDeclaration. Case not managed.");
        }
    }
    else if (ret.children.length > 1) {
        var sb = [];
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            if (item.textified) {
                sb.push(item.textified);
            }
            else {
                sb = null;
                break;
            }
        }
        if (sb) {
            ret.textified = node.kind + ' ' + sb.join(', ');
        }
    }
    if (node.declare) {
        ret = {
            tag: ':declare', 
            name: '', 
            children: [
                ret
            ]
        };
    }
    // log 'VariableDeclaration.exit.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node VariableDeclarator
format.VariableDeclarator = function(parent, node, options) {
    var __isText = false;
    // log 'node : VariableDeclarator ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'decl', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'VariableDeclarator', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property id and set it in a var
    var p_id = null;
    if (typeof(node.id) !== 'undefined') {
        p_id = {
            textified: null, 
            isText: false, 
            ASTProp: 'id', 
            children: [
                
            ]
        };
        if (node.id == null) {
            p_id.text = "null";
        }
        else {
            if (!node.id.type) {
                throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp id before format'
            format(p_id, node.id, options);
            // log 'f_p_temp id after format', p_id
            if (p_id.children.length == 1) {
                p_id.tag = p_id.children[0].tag;
                if (!(p_id.children[0].isText || p_id.children[0].textified)) {
                    p_id.name = p_id.children[0].name;
                    p_id.source = p_id.children[0].source;
                    p_id.children = p_id.children[0].children;
                }
                else {
                    if (p_id.children[0].textified) {
                        p_id.textified = p_id.children[0].textified;
                        p_id.name = p_id.children[0].name;
                        p_id.source = p_id.children[0].source;
                    }
                    if (p_id.children[0].isText) {
                        p_id.isText = true;
                        p_id.name = p_id.children[0].name;
                        p_id.source = p_id.children[0].source;
                    }
                    p_id.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property id undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'VariableDeclarator', p_id
    if (isTextualNode(p_id)) {
        ret.name = getNodeText(p_id);
    }
    else {
        if (p_id.tag === '@id') {
            ret.name = p_id.name;
            ret.children = p_id.children;
        }
        else {
            ret.children.push(p_id);
        }
    }
    // log 'VariableDeclarator 1', ret
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    // process AST-node-property init and set it in a var
    var p_init = null;
    if (typeof(node.init) !== 'undefined') {
        p_init = {
            textified: null, 
            isText: false, 
            ASTProp: 'init', 
            children: [
                
            ]
        };
        if (node.init == null) {
            p_init.text = "null";
        }
        else {
            if (!node.init.type) {
                throw 'Node init has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp init before format'
            format(p_init, node.init, options);
            // log 'f_p_temp init after format', p_init
            if (p_init.children.length == 1) {
                p_init.tag = p_init.children[0].tag;
                if (!(p_init.children[0].isText || p_init.children[0].textified)) {
                    p_init.name = p_init.children[0].name;
                    p_init.source = p_init.children[0].source;
                    p_init.children = p_init.children[0].children;
                }
                else {
                    if (p_init.children[0].textified) {
                        p_init.textified = p_init.children[0].textified;
                        p_init.name = p_init.children[0].name;
                        p_init.source = p_init.children[0].source;
                    }
                    if (p_init.children[0].isText) {
                        p_init.isText = true;
                        p_init.name = p_init.children[0].name;
                        p_init.source = p_init.children[0].source;
                    }
                    p_init.children = [];
                }
            }
        }
    }
    // log 'VariableDeclarator.p_init', p_init
    if (p_init) {
        // log 'VariableDeclarator.p_init', isTextualNode(p_id), isTextualNode(p_id), 'p_id', p_id, 'p_init', p_init
        if (isTextualNode(p_id)) {
            if (isTextualNode(p_init)) {
                ret.name += ' = ' + getNodeText(p_init);
                ret.textified = ret.name;
            }
            else {
                ret.children.push(p_init);
            }
        }
        else {
            if (p_id.tag === '@id') {
                ret.children.push(p_init);
            }
            else {
                if (isTextualNode(p_init)) {
                    ret.children.push({
                        tag: '=', 
                        name: getNodeText(p_init), 
                        children: [
                            
                        ]
                    });
                }
                else {
                    ret.children.push({
                        tag: '=', 
                        children: [
                            p_init
                        ]
                    });
                }
            }
        }
    }
    else {
        ret.textified = ret.name;
    }
    // log 'VariableDeclarator 2 ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Decorator
format.Decorator = function(parent, node, options) {
    var __isText = false;
    // log 'node : Decorator ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@decorator', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Decorator', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_expression)) {
        ret.name = getNodeText(p_expression);
    }
    else {
        ret.children.push(p_expression);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Directive
format.Directive = function(parent, node, options) {
    var __isText = false;
    // log 'node : Directive ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'directive', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Directive', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (node.value && node.value.value === 'use strict') {
        ret = null;
    }
    else {
        // process AST-node-property value and set it in a var
        var p_value = null;
        if (typeof(node.value) !== 'undefined') {
            p_value = {
                textified: null, 
                isText: false, 
                ASTProp: 'value', 
                children: [
                    
                ]
            };
            if (node.value == null) {
                p_value.text = "null";
            }
            else {
                if (!node.value.type) {
                    throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
                }
                // log 'f_p_temp value before format'
                format(p_value, node.value, options);
                // log 'f_p_temp value after format', p_value
                if (p_value.children.length == 1) {
                    p_value.tag = p_value.children[0].tag;
                    if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                        p_value.children = p_value.children[0].children;
                    }
                    else {
                        if (p_value.children[0].textified) {
                            p_value.textified = p_value.children[0].textified;
                            p_value.name = p_value.children[0].name;
                            p_value.source = p_value.children[0].source;
                        }
                        if (p_value.children[0].isText) {
                            p_value.isText = true;
                            p_value.name = p_value.children[0].name;
                            p_value.source = p_value.children[0].source;
                        }
                        p_value.children = [];
                    }
                }
            }
        }
        else {
            throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
        }
        if (isTextualNode(p_value)) {
            ret.name = getNodeText(p_value);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node DirectiveLiteral
format.DirectiveLiteral = function(parent, node, options) {
    var __isText = false;
    // log 'node : DirectiveLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DirectiveLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Expression
format.Expression = function(parent, node, options) {
    var __isText = false;
    // log 'node : Expression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'expr', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Expression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Any expression node. Since the left-hand side of an assignment may be any expression in general, an expression can also be a pattern.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Super
format.Super = function(parent, node, options) {
    var __isText = true;
    // log 'node : Super ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'super', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'Super', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A `super` pseudo-expression.
    ret.name = 'super';
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Import
format.Import = function(parent, node, options) {
    var __isText = false;
    // log 'node : Import ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'import', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Import', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A `import` pseudo-expression.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ThisExpression
format.ThisExpression = function(parent, node, options) {
    var __isText = true;
    // log 'node : ThisExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'this', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'ThisExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A `this` expression.
    ret.name = 'this';
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ArrowFunctionExpression
format.ArrowFunctionExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : ArrowFunctionExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '=>', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ArrowFunctionExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (verify.isArray(node.body) == false) {
        node.body = [node.body];
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'node.expression', node.expression
    if (!!node.expression == true) {
        ret.children.push({
            tag: 'expression', 
            children: [
                
            ]
        });
    }
    // log '*** ArrowFunctionExpression.ret.params', getChildByTag(ret, 'params')
    // log '*** ArrowFunctionExpression.ret', ret
    // A fat arrow function expression, e.g., `let foo = (bar) => { /* body */ }`.
    if (node.async) {
        ret.tag = 'async=>';
    }
    if (node.generator) {
        ret.tag += '*';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node YieldExpression
format.YieldExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : YieldExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'yield', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'YieldExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    var p_argument = {
        textified: null, 
        isText: false, 
        ASTProp: 'argument', 
        children: [
            
        ]
    };
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_argument, node.argument, options);
        p_argument.tag = 'argument';
        ret.children.push(p_argument);
        if (p_argument.children.length == 1) {
            // log '*** f_p_tag argument children[0].textified', p_argument.children[0].textified
            // log '*** f_p_tag argument children[0].isText', p_argument.children[0].isText
            // log '*** f_p_tag argument children[0].name', p_argument.children[0].name
            if (p_argument.children[0].textified) {
                p_argument.textified = p_argument.children[0].textified;
            }
            if (p_argument.children[0].isText) {
                p_argument.isText = true;
                p_argument.name = p_argument.children[0].name;
                p_argument.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property argument/argument not managed by f_p_tag');
            }
        */
    }
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // log 'node.delegate', node.delegate
    if (!!node.delegate == true) {
        ret.children.push({
            tag: 'delegate', 
            children: [
                
            ]
        });
    }
    // A `yield` expression.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node AwaitExpression
format.AwaitExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : AwaitExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'await', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'AwaitExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property argument and append ittfNode to `ret`
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options);
    }
    // A `await` expression.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ArrayExpression
format.ArrayExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : ArrayExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '[', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ArrayExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection elements and append ittfNode(s) to `ret`
    if (node.elements) {
        if (typeof node.elements.length === 'undefined') {
            throw new Error('Property node.elements must be an array');
        }
        var i, i_items=node.elements, i_len=node.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = node.elements[i];
            item.__parent = {
                name: 'elements', 
                len: node.elements.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection elements undefined: ' + JSON.stringify(node, null, 2));
    }
    // An array expression.
    if (options.mustBeText) {
        if (setTextList(ret, ', ')) {
            ret.textified = '[' + ret.textified + ']';
            // log '### ArrayExpression', 'name:', ret.name, 'textified', ret.textified, ret.isText
        }
        else {
            throw new Error("ArrayExpression. Cannot textify node as requested: " + JSON.stringify(node, null, 2));
        }
    }
    else if (options.couldBeText) {
        var tlist = getTextList(ret, ', ');
        if (tlist && tlist.length < 15) {
            ret.textified = '[' + ret.textified + ']';
            // TODO??? set ret.children = []
        }
        else {
            ret.textified = null;
            var i, i_items=ret.children, i_len=ret.children.length, item;
            for (i=0; i<i_len; i++) {
                item = ret.children[i];
                if (isTextualNode(item)) {
                    item.tag = '@';
                    item.name = getNodeText(item);
                }
                else if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                    item.tag = '@';
                }
            }
        }
    }
    else {
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            if (isTextualNode(item)) {
                item.tag = '@';
                item.name = getNodeText(item);
            }
            else if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                item.tag = '@';
            }
        }
    }
    if (ret.children.length == 0) {
        ret.textified = '[]';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectExpression
format.ObjectExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '{', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (options.stateAST[options.stateAST.length-1] === 'JSXExpressionContainer') {
        parent.children.pop();
        ret = parent;
        var __skip = true;
    }
    // process AST-node-property-collection properties and append ittfNode(s) to `ret`
    if (node.properties) {
        if (typeof node.properties.length === 'undefined') {
            throw new Error('Property node.properties must be an array');
        }
        var i, i_items=node.properties, i_len=node.properties.length, item;
        for (i=0; i<i_len; i++) {
            item = node.properties[i];
            item.__parent = {
                name: 'properties', 
                len: node.properties.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection properties undefined: ' + JSON.stringify(node, null, 2));
    }
    if (options.mustBeText) {
        if (setTextList(ret, ', ')) {
            ret.textified = '{' + ret.textified + '}';
            if (node.extra && node.extra.parenthesized == true) {
                ret.textified = '(' + ret.textified + ')';
            }
        }
        else {
            throw new Error("ObjectExpression. Cannot textify node as requested: " + JSON.stringify(node, null, 2));
        }
    }
    else {
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            if (item.tag === '...') {
                if (item.children.length == 0) {
                    item.name = item.textified;
                    item.tag = '@';
                }
                else if (item.children.length == 1) {
                    if (item.children[0].name) {
                        item.children[0].name = '...' + item.children[0].name;
                    }
                    if (item.textified) {
                        item.children[0].textified = '...' + item.children[0].textified;
                    }
                    item.tag = item.children[0].tag;
                    item.textified = item.children[0].textified;
                    item.name = item.children[0].name;
                    item.children = item.children[0].children;
                }
            }
            if (item.tag === '@' && item.name === 'template' && item.children.length == 1 && item.children[0].tag === '`lit') {
                // log 'ObjectExpression', item.tag, item.name, getLiteral(item.children[0])
                options.wizziIncludes.push({
                    kind: 'html', 
                    node: item, 
                    literal: getLiteral(item.children[0])
                });
                item.children = [];
            }
        }
        if (!ret.textified && ret.children.length == 0) {
            if (node.extra && node.extra.parenthesized == true) {
                // set ret.name = ret.textified = '({})' // 10/1/19
                ret.textified = '({})';
            }
            else {
                // set ret.name = ret.textified = '{}' // 10/1/19
                ret.textified = '{}';
            }
        }
        else {
            if (node.extra && node.extra.parenthesized == true) {
                var temp = {
                    tag: '(', 
                    children: [
                        ret
                    ]
                };
                ret = temp;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectProperty
format.ObjectProperty = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectProperty ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 'ObjectProperty enter options.mustBeText', options.mustBeText
    const save = options.mustBeText;
    options.mustBeText = true;
    // process AST-node-property key and set it in a var
    var p_key = null;
    if (typeof(node.key) !== 'undefined') {
        p_key = {
            textified: null, 
            isText: false, 
            ASTProp: 'key', 
            children: [
                
            ]
        };
        if (node.key == null) {
            p_key.text = "null";
        }
        else {
            if (!node.key.type) {
                throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp key before format'
            format(p_key, node.key, options);
            // log 'f_p_temp key after format', p_key
            if (p_key.children.length == 1) {
                p_key.tag = p_key.children[0].tag;
                if (!(p_key.children[0].isText || p_key.children[0].textified)) {
                    p_key.name = p_key.children[0].name;
                    p_key.source = p_key.children[0].source;
                    p_key.children = p_key.children[0].children;
                }
                else {
                    if (p_key.children[0].textified) {
                        p_key.textified = p_key.children[0].textified;
                        p_key.name = p_key.children[0].name;
                        p_key.source = p_key.children[0].source;
                    }
                    if (p_key.children[0].isText) {
                        p_key.isText = true;
                        p_key.name = p_key.children[0].name;
                        p_key.source = p_key.children[0].source;
                    }
                    p_key.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    console.log('ObjectProperty.p_key', p_key);
    options.mustBeText = save;
    if (isTextualNode(p_key)) {
        ret.name = getNodeText(p_key);
        if (node.computed) {
            ret.name = '[' + ret.name + ']';
        }
    }
    else {
        var p_computed = {
            tag: '[', 
            children: [
                p_key
            ]
        };
        ret.children.push(p_computed);
        ret = p_computed;
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
            };
            format(ret, item, options);
        }
    }
    console.log('ObjectProperty.ret.name', ret.name, 'node.value.type', node.value.type);
    if (node.value.type === 'AssignmentPattern') {
        // process AST-node-property value.left and set it in a var
        var p_value_left = null;
        if (typeof(node.value.left) !== 'undefined') {
            p_value_left = {
                textified: null, 
                isText: false, 
                ASTProp: 'value_left', 
                children: [
                    
                ]
            };
            if (node.value.left == null) {
                p_value_left.text = "null";
            }
            else {
                if (!node.value.left.type) {
                    throw 'Node value_left has no type: ' + JSON.stringify(node, null, 2);
                }
                // log 'f_p_temp value_left before format'
                format(p_value_left, node.value.left, options);
                // log 'f_p_temp value_left after format', p_value_left
                if (p_value_left.children.length == 1) {
                    p_value_left.tag = p_value_left.children[0].tag;
                    if (!(p_value_left.children[0].isText || p_value_left.children[0].textified)) {
                        p_value_left.name = p_value_left.children[0].name;
                        p_value_left.source = p_value_left.children[0].source;
                        p_value_left.children = p_value_left.children[0].children;
                    }
                    else {
                        if (p_value_left.children[0].textified) {
                            p_value_left.textified = p_value_left.children[0].textified;
                            p_value_left.name = p_value_left.children[0].name;
                            p_value_left.source = p_value_left.children[0].source;
                        }
                        if (p_value_left.children[0].isText) {
                            p_value_left.isText = true;
                            p_value_left.name = p_value_left.children[0].name;
                            p_value_left.source = p_value_left.children[0].source;
                        }
                        p_value_left.children = [];
                    }
                }
            }
        }
        else {
            throw new Error('AST-node-property value_left undefined: ' + JSON.stringify(node, null, 2));
        }
        // process AST-node-property value.right and set it in a var
        var p_value_right = null;
        if (typeof(node.value.right) !== 'undefined') {
            p_value_right = {
                textified: null, 
                isText: false, 
                ASTProp: 'value_right', 
                children: [
                    
                ]
            };
            if (node.value.right == null) {
                p_value_right.text = "null";
            }
            else {
                if (!node.value.right.type) {
                    throw 'Node value_right has no type: ' + JSON.stringify(node, null, 2);
                }
                // log 'f_p_temp value_right before format'
                format(p_value_right, node.value.right, options);
                // log 'f_p_temp value_right after format', p_value_right
                if (p_value_right.children.length == 1) {
                    p_value_right.tag = p_value_right.children[0].tag;
                    if (!(p_value_right.children[0].isText || p_value_right.children[0].textified)) {
                        p_value_right.name = p_value_right.children[0].name;
                        p_value_right.source = p_value_right.children[0].source;
                        p_value_right.children = p_value_right.children[0].children;
                    }
                    else {
                        if (p_value_right.children[0].textified) {
                            p_value_right.textified = p_value_right.children[0].textified;
                            p_value_right.name = p_value_right.children[0].name;
                            p_value_right.source = p_value_right.children[0].source;
                        }
                        if (p_value_right.children[0].isText) {
                            p_value_right.isText = true;
                            p_value_right.name = p_value_right.children[0].name;
                            p_value_right.source = p_value_right.children[0].source;
                        }
                        p_value_right.children = [];
                    }
                }
            }
        }
        else {
            throw new Error('AST-node-property value_right undefined: ' + JSON.stringify(node, null, 2));
        }
        console.log('p_value_left', p_value_left);
        // log 'p_value_right', p_value_right
        if (node.value.left.type === 'ObjectPattern') {
            ret.children.push(p_value_left);
            if (isTextualNode(p_value_right)) {
                ret.children.push({
                    tag: '=', 
                    name: getNodeText(p_value_right), 
                    children: [
                        
                    ]
                });
            }
            else if (p_value_right.tag === 'none' && verify.isNotEmpty(p_value_right.name)) {
                // FIXME why this?
                ret.children.push({
                    tag: '=', 
                    name: p_value_right.name, 
                    children: [
                        
                    ]
                });
            }
            else {
                ret.children.push({
                    tag: '=', 
                    children: [
                        p_value_right
                    ]
                });
            }
        }
        else {
            if (isTextualNode(p_value_right)) {
                if (options.mustBeText) {
                    ret.textified = ret.name += ' = ' + getNodeText(p_value_right);
                }
                else {
                    ret.children.push({
                        tag: '=', 
                        name: getNodeText(p_value_right), 
                        children: [
                            
                        ]
                    });
                }
            }
            else if (p_value_right.tag === 'none' && verify.isNotEmpty(p_value_right.name)) {
                // FIXME why this?
                ret.children.push({
                    tag: '=', 
                    name: p_value_right.name, 
                    children: [
                        
                    ]
                });
            }
            else {
                ret.children.push({
                    tag: '=', 
                    children: [
                        p_value_right
                    ]
                });
            }
        }
    }
    else {
        // process AST-node-property value and set it in a var
        var p_value = null;
        if (typeof(node.value) !== 'undefined') {
            p_value = {
                textified: null, 
                isText: false, 
                ASTProp: 'value', 
                children: [
                    
                ]
            };
            if (node.value == null) {
                p_value.text = "null";
            }
            else {
                if (!node.value.type) {
                    throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
                }
                // log 'f_p_temp value before format'
                format(p_value, node.value, options);
                // log 'f_p_temp value after format', p_value
                if (p_value.children.length == 1) {
                    p_value.tag = p_value.children[0].tag;
                    if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                        p_value.children = p_value.children[0].children;
                    }
                    else {
                        if (p_value.children[0].textified) {
                            p_value.textified = p_value.children[0].textified;
                            p_value.name = p_value.children[0].name;
                            p_value.source = p_value.children[0].source;
                        }
                        if (p_value.children[0].isText) {
                            p_value.isText = true;
                            p_value.name = p_value.children[0].name;
                            p_value.source = p_value.children[0].source;
                        }
                        p_value.children = [];
                    }
                }
            }
        }
        else {
            throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
        }
        // log 'ObjectProperty.p_value', p_value
        if (isTextualNode(p_value)) {
            if (isTextualNode(p_key)) {
                if (options.mustBeText) {
                    if (ret.name !== getNodeText(p_value)) {
                        ret.textified = ret.name += ': ' + getNodeText(p_value);
                    }
                    else {
                        ret.textified = ret.name;
                    }
                }
                else {
                    if (ret.name !== getNodeText(p_value)) {
                        ret.name += ' ' + getNodeText(p_value);
                    }
                }
            }
            else {
                ret.children.push({
                    tag: '+', 
                    name: getNodeText(p_value), 
                    children: [
                        
                    ]
                });
            }
        }
        else if (p_value.tag === 'none' && verify.isNotEmpty(p_value.name)) {
            if (isTextualNode(p_key)) {
                if (ret.name !== p_value.name) {
                    ret.name += ' ' + p_value.name;
                }
            }
            else {
                ret.children.push({
                    tag: '+', 
                    name: p_value.name, 
                    children: [
                        
                    ]
                });
            }
        }
        else {
            ret.children.push(p_value);
        }
    }
    // TODO b( shorthand
    // TODO b( async
    // TODO b( generator
    if (ret.children.length == 1 && ret.children[0].tag === '{') {
        ret.tag = '{' + ret.tag.substr(1);
        ret.children = ret.children[0].children;
    }
    else if (ret.children.length == 1 && ret.children[0].tag === '[') {
        ret.tag = '[' + ret.tag.substr(1);
        ret.children = ret.children[0].children;
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectMethod
format.ObjectMethod = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectMethod ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectMethod', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 'ObjectMethod enter options.mustBeText', options.mustBeText
    // s( kind
    // enum "get" | "set" | "method"
    const save = options.mustBeText;
    options.mustBeText = true;
    // process AST-node-property key and set it in a var
    var p_key = null;
    if (typeof(node.key) !== 'undefined') {
        p_key = {
            textified: null, 
            isText: false, 
            ASTProp: 'key', 
            children: [
                
            ]
        };
        if (node.key == null) {
            p_key.text = "null";
        }
        else {
            if (!node.key.type) {
                throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp key before format'
            format(p_key, node.key, options);
            // log 'f_p_temp key after format', p_key
            if (p_key.children.length == 1) {
                p_key.tag = p_key.children[0].tag;
                if (!(p_key.children[0].isText || p_key.children[0].textified)) {
                    p_key.name = p_key.children[0].name;
                    p_key.source = p_key.children[0].source;
                    p_key.children = p_key.children[0].children;
                }
                else {
                    if (p_key.children[0].textified) {
                        p_key.textified = p_key.children[0].textified;
                        p_key.name = p_key.children[0].name;
                        p_key.source = p_key.children[0].source;
                    }
                    if (p_key.children[0].isText) {
                        p_key.isText = true;
                        p_key.name = p_key.children[0].name;
                        p_key.source = p_key.children[0].source;
                    }
                    p_key.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = getNodeText(p_key);
    options.mustBeText = save;
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.tag = ret.tag == 'constructor' ? 'ctor' : (ret.tag == 'method' ? 'm' : ret.tag);
    if (node.async) {
        ret.tag = 'async-' + ret.tag;
    }
    setNameFromChildByTag(ret, 'key', true);
    if (ret.tag === 'ctor') {
        ret.name = '';
    }
    else if (node.computed) {
        ret.name = '[' + ret.name + ']';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node FunctionExpression
format.FunctionExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : FunctionExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'function', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'FunctionExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.async) {
        ret.tag = 'async-function';
    }
    if (node.generator) {
        ret.tag += '*';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node UnaryExpression
format.UnaryExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : UnaryExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'UnaryExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A unary operator expression.
    // s( operator, UnaryOperator enum "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" | "throw"
    // b( prefix
    // process AST-node-property argument and set it in a var
    var p_argument = null;
    if (typeof(node.argument) !== 'undefined') {
        p_argument = {
            textified: null, 
            isText: false, 
            ASTProp: 'argument', 
            children: [
                
            ]
        };
        if (node.argument == null) {
            p_argument.text = "null";
        }
        else {
            if (!node.argument.type) {
                throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp argument before format'
            format(p_argument, node.argument, options);
            // log 'f_p_temp argument after format', p_argument
            if (p_argument.children.length == 1) {
                p_argument.tag = p_argument.children[0].tag;
                if (!(p_argument.children[0].isText || p_argument.children[0].textified)) {
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = p_argument.children[0].children;
                }
                else {
                    if (p_argument.children[0].textified) {
                        p_argument.textified = p_argument.children[0].textified;
                        p_argument.name = p_argument.children[0].name;
                        p_argument.source = p_argument.children[0].source;
                    }
                    if (p_argument.children[0].isText) {
                        p_argument.isText = true;
                        p_argument.name = p_argument.children[0].name;
                        p_argument.source = p_argument.children[0].source;
                    }
                    p_argument.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_argument)) {
        ret.name = getNodeText(p_argument);
        const space = ['-','+','!','{'].indexOf(node.operator) > -1 ? '' : ' ';
        ret.textified = node.operator + space + ret.name;
    }
    else {
        ret.children.push(p_argument);
    }
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        if (node.extra && node.extra.parenthesized == true) {
            // is the return value of an ArrowExpression
            // TODO ...
            if (isTextualNode(p_argument)) {
                ret.tag = '(';
                ret.name = node.operator + getNodeText(p_argument);
                ret.textified = '(' + node.operator + getNodeText(p_argument) + ')';
            }
            else {
                var temp = {
                    tag: '(', 
                    children: [
                        ret
                    ]
                };
                ret = temp;
            }
        }
        else {
            // TODO ...
            if (isTextualNode(p_argument)) {
                ret.tag = '+';
                ret.name = node.operator + getNodeText(p_argument);
            }
            else {
                var temp = {
                    tag: '+', 
                    children: [
                        ret
                    ]
                };
                ret = temp;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node UpdateExpression
format.UpdateExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : UpdateExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'UpdateExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // An update (increment or decrement) operator expression.
    // s( operator, UpdateOperator enum "++" | "--"
    // process AST-node-property argument and append ittfNode to `ret`
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options);
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // b( prefix
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    if (got_text_1) {
        ret.tag = 'set';
        if (node.prefix) {
            ret.name = node.operator + ret.name;
        }
        else {
            ret.name = ret.name + node.operator;
        }
        ret.textified = ret.name;
    }
    if (node.prefix) {
        ret.tag = node.operator + 'op';
    }
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (got_text_1) {
            if (node.extra && node.extra.parenthesized == true) {
                ret.tag = '(';
            }
            else {
                ret.tag = '+';
            }
        }
        else {
            // TODO
            // is the return value of an ArrowExpression
            if (got_text_1) {
                ret.tag = '(';
            }
            else {
                ret.tag = '(' + ret.tag;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node BinaryExpression
format.BinaryExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : BinaryExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BinaryExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A binary operator token.
    // s( operator, BinaryOperator
    // enum "==" | "!=" | "===" | "!==" "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof" | "|>"
    if (node.operator.length > 1) {
        ret.tag = node.operator;
    }
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined') {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
        };
        if (node.left == null) {
            p_left.text = "null";
        }
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp left before format'
            format(p_left, node.left, options);
            // log 'f_p_temp left after format', p_left
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    p_left.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'BinaryExpression.p_left', p_left
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined') {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
        };
        if (node.right == null) {
            p_right.text = "null";
        }
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp right before format'
            format(p_right, node.right, options);
            // log 'f_p_temp right after format', p_right
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    p_right.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'BinaryExpression.p_right', p_right
    if (isTextualNode(p_left) && isTextualNode(p_right)) {
        ret.tag = 'set';
        ret.name = getNodeText(p_left) + ' ' + node.operator + ' ' + getNodeText(p_right);
        ret.textified = ret.name;
        if (node.extra && node.extra.parenthesized == true) {
            ret.textified = '(' + ret.textified + ')';
        }
    }
    else {
        if (isTextualNode(p_left) || (p_left.children.length == 0 && ['@expr', '@id', 'literal'].indexOf(p_left.tag) > -1)) {
            p_left.tag = '+';
            if (isTextualNode(p_left)) {
                p_left.name = getNodeText(p_left);
                p_left.children = [];
            }
        }
        ret.children.push(p_left);
        if (isTextualNode(p_right) || (p_right.children.length == 0 && ['@expr', '@id', 'literal'].indexOf(p_right.tag) > -1)) {
            p_right.tag = '+';
            if (isTextualNode(p_right)) {
                p_right.name = getNodeText(p_right);
                p_right.children = [];
            }
        }
        ret.children.push(p_right);
        if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
            // is the return value of an ArrowExpression
            if (node.extra && node.extra.parenthesized == true) {
                ret.tag = '(';
            }
            else {
                ret.tag = '+';
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node AssignmentExpression
format.AssignmentExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : AssignmentExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'set', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'AssignmentExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 'AssignmentExpression enter options.mustBeText', options.mustBeText
    // An assignment operator expression.
    // s( operator, AssignmentOperator
    // enum AssignmentOperator { "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&="
    const save = options.mustBeText;
    options.mustBeText = true;
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined') {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
        };
        if (node.left == null) {
            p_left.text = "null";
        }
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp left before format'
            format(p_left, node.left, options);
            // log 'f_p_temp left after format', p_left
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    p_left.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    options.mustBeText = save;
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined') {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
        };
        if (node.right == null) {
            p_right.text = "null";
        }
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp right before format'
            format(p_right, node.right, options);
            // log 'f_p_temp right after format', p_right
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    p_right.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left) + ' ' + node.operator + ' ';
    }
    else {
        ret.name = node.operator;
        ret.children.push(p_left);
    }
    if (isTextualNode(p_left) && isTextualNode(p_right)) {
        ret.name += getNodeText(p_right);
    }
    else {
        ret.children.push(p_right);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node LogicalExpression
format.LogicalExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : LogicalExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'op' + node.operator, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'LogicalExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A logical operator expression.
    // s( operator, LogicalOperator enum "||" | "&&" | "??"
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined') {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
        };
        if (node.left == null) {
            p_left.text = "null";
        }
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp left before format'
            format(p_left, node.left, options);
            // log 'f_p_temp left after format', p_left
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    p_left.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined') {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
        };
        if (node.right == null) {
            p_right.text = "null";
        }
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp right before format'
            format(p_right, node.right, options);
            // log 'f_p_temp right after format', p_right
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    p_right.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_left) && isTextualNode(p_right)) {
        ret.tag = 'set';
        ret.name = getNodeText(p_left) + ' ' + node.operator + ' ' + getNodeText(p_right);
        ret.textified = ret.name;
    }
    else {
        ret.tag = node.operator;
        if (isTextualNode(p_left) || ['@expr', '@id', 'literal'].indexOf(p_left.tag) > -1) {
            p_left.tag = '+';
            if (isTextualNode(p_left)) {
                p_left.name = getNodeText(p_left);
                p_left.children = [];
            }
        }
        ret.children.push(p_left);
        // log 'LogicalExpression.p_left', p_left
        if (isTextualNode(p_right) || ['@expr', '@id', 'literal'].indexOf(p_right.tag) > -1) {
            p_right.tag = '+';
            if (isTextualNode(p_right)) {
                p_right.name = getNodeText(p_right);
                p_right.children = [];
            }
        }
        ret.children.push(p_right);
        // log 'LogicalExpression.p_right', p_right
    }
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            if (ret.tag === 'set') {
                ret.tag = '(';
            }
            else {
                ret.tag = '(' + ret.tag;
            }
        }
        else {
            if (ret.tag === 'set') {
                ret.tag = '+';
            }
            else {
                // TODO Do nothing is OK?
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node SpreadElement
format.SpreadElement = function(parent, node, options) {
    var __isText = false;
    // log 'node : SpreadElement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '...', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SpreadElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property argument and set it in a var
    var p_argument = null;
    if (typeof(node.argument) !== 'undefined') {
        p_argument = {
            textified: null, 
            isText: false, 
            ASTProp: 'argument', 
            children: [
                
            ]
        };
        if (node.argument == null) {
            p_argument.text = "null";
        }
        else {
            if (!node.argument.type) {
                throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp argument before format'
            format(p_argument, node.argument, options);
            // log 'f_p_temp argument after format', p_argument
            if (p_argument.children.length == 1) {
                p_argument.tag = p_argument.children[0].tag;
                if (!(p_argument.children[0].isText || p_argument.children[0].textified)) {
                    p_argument.name = p_argument.children[0].name;
                    p_argument.source = p_argument.children[0].source;
                    p_argument.children = p_argument.children[0].children;
                }
                else {
                    if (p_argument.children[0].textified) {
                        p_argument.textified = p_argument.children[0].textified;
                        p_argument.name = p_argument.children[0].name;
                        p_argument.source = p_argument.children[0].source;
                    }
                    if (p_argument.children[0].isText) {
                        p_argument.isText = true;
                        p_argument.name = p_argument.children[0].name;
                        p_argument.source = p_argument.children[0].source;
                    }
                    p_argument.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'SpreadElement.p_argument', p_argument
    if (isTextualNode(p_argument)) {
        ret.name = getNodeText(p_argument);
        ret.textified = '...' + ret.name;
    }
    else {
        ret.children.push(p_argument);
        // set ret.textified = p_argument.source
        // throw new Error('SpreadElement must be textual:' + JSON.stringify(p_argument, null, 2))
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node MemberExpression
format.MemberExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : MemberExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@expr', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'MemberExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property object and set it in a var
    var p_object = null;
    if (typeof(node.object) !== 'undefined') {
        p_object = {
            textified: null, 
            isText: false, 
            ASTProp: 'object', 
            children: [
                
            ]
        };
        if (node.object == null) {
            p_object.text = "null";
        }
        else {
            if (!node.object.type) {
                throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp object before format'
            format(p_object, node.object, options);
            // log 'f_p_temp object after format', p_object
            if (p_object.children.length == 1) {
                p_object.tag = p_object.children[0].tag;
                if (!(p_object.children[0].isText || p_object.children[0].textified)) {
                    p_object.name = p_object.children[0].name;
                    p_object.source = p_object.children[0].source;
                    p_object.children = p_object.children[0].children;
                }
                else {
                    if (p_object.children[0].textified) {
                        p_object.textified = p_object.children[0].textified;
                        p_object.name = p_object.children[0].name;
                        p_object.source = p_object.children[0].source;
                    }
                    if (p_object.children[0].isText) {
                        p_object.isText = true;
                        p_object.name = p_object.children[0].name;
                        p_object.source = p_object.children[0].source;
                    }
                    p_object.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property object undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property property and set it in a var
    var p_property = null;
    if (typeof(node.property) !== 'undefined') {
        p_property = {
            textified: null, 
            isText: false, 
            ASTProp: 'property', 
            children: [
                
            ]
        };
        if (node.property == null) {
            p_property.text = "null";
        }
        else {
            if (!node.property.type) {
                throw 'Node property has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp property before format'
            format(p_property, node.property, options);
            // log 'f_p_temp property after format', p_property
            if (p_property.children.length == 1) {
                p_property.tag = p_property.children[0].tag;
                if (!(p_property.children[0].isText || p_property.children[0].textified)) {
                    p_property.name = p_property.children[0].name;
                    p_property.source = p_property.children[0].source;
                    p_property.children = p_property.children[0].children;
                }
                else {
                    if (p_property.children[0].textified) {
                        p_property.textified = p_property.children[0].textified;
                        p_property.name = p_property.children[0].name;
                        p_property.source = p_property.children[0].source;
                    }
                    if (p_property.children[0].isText) {
                        p_property.isText = true;
                        p_property.name = p_property.children[0].name;
                        p_property.source = p_property.children[0].source;
                    }
                    p_property.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property property undefined: ' + JSON.stringify(node, null, 2));
    }
    // b( computed
    // b( optional, optional
    // If `computed` is `true`, the node corresponds to a computed (`a[b]`) member expression and `property` is an `Expression`.
    // If `computed` is `false`, the node corresponds to a static (`a.b`) member expression and `property` is an `Identifier`.
    // The `optional` flags indicates that the member expression can be called even if the object is null or undefined.
    // If this is the object value (null/undefined) should be returned.
    // log 'MemberExpression.p_object', isTextualNode(p_object), p_object
    if (isTextualNode(p_object)) {
        var obj = getNodeText(p_object);
        if (isTextualNode(p_property)) {
            var prop = getNodeText(p_property);
            ret.name = node.computed ? obj + '[' + prop + ']' : obj + '.' + prop;
            ret.textified = ret.name;
            ret.children = [];
            // log 'MemberExpression.textified', ret.textified
        }
        else {
            ret.name = obj;
            var link = {
                tag: node.computed ? '.[' : '.', 
                children: [
                    
                ]
            };
            link.children.push(p_property);
            ret.children.push(link);
        }
    }
    else {
        if (node.computed) {
            p_property.tag = '.[';
        }
        else {
            p_property.tag = '.';
        }
        if (p_object.tag === '(') {
            ret.children.push(p_object);
            ret.children.push(p_property);
        }
        else {
            ret.tag = p_object.tag;
            ret.name = p_object.name;
            ret.source = p_object.source;
            ret.children = p_object.children;
            ret.children.push(p_property);
        }
        // log 'MemberExpression.tag.name', ret.tag, ret.name
        var i, i_items=ret.children, i_len=ret.children.length, item;
        for (i=0; i<i_len; i++) {
            item = ret.children[i];
            // log 'MemberExpression.child', i, ret.children[i].tag, ret.children[i].name
        }
    }
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            ret.tag = '(';
        }
        else {
            ret.tag = '+';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node BindExpression
format.BindExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : BindExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'bind-expr', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BindExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property object and append ittfNode to `ret`
    if (node.object) {
        if (!node.object.type) {
            throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.object, options);
    }
    // process AST-node-property callee and append ittfNode to `ret`
    if (node.callee) {
        if (!node.callee.type) {
            throw 'Node callee has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.callee, options);
    }
    else {
        throw new Error('AST-node-property callee undefined: ' + JSON.stringify(node, null, 2));
    }
    // if `object` is `null`, then `callee` should be a `MemberExpression`.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ConditionalExpression
format.ConditionalExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : ConditionalExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'iif', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ConditionalExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A conditional expression, i.e., a ternary `?`/`,` expression.
    var p_test = {
        textified: null, 
        isText: false, 
        ASTProp: 'test', 
        children: [
            
        ]
    };
    if (node.test) {
        if (!node.test.type) {
            throw 'Node test has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_test, node.test, options);
        p_test.tag = 'test';
        ret.children.push(p_test);
        if (p_test.children.length == 1) {
            // log '*** f_p_tag test children[0].textified', p_test.children[0].textified
            // log '*** f_p_tag test children[0].isText', p_test.children[0].isText
            // log '*** f_p_tag test children[0].name', p_test.children[0].name
            if (p_test.children[0].textified) {
                p_test.textified = p_test.children[0].textified;
            }
            if (p_test.children[0].isText) {
                p_test.isText = true;
                p_test.name = p_test.children[0].name;
                p_test.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property test/test not managed by f_p_tag');
            }
        */
    }
    // process AST-node-property consequent and set it in a var
    var p_consequent = null;
    if (typeof(node.consequent) !== 'undefined') {
        p_consequent = {
            textified: null, 
            isText: false, 
            ASTProp: 'consequent', 
            children: [
                
            ]
        };
        if (node.consequent == null) {
            p_consequent.text = "null";
        }
        else {
            if (!node.consequent.type) {
                throw 'Node consequent has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp consequent before format'
            format(p_consequent, node.consequent, options);
            // log 'f_p_temp consequent after format', p_consequent
            if (p_consequent.children.length == 1) {
                p_consequent.tag = p_consequent.children[0].tag;
                if (!(p_consequent.children[0].isText || p_consequent.children[0].textified)) {
                    p_consequent.name = p_consequent.children[0].name;
                    p_consequent.source = p_consequent.children[0].source;
                    p_consequent.children = p_consequent.children[0].children;
                }
                else {
                    if (p_consequent.children[0].textified) {
                        p_consequent.textified = p_consequent.children[0].textified;
                        p_consequent.name = p_consequent.children[0].name;
                        p_consequent.source = p_consequent.children[0].source;
                    }
                    if (p_consequent.children[0].isText) {
                        p_consequent.isText = true;
                        p_consequent.name = p_consequent.children[0].name;
                        p_consequent.source = p_consequent.children[0].source;
                    }
                    p_consequent.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property consequent undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property alternate and set it in a var
    var p_alternate = null;
    if (typeof(node.alternate) !== 'undefined') {
        p_alternate = {
            textified: null, 
            isText: false, 
            ASTProp: 'alternate', 
            children: [
                
            ]
        };
        if (node.alternate == null) {
            p_alternate.text = "null";
        }
        else {
            if (!node.alternate.type) {
                throw 'Node alternate has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp alternate before format'
            format(p_alternate, node.alternate, options);
            // log 'f_p_temp alternate after format', p_alternate
            if (p_alternate.children.length == 1) {
                p_alternate.tag = p_alternate.children[0].tag;
                if (!(p_alternate.children[0].isText || p_alternate.children[0].textified)) {
                    p_alternate.name = p_alternate.children[0].name;
                    p_alternate.source = p_alternate.children[0].source;
                    p_alternate.children = p_alternate.children[0].children;
                }
                else {
                    if (p_alternate.children[0].textified) {
                        p_alternate.textified = p_alternate.children[0].textified;
                        p_alternate.name = p_alternate.children[0].name;
                        p_alternate.source = p_alternate.children[0].source;
                    }
                    if (p_alternate.children[0].isText) {
                        p_alternate.isText = true;
                        p_alternate.name = p_alternate.children[0].name;
                        p_alternate.source = p_alternate.children[0].source;
                    }
                    p_alternate.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property alternate undefined: ' + JSON.stringify(node, null, 2));
    }
    setNameFromChildByTag(ret, 'test', true);
    if (isTextualNode(p_consequent)) {
        ret.children.push({
            tag: 'then', 
            name: getNodeText(p_consequent), 
            children: [
                
            ]
        });
    }
    else {
        ret.children.push({
            tag: 'then', 
            children: [
                p_consequent
            ]
        });
    }
    if (isTextualNode(p_alternate)) {
        ret.children.push({
            tag: 'else', 
            name: getNodeText(p_alternate), 
            children: [
                
            ]
        });
    }
    else {
        ret.children.push({
            tag: 'else', 
            children: [
                p_alternate
            ]
        });
    }
    if (node.__parent && node.__parent.name === 'body' && node.__parent.len == 1) {
        // is the return value of an ArrowExpression
        if (node.extra && node.extra.parenthesized == true) {
            var temp = {
                tag: '(', 
                children: [
                    ret
                ]
            };
            ret = temp;
        }
        else {
            // TODO do nothing
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node CallExpression
format.CallExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : CallExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '_', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CallExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A function or method call expression.
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property callee and set it in a var
    var p_callee = null;
    if (typeof(node.callee) !== 'undefined') {
        p_callee = {
            textified: null, 
            isText: false, 
            ASTProp: 'callee', 
            children: [
                
            ]
        };
        if (node.callee == null) {
            p_callee.text = "null";
        }
        else {
            if (!node.callee.type) {
                throw 'Node callee has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp callee before format'
            format(p_callee, node.callee, options);
            // log 'f_p_temp callee after format', p_callee
            if (p_callee.children.length == 1) {
                p_callee.tag = p_callee.children[0].tag;
                if (!(p_callee.children[0].isText || p_callee.children[0].textified)) {
                    p_callee.name = p_callee.children[0].name;
                    p_callee.source = p_callee.children[0].source;
                    p_callee.children = p_callee.children[0].children;
                }
                else {
                    if (p_callee.children[0].textified) {
                        p_callee.textified = p_callee.children[0].textified;
                        p_callee.name = p_callee.children[0].name;
                        p_callee.source = p_callee.children[0].source;
                    }
                    if (p_callee.children[0].isText) {
                        p_callee.isText = true;
                        p_callee.name = p_callee.children[0].name;
                        p_callee.source = p_callee.children[0].source;
                    }
                    p_callee.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property callee undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection arguments and
    // embed its array of nodes in a temp var
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        var p_arguments = {
            tag: 'true', 
            children: [
                
            ]
        };
        var i, i_items=node.arguments, i_len=node.arguments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.arguments[i];
            item.__parent = {
                name: 'arguments', 
                len: node.arguments.length
            };
            format(p_arguments, item, options);
        }
    }
    var lastCallee = ret;
    // log 'p_callee', p_callee
    if (isTextualNode(p_callee)) {
        // first of all try to set ret.textified
        ret.name = getNodeText(p_callee);
        if (node.typeParameters) {
            var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_arguments.children[i];
                if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                    item.tag = '@';
                }
                lastCallee.children.push(item);
            }
        }
        else {
            if (p_arguments) {
                var tlist = getTextList(p_arguments, ', ');
                if (tlist) {
                    ret.name += '(' + tlist + ')';
                    ret.textified = ret.name;
                }
                else {
                    var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                    for (i=0; i<i_len; i++) {
                        item = p_arguments.children[i];
                        if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                            item.tag = '@';
                        }
                        lastCallee.children.push(item);
                    }
                }
            }
            else {
                ret.textified = ret.name + '()';
            }
            if (ret.textified && node.extra && node.extra.parenthesized == true) {
                ret.textified = '(' + ret.textified + ')';
            }
            // log 'CallExpression', 'ret.name,textified', ret.name, ret.textified
        }
    }
    else {
        // log 'CallExpression', 'p_callee.tag.name', p_callee.tag, p_callee.name
        var i, i_items=p_callee.children, i_len=p_callee.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_callee.children[i];
            // log 'CallExpression', 'p_callee.children', i, p_callee.children[i].tag, p_callee.children[i].name
        }
        if (p_arguments) {
            var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_arguments.children[i];
                // log 'CallExpression', 'p_arguments.children', i, p_arguments.children[i].tag, p_arguments.children[i].name
            }
        }
        if (['[', '{'].indexOf(p_callee.tag) > -1) {
            ret.tag = p_callee.tag;
        }
        ret.name = p_callee.name;
        ret.children = p_callee.children;
        if (p_callee.children.length > 0) {
            // log 'p_callee.children.length > 0'
            lastCallee = p_callee.children[p_callee.children.length-1];
            if (p_arguments && p_arguments.children.length > 0) {
                if (lastCallee.tag === '.') {
                    lastCallee.tag = '._';
                    var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                    for (i=0; i<i_len; i++) {
                        item = p_arguments.children[i];
                        if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                            item.tag = '@';
                        }
                        lastCallee.children.push(item);
                    }
                }
                else {
                    var call = {
                        tag: '(', 
                        children: [
                            
                        ]
                    };
                    var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                    for (i=0; i<i_len; i++) {
                        item = p_arguments.children[i];
                        if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                            item.tag = '@';
                        }
                        call.children.push(item);
                    }
                    ret.children.push(call);
                }
            }
            else {
                if (lastCallee.tag === '.') {
                    lastCallee.tag = '._';
                }
            }
        }
        else {
            // log 'p_callee.children.length == 0'
            ret.tag = "_";
            ret.name = p_callee.tag;
            if (p_arguments && p_arguments.children.length > 0) {
                var i, i_items=p_arguments.children, i_len=p_arguments.children.length, item;
                for (i=0; i<i_len; i++) {
                    item = p_arguments.children[i];
                    if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                        item.tag = '@';
                    }
                    ret.children.push(item);
                }
            }
            // log 'CallExpression', p_callee, ret
        }
        // log 'node.callee.type', node.callee.type, ret.tag
        if (node.callee.type === 'FunctionExpression' && ret.tag === '_') {
            // log 'node.callee.type 2', node.callee.type, ret.tag
            ret.tag = 'iife' // 9/1/19;
        }
    }
    if (node.extra && node.extra.parenthesized == true && !ret.textified) {
        var temp = {
            tag: '(', 
            children: [
                ret
            ]
        };
        ret = temp;
    }
    // log 'CallExpression.exit.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node NewExpression
format.NewExpression = function(parent, node, options) {
    var __isText = false;
    options.couldBeText = true;
    // log 'node : NewExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'new', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'NewExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection arguments and
    // embed its array of nodes in a new tag
    if (node.arguments) {
        if (typeof node.arguments.length === 'undefined') {
            throw new Error('Property node.arguments must be an array');
        }
        if (node.arguments.length > 0) {
            var temparguments = {
                tag: 'arguments', 
                ASTProp: 'arguments', 
                children: [
                    
                ]
            };
            var i, i_items=node.arguments, i_len=node.arguments.length, item;
            for (i=0; i<i_len; i++) {
                item = node.arguments[i];
                item.__parent = {
                    name: 'arguments', 
                    len: node.arguments.length
                };
                format(temparguments, item, options);
            }
            ret.children.push(temparguments);
        }
    }
    // process AST-node-property callee and set it in a var
    var p_callee = null;
    if (typeof(node.callee) !== 'undefined') {
        p_callee = {
            textified: null, 
            isText: false, 
            ASTProp: 'callee', 
            children: [
                
            ]
        };
        if (node.callee == null) {
            p_callee.text = "null";
        }
        else {
            if (!node.callee.type) {
                throw 'Node callee has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp callee before format'
            format(p_callee, node.callee, options);
            // log 'f_p_temp callee after format', p_callee
            if (p_callee.children.length == 1) {
                p_callee.tag = p_callee.children[0].tag;
                if (!(p_callee.children[0].isText || p_callee.children[0].textified)) {
                    p_callee.name = p_callee.children[0].name;
                    p_callee.source = p_callee.children[0].source;
                    p_callee.children = p_callee.children[0].children;
                }
                else {
                    if (p_callee.children[0].textified) {
                        p_callee.textified = p_callee.children[0].textified;
                        p_callee.name = p_callee.children[0].name;
                        p_callee.source = p_callee.children[0].source;
                    }
                    if (p_callee.children[0].isText) {
                        p_callee.isText = true;
                        p_callee.name = p_callee.children[0].name;
                        p_callee.source = p_callee.children[0].source;
                    }
                    p_callee.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property callee undefined: ' + JSON.stringify(node, null, 2));
    }
    if (p_callee.isText || p_callee.textified) {
        ret.name = p_callee.textified || p_callee.name;
    }
    else {
        throw new Error('NewExpression.callee must be textual:' + p_callee.children[0].tag);
    }
    var argumentsNode = getChildByTag(ret, 'arguments');
    ret.children = [];
    if (argumentsNode) {
        var tlist = getTextList(argumentsNode, ', ');
        // log 'NewExpression.tlist', tlist
        // if tlist && tlist.length < 15
        if (tlist) {
            ret.name += '(' + tlist + ')';
            ret.textified = 'new ' + ret.name;
        }
        else {
            var i, i_items=argumentsNode.children, i_len=argumentsNode.children.length, item;
            for (i=0; i<i_len; i++) {
                item = argumentsNode.children[i];
                if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
                    item.tag = '@';
                }
                ret.children.push(item);
            }
        }
    }
    else {
        ret.textified = 'new ' + ret.name + '()';
    }
    // log 'NewExpression.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
    options.couldBeText = false;
};
// process AST node SequenceExpression
format.SequenceExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : SequenceExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'sequence', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'SequenceExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection expressions and append ittfNode(s) to `ret`
    if (node.expressions) {
        if (typeof node.expressions.length === 'undefined') {
            throw new Error('Property node.expressions must be an array');
        }
        var i, i_items=node.expressions, i_len=node.expressions.length, item;
        for (i=0; i<i_len; i++) {
            item = node.expressions[i];
            item.__parent = {
                name: 'expressions', 
                len: node.expressions.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection expressions undefined: ' + JSON.stringify(node, null, 2));
    }
    // A sequence expression, i.e., a comma-separated sequence of expressions.
    var i, i_items=ret.children, i_len=ret.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ret.children[i];
        if (['@expr', '@id', 'literal'].indexOf(item.tag) > -1) {
            item.tag = 'set';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node DoExpression
format.DoExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : DoExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'do', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'DoExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TemplateLiteral
format.TemplateLiteral = function(parent, node, options) {
    var __isText = false;
    // log 'node : TemplateLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '`lit', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TemplateLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection quasis and
    // embed its array of nodes in a temp var
    if (node.quasis) {
        if (typeof node.quasis.length === 'undefined') {
            throw new Error('Property node.quasis must be an array');
        }
        var p_quasis = {
            tag: 'true', 
            children: [
                
            ]
        };
        var i, i_items=node.quasis, i_len=node.quasis.length, item;
        for (i=0; i<i_len; i++) {
            item = node.quasis[i];
            item.__parent = {
                name: 'quasis', 
                len: node.quasis.length
            };
            format(p_quasis, item, options);
        }
    }
    // process AST-node-property-collection expressions and
    // embed its array of nodes in a temp var
    if (node.expressions) {
        if (typeof node.expressions.length === 'undefined') {
            throw new Error('Property node.expressions must be an array');
        }
        var p_expressions = {
            tag: 'true', 
            children: [
                
            ]
        };
        var i, i_items=node.expressions, i_len=node.expressions.length, item;
        for (i=0; i<i_len; i++) {
            item = node.expressions[i];
            item.__parent = {
                name: 'expressions', 
                len: node.expressions.length
            };
            format(p_expressions, item, options);
        }
    }
    var i = 0, j;
    for (i = 0; i < p_expressions.children.length; i++) {
        var q = p_quasis.children[i];
        for (j = 0; j < q.children.length; j++) {
            item = q.children[j];
            ret.children.push(item);
        }
        var e = p_expressions.children[i];
        // log 'TemplateLiteral.e', e
        if (['@expr', '@id', 'literal'].indexOf(e.tag) > -1) {
            e.tag = '@';
        }
        ret.children.push(e);
    }
    if (p_quasis.children[i] && p_quasis.children[i].children.length > 0) {
        for (j = 0; j < p_quasis.children[i].children.length; j++) {
            item = p_quasis.children[i].children[j];
            ret.children.push(item);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TaggedTemplateExpression
format.TaggedTemplateExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : TaggedTemplateExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '_`', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TaggedTemplateExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property tag and set it in a var
    var p_tag = null;
    if (typeof(node.tag) !== 'undefined') {
        p_tag = {
            textified: null, 
            isText: false, 
            ASTProp: 'tag', 
            children: [
                
            ]
        };
        if (node.tag == null) {
            p_tag.text = "null";
        }
        else {
            if (!node.tag.type) {
                throw 'Node tag has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp tag before format'
            format(p_tag, node.tag, options);
            // log 'f_p_temp tag after format', p_tag
            if (p_tag.children.length == 1) {
                p_tag.tag = p_tag.children[0].tag;
                if (!(p_tag.children[0].isText || p_tag.children[0].textified)) {
                    p_tag.name = p_tag.children[0].name;
                    p_tag.source = p_tag.children[0].source;
                    p_tag.children = p_tag.children[0].children;
                }
                else {
                    if (p_tag.children[0].textified) {
                        p_tag.textified = p_tag.children[0].textified;
                        p_tag.name = p_tag.children[0].name;
                        p_tag.source = p_tag.children[0].source;
                    }
                    if (p_tag.children[0].isText) {
                        p_tag.isText = true;
                        p_tag.name = p_tag.children[0].name;
                        p_tag.source = p_tag.children[0].source;
                    }
                    p_tag.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property tag undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_tag)) {
        ret.name = getNodeText(p_tag);
    }
    else {
        throw new Error('TaggedTemplateExpression.tag must be textual:' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property quasi and set it in a var
    var p_quasi = null;
    if (typeof(node.quasi) !== 'undefined') {
        p_quasi = {
            textified: null, 
            isText: false, 
            ASTProp: 'quasi', 
            children: [
                
            ]
        };
        if (node.quasi == null) {
            p_quasi.text = "null";
        }
        else {
            if (!node.quasi.type) {
                throw 'Node quasi has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp quasi before format'
            format(p_quasi, node.quasi, options);
            // log 'f_p_temp quasi after format', p_quasi
            if (p_quasi.children.length == 1) {
                p_quasi.tag = p_quasi.children[0].tag;
                if (!(p_quasi.children[0].isText || p_quasi.children[0].textified)) {
                    p_quasi.name = p_quasi.children[0].name;
                    p_quasi.source = p_quasi.children[0].source;
                    p_quasi.children = p_quasi.children[0].children;
                }
                else {
                    if (p_quasi.children[0].textified) {
                        p_quasi.textified = p_quasi.children[0].textified;
                        p_quasi.name = p_quasi.children[0].name;
                        p_quasi.source = p_quasi.children[0].source;
                    }
                    if (p_quasi.children[0].isText) {
                        p_quasi.isText = true;
                        p_quasi.name = p_quasi.children[0].name;
                        p_quasi.source = p_quasi.children[0].source;
                    }
                    p_quasi.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property quasi undefined: ' + JSON.stringify(node, null, 2));
    }
    var i, i_items=p_quasi.children, i_len=p_quasi.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_quasi.children[i];
        ret.children.push(item);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TemplateElement
format.TemplateElement = function(parent, node, options) {
    var __isText = false;
    // log 'node : TemplateElement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '+', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TemplateElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // b( tail
    var lines = node.value.raw.split('\n');
    var i, i_items=lines, i_len=lines.length, line;
    for (i=0; i<i_len; i++) {
        line = lines[i];
        if (line[0] === ' ') {
            line = '\\b' + line.substr(1);
        }
        if (line[line.length-1] === ' ') {
            line = line.substr(0, line.length -1) + '\\b';
        }
        ret.children.push({
            tag: '+', 
            name: line + (( i < lines.length - 1) ? '\\n' : '' ), 
            children: [
                
            ]
        });
    }
    // f_p( value
    // f_p_p( value, cooked, optional
    // f_p_p( value, raw
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectPattern
format.ObjectPattern = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectPattern ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '{', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectPattern', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 'ObjectPattern enter options.mustBeText', options.mustBeText
    // process AST-node-property-collection properties and append ittfNode(s) to `ret`
    if (node.properties) {
        if (typeof node.properties.length === 'undefined') {
            throw new Error('Property node.properties must be an array');
        }
        var i, i_items=node.properties, i_len=node.properties.length, item;
        for (i=0; i<i_len; i++) {
            item = node.properties[i];
            item.__parent = {
                name: 'properties', 
                len: node.properties.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection properties undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'wizzifiers.js.ObjectPattern.ret', JSON.stringify(ret, null, 2)
    if (options.mustBeText) {
        if (setTextList(ret, ', ') && !!node.typeAnnotation == false) {
            ret.textified = '{' + ret.textified + '}';
            if (node.extra && node.extra.parenthesized == true) {
                ret.textified = '(' + ret.textified + ')';
            }
        }
        else {
            throw new Error("ObjectPattern. Cannot textify node as requested: " + JSON.stringify(node, null, 2));
        }
    }
    else {
        // process AST-node-property typeAnnotation and append ittfNode to `ret`
        if (node.typeAnnotation) {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            format(ret, node.typeAnnotation, options);
        }
        if (ret.children.length == 0) {
            if (node.extra && node.extra.parenthesized == true) {
                ret.name = ret.textified = '({})';
            }
            else {
                ret.name = ret.textified = '{}';
            }
        }
        else {
            if (node.extra && node.extra.parenthesized == true) {
                var temp = {
                    tag: '(', 
                    children: [
                        ret
                    ]
                };
                ret = temp;
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ArrayPattern
format.ArrayPattern = function(parent, node, options) {
    var __isText = false;
    // log 'node : ArrayPattern ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ArrayPattern', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection elements and append ittfNode(s) to `ret`
    if (node.elements) {
        if (typeof node.elements.length === 'undefined') {
            throw new Error('Property node.elements must be an array');
        }
        var i, i_items=node.elements, i_len=node.elements.length, item;
        for (i=0; i<i_len; i++) {
            item = node.elements[i];
            item.__parent = {
                name: 'elements', 
                len: node.elements.length
            };
            format(ret, item, options);
        }
    }
    if (setTextList(ret, ', ')) {
        ret.textified = '[' + ret.textified + ']';
        // log '*** ArrayPattern len, textified: ', ret.children.length, ret.textified
    }
    else {
        throw new Error('ArrayPattern must be textual: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node RestElement
format.RestElement = function(parent, node, options) {
    var __isText = true;
    // log 'node : RestElement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '...', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'RestElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property argument and append ittfNode to `ret`
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options);
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    ret.textified = '...' + ret.name;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node AssignmentPattern
format.AssignmentPattern = function(parent, node, options) {
    var __isText = false;
    // log 'node : AssignmentPattern ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'AssignmentPattern', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined') {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
        };
        if (node.left == null) {
            p_left.text = "null";
        }
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp left before format'
            format(p_left, node.left, options);
            // log 'f_p_temp left after format', p_left
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    p_left.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property left undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined') {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
        };
        if (node.right == null) {
            p_right.text = "null";
        }
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp right before format'
            format(p_right, node.right, options);
            // log 'f_p_temp right after format', p_right
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    p_right.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property right undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'AssignmentPattern.p_left', JSON.stringify(p_left, null, 2)
    // log 'AssignmentPattern.p_right', JSON.stringify(p_right, null, 2)
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left) + ' ' + (node.operator || '=') + ' ';
        if (isTextualNode(p_right)) {
            ret.name += getNodeText(p_right);
        }
        else {
            ret.children.push(p_right);
        }
    }
    else {
        ret.children.push(p_left);
        ret.children.push(p_right);
    }
    // log 'AssignmentPattern', JSON.stringify(ret, null, 2)
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Class
format.Class = function(parent, node, options) {
    var __isText = false;
    // log 'node : Class ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'class', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Class', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property superClass and set it in a var
    var p_superClass = null;
    if (typeof(node.superClass) !== 'undefined') {
        p_superClass = {
            textified: null, 
            isText: false, 
            ASTProp: 'superClass', 
            children: [
                
            ]
        };
        if (node.superClass == null) {
            p_superClass.text = "null";
        }
        else {
            if (!node.superClass.type) {
                throw 'Node superClass has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp superClass before format'
            format(p_superClass, node.superClass, options);
            // log 'f_p_temp superClass after format', p_superClass
            if (p_superClass.children.length == 1) {
                p_superClass.tag = p_superClass.children[0].tag;
                if (!(p_superClass.children[0].isText || p_superClass.children[0].textified)) {
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = p_superClass.children[0].children;
                }
                else {
                    if (p_superClass.children[0].textified) {
                        p_superClass.textified = p_superClass.children[0].textified;
                        p_superClass.name = p_superClass.children[0].name;
                        p_superClass.source = p_superClass.children[0].source;
                    }
                    if (p_superClass.children[0].isText) {
                        p_superClass.isText = true;
                        p_superClass.name = p_superClass.children[0].name;
                        p_superClass.source = p_superClass.children[0].source;
                    }
                    p_superClass.children = [];
                }
            }
        }
    }
    if (p_superClass) {
        if (isTextualNode(p_superClass)) {
            ret.children.push({
                tag: 'super', 
                name: getNodeText(p_superClass)
            });
        }
        else {
            throw new Error('Class. superClass must be textual: ' + JSON.stringify(node, null, 2));
        }
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ClassBody
format.ClassBody = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassBody ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node ClassMethod
format.ClassMethod = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassMethod ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassMethod', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    var p_key = {
        textified: null, 
        isText: false, 
        ASTProp: 'key', 
        children: [
            
        ]
    };
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_key, node.key, options);
        p_key.tag = 'key';
        ret.children.push(p_key);
        if (p_key.children.length == 1) {
            // log '*** f_p_tag key children[0].textified', p_key.children[0].textified
            // log '*** f_p_tag key children[0].isText', p_key.children[0].isText
            // log '*** f_p_tag key children[0].name', p_key.children[0].name
            if (p_key.children[0].textified) {
                p_key.textified = p_key.children[0].textified;
            }
            if (p_key.children[0].isText) {
                p_key.isText = true;
                p_key.name = p_key.children[0].name;
                p_key.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property key/key not managed by f_p_tag');
            }
        */
    }
    // s( kind
    // enum "constructor" | "method" | "get" | "set"
    // b( computed
    // log 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
        });
    }
    if (node.accessibility) {
        ret.children.push({
            tag: ':' + node.accessibility, 
            name: '', 
            children: [
                
            ]
        });
    }
    // b( generator
    // b( async
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.tag = ret.tag == 'constructor' ? 'ctor' : (ret.tag == 'method' ? 'm' : ret.tag);
    if (node.async) {
        ret.tag = 'async-' + ret.tag;
    }
    setNameFromChildByTag(ret, 'key', true);
    if (ret.tag === 'ctor') {
        ret.name = '';
    }
    else if (node.computed) {
        ret.name = '[' + ret.name + ']';
    }
    /**
        VIA
        replaceChildrenOfChildWhenText(ret, getChildPosByTag(ret, 'params'), 'param')*/
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ClassPrivateMethod
format.ClassPrivateMethod = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassPrivateMethod ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: node.kind, 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassPrivateMethod', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property key and append ittfNode to `ret`
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.key, options);
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    // s( kind, "method" | "get" | "set"
    // log 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
        });
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    ret.tag = ret.tag == 'method' ? 'm' : ret.tag;
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ClassProperty
format.ClassProperty = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassProperty ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'p', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property key and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempkey = {
            children: [
                
            ]
        };
        format(tempkey, node.key, options);
        /**
            if (tempkey .children.length > 0) {
                throw 'node.key must result zero node, returned: ' + tempkey.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempkey.children.length > 0) {
            appto.name = tempkey.children[0].name;
        }
        else {
            appto.name = tempkey.name;
        }
    }
    // process AST-node-property value and set it in a var
    var p_value = null;
    if (typeof(node.value) !== 'undefined') {
        p_value = {
            textified: null, 
            isText: false, 
            ASTProp: 'value', 
            children: [
                
            ]
        };
        if (node.value == null) {
            p_value.text = "null";
        }
        else {
            if (!node.value.type) {
                throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp value before format'
            format(p_value, node.value, options);
            // log 'f_p_temp value after format', p_value
            if (p_value.children.length == 1) {
                p_value.tag = p_value.children[0].tag;
                if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                    p_value.name = p_value.children[0].name;
                    p_value.source = p_value.children[0].source;
                    p_value.children = p_value.children[0].children;
                }
                else {
                    if (p_value.children[0].textified) {
                        p_value.textified = p_value.children[0].textified;
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                    }
                    if (p_value.children[0].isText) {
                        p_value.isText = true;
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                    }
                    p_value.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined') {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
        };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeAnnotation before format'
            format(p_typeAnnotation, node.typeAnnotation, options);
            // log 'f_p_temp typeAnnotation after format', p_typeAnnotation
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    p_typeAnnotation.children = [];
                }
            }
        }
    }
    // log 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
        });
    }
    if (node.readonly) {
        ret.children.push({
            tag: ':readonly', 
            name: '', 
            children: [
                
            ]
        });
    }
    if (node.accessibility) {
        ret.children.push({
            tag: ':' + node.accessibility, 
            name: '', 
            children: [
                
            ]
        });
    }
    if (p_value.tag === '=>') {
        ret.tag = p_value.tag;
        if (p_typeAnnotation) {
            ret.children.push(p_typeAnnotation);
            var i, i_items=p_value.children, i_len=p_value.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_value.children[i];
                ret.children.push(item);
            }
        }
        else {
            ret.children = p_value.children;
        }
    }
    else {
        if (p_typeAnnotation) {
            ret.children.push(p_typeAnnotation);
        }
        if (node.computed) {
            ret.name = '[' + ret.name + ']';
        }
        else if (p_value.tag) {
            if (['@id', '@expr', 'literal'].indexOf(p_value.tag) > -1) {
                p_value.tag = '=';
            }
            ret.children.push(p_value);
        }
        else {
            // do nothing
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ClassPrivateProperty
format.ClassPrivateProperty = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassPrivateProperty ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'p', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassPrivateProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property key and append ittfNode to `ret`
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.key, options);
    }
    else {
        throw new Error('AST-node-property key undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property value and append ittfNode to `ret`
    if (node.value) {
        if (!node.value.type) {
            throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.value, options);
    }
    else {
        throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
        });
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ClassDeclaration
format.ClassDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'class', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // log 'node.abstract', node.abstract
    if (!!node.abstract == true) {
        ret.children.push({
            tag: ':abstract', 
            children: [
                
            ]
        });
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property superClass and set it in a var
    var p_superClass = null;
    if (typeof(node.superClass) !== 'undefined') {
        p_superClass = {
            textified: null, 
            isText: false, 
            ASTProp: 'superClass', 
            children: [
                
            ]
        };
        if (node.superClass == null) {
            p_superClass.text = "null";
        }
        else {
            if (!node.superClass.type) {
                throw 'Node superClass has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp superClass before format'
            format(p_superClass, node.superClass, options);
            // log 'f_p_temp superClass after format', p_superClass
            if (p_superClass.children.length == 1) {
                p_superClass.tag = p_superClass.children[0].tag;
                if (!(p_superClass.children[0].isText || p_superClass.children[0].textified)) {
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = p_superClass.children[0].children;
                }
                else {
                    if (p_superClass.children[0].textified) {
                        p_superClass.textified = p_superClass.children[0].textified;
                        p_superClass.name = p_superClass.children[0].name;
                        p_superClass.source = p_superClass.children[0].source;
                    }
                    if (p_superClass.children[0].isText) {
                        p_superClass.isText = true;
                        p_superClass.name = p_superClass.children[0].name;
                        p_superClass.source = p_superClass.children[0].source;
                    }
                    p_superClass.children = [];
                }
            }
        }
    }
    // process AST-node-property superTypeParameters and set it in a var
    var p_superTypeParameters = null;
    if (typeof(node.superTypeParameters) !== 'undefined') {
        p_superTypeParameters = {
            textified: null, 
            isText: false, 
            ASTProp: 'superTypeParameters', 
            children: [
                
            ]
        };
        if (node.superTypeParameters == null) {
            p_superTypeParameters.text = "null";
        }
        else {
            if (!node.superTypeParameters.type) {
                throw 'Node superTypeParameters has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp superTypeParameters before format'
            format(p_superTypeParameters, node.superTypeParameters, options);
            // log 'f_p_temp superTypeParameters after format', p_superTypeParameters
            if (p_superTypeParameters.children.length == 1) {
                p_superTypeParameters.tag = p_superTypeParameters.children[0].tag;
                if (!(p_superTypeParameters.children[0].isText || p_superTypeParameters.children[0].textified)) {
                    p_superTypeParameters.name = p_superTypeParameters.children[0].name;
                    p_superTypeParameters.source = p_superTypeParameters.children[0].source;
                    p_superTypeParameters.children = p_superTypeParameters.children[0].children;
                }
                else {
                    if (p_superTypeParameters.children[0].textified) {
                        p_superTypeParameters.textified = p_superTypeParameters.children[0].textified;
                        p_superTypeParameters.name = p_superTypeParameters.children[0].name;
                        p_superTypeParameters.source = p_superTypeParameters.children[0].source;
                    }
                    if (p_superTypeParameters.children[0].isText) {
                        p_superTypeParameters.isText = true;
                        p_superTypeParameters.name = p_superTypeParameters.children[0].name;
                        p_superTypeParameters.source = p_superTypeParameters.children[0].source;
                    }
                    p_superTypeParameters.children = [];
                }
            }
        }
    }
    var p_super;
    if (p_superClass) {
        if (isTextualNode(p_superClass)) {
            p_super = {
                tag: 'super', 
                name: getNodeText(p_superClass), 
                children: [
                    
                ]
            };
            ret.children.push(p_super);
        }
        else if (p_superClass.text === 'null') {
            // OK
        }
        else {
            throw new Error('Class. superClass must be textual: ' + JSON.stringify(node, null, 2));
        }
    }
    if (p_superTypeParameters) {
        if (p_super) {
            var i, i_items=p_superTypeParameters.children, i_len=p_superTypeParameters.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_superTypeParameters.children[i];
                if (item.tag !== ':param') {
                    p_super.children.push({
                        tag: ':param', 
                        name: '', 
                        children: [
                            item
                        ]
                    });
                }
                else {
                    p_super.children.push(item);
                }
            }
        }
        else {
            p_superTypeParameters.tag = ':super-type-params';
            ret.children.push(p_superTypeParameters);
        }
    }
    // process AST-node-property-collection implements and
    // embed its array of nodes in a temp var
    if (node.implements) {
        if (typeof node.implements.length === 'undefined') {
            throw new Error('Property node.implements must be an array');
        }
        var p_implements = {
            tag: 'false', 
            children: [
                
            ]
        };
        var i, i_items=node.implements, i_len=node.implements.length, item;
        for (i=0; i<i_len; i++) {
            item = node.implements[i];
            item.__parent = {
                name: 'implements', 
                len: node.implements.length
            };
            format(p_implements, item, options);
        }
    }
    if (p_implements) {
        var i, i_items=p_implements.children, i_len=p_implements.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_implements.children[i];
            item.tag = ':implements';
            ret.children.push(item);
        }
    }
    // process AST-node-property-collection decorators and append ittfNode(s) to `ret`
    if (node.decorators) {
        if (typeof node.decorators.length === 'undefined') {
            throw new Error('Property node.decorators must be an array');
        }
        var i, i_items=node.decorators, i_len=node.decorators.length, item;
        for (i=0; i<i_len; i++) {
            item = node.decorators[i];
            item.__parent = {
                name: 'decorators', 
                len: node.decorators.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.declare) {
        ret = {
            tag: ':declare', 
            name: '', 
            children: [
                ret
            ]
        };
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ClassExpression
format.ClassExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'class', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property superClass and set it in a var
    var p_superClass = null;
    if (typeof(node.superClass) !== 'undefined') {
        p_superClass = {
            textified: null, 
            isText: false, 
            ASTProp: 'superClass', 
            children: [
                
            ]
        };
        if (node.superClass == null) {
            p_superClass.text = "null";
        }
        else {
            if (!node.superClass.type) {
                throw 'Node superClass has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp superClass before format'
            format(p_superClass, node.superClass, options);
            // log 'f_p_temp superClass after format', p_superClass
            if (p_superClass.children.length == 1) {
                p_superClass.tag = p_superClass.children[0].tag;
                if (!(p_superClass.children[0].isText || p_superClass.children[0].textified)) {
                    p_superClass.name = p_superClass.children[0].name;
                    p_superClass.source = p_superClass.children[0].source;
                    p_superClass.children = p_superClass.children[0].children;
                }
                else {
                    if (p_superClass.children[0].textified) {
                        p_superClass.textified = p_superClass.children[0].textified;
                        p_superClass.name = p_superClass.children[0].name;
                        p_superClass.source = p_superClass.children[0].source;
                    }
                    if (p_superClass.children[0].isText) {
                        p_superClass.isText = true;
                        p_superClass.name = p_superClass.children[0].name;
                        p_superClass.source = p_superClass.children[0].source;
                    }
                    p_superClass.children = [];
                }
            }
        }
    }
    if (p_superClass) {
        if (isTextualNode(p_superClass)) {
            ret.children.push({
                tag: 'super', 
                name: getNodeText(p_superClass), 
                children: [
                    
                ]
            });
        }
        else {
            throw new Error('Class. superClass must be textual: ' + JSON.stringify(node, null, 2));
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    else {
        throw new Error('AST-node-property body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node MetaProperty
format.MetaProperty = function(parent, node, options) {
    var __isText = false;
    // log 'node : MetaProperty ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'meta', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'MetaProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property meta and append ittfNode to `ret`
    if (node.meta) {
        if (!node.meta.type) {
            throw 'Node meta has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.meta, options);
    }
    else {
        throw new Error('AST-node-property meta undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property property and append ittfNode to `ret`
    if (node.property) {
        if (!node.property.type) {
            throw 'Node property has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.property, options);
    }
    else {
        throw new Error('AST-node-property property undefined: ' + JSON.stringify(node, null, 2));
    }
    var got_text_2 = false;
    if (isChildrenCount(ret, 2)) {
        if ((ret.children[0].textified || ret.children[0].isText) && (ret.children[1].textified || ret.children[1].isText)) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            var c2 = ret.children[1].textified || ret.children[1].name;
            ret.name = c1 + '.' + c2;
            ret.textified = ret.name;
            ret.children = [];
            got_text_2 = true;
            got_text_2 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ModuleDeclaration
format.ModuleDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : ModuleDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'module', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ModuleDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // A module `import` or `export` declaration.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ImportDeclaration
format.ImportDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : ImportDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'import', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection specifiers and append ittfNode(s) to `ret`
    if (node.specifiers) {
        if (typeof node.specifiers.length === 'undefined') {
            throw new Error('Property node.specifiers must be an array');
        }
        var i, i_items=node.specifiers, i_len=node.specifiers.length, item;
        for (i=0; i<i_len; i++) {
            item = node.specifiers[i];
            item.__parent = {
                name: 'specifiers', 
                len: node.specifiers.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection specifiers undefined: ' + JSON.stringify(node, null, 2));
    }
    var p_source = {
        textified: null, 
        isText: false, 
        ASTProp: 'source', 
        children: [
            
        ]
    };
    if (node.source) {
        if (!node.source.type) {
            throw 'Node source has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_source, node.source, options);
        p_source.tag = 'from';
        ret.children.push(p_source);
        if (p_source.children.length == 1) {
            // log '*** f_p_tag source children[0].textified', p_source.children[0].textified
            // log '*** f_p_tag source children[0].isText', p_source.children[0].isText
            // log '*** f_p_tag source children[0].name', p_source.children[0].name
            if (p_source.children[0].textified) {
                p_source.textified = p_source.children[0].textified;
            }
            if (p_source.children[0].isText) {
                p_source.isText = true;
                p_source.name = p_source.children[0].name;
                p_source.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property source/from not managed by f_p_tag');
            }
        */
    }
    // An import declaration, e.g., `import foo from "mod"`.
    //
    var xdefault = getChildByTag(ret, 'default');
    if (xdefault) {
        ret.name = xdefault.name;
        removeChildByTag(ret, 'default');
    }
    if (ret.children.length == 1 && ret.children[0].tag === 'from') {
        if (ret.name && ret.name.length > 0) {
            ret.name += ' from';
        }
        ret.name += ' '	+ ret.children[0].name;
        removeChildByTag(ret, 'from');
    }
    if (node.importKind === 'type') {
        ret.tag = ':import-type';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ImportSpecifier
format.ImportSpecifier = function(parent, node, options) {
    var __isText = false;
    // log 'node : ImportSpecifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property local and append ittfNode to `ret`
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.local, options);
    }
    else {
        throw new Error('AST-node-property local undefined: ' + JSON.stringify(node, null, 2));
    }
    // Process AST-node-property imported and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.imported) {
        if (!node.imported.type) {
            throw 'Node imported has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempimported = {
            children: [
                
            ]
        };
        format(tempimported, node.imported, options);
        /**
            if (tempimported .children.length > 0) {
                throw 'node.imported must result zero node, returned: ' + tempimported.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempimported.children.length > 0) {
            appto.name = tempimported.children[0].name;
        }
        else {
            appto.name = tempimported.name;
        }
    }
    // f_p( local, true, Identifier
    // An imported variable binding, e.g., `{foo}` in `import {foo} from "mod"` or `{foo as bar}` in `import {foo as bar} from "mod"`.
    // The `imported` field refers to the name of the export imported from the module.
    // The `local` field refers to the binding imported into the local module scope.
    // If it is a basic named import, such as in `import {foo} from "mod"`, both `imported` and `local` are equivalent `Identifier` nodes in this case an `Identifier` node representing `foo`.
    // If it is an aliased import, such as in `import {foo as bar} from "mod"`, the `imported` field is an `Identifier` node representing `foo`,
    // and the `local` field is an `Identifier` node representing `bar`.
    if (ret.children[0].name !== ret.name) {
        ret.children[0].tag = 'as';
    }
    else {
        ret.children = [];
    }
    if (node.importKind === 'type') {
        ret.tag = ':type';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ImportDefaultSpecifier
format.ImportDefaultSpecifier = function(parent, node, options) {
    var __isText = false;
    // log 'node : ImportDefaultSpecifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'default', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportDefaultSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property local and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        var templocal = {
            children: [
                
            ]
        };
        format(templocal, node.local, options);
        /**
            if (templocal .children.length > 0) {
                throw 'node.local must result zero node, returned: ' + templocal.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (templocal.children.length > 0) {
            appto.name = templocal.children[0].name;
        }
        else {
            appto.name = templocal.name;
        }
    }
    // A default import specifier, e.g., `foo` in `import foo from "mod.js"`.
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ImportNamespaceSpecifier
format.ImportNamespaceSpecifier = function(parent, node, options) {
    var __isText = false;
    // log 'node : ImportNamespaceSpecifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'as', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ImportNamespaceSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property local and append ittfNode to `ret`
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.local, options);
    }
    else {
        throw new Error('AST-node-property local undefined: ' + JSON.stringify(node, null, 2));
    }
    // A namespace import specifier, e.g., `* as foo` in `import * as foo from "mod.js"`.
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = c1;
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExportNamedDeclaration
format.ExportNamedDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExportNamedDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'export', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportNamedDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property declaration and append ittfNode to `ret`
    if (node.declaration) {
        if (!node.declaration.type) {
            throw 'Node declaration has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.declaration, options);
    }
    // process AST-node-property-collection specifiers and append ittfNode(s) to `ret`
    if (node.specifiers) {
        if (typeof node.specifiers.length === 'undefined') {
            throw new Error('Property node.specifiers must be an array');
        }
        var i, i_items=node.specifiers, i_len=node.specifiers.length, item;
        for (i=0; i<i_len; i++) {
            item = node.specifiers[i];
            item.__parent = {
                name: 'specifiers', 
                len: node.specifiers.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection specifiers undefined: ' + JSON.stringify(node, null, 2));
    }
    var p_source = {
        textified: null, 
        isText: false, 
        ASTProp: 'source', 
        children: [
            
        ]
    };
    if (node.source) {
        if (!node.source.type) {
            throw 'Node source has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_source, node.source, options);
        p_source.tag = 'from';
        ret.children.push(p_source);
        if (p_source.children.length == 1) {
            // log '*** f_p_tag source children[0].textified', p_source.children[0].textified
            // log '*** f_p_tag source children[0].isText', p_source.children[0].isText
            // log '*** f_p_tag source children[0].name', p_source.children[0].name
            if (p_source.children[0].textified) {
                p_source.textified = p_source.children[0].textified;
            }
            if (p_source.children[0].isText) {
                p_source.isText = true;
                p_source.name = p_source.children[0].name;
                p_source.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property source/from not managed by f_p_tag');
            }
        */
    }
    var xdefault = getChildByTag(ret, 'default');
    if (xdefault) {
        ret.name = xdefault.name;
        removeChildByTag(ret, 'default');
    }
    // An export named declaration, e.g., `export {foo, bar}`, `export {foo} from "mod"`, `export var foo = 1` or `export * as foo from "bar"`.
    // _Note, Having `declaration` populated with non-empty `specifiers` or non-null `source` results in an invalid state._
    if (node.exportKind === 'type') {
        ret.tag = ':export-type';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExportSpecifier
format.ExportSpecifier = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExportSpecifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property exported and append ittfNode to `ret`
    if (node.exported) {
        if (!node.exported.type) {
            throw 'Node exported has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.exported, options);
    }
    else {
        throw new Error('AST-node-property exported undefined: ' + JSON.stringify(node, null, 2));
    }
    // Process AST-node-property local and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.local) {
        if (!node.local.type) {
            throw 'Node local has no type: ' + JSON.stringify(node, null, 2);
        }
        var templocal = {
            children: [
                
            ]
        };
        format(templocal, node.local, options);
        /**
            if (templocal .children.length > 0) {
                throw 'node.local must result zero node, returned: ' + templocal.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (templocal.children.length > 0) {
            appto.name = templocal.children[0].name;
        }
        else {
            appto.name = templocal.name;
        }
    }
    // An exported variable binding, e.g., `{foo}` in `export {foo}` or `{bar as foo}` in `export {bar as foo}`. The `exported` field refers to the name exported in the module.
    // The `local` field refers to the binding into the local module scope. If it is a basic named export, such as in `export {foo}`, both `exported` and `local` are equivalent `Identifier` nodes
    // in this case an `Identifier` node representing `foo`.
    // If it is an aliased export, such as in `export {bar as foo}`, the `exported` field is an `Identifier` node representing `foo`,
    // and the `local` field is an `Identifier` node representing `bar`.
    if (ret.children[0].name !== ret.name) {
        ret.children[0].tag = 'as';
    }
    else {
        ret.children = [];
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExportDefaultSpecifier
format.ExportDefaultSpecifier = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExportDefaultSpecifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'default', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportDefaultSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property exported and set it in a var
    var p_exported = null;
    if (typeof(node.exported) !== 'undefined') {
        p_exported = {
            textified: null, 
            isText: false, 
            ASTProp: 'exported', 
            children: [
                
            ]
        };
        if (node.exported == null) {
            p_exported.text = "null";
        }
        else {
            if (!node.exported.type) {
                throw 'Node exported has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp exported before format'
            format(p_exported, node.exported, options);
            // log 'f_p_temp exported after format', p_exported
            if (p_exported.children.length == 1) {
                p_exported.tag = p_exported.children[0].tag;
                if (!(p_exported.children[0].isText || p_exported.children[0].textified)) {
                    p_exported.name = p_exported.children[0].name;
                    p_exported.source = p_exported.children[0].source;
                    p_exported.children = p_exported.children[0].children;
                }
                else {
                    if (p_exported.children[0].textified) {
                        p_exported.textified = p_exported.children[0].textified;
                        p_exported.name = p_exported.children[0].name;
                        p_exported.source = p_exported.children[0].source;
                    }
                    if (p_exported.children[0].isText) {
                        p_exported.isText = true;
                        p_exported.name = p_exported.children[0].name;
                        p_exported.source = p_exported.children[0].source;
                    }
                    p_exported.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property exported undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_exported)) {
        ret.name = getNodeText(p_exported);
    }
    else {
        ret.children.push(p_exported);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExportDefaultDeclaration
format.ExportDefaultDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExportDefaultDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'export-default', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportDefaultDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // An export default declaration, e.g., `export default function () {}` or `export default 1`.
    // process AST-node-property declaration and set it in a var
    var p_declaration = null;
    if (typeof(node.declaration) !== 'undefined') {
        p_declaration = {
            textified: null, 
            isText: false, 
            ASTProp: 'declaration', 
            children: [
                
            ]
        };
        if (node.declaration == null) {
            p_declaration.text = "null";
        }
        else {
            if (!node.declaration.type) {
                throw 'Node declaration has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp declaration before format'
            format(p_declaration, node.declaration, options);
            // log 'f_p_temp declaration after format', p_declaration
            if (p_declaration.children.length == 1) {
                p_declaration.tag = p_declaration.children[0].tag;
                if (!(p_declaration.children[0].isText || p_declaration.children[0].textified)) {
                    p_declaration.name = p_declaration.children[0].name;
                    p_declaration.source = p_declaration.children[0].source;
                    p_declaration.children = p_declaration.children[0].children;
                }
                else {
                    if (p_declaration.children[0].textified) {
                        p_declaration.textified = p_declaration.children[0].textified;
                        p_declaration.name = p_declaration.children[0].name;
                        p_declaration.source = p_declaration.children[0].source;
                    }
                    if (p_declaration.children[0].isText) {
                        p_declaration.isText = true;
                        p_declaration.name = p_declaration.children[0].name;
                        p_declaration.source = p_declaration.children[0].source;
                    }
                    p_declaration.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property declaration undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_declaration)) {
        ret.name = getNodeText(p_declaration);
    }
    else {
        ret.children.push(p_declaration);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExportNamespaceSpecifier
format.ExportNamespaceSpecifier = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExportNamespaceSpecifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'as', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportNamespaceSpecifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property exported and set it in a var
    var p_exported = null;
    if (typeof(node.exported) !== 'undefined') {
        p_exported = {
            textified: null, 
            isText: false, 
            ASTProp: 'exported', 
            children: [
                
            ]
        };
        if (node.exported == null) {
            p_exported.text = "null";
        }
        else {
            if (!node.exported.type) {
                throw 'Node exported has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp exported before format'
            format(p_exported, node.exported, options);
            // log 'f_p_temp exported after format', p_exported
            if (p_exported.children.length == 1) {
                p_exported.tag = p_exported.children[0].tag;
                if (!(p_exported.children[0].isText || p_exported.children[0].textified)) {
                    p_exported.name = p_exported.children[0].name;
                    p_exported.source = p_exported.children[0].source;
                    p_exported.children = p_exported.children[0].children;
                }
                else {
                    if (p_exported.children[0].textified) {
                        p_exported.textified = p_exported.children[0].textified;
                        p_exported.name = p_exported.children[0].name;
                        p_exported.source = p_exported.children[0].source;
                    }
                    if (p_exported.children[0].isText) {
                        p_exported.isText = true;
                        p_exported.name = p_exported.children[0].name;
                        p_exported.source = p_exported.children[0].source;
                    }
                    p_exported.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property exported undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_exported)) {
        ret.name = getNodeText(p_exported);
    }
    else {
        ret.children.push(p_exported);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExportAllDeclaration
format.ExportAllDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExportAllDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'export', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExportAllDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    ret.name = '*';
    var p_source = {
        textified: null, 
        isText: false, 
        ASTProp: 'source', 
        children: [
            
        ]
    };
    if (node.source) {
        if (!node.source.type) {
            throw 'Node source has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_source, node.source, options);
        p_source.tag = 'from';
        ret.children.push(p_source);
        if (p_source.children.length == 1) {
            // log '*** f_p_tag source children[0].textified', p_source.children[0].textified
            // log '*** f_p_tag source children[0].isText', p_source.children[0].isText
            // log '*** f_p_tag source children[0].name', p_source.children[0].name
            if (p_source.children[0].textified) {
                p_source.textified = p_source.children[0].textified;
            }
            if (p_source.children[0].isText) {
                p_source.isText = true;
                p_source.name = p_source.children[0].name;
                p_source.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property source/from not managed by f_p_tag');
            }
        */
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node CommentBlock
format.CommentBlock = function(parent, node, options) {
    var __isText = false;
    // log 'node : CommentBlock ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '#', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CommentBlock', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    var values = verify.replaceAll(node.value, '\r\n', '\n').split('\n');
    // log 'options.replaceds', options.replaceds
    var i, i_items=values, i_len=values.length, value;
    for (i=0; i<i_len; i++) {
        value = values[i];
        var v = codeReplacer.restore(value, options.replaceds);
        ret.children.push({
            tag: '#', 
            name: v, 
            children: [
                
            ]
        });
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node CommentLine
format.CommentLine = function(parent, node, options) {
    var __isText = false;
    // log 'node : CommentLine ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '#', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'CommentLine', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 'options.replaceds', options.replaceds
    var v = codeReplacer.restore(node.value, options.replaceds);
    ret.name = v;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXAttribute
format.JSXAttribute = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXAttribute ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXAttribute', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    options.stateAST.push('JSXAttribute');
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (typeof(node.name) !== 'undefined') {
        p_name = {
            textified: null, 
            isText: false, 
            ASTProp: 'name', 
            children: [
                
            ]
        };
        if (node.name == null) {
            p_name.text = "null";
        }
        else {
            if (!node.name.type) {
                throw 'Node name has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp name before format'
            format(p_name, node.name, options);
            // log 'f_p_temp name after format', p_name
            if (p_name.children.length == 1) {
                p_name.tag = p_name.children[0].tag;
                if (!(p_name.children[0].isText || p_name.children[0].textified)) {
                    p_name.name = p_name.children[0].name;
                    p_name.source = p_name.children[0].source;
                    p_name.children = p_name.children[0].children;
                }
                else {
                    if (p_name.children[0].textified) {
                        p_name.textified = p_name.children[0].textified;
                        p_name.name = p_name.children[0].name;
                        p_name.source = p_name.children[0].source;
                    }
                    if (p_name.children[0].isText) {
                        p_name.isText = true;
                        p_name.name = p_name.children[0].name;
                        p_name.source = p_name.children[0].source;
                    }
                    p_name.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property value and set it in a var
    var p_value = null;
    if (typeof(node.value) !== 'undefined') {
        p_value = {
            textified: null, 
            isText: false, 
            ASTProp: 'value', 
            children: [
                
            ]
        };
        if (node.value == null) {
            p_value.text = "null";
        }
        else {
            if (!node.value.type) {
                throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp value before format'
            format(p_value, node.value, options);
            // log 'f_p_temp value after format', p_value
            if (p_value.children.length == 1) {
                p_value.tag = p_value.children[0].tag;
                if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                    p_value.name = p_value.children[0].name;
                    p_value.source = p_value.children[0].source;
                    p_value.children = p_value.children[0].children;
                }
                else {
                    if (p_value.children[0].textified) {
                        p_value.textified = p_value.children[0].textified;
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                    }
                    if (p_value.children[0].isText) {
                        p_value.isText = true;
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                    }
                    p_value.children = [];
                }
            }
        }
    }
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        throw new Error('JSXAttribute.name must be textual:' + JSON.stringify(node, null, 2));
    }
    // log 'JSXAttribute.p_value', p_value
    if (p_value) {
        if (isTextualNode(p_value)) {
            ret.name += ' ' + getNodeText(p_value);
        }
        else if (p_value != null && p_value.text !== 'null') {
            ret.children.push(p_value);
        }
    }
    options.stateAST.pop();
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXClosingElement
format.JSXClosingElement = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXClosingElement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'jsx-close', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXClosingElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // name JSXIdentifier | JSXMemberExpression
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXElement
format.JSXElement = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXElement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'jsx-element', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property openingElement and set it in a var
    var p_openingElement = null;
    if (typeof(node.openingElement) !== 'undefined') {
        p_openingElement = {
            textified: null, 
            isText: false, 
            ASTProp: 'openingElement', 
            children: [
                
            ]
        };
        if (node.openingElement == null) {
            p_openingElement.text = "null";
        }
        else {
            if (!node.openingElement.type) {
                throw 'Node openingElement has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp openingElement before format'
            format(p_openingElement, node.openingElement, options);
            // log 'f_p_temp openingElement after format', p_openingElement
            if (p_openingElement.children.length == 1) {
                p_openingElement.tag = p_openingElement.children[0].tag;
                if (!(p_openingElement.children[0].isText || p_openingElement.children[0].textified)) {
                    p_openingElement.name = p_openingElement.children[0].name;
                    p_openingElement.source = p_openingElement.children[0].source;
                    p_openingElement.children = p_openingElement.children[0].children;
                }
                else {
                    if (p_openingElement.children[0].textified) {
                        p_openingElement.textified = p_openingElement.children[0].textified;
                        p_openingElement.name = p_openingElement.children[0].name;
                        p_openingElement.source = p_openingElement.children[0].source;
                    }
                    if (p_openingElement.children[0].isText) {
                        p_openingElement.isText = true;
                        p_openingElement.name = p_openingElement.children[0].name;
                        p_openingElement.source = p_openingElement.children[0].source;
                    }
                    p_openingElement.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property openingElement undefined: ' + JSON.stringify(node, null, 2));
    }
    // f_p( closingElement, true, JSXClosingElement
    // process AST-node-property-collection children and
    // embed its array of nodes in a temp var
    if (node.children) {
        if (typeof node.children.length === 'undefined') {
            throw new Error('Property node.children must be an array');
        }
        var p_children = {
            tag: 'true', 
            children: [
                
            ]
        };
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            item.__parent = {
                name: 'children', 
                len: node.children.length
            };
            format(p_children, item, options);
        }
    }
    // log 'p_openingElement', p_openingElement
    // log 'p_children', p_children
    if (p_openingElement.name && p_openingElement.name.length > 0) {
        var char = p_openingElement.name[0];
        if (char == char.toUpperCase()) {
            ret.tag = '< ' + p_openingElement.name;
        }
        else {
            ret.tag = p_openingElement.name;
        }
        ret.children = p_openingElement.children;
    }
    else {
        ret.tag = '<';
        ret.children = p_openingElement.children;
    }
    // log 'JSXElement.ret', ret
    var isStyle = ret.tag === 'style';
    var i, i_items=p_children.children, i_len=p_children.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_children.children[i];
        // log 'JSXElement.children.item', item
        if (!(item.tag === '+' && item.name.trim().length == 0)) {
            if (isStyle) {
                // log 'isStyle', isStyle, item.children
                var j, j_items=item.children, j_len=item.children.length, c;
                for (j=0; j<j_len; j++) {
                    c = item.children[j];
                    if (c.tag === '`lit') {
                        ret.tag = "style-jsx";
                        options.wizziIncludes.push({
                            kind: 'css', 
                            node: ret, 
                            literal: getLiteral(c)
                        });
                        // log 'JSXElement.children.item.lit', c, getLiteral(c)
                    }
                }
                if (ret.tag !== "style-jsx") {
                    ret.children.push(item);
                }
            }
            else {
                ret.children.push(item);
            }
        }
    }
    if (ret.tag === "style-jsx") {
        var children = ret.children;
        ret.children = [];
        var i, i_items=children, i_len=children.length, item;
        for (i=0; i<i_len; i++) {
            item = children[i];
            if (item.tag === '{') {
            }
            else if (item.tag === '@' && item.name === 'jsx') {
            }
            else if (item.tag === '@' && item.name === 'global') {
                ret.children.push({
                    tag: 'global', 
                    children: [
                        
                    ]
                });
            }
            else {
                ret.children.push(item);
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXEmptyExpression
format.JSXEmptyExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXEmptyExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection innerComments and append ittfNode(s) to `ret`
    if (node.innerComments) {
        if (typeof node.innerComments.length === 'undefined') {
            throw new Error('Property node.innerComments must be an array');
        }
        var i, i_items=node.innerComments, i_len=node.innerComments.length, item;
        for (i=0; i<i_len; i++) {
            item = node.innerComments[i];
            item.__parent = {
                name: 'innerComments', 
                len: node.innerComments.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection innerComments undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node JSXExpressionContainer
format.JSXExpressionContainer = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXExpressionContainer ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXExpressionContainer', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    /**
        options.stateAST.push('JSXExpressionContainer')*/
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    if (isTextualNode(p_expression)) {
        ret.tag = '+';
        ret.name = '{' + getNodeText(p_expression) + '}';
        ret.textified = ret.name;
    }
    else {
        // log 'JSXExpressionContainer.options.stateAST', options.stateAST
        // log 'JSXExpressionContainer.options.p_expression', p_expression
        if (options.stateAST[options.stateAST.length-1] === 'JSXAttribute') {
            var __skip = true;
            parent.children.push(p_expression);
        }
        else {
            ret.tag = '{';
            ret.children.push(p_expression);
        }
    }
    /**
        options.stateAST.pop()*/
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXSpreadChild
format.JSXSpreadChild = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXSpreadChild ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXSpreadChild', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.tag = p_expression.tag;
    ret.name = '...' + p_expression.name;
    ret.children = p_expression.children;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXIdentifier
format.JSXIdentifier = function(parent, node, options) {
    var __isText = true;
    // log 'node : JSXIdentifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'jsx-ident', 
        name: '', 
        isText: true, 
        textified: null, 
        AST: 'JSXIdentifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // log 't/name.node.name, value: ', node.name, '
    if (typeof node.name !== 'undefined') {
        ret.name = node.name.toString();
    }
    // log 't/name ittf.ret', ret
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXMemberExpression
format.JSXMemberExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXMemberExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXMemberExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property object and append ittfNode to `ret`
    if (node.object) {
        if (!node.object.type) {
            throw 'Node object has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.object, options);
    }
    else {
        throw new Error('AST-node-property object undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property property and append ittfNode to `ret`
    if (node.property) {
        if (!node.property.type) {
            throw 'Node property has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.property, options);
    }
    else {
        throw new Error('AST-node-property property undefined: ' + JSON.stringify(node, null, 2));
    }
    var got_text_2 = false;
    if (isChildrenCount(ret, 2)) {
        if ((ret.children[0].textified || ret.children[0].isText) && (ret.children[1].textified || ret.children[1].isText)) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            var c2 = ret.children[1].textified || ret.children[1].name;
            ret.name = c1 + '.' + c2;
            ret.textified = ret.name;
            ret.children = [];
            got_text_2 = true;
            got_text_2 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXNamespacedName
format.JSXNamespacedName = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXNamespacedName ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'none', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXNamespacedName', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // namespace JSXIdentifier
    // name JSXIdentifier
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXOpeningElement
format.JSXOpeningElement = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXOpeningElement ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'jsx-open', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXOpeningElement', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property name and set it in a var
    var p_name = null;
    if (typeof(node.name) !== 'undefined') {
        p_name = {
            textified: null, 
            isText: false, 
            ASTProp: 'name', 
            children: [
                
            ]
        };
        if (node.name == null) {
            p_name.text = "null";
        }
        else {
            if (!node.name.type) {
                throw 'Node name has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp name before format'
            format(p_name, node.name, options);
            // log 'f_p_temp name after format', p_name
            if (p_name.children.length == 1) {
                p_name.tag = p_name.children[0].tag;
                if (!(p_name.children[0].isText || p_name.children[0].textified)) {
                    p_name.name = p_name.children[0].name;
                    p_name.source = p_name.children[0].source;
                    p_name.children = p_name.children[0].children;
                }
                else {
                    if (p_name.children[0].textified) {
                        p_name.textified = p_name.children[0].textified;
                        p_name.name = p_name.children[0].name;
                        p_name.source = p_name.children[0].source;
                    }
                    if (p_name.children[0].isText) {
                        p_name.isText = true;
                        p_name.name = p_name.children[0].name;
                        p_name.source = p_name.children[0].source;
                    }
                    p_name.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property name undefined: ' + JSON.stringify(node, null, 2));
    }
    // selfClosing boolean
    // log 'JSXOpeningElement p_name', p_name
    if (isTextualNode(p_name)) {
        ret.name = getNodeText(p_name);
    }
    else {
        // throw new Error('JSXOpeningElement.name must be textual:' + JSON.stringify(node, null, 2))
        var i, i_items=p_name.children, i_len=p_name.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_name.children[i];
            if (item.tag === 'jsx-ident') {
                ret.name = item.name;
            }
            else {
                ret.children.push(item);
            }
        }
    }
    // TODO ??? ts here ???
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a temp var
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        var p_parameters = {
            tag: 'parameters', 
            children: [
                
            ]
        };
        var i, i_items=node.parameters, i_len=node.parameters.length, item;
        for (i=0; i<i_len; i++) {
            item = node.parameters[i];
            item.__parent = {
                name: 'parameters', 
                len: node.parameters.length
            };
            format(p_parameters, item, options);
        }
    }
    if (p_parameters) {
        var i, i_items=p_parameters.children, i_len=p_parameters.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_parameters.children[i];
            ret.children.push(item);
        }
    }
    // process AST-node-property-collection attributes and
    // embed its array of nodes in a temp var
    if (node.attributes) {
        if (typeof node.attributes.length === 'undefined') {
            throw new Error('Property node.attributes must be an array');
        }
        var p_attributes = {
            tag: 'attributes', 
            children: [
                
            ]
        };
        var i, i_items=node.attributes, i_len=node.attributes.length, item;
        for (i=0; i<i_len; i++) {
            item = node.attributes[i];
            item.__parent = {
                name: 'attributes', 
                len: node.attributes.length
            };
            format(p_attributes, item, options);
        }
    }
    if (p_attributes) {
        var i, i_items=p_attributes.children, i_len=p_attributes.children.length, item;
        for (i=0; i<i_len; i++) {
            item = p_attributes.children[i];
            ret.children.push(item);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXSpreadAttribute
format.JSXSpreadAttribute = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXSpreadAttribute ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXSpreadAttribute', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property argument and append ittfNode to `ret`
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options);
    }
    else {
        throw new Error('AST-node-property argument undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'get_text_from_1_children', isChildrenCount(ret, 1)
    var got_text_1 = false;
    if (isChildrenCount(ret, 1)) {
        if (ret.children[0].textified || ret.children[0].isText) {
            var c1 = ret.children[0].textified || ret.children[0].name;
            ret.name = '{...' + c1 + "}";
            ret.textified = ret.name;
            ret.children = [];
            got_text_1 = true;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXText
format.JSXText = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXText ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '+', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXText', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // if node.value.trim().length == 0 || node.value === '\n' // 11/1/19
    if (node.value.trim().length == 0) {
        ret = null;
    }
    else {
        ret.name = verify.replaceAll(node.value, '\n', '\\n');
        if (ret.name[0] === ' ') {
            ret.name = '\\b' + ret.name;
        }
        if (ret.name[ret.name.length-1] === ' ') {
            ret.name = ret.name + '\\b';
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXFragment
format.JSXFragment = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXFragment ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '<', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXFragment', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // openingFragment JSXOpeningFragment
    // closingFragment JSXClosingFragment
    // children JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment
    ret.name = 'React.Fragment';
    // process AST-node-property-collection children and append ittfNode(s) to `ret`
    if (node.children) {
        if (typeof node.children.length === 'undefined') {
            throw new Error('Property node.children must be an array');
        }
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            item.__parent = {
                name: 'children', 
                len: node.children.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection children undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXOpeningFragment
format.JSXOpeningFragment = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXOpeningFragment ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'fragment-open', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXOpeningFragment', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // aliases: ["JSX", "Immutable"],
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node JSXClosingFragment
format.JSXClosingFragment = function(parent, node, options) {
    var __isText = false;
    // log 'node : JSXClosingFragment ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: 'fragment-close', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'JSXClosingFragment', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // aliases: ["JSX", "Immutable"]
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TypeAlias
format.TypeAlias = function(parent, node, options) {
    var __isText = false;
    // log 'node : TypeAlias ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':type', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TypeAlias', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Statement
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property right and append ittfNode to `ret`
    if (node.right) {
        if (!node.right.type) {
            throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.right, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node OpaqueType
format.OpaqueType = function(parent, node, options) {
    var __isText = false;
    // log 'node : OpaqueType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':opaque-type', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'OpaqueType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property right and append ittfNode to `ret`
    if (node.right) {
        if (!node.right.type) {
            throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.right, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TypeParameterDeclaration
format.TypeParameterDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TypeParameterDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // extends Node
    // process AST-node-property-collection params and append ittfNode(s) to `ret`
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        var i, i_items=node.params, i_len=node.params.length, item;
        for (i=0; i<i_len; i++) {
            item = node.params[i];
            item.__parent = {
                name: 'params', 
                len: node.params.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection params undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node TypeParameter
format.TypeParameter = function(parent, node, options) {
    var __isText = false;
    // log 'node : TypeParameter ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':<', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TypeParameter', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (node.name) {
        ret.name = node.name;
    }
    var p_bound = {
        textified: null, 
        isText: false, 
        ASTProp: 'bound', 
        children: [
            
        ]
    };
    if (node.bound) {
        if (!node.bound.type) {
            throw 'Node bound has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_bound, node.bound, options);
        p_bound.tag = 'bound';
        ret.children.push(p_bound);
        if (p_bound.children.length == 1) {
            // log '*** f_p_tag bound children[0].textified', p_bound.children[0].textified
            // log '*** f_p_tag bound children[0].isText', p_bound.children[0].isText
            // log '*** f_p_tag bound children[0].name', p_bound.children[0].name
            if (p_bound.children[0].textified) {
                p_bound.textified = p_bound.children[0].textified;
            }
            if (p_bound.children[0].isText) {
                p_bound.isText = true;
                p_bound.name = p_bound.children[0].name;
                p_bound.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property bound/ not managed by f_p_tag');
            }
        */
    }
    var p_default = {
        textified: null, 
        isText: false, 
        ASTProp: 'default', 
        children: [
            
        ]
    };
    if (node.default) {
        if (!node.default.type) {
            throw 'Node default has no type: ' + JSON.stringify(node, null, 2);
        }
        format(p_default, node.default, options);
        p_default.tag = 'default';
        ret.children.push(p_default);
        if (p_default.children.length == 1) {
            // log '*** f_p_tag default children[0].textified', p_default.children[0].textified
            // log '*** f_p_tag default children[0].isText', p_default.children[0].isText
            // log '*** f_p_tag default children[0].name', p_default.children[0].name
            if (p_default.children[0].textified) {
                p_default.textified = p_default.children[0].textified;
            }
            if (p_default.children[0].isText) {
                p_default.isText = true;
                p_default.name = p_default.children[0].name;
                p_default.children = [];
            }
        }
        /**
            TODO VIA
            else {
                throw new Error('AST-property default/ not managed by f_p_tag');
            }
        */
    }
    // process AST-node-property variance and append ittfNode to `ret`
    if (node.variance) {
        if (!node.variance.type) {
            throw 'Node variance has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.variance, options);
    }
    // process AST-node-property variance and set it in a var
    var p_variance = null;
    if (typeof(node.variance) !== 'undefined') {
        p_variance = {
            textified: null, 
            isText: false, 
            ASTProp: 'variance', 
            children: [
                
            ]
        };
        if (node.variance == null) {
            p_variance.text = "null";
        }
        else {
            if (!node.variance.type) {
                throw 'Node variance has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp variance before format'
            format(p_variance, node.variance, options);
            // log 'f_p_temp variance after format', p_variance
            if (p_variance.children.length == 1) {
                p_variance.tag = p_variance.children[0].tag;
                if (!(p_variance.children[0].isText || p_variance.children[0].textified)) {
                    p_variance.name = p_variance.children[0].name;
                    p_variance.source = p_variance.children[0].source;
                    p_variance.children = p_variance.children[0].children;
                }
                else {
                    if (p_variance.children[0].textified) {
                        p_variance.textified = p_variance.children[0].textified;
                        p_variance.name = p_variance.children[0].name;
                        p_variance.source = p_variance.children[0].source;
                    }
                    if (p_variance.children[0].isText) {
                        p_variance.isText = true;
                        p_variance.name = p_variance.children[0].name;
                        p_variance.source = p_variance.children[0].source;
                    }
                    p_variance.children = [];
                }
            }
        }
    }
    // log 'p_variance', p_variance
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node Variance
format.Variance = function(parent, node, options) {
    var __isText = false;
    // log 'node : Variance ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':variance', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'Variance', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    ret.name = node.kind;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TypeParameterInstantiation
format.TypeParameterInstantiation = function(parent, node, options) {
    var __isText = false;
    // log 'node : TypeParameterInstantiation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection params and append ittfNode(s) to `ret`
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        var i, i_items=node.params, i_len=node.params.length, item;
        for (i=0; i<i_len; i++) {
            item = node.params[i];
            item.__parent = {
                name: 'params', 
                len: node.params.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection params undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node VoidTypeAnnotation
format.VoidTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : VoidTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':void', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'VoidTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node UndefinedTypeAnnotation
format.UndefinedTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : UndefinedTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':undefined', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'UndefinedTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node NullLiteralTypeAnnotation
format.NullLiteralTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : NullLiteralTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':null', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'NullLiteralTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node GenericTypeAnnotation
format.GenericTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : GenericTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':<', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'GenericTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node StringTypeAnnotation
format.StringTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : StringTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':string', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'StringTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node AnyTypeAnnotation
format.AnyTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : AnyTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':any', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'AnyTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ArrayTypeAnnotation
format.ArrayTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : ArrayTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':[', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ArrayTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    // process AST-node-property elementType and append ittfNode to `ret`
    if (node.elementType) {
        if (!node.elementType.type) {
            throw 'Node elementType has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.elementType, options);
    }
    else {
        throw new Error('AST-node-property elementType undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node BooleanLiteralTypeAnnotation
format.BooleanLiteralTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : BooleanLiteralTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':boolean-lit', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BooleanLiteralTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    ret.name = node.extra.raw;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node BooleanTypeAnnotation
format.BooleanTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : BooleanTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':boolean', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'BooleanTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ClassImplements
format.ClassImplements = function(parent, node, options) {
    var __isText = false;
    // log 'node : ClassImplements ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':implements', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ClassImplements', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node FunctionTypeAnnotation
format.FunctionTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : FunctionTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':func', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'FunctionTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property-collection params and append ittfNode(s) to `ret`
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        var i, i_items=node.params, i_len=node.params.length, item;
        for (i=0; i<i_len; i++) {
            item = node.params[i];
            item.__parent = {
                name: 'params', 
                len: node.params.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property rest and append ittfNode to `ret`
    if (node.rest) {
        if (!node.rest.type) {
            throw 'Node rest has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.rest, options);
    }
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        if (p_returnType.children.length == 1 && p_returnType.children[0].children.length == 0) {
            ret.children.push({
                tag: ':return', 
                name: p_returnType.children[0].tag
            });
        }
        else {
            ret.children.push({
                tag: ':return', 
                name: null, 
                children: [
                    p_returnType
                ]
            });
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node FunctionTypeParam
format.FunctionTypeParam = function(parent, node, options) {
    var __isText = false;
    // log 'node : FunctionTypeParam ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':param', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'FunctionTypeParam', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // Process AST-node-property name and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.name) {
        if (!node.name.type) {
            throw 'Node name has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempname = {
            children: [
                
            ]
        };
        format(tempname, node.name, options);
        /**
            if (tempname .children.length > 0) {
                throw 'node.name must result zero node, returned: ' + tempname.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempname.children.length > 0) {
            appto.name = tempname.children[0].name;
        }
        else {
            appto.name = tempname.name;
        }
    }
    if (node.optional) {
        ret.name = ret.name + '?';
    }
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined') {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
        };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeAnnotation before format'
            format(p_typeAnnotation, node.typeAnnotation, options);
            // log 'f_p_temp typeAnnotation after format', p_typeAnnotation
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    p_typeAnnotation.children = [];
                }
            }
        }
    }
    if (p_typeAnnotation) {
        if (p_typeAnnotation.tag === '@-t') {
            var i, i_items=p_typeAnnotation.children, i_len=p_typeAnnotation.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_typeAnnotation.children[i];
                ret.children.push(item);
            }
        }
        else {
            ret.children.push(p_typeAnnotation);
        }
    }
    if (ret.children.length == 1 && isFlowPrimitiveTag(ret.children[0].tag)) {
        ret.tag = ret.children[0].tag;
        ret.children = ret.children[0].children;
    }
    if (ret.children.length == 1 && ( ret.children[0].tag === ':|' || ret.children[0].tag === ':&' )) {
        // union and intersect
        var temp_children = ret.children[0];
        ret.children = [];
        var i, i_items=temp_children.children, i_len=temp_children.children.length, ui;
        for (i=0; i<i_len; i++) {
            ui = temp_children.children[i];
            if (verify.isEmpty(ui.name)) {
                ui.name = ui.tag.substr(1);
            }
            ui.tag = temp_children.tag === ':|' ? '|' : '&';
            ret.children.push(ui);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node InterfaceExtends
format.InterfaceExtends = function(parent, node, options) {
    var __isText = false;
    // log 'node : InterfaceExtends ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':extends-interface', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'InterfaceExtends', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node InterfaceDeclaration
format.InterfaceDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : InterfaceDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':interface', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'InterfaceDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Statement
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property-collection extends and append ittfNode(s) to `ret`
    if (node.extends) {
        if (typeof node.extends.length === 'undefined') {
            throw new Error('Property node.extends must be an array');
        }
        var i, i_items=node.extends, i_len=node.extends.length, item;
        for (i=0; i<i_len; i++) {
            item = node.extends[i];
            item.__parent = {
                name: 'extends', 
                len: node.extends.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node IntersectionTypeAnnotation
format.IntersectionTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : IntersectionTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':&', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'IntersectionTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection types undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node MixedTypeAnnotation
format.MixedTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : MixedTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':mixed', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'MixedTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node NullableTypeAnnotation
format.NullableTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : NullableTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // extends Node, Type
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined') {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
        };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeAnnotation before format'
            format(p_typeAnnotation, node.typeAnnotation, options);
            // log 'f_p_temp typeAnnotation after format', p_typeAnnotation
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    p_typeAnnotation.children = [];
                }
            }
        }
    }
    if (p_typeAnnotation) {
        if (p_typeAnnotation.tag === '@-t') {
            var i, i_items=p_typeAnnotation.children, i_len=p_typeAnnotation.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_typeAnnotation.children[i];
                ret.children.push(item);
            }
        }
        else {
            ret.children.push(p_typeAnnotation);
        }
    }
    ret.children[0].tag = ':?' + ret.children[0].tag.substr(1);
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node NumberLiteralTypeAnnotation
format.NumberLiteralTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : NumberLiteralTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':number-lit', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'NumberLiteralTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    ret.name = node.extra.raw;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node NumberTypeAnnotation
format.NumberTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : NumberTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':number', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'NumberTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node StringLiteralTypeAnnotation
format.StringLiteralTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : StringLiteralTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':string-lit', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'StringLiteralTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    ret.name = node.extra.raw;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node StringTypeAnnotation
format.StringTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : StringTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':string', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'StringTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TupleTypeAnnotation
format.TupleTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : TupleTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':tuple', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TupleTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection types undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TypeofTypeAnnotation
format.TypeofTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : TypeofTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':typeof', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TypeofTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // process AST-node-property argument and append ittfNode to `ret`
    if (node.argument) {
        if (!node.argument.type) {
            throw 'Node argument has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.argument, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TypeAnnotation
format.TypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : TypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // extends Node
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined') {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
        };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeAnnotation before format'
            format(p_typeAnnotation, node.typeAnnotation, options);
            // log 'f_p_temp typeAnnotation after format', p_typeAnnotation
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    p_typeAnnotation.children = [];
                }
            }
        }
    }
    if (p_typeAnnotation) {
        if (p_typeAnnotation.tag === '@-t') {
            var i, i_items=p_typeAnnotation.children, i_len=p_typeAnnotation.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_typeAnnotation.children[i];
                ret.children.push(item);
            }
        }
        else {
            ret.children.push(p_typeAnnotation);
        }
    }
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node TypeCastExpression
format.TypeCastExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : TypeCastExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':cast', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TypeCastExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Expression
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined') {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
        };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeAnnotation before format'
            format(p_typeAnnotation, node.typeAnnotation, options);
            // log 'f_p_temp typeAnnotation after format', p_typeAnnotation
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    p_typeAnnotation.children = [];
                }
            }
        }
    }
    if (p_typeAnnotation) {
        if (p_typeAnnotation.tag === '@-t') {
            var i, i_items=p_typeAnnotation.children, i_len=p_typeAnnotation.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_typeAnnotation.children[i];
                ret.children.push(item);
            }
        }
        else {
            ret.children.push(p_typeAnnotation);
        }
    }
    // Process AST-node-property expression and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.expression) {
        if (!node.expression.type) {
            throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempexpression = {
            children: [
                
            ]
        };
        format(tempexpression, node.expression, options);
        /**
            if (tempexpression .children.length > 0) {
                throw 'node.expression must result zero node, returned: ' + tempexpression.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempexpression.children.length > 0) {
            if (isTextualNode(tempexpression.children[0])) {
                appto.name = getNodeText(tempexpression.children[0]);
            }
            else {
                appto.children.push(tempexpression.children[0]);
            }
        }
        else {
            if (isTextualNode(tempexpression)) {
                appto.name = getNodeText(tempexpression);
            }
            else {
                appto.children.push(tempexpression);
            }
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectTypeAnnotation
format.ObjectTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':{', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    // process AST-node-property-collection callProperties and append ittfNode(s) to `ret`
    if (node.callProperties) {
        if (typeof node.callProperties.length === 'undefined') {
            throw new Error('Property node.callProperties must be an array');
        }
        var i, i_items=node.callProperties, i_len=node.callProperties.length, item;
        for (i=0; i<i_len; i++) {
            item = node.callProperties[i];
            item.__parent = {
                name: 'callProperties', 
                len: node.callProperties.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property-collection indexers and append ittfNode(s) to `ret`
    if (node.indexers) {
        if (typeof node.indexers.length === 'undefined') {
            throw new Error('Property node.indexers must be an array');
        }
        var i, i_items=node.indexers, i_len=node.indexers.length, item;
        for (i=0; i<i_len; i++) {
            item = node.indexers[i];
            item.__parent = {
                name: 'indexers', 
                len: node.indexers.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property-collection properties and append ittfNode(s) to `ret`
    if (node.properties) {
        if (typeof node.properties.length === 'undefined') {
            throw new Error('Property node.properties must be an array');
        }
        var i, i_items=node.properties, i_len=node.properties.length, item;
        for (i=0; i<i_len; i++) {
            item = node.properties[i];
            item.__parent = {
                name: 'properties', 
                len: node.properties.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection properties undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectTypeCallProperty
format.ObjectTypeCallProperty = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectTypeCallProperty ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':call-prop', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectTypeCallProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // log 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
        });
    }
    // process AST-node-property value and append ittfNode to `ret`
    if (node.value) {
        if (!node.value.type) {
            throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.value, options);
    }
    else {
        throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectTypeIndexer
format.ObjectTypeIndexer = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectTypeIndexer ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':[]', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectTypeIndexer', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property key and append ittfNode to `ret`
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.key, options);
    }
    // process AST-node-property value and append ittfNode to `ret`
    if (node.value) {
        if (!node.value.type) {
            throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.value, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ObjectTypeProperty
format.ObjectTypeProperty = function(parent, node, options) {
    var __isText = false;
    // log 'node : ObjectTypeProperty ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ObjectTypeProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // Process AST-node-property key and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempkey = {
            children: [
                
            ]
        };
        format(tempkey, node.key, options);
        /**
            if (tempkey .children.length > 0) {
                throw 'node.key must result zero node, returned: ' + tempkey.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempkey.children.length > 0) {
            appto.name = tempkey.children[0].name;
        }
        else {
            appto.name = tempkey.name;
        }
    }
    // process AST-node-property value and set it in a var
    var p_value = null;
    if (typeof(node.value) !== 'undefined') {
        p_value = {
            textified: null, 
            isText: false, 
            ASTProp: 'value', 
            children: [
                
            ]
        };
        if (node.value == null) {
            p_value.text = "null";
        }
        else {
            if (!node.value.type) {
                throw 'Node value has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp value before format'
            format(p_value, node.value, options);
            // log 'f_p_temp value after format', p_value
            if (p_value.children.length == 1) {
                p_value.tag = p_value.children[0].tag;
                if (!(p_value.children[0].isText || p_value.children[0].textified)) {
                    p_value.name = p_value.children[0].name;
                    p_value.source = p_value.children[0].source;
                    p_value.children = p_value.children[0].children;
                }
                else {
                    if (p_value.children[0].textified) {
                        p_value.textified = p_value.children[0].textified;
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                    }
                    if (p_value.children[0].isText) {
                        p_value.isText = true;
                        p_value.name = p_value.children[0].name;
                        p_value.source = p_value.children[0].source;
                    }
                    p_value.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property value undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.optional) {
        ret.name += '?';
    }
    if (p_value.tag === 'string' || p_value.tag === 'number' || p_value.tag === 'boolean') {
        ret.tag = p_value.tag;
    }
    else {
        ret.tag = '@';
        ret.children.push(p_value);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node QualifiedTypeIdentifier
format.QualifiedTypeIdentifier = function(parent, node, options) {
    var __isText = false;
    // log 'node : QualifiedTypeIdentifier ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':q-type', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'QualifiedTypeIdentifier', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property qualification and set it in a var
    var p_qualification = null;
    if (typeof(node.qualification) !== 'undefined') {
        p_qualification = {
            textified: null, 
            isText: false, 
            ASTProp: 'qualification', 
            children: [
                
            ]
        };
        if (node.qualification == null) {
            p_qualification.text = "null";
        }
        else {
            if (!node.qualification.type) {
                throw 'Node qualification has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp qualification before format'
            format(p_qualification, node.qualification, options);
            // log 'f_p_temp qualification after format', p_qualification
            if (p_qualification.children.length == 1) {
                p_qualification.tag = p_qualification.children[0].tag;
                if (!(p_qualification.children[0].isText || p_qualification.children[0].textified)) {
                    p_qualification.name = p_qualification.children[0].name;
                    p_qualification.source = p_qualification.children[0].source;
                    p_qualification.children = p_qualification.children[0].children;
                }
                else {
                    if (p_qualification.children[0].textified) {
                        p_qualification.textified = p_qualification.children[0].textified;
                        p_qualification.name = p_qualification.children[0].name;
                        p_qualification.source = p_qualification.children[0].source;
                    }
                    if (p_qualification.children[0].isText) {
                        p_qualification.isText = true;
                        p_qualification.name = p_qualification.children[0].name;
                        p_qualification.source = p_qualification.children[0].source;
                    }
                    p_qualification.children = [];
                }
            }
        }
    }
    if (p_qualification) {
        ret.name = p_qualification.name + '.' + ret.name;
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node UnionTypeAnnotation
format.UnionTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : UnionTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':|', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'UnionTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // extends Node, Type
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection types undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node ExistsTypeAnnotation
format.ExistsTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : ExistsTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':exists-type', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'ExistsTypeAnnotation', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node InferredPredicate
format.InferredPredicate = function(parent, node, options) {
    var __isText = false;
    // log 'node : InferredPredicate ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':predicate', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'InferredPredicate', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
/**
    Type annotations
     TypeAnnotation
     VoidTypeAnnotation
     NullLiteralTypeAnnotation
     GenericTypeAnnotation
     StringTypeAnnotation
     AnyTypeAnnotation
     ArrayTypeAnnotation
     BooleanLiteralTypeAnnotation
     BooleanTypeAnnotation
     FunctionTypeAnnotation
     IntersectionTypeAnnotation
     MixedTypeAnnotation
     NullableTypeAnnotation
     NumberLiteralTypeAnnotation
     NumberTypeAnnotation
     StringLiteralTypeAnnotation
     StringTypeAnnotation
     TupleTypeAnnotation
     TypeofTypeAnnotation
*/
// https://iov-one.github.io/iov-core-docs/latest/iov-core/interfaces/node.html
format.TSInterfaceDeclaration = format.InterfaceDeclaration;
format.TSStringKeyword = format.StringTypeAnnotation;
format.TSNumberKeyword = format.NumberTypeAnnotation;
format.TSBooleanKeyword = format.BooleanTypeAnnotation;
format.TSArrayType = format.ArrayTypeAnnotation;
format.TSAnyKeyword = format.AnyTypeAnnotation;
format.TSVoidKeyword = format.VoidTypeAnnotation;
format.TSNullKeyword = format.NullLiteralTypeAnnotation;
format.TSUndefinedKeyword = format.UndefinedTypeAnnotation;
// set format.TSTupleType = format.TupleTypeAnnotation
// process AST node TSObjectKeyword
format.TSObjectKeyword = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSObjectKeyword ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':object', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSObjectKeyword', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSInterfaceDeclaration
format.TSInterfaceDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSInterfaceDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':interface', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSInterfaceDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property-collection extends and append ittfNode(s) to `ret`
    if (node.extends) {
        if (typeof node.extends.length === 'undefined') {
            throw new Error('Property node.extends must be an array');
        }
        var i, i_items=node.extends, i_len=node.extends.length, item;
        for (i=0; i<i_len; i++) {
            item = node.extends[i];
            item.__parent = {
                name: 'extends', 
                len: node.extends.length
            };
            format(ret, item, options);
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    if (node.declare) {
        ret = {
            tag: ':declare', 
            name: '', 
            children: [
                ret
            ]
        };
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSInterfaceBody
format.TSInterfaceBody = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSInterfaceBody ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node TSConstructorType
format.TSConstructorType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSConstructorType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':ctor', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSConstructorType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a new tag
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        if (node.parameters.length > 0) {
            var tempparameters = {
                tag: 'params', 
                ASTProp: 'parameters', 
                children: [
                    
                ]
            };
            var i, i_items=node.parameters, i_len=node.parameters.length, item;
            for (i=0; i<i_len; i++) {
                item = node.parameters[i];
                item.__parent = {
                    name: 'parameters', 
                    len: node.parameters.length
                };
                format(tempparameters, item, options);
            }
            ret.children.push(tempparameters);
        }
    }
    processParams(ret);
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSConstructSignatureDeclaration
format.TSConstructSignatureDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSConstructSignatureDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':new', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSConstructSignatureDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a new tag
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        if (node.parameters.length > 0) {
            var tempparameters = {
                tag: 'params', 
                ASTProp: 'parameters', 
                children: [
                    
                ]
            };
            var i, i_items=node.parameters, i_len=node.parameters.length, item;
            for (i=0; i<i_len; i++) {
                item = node.parameters[i];
                item.__parent = {
                    name: 'parameters', 
                    len: node.parameters.length
                };
                format(tempparameters, item, options);
            }
            ret.children.push(tempparameters);
        }
    }
    processParams(ret);
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSCallSignatureDeclaration
format.TSCallSignatureDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSCallSignatureDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':call', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSCallSignatureDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a new tag
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        if (node.parameters.length > 0) {
            var tempparameters = {
                tag: 'params', 
                ASTProp: 'parameters', 
                children: [
                    
                ]
            };
            var i, i_items=node.parameters, i_len=node.parameters.length, item;
            for (i=0; i<i_len; i++) {
                item = node.parameters[i];
                item.__parent = {
                    name: 'parameters', 
                    len: node.parameters.length
                };
                format(tempparameters, item, options);
            }
            ret.children.push(tempparameters);
        }
    }
    processParams(ret);
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSPropertySignature
format.TSPropertySignature = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSPropertySignature ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':p', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSPropertySignature', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property key and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempkey = {
            children: [
                
            ]
        };
        format(tempkey, node.key, options);
        /**
            if (tempkey .children.length > 0) {
                throw 'node.key must result zero node, returned: ' + tempkey.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempkey.children.length > 0) {
            appto.name = tempkey.children[0].name;
        }
        else {
            appto.name = tempkey.name;
        }
    }
    if (node.optional) {
        ret.children.push({
            tag: ':optional', 
            name: '', 
            children: [
                
            ]
        });
    }
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined') {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
        };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeAnnotation before format'
            format(p_typeAnnotation, node.typeAnnotation, options);
            // log 'f_p_temp typeAnnotation after format', p_typeAnnotation
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    p_typeAnnotation.children = [];
                }
            }
        }
    }
    if (p_typeAnnotation) {
        if (p_typeAnnotation.tag === '@-t') {
            var i, i_items=p_typeAnnotation.children, i_len=p_typeAnnotation.children.length, item;
            for (i=0; i<i_len; i++) {
                item = p_typeAnnotation.children[i];
                ret.children.push(item);
            }
        }
        else {
            ret.children.push(p_typeAnnotation);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSIndexSignature
format.TSIndexSignature = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSIndexSignature ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':index', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSIndexSignature', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    if (node.readonly) {
        ret.children.push({
            tag: ':readonly', 
            name: '', 
            children: [
                
            ]
        });
    }
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a new tag
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        if (node.parameters.length > 0) {
            var tempparameters = {
                tag: 'params', 
                ASTProp: 'parameters', 
                children: [
                    
                ]
            };
            var i, i_items=node.parameters, i_len=node.parameters.length, item;
            for (i=0; i<i_len; i++) {
                item = node.parameters[i];
                item.__parent = {
                    name: 'parameters', 
                    len: node.parameters.length
                };
                format(tempparameters, item, options);
            }
            ret.children.push(tempparameters);
        }
    }
    processParams(ret);
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSIndexedAccessType
format.TSIndexedAccessType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSIndexedAccessType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':[]', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSIndexedAccessType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property objectType and append ittfNode to `ret`
    if (node.objectType) {
        if (!node.objectType.type) {
            throw 'Node objectType has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.objectType, options);
    }
    else {
        throw new Error('AST-node-property objectType undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property indexType and append ittfNode to `ret`
    if (node.indexType) {
        if (!node.indexType.type) {
            throw 'Node indexType has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.indexType, options);
    }
    else {
        throw new Error('AST-node-property indexType undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSModuleDeclaration
format.TSModuleDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSModuleDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':module', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSModuleDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property body and append ittfNode to `ret`
    if (node.body) {
        if (!node.body.type) {
            throw 'Node body has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.body, options);
    }
    if (node.declare) {
        ret = {
            tag: ':declare', 
            name: '', 
            children: [
                ret
            ]
        };
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSModuleBlock
format.TSModuleBlock = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSModuleBlock ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection body and append ittfNode(s) to `ret`
    if (node.body) {
        if (typeof node.body.length === 'undefined') {
            throw new Error('Property node.body must be an array');
        }
        var i, i_items=node.body, i_len=node.body.length, item;
        for (i=0; i<i_len; i++) {
            item = node.body[i];
            item.__parent = {
                name: 'body', 
                len: node.body.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection body undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node TSDeclareFunction
format.TSDeclareFunction = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSDeclareFunction ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':function', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSDeclareFunction', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    if (node.async) {
        ret.tag = 'async=>';
    }
    if (node.generator) {
        ret.tag += '*';
    }
    if (node.declare) {
        ret = {
            tag: ':declare', 
            name: '', 
            children: [
                ret
            ]
        };
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSFunctionType
format.TSFunctionType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSFunctionType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':=>', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSFunctionType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    else {
        throw new Error('AST-node-property typeAnnotation undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a new tag
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        if (node.parameters.length > 0) {
            var tempparameters = {
                tag: 'params', 
                ASTProp: 'parameters', 
                children: [
                    
                ]
            };
            var i, i_items=node.parameters, i_len=node.parameters.length, item;
            for (i=0; i<i_len; i++) {
                item = node.parameters[i];
                item.__parent = {
                    name: 'parameters', 
                    len: node.parameters.length
                };
                format(tempparameters, item, options);
            }
            ret.children.push(tempparameters);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSMethodSignature
format.TSMethodSignature = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSMethodSignature ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':m', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSMethodSignature', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property key and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempkey = {
            children: [
                
            ]
        };
        format(tempkey, node.key, options);
        /**
            if (tempkey .children.length > 0) {
                throw 'node.key must result zero node, returned: ' + tempkey.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempkey.children.length > 0) {
            appto.name = tempkey.children[0].name;
        }
        else {
            appto.name = tempkey.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    // process AST-node-property-collection parameters and
    // embed its array of nodes in a new tag
    if (node.parameters) {
        if (typeof node.parameters.length === 'undefined') {
            throw new Error('Property node.parameters must be an array');
        }
        if (node.parameters.length > 0) {
            var tempparameters = {
                tag: 'params', 
                ASTProp: 'parameters', 
                children: [
                    
                ]
            };
            var i, i_items=node.parameters, i_len=node.parameters.length, item;
            for (i=0; i<i_len; i++) {
                item = node.parameters[i];
                item.__parent = {
                    name: 'parameters', 
                    len: node.parameters.length
                };
                format(tempparameters, item, options);
            }
            ret.children.push(tempparameters);
        }
    }
    processParams(ret);
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTypeAnnotation
format.TSTypeAnnotation = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeAnnotation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    else {
        throw new Error('AST-node-property typeAnnotation undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node TSTypeParameterInstantiation
format.TSTypeParameterInstantiation = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeParameterInstantiation ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection params and
    // embed its array of nodes in a temp var
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        var p_params = {
            tag: 'notUsed', 
            children: [
                
            ]
        };
        var i, i_items=node.params, i_len=node.params.length, item;
        for (i=0; i<i_len; i++) {
            item = node.params[i];
            item.__parent = {
                name: 'params', 
                len: node.params.length
            };
            format(p_params, item, options);
        }
    }
    // log 'TSTypeParameterInstantiation.p_params', p_params
    var i, i_items=p_params.children, i_len=p_params.children.length, p;
    for (i=0; i<i_len; i++) {
        p = p_params.children[i];
        // log 'TSTypeParameterInstantiation.p before', p
        if (p.children.length == 0 && p.name.length == 0) {
            if (p.tag === ':{') {
                p.name = '{}';
            }
            else if (p.tag === ':[') {
                p.name = '[]';
            }
            else {
                p.name = p.tag.substr(1);
            }
            p.tag = ':param';
        }
        else if (p.tag !== ':param') {
            p = {
                tag: ':param', 
                name: '', 
                children: [
                    p
                ]
            };
        }
        // log 'TSTypeParameterInstantiation.p after', p
        ret.children.push(p);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node TSTypeParameterDeclaration
format.TSTypeParameterDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeParameterDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = parent;
    // process AST-node-property-collection params and append ittfNode(s) to `ret`
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        var i, i_items=node.params, i_len=node.params.length, item;
        for (i=0; i<i_len; i++) {
            item = node.params[i];
            item.__parent = {
                name: 'params', 
                len: node.params.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection params undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
    }
};
// process AST node TSTypeParameter
format.TSTypeParameter = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeParameter ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':<', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTypeParameter', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    ret.name = node.name;
    // process AST-node-property constraint and append ittfNode to `ret`
    if (node.constraint) {
        if (!node.constraint.type) {
            throw 'Node constraint has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.constraint, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSParameterProperty
format.TSParameterProperty = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSParameterProperty ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':ts-param-prop', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSParameterProperty', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (node.readonly) {
        ret.children.push({
            tag: ':readonly', 
            name: '', 
            children: [
                
            ]
        });
    }
    if (node.accessibility) {
        ret.children.push({
            tag: ':' + node.accessibility, 
            name: '', 
            children: [
                
            ]
        });
    }
    // process AST-node-property parameter and set it in a var
    var p_parameter = null;
    if (typeof(node.parameter) !== 'undefined') {
        p_parameter = {
            textified: null, 
            isText: false, 
            ASTProp: 'parameter', 
            children: [
                
            ]
        };
        if (node.parameter == null) {
            p_parameter.text = "null";
        }
        else {
            if (!node.parameter.type) {
                throw 'Node parameter has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp parameter before format'
            format(p_parameter, node.parameter, options);
            // log 'f_p_temp parameter after format', p_parameter
            if (p_parameter.children.length == 1) {
                p_parameter.tag = p_parameter.children[0].tag;
                if (!(p_parameter.children[0].isText || p_parameter.children[0].textified)) {
                    p_parameter.name = p_parameter.children[0].name;
                    p_parameter.source = p_parameter.children[0].source;
                    p_parameter.children = p_parameter.children[0].children;
                }
                else {
                    if (p_parameter.children[0].textified) {
                        p_parameter.textified = p_parameter.children[0].textified;
                        p_parameter.name = p_parameter.children[0].name;
                        p_parameter.source = p_parameter.children[0].source;
                    }
                    if (p_parameter.children[0].isText) {
                        p_parameter.isText = true;
                        p_parameter.name = p_parameter.children[0].name;
                        p_parameter.source = p_parameter.children[0].source;
                    }
                    p_parameter.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property parameter undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'p_parameter', p_parameter
    ret.name = p_parameter.name;
    var i, i_items=p_parameter.children, i_len=p_parameter.children.length, item;
    for (i=0; i<i_len; i++) {
        item = p_parameter.children[i];
        ret.children.push(item);
    }
    p_parameter.children = [];
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTypeReference
format.TSTypeReference = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeReference ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':ref', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTypeReference', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeName and set it in a var
    var p_typeName = null;
    if (typeof(node.typeName) !== 'undefined') {
        p_typeName = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeName', 
            children: [
                
            ]
        };
        if (node.typeName == null) {
            p_typeName.text = "null";
        }
        else {
            if (!node.typeName.type) {
                throw 'Node typeName has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeName before format'
            format(p_typeName, node.typeName, options);
            // log 'f_p_temp typeName after format', p_typeName
            if (p_typeName.children.length == 1) {
                p_typeName.tag = p_typeName.children[0].tag;
                if (!(p_typeName.children[0].isText || p_typeName.children[0].textified)) {
                    p_typeName.name = p_typeName.children[0].name;
                    p_typeName.source = p_typeName.children[0].source;
                    p_typeName.children = p_typeName.children[0].children;
                }
                else {
                    if (p_typeName.children[0].textified) {
                        p_typeName.textified = p_typeName.children[0].textified;
                        p_typeName.name = p_typeName.children[0].name;
                        p_typeName.source = p_typeName.children[0].source;
                    }
                    if (p_typeName.children[0].isText) {
                        p_typeName.isText = true;
                        p_typeName.name = p_typeName.children[0].name;
                        p_typeName.source = p_typeName.children[0].source;
                    }
                    p_typeName.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property typeName undefined: ' + JSON.stringify(node, null, 2));
    }
    if (p_typeName.tag === '@id') {
        ret.name = p_typeName.name;
    }
    else {
        if (p_typeName.tag === ':qname') {
            ret.name = p_typeName.name;
        }
        else {
            ret.children.push(p_typeName);
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSExpressionWithTypeArguments
format.TSExpressionWithTypeArguments = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSExpressionWithTypeArguments ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':exprwithtypeargs', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSExpressionWithTypeArguments', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    if (p_expression) {
        if (['@expr', '@id', 'literal'].indexOf(p_expression.tag) > -1) {
            ret.name = getNodeText(p_expression);
        }
        else {
            ret.children.push(p_expression);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSAsExpression
format.TSAsExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSAsExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':as', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSAsExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property expression undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property typeAnnotation and set it in a var
    var p_typeAnnotation = null;
    if (typeof(node.typeAnnotation) !== 'undefined') {
        p_typeAnnotation = {
            textified: null, 
            isText: false, 
            ASTProp: 'typeAnnotation', 
            children: [
                
            ]
        };
        if (node.typeAnnotation == null) {
            p_typeAnnotation.text = "null";
        }
        else {
            if (!node.typeAnnotation.type) {
                throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp typeAnnotation before format'
            format(p_typeAnnotation, node.typeAnnotation, options);
            // log 'f_p_temp typeAnnotation after format', p_typeAnnotation
            if (p_typeAnnotation.children.length == 1) {
                p_typeAnnotation.tag = p_typeAnnotation.children[0].tag;
                if (!(p_typeAnnotation.children[0].isText || p_typeAnnotation.children[0].textified)) {
                    p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                    p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    p_typeAnnotation.children = p_typeAnnotation.children[0].children;
                }
                else {
                    if (p_typeAnnotation.children[0].textified) {
                        p_typeAnnotation.textified = p_typeAnnotation.children[0].textified;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    if (p_typeAnnotation.children[0].isText) {
                        p_typeAnnotation.isText = true;
                        p_typeAnnotation.name = p_typeAnnotation.children[0].name;
                        p_typeAnnotation.source = p_typeAnnotation.children[0].source;
                    }
                    p_typeAnnotation.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property typeAnnotation undefined: ' + JSON.stringify(node, null, 2));
    }
    // log 'p_typeAnnotation', p_typeAnnotation
    ret.children.push(p_typeAnnotation);
    p_expression.children.push(ret);
    ret = p_expression;
    if (node.extra && node.extra.parenthesized) {
        ret = {
            tag: '(', 
            name: '', 
            children: [
                ret
            ]
        };
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTupleType
format.TSTupleType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTupleType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':tuple', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTupleType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection elementTypes and append ittfNode(s) to `ret`
    if (node.elementTypes) {
        if (typeof node.elementTypes.length === 'undefined') {
            throw new Error('Property node.elementTypes must be an array');
        }
        var i, i_items=node.elementTypes, i_len=node.elementTypes.length, item;
        for (i=0; i<i_len; i++) {
            item = node.elementTypes[i];
            item.__parent = {
                name: 'elementTypes', 
                len: node.elementTypes.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection elementTypes undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSUnionType
format.TSUnionType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSUnionType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':union', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSUnionType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
            };
            format(ret, item, options);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSIntersectionType
format.TSIntersectionType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSIntersectionType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':intersect', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSIntersectionType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection types and append ittfNode(s) to `ret`
    if (node.types) {
        if (typeof node.types.length === 'undefined') {
            throw new Error('Property node.types must be an array');
        }
        var i, i_items=node.types, i_len=node.types.length, item;
        for (i=0; i<i_len; i++) {
            item = node.types[i];
            item.__parent = {
                name: 'types', 
                len: node.types.length
            };
            format(ret, item, options);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSEnumDeclaration
format.TSEnumDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSEnumDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':enum', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSEnumDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property-collection members and append ittfNode(s) to `ret`
    if (node.members) {
        if (typeof node.members.length === 'undefined') {
            throw new Error('Property node.members must be an array');
        }
        var i, i_items=node.members, i_len=node.members.length, item;
        for (i=0; i<i_len; i++) {
            item = node.members[i];
            item.__parent = {
                name: 'members', 
                len: node.members.length
            };
            format(ret, item, options);
        }
    }
    else {
        throw new Error('AST-node-property-collection members undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSEnumMember
format.TSEnumMember = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSEnumMember ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: '@', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSEnumMember', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property initializer and set it in a var
    var p_initializer = null;
    if (typeof(node.initializer) !== 'undefined') {
        p_initializer = {
            textified: null, 
            isText: false, 
            ASTProp: 'initializer', 
            children: [
                
            ]
        };
        if (node.initializer == null) {
            p_initializer.text = "null";
        }
        else {
            if (!node.initializer.type) {
                throw 'Node initializer has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp initializer before format'
            format(p_initializer, node.initializer, options);
            // log 'f_p_temp initializer after format', p_initializer
            if (p_initializer.children.length == 1) {
                p_initializer.tag = p_initializer.children[0].tag;
                if (!(p_initializer.children[0].isText || p_initializer.children[0].textified)) {
                    p_initializer.name = p_initializer.children[0].name;
                    p_initializer.source = p_initializer.children[0].source;
                    p_initializer.children = p_initializer.children[0].children;
                }
                else {
                    if (p_initializer.children[0].textified) {
                        p_initializer.textified = p_initializer.children[0].textified;
                        p_initializer.name = p_initializer.children[0].name;
                        p_initializer.source = p_initializer.children[0].source;
                    }
                    if (p_initializer.children[0].isText) {
                        p_initializer.isText = true;
                        p_initializer.name = p_initializer.children[0].name;
                        p_initializer.source = p_initializer.children[0].source;
                    }
                    p_initializer.children = [];
                }
            }
        }
    }
    if (p_initializer) {
        if (['@expr', '@id', 'literal'].indexOf(p_initializer.tag) > -1) {
            ret.name += ' ' + getNodeText(p_initializer);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSNeverKeyword
format.TSNeverKeyword = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSNeverKeyword ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':never', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSNeverKeyword', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTypePredicate
format.TSTypePredicate = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypePredicate ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':predicate', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTypePredicate', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property parameterName and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.parameterName) {
        if (!node.parameterName.type) {
            throw 'Node parameterName has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempparameterName = {
            children: [
                
            ]
        };
        format(tempparameterName, node.parameterName, options);
        /**
            if (tempparameterName .children.length > 0) {
                throw 'node.parameterName must result zero node, returned: ' + tempparameterName.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempparameterName.children.length > 0) {
            appto.name = tempparameterName.children[0].name;
        }
        else {
            appto.name = tempparameterName.name;
        }
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    else {
        throw new Error('AST-node-property typeAnnotation undefined: ' + JSON.stringify(node, null, 2));
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTypeLiteral
format.TSTypeLiteral = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeLiteral ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':{', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTypeLiteral', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property-collection members and append ittfNode(s) to `ret`
    if (node.members) {
        if (typeof node.members.length === 'undefined') {
            throw new Error('Property node.members must be an array');
        }
        var i, i_items=node.members, i_len=node.members.length, item;
        for (i=0; i<i_len; i++) {
            item = node.members[i];
            item.__parent = {
                name: 'members', 
                len: node.members.length
            };
            format(ret, item, options);
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTypeOperator
format.TSTypeOperator = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeOperator ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':type-operator', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTypeOperator', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    else {
        throw new Error('AST-node-property typeAnnotation undefined: ' + JSON.stringify(node, null, 2));
    }
    if (node.operator) {
        ret.tag = ':' + node.operator;
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSNonNullExpression
format.TSNonNullExpression = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSNonNullExpression ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':!', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSNonNullExpression', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    if (['@expr', '@id', 'literal'].indexOf(p_expression.tag) > -1) {
        ret.name = getNodeText(p_expression);
    }
    else {
        ret.children.push(p_expression);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTypeAliasDeclaration
format.TSTypeAliasDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeAliasDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':type', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTypeAliasDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSLiteralType
format.TSLiteralType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSLiteralType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':literal', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSLiteralType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property literal and set it in a var
    var p_literal = null;
    if (typeof(node.literal) !== 'undefined') {
        p_literal = {
            textified: null, 
            isText: false, 
            ASTProp: 'literal', 
            children: [
                
            ]
        };
        if (node.literal == null) {
            p_literal.text = "null";
        }
        else {
            if (!node.literal.type) {
                throw 'Node literal has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp literal before format'
            format(p_literal, node.literal, options);
            // log 'f_p_temp literal after format', p_literal
            if (p_literal.children.length == 1) {
                p_literal.tag = p_literal.children[0].tag;
                if (!(p_literal.children[0].isText || p_literal.children[0].textified)) {
                    p_literal.name = p_literal.children[0].name;
                    p_literal.source = p_literal.children[0].source;
                    p_literal.children = p_literal.children[0].children;
                }
                else {
                    if (p_literal.children[0].textified) {
                        p_literal.textified = p_literal.children[0].textified;
                        p_literal.name = p_literal.children[0].name;
                        p_literal.source = p_literal.children[0].source;
                    }
                    if (p_literal.children[0].isText) {
                        p_literal.isText = true;
                        p_literal.name = p_literal.children[0].name;
                        p_literal.source = p_literal.children[0].source;
                    }
                    p_literal.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property literal undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.name = p_literal.name;
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSConditionalType
format.TSConditionalType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSConditionalType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':iif', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSConditionalType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property checkType and set it in a var
    var p_checkType = null;
    if (typeof(node.checkType) !== 'undefined') {
        p_checkType = {
            textified: null, 
            isText: false, 
            ASTProp: 'checkType', 
            children: [
                
            ]
        };
        if (node.checkType == null) {
            p_checkType.text = "null";
        }
        else {
            if (!node.checkType.type) {
                throw 'Node checkType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp checkType before format'
            format(p_checkType, node.checkType, options);
            // log 'f_p_temp checkType after format', p_checkType
            if (p_checkType.children.length == 1) {
                p_checkType.tag = p_checkType.children[0].tag;
                if (!(p_checkType.children[0].isText || p_checkType.children[0].textified)) {
                    p_checkType.name = p_checkType.children[0].name;
                    p_checkType.source = p_checkType.children[0].source;
                    p_checkType.children = p_checkType.children[0].children;
                }
                else {
                    if (p_checkType.children[0].textified) {
                        p_checkType.textified = p_checkType.children[0].textified;
                        p_checkType.name = p_checkType.children[0].name;
                        p_checkType.source = p_checkType.children[0].source;
                    }
                    if (p_checkType.children[0].isText) {
                        p_checkType.isText = true;
                        p_checkType.name = p_checkType.children[0].name;
                        p_checkType.source = p_checkType.children[0].source;
                    }
                    p_checkType.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property checkType undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property extendsType and set it in a var
    var p_extendsType = null;
    if (typeof(node.extendsType) !== 'undefined') {
        p_extendsType = {
            textified: null, 
            isText: false, 
            ASTProp: 'extendsType', 
            children: [
                
            ]
        };
        if (node.extendsType == null) {
            p_extendsType.text = "null";
        }
        else {
            if (!node.extendsType.type) {
                throw 'Node extendsType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp extendsType before format'
            format(p_extendsType, node.extendsType, options);
            // log 'f_p_temp extendsType after format', p_extendsType
            if (p_extendsType.children.length == 1) {
                p_extendsType.tag = p_extendsType.children[0].tag;
                if (!(p_extendsType.children[0].isText || p_extendsType.children[0].textified)) {
                    p_extendsType.name = p_extendsType.children[0].name;
                    p_extendsType.source = p_extendsType.children[0].source;
                    p_extendsType.children = p_extendsType.children[0].children;
                }
                else {
                    if (p_extendsType.children[0].textified) {
                        p_extendsType.textified = p_extendsType.children[0].textified;
                        p_extendsType.name = p_extendsType.children[0].name;
                        p_extendsType.source = p_extendsType.children[0].source;
                    }
                    if (p_extendsType.children[0].isText) {
                        p_extendsType.isText = true;
                        p_extendsType.name = p_extendsType.children[0].name;
                        p_extendsType.source = p_extendsType.children[0].source;
                    }
                    p_extendsType.children = [];
                }
            }
        }
    }
    // process AST-node-property trueType and set it in a var
    var p_trueType = null;
    if (typeof(node.trueType) !== 'undefined') {
        p_trueType = {
            textified: null, 
            isText: false, 
            ASTProp: 'trueType', 
            children: [
                
            ]
        };
        if (node.trueType == null) {
            p_trueType.text = "null";
        }
        else {
            if (!node.trueType.type) {
                throw 'Node trueType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp trueType before format'
            format(p_trueType, node.trueType, options);
            // log 'f_p_temp trueType after format', p_trueType
            if (p_trueType.children.length == 1) {
                p_trueType.tag = p_trueType.children[0].tag;
                if (!(p_trueType.children[0].isText || p_trueType.children[0].textified)) {
                    p_trueType.name = p_trueType.children[0].name;
                    p_trueType.source = p_trueType.children[0].source;
                    p_trueType.children = p_trueType.children[0].children;
                }
                else {
                    if (p_trueType.children[0].textified) {
                        p_trueType.textified = p_trueType.children[0].textified;
                        p_trueType.name = p_trueType.children[0].name;
                        p_trueType.source = p_trueType.children[0].source;
                    }
                    if (p_trueType.children[0].isText) {
                        p_trueType.isText = true;
                        p_trueType.name = p_trueType.children[0].name;
                        p_trueType.source = p_trueType.children[0].source;
                    }
                    p_trueType.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property trueType undefined: ' + JSON.stringify(node, null, 2));
    }
    // process AST-node-property falseType and set it in a var
    var p_falseType = null;
    if (typeof(node.falseType) !== 'undefined') {
        p_falseType = {
            textified: null, 
            isText: false, 
            ASTProp: 'falseType', 
            children: [
                
            ]
        };
        if (node.falseType == null) {
            p_falseType.text = "null";
        }
        else {
            if (!node.falseType.type) {
                throw 'Node falseType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp falseType before format'
            format(p_falseType, node.falseType, options);
            // log 'f_p_temp falseType after format', p_falseType
            if (p_falseType.children.length == 1) {
                p_falseType.tag = p_falseType.children[0].tag;
                if (!(p_falseType.children[0].isText || p_falseType.children[0].textified)) {
                    p_falseType.name = p_falseType.children[0].name;
                    p_falseType.source = p_falseType.children[0].source;
                    p_falseType.children = p_falseType.children[0].children;
                }
                else {
                    if (p_falseType.children[0].textified) {
                        p_falseType.textified = p_falseType.children[0].textified;
                        p_falseType.name = p_falseType.children[0].name;
                        p_falseType.source = p_falseType.children[0].source;
                    }
                    if (p_falseType.children[0].isText) {
                        p_falseType.isText = true;
                        p_falseType.name = p_falseType.children[0].name;
                        p_falseType.source = p_falseType.children[0].source;
                    }
                    p_falseType.children = [];
                }
            }
        }
    }
    else {
        throw new Error('AST-node-property falseType undefined: ' + JSON.stringify(node, null, 2));
    }
    ret.children.push({
        tag: ':check', 
        name: '', 
        children: [
            p_checkType
        ]
    });
    ret.children.push({
        tag: ':extends', 
        name: '', 
        children: [
            p_extendsType
        ]
    });
    ret.children.push({
        tag: ':then', 
        name: '', 
        children: [
            p_trueType
        ]
    });
    ret.children.push({
        tag: ':else', 
        name: '', 
        children: [
            p_falseType
        ]
    });
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSMappedType
format.TSMappedType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSMappedType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':mapped', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSMappedType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    if (node.optional) {
        ret.children.push({
            tag: ':optional', 
            name: '', 
            children: [
                
            ]
        });
    }
    // process AST-node-property typeParameter and append ittfNode to `ret`
    if (node.typeParameter) {
        if (!node.typeParameter.type) {
            throw 'Node typeParameter has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameter, options);
    }
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSTypeQuery
format.TSTypeQuery = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSTypeQuery ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':typeof', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSTypeQuery', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property exprName and set it in a var
    var p_exprName = null;
    if (typeof(node.exprName) !== 'undefined') {
        p_exprName = {
            textified: null, 
            isText: false, 
            ASTProp: 'exprName', 
            children: [
                
            ]
        };
        if (node.exprName == null) {
            p_exprName.text = "null";
        }
        else {
            if (!node.exprName.type) {
                throw 'Node exprName has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp exprName before format'
            format(p_exprName, node.exprName, options);
            // log 'f_p_temp exprName after format', p_exprName
            if (p_exprName.children.length == 1) {
                p_exprName.tag = p_exprName.children[0].tag;
                if (!(p_exprName.children[0].isText || p_exprName.children[0].textified)) {
                    p_exprName.name = p_exprName.children[0].name;
                    p_exprName.source = p_exprName.children[0].source;
                    p_exprName.children = p_exprName.children[0].children;
                }
                else {
                    if (p_exprName.children[0].textified) {
                        p_exprName.textified = p_exprName.children[0].textified;
                        p_exprName.name = p_exprName.children[0].name;
                        p_exprName.source = p_exprName.children[0].source;
                    }
                    if (p_exprName.children[0].isText) {
                        p_exprName.isText = true;
                        p_exprName.name = p_exprName.children[0].name;
                        p_exprName.source = p_exprName.children[0].source;
                    }
                    p_exprName.children = [];
                }
            }
        }
    }
    if (p_exprName.tag === '@id') {
        ret.name = p_exprName.name;
    }
    else {
        ret.children.push(p_exprName);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSInferType
format.TSInferType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSInferType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':infer', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSInferType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeParameter and append ittfNode to `ret`
    if (node.typeParameter) {
        if (!node.typeParameter.type) {
            throw 'Node typeParameter has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameter, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSParenthesizedType
format.TSParenthesizedType = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSParenthesizedType ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':paren', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSParenthesizedType', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property typeAnnotation and append ittfNode to `ret`
    if (node.typeAnnotation) {
        if (!node.typeAnnotation.type) {
            throw 'Node typeAnnotation has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeAnnotation, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSDeclareMethod
format.TSDeclareMethod = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSDeclareMethod ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':m', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSDeclareMethod', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property key and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.key) {
        if (!node.key.type) {
            throw 'Node key has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempkey = {
            children: [
                
            ]
        };
        format(tempkey, node.key, options);
        /**
            if (tempkey .children.length > 0) {
                throw 'node.key must result zero node, returned: ' + tempkey.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempkey.children.length > 0) {
            appto.name = tempkey.children[0].name;
        }
        else {
            appto.name = tempkey.name;
        }
    }
    // TODO
    // s(kind
    // log 'node.abstract', node.abstract
    if (!!node.abstract == true) {
        ret.children.push({
            tag: ':abstract', 
            children: [
                
            ]
        });
    }
    // log 'node.static', node.static
    if (!!node.static == true) {
        ret.children.push({
            tag: 'static', 
            children: [
                
            ]
        });
    }
    // TODO
    // b( computed
    // process AST-node-property typeParameters and append ittfNode to `ret`
    if (node.typeParameters) {
        if (!node.typeParameters.type) {
            throw 'Node typeParameters has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.typeParameters, options);
    }
    // process AST-node-property-collection params and
    // embed its array of nodes in a new tag
    if (node.params) {
        if (typeof node.params.length === 'undefined') {
            throw new Error('Property node.params must be an array');
        }
        if (node.params.length > 0) {
            var tempparams = {
                tag: 'params', 
                ASTProp: 'params', 
                children: [
                    
                ]
            };
            var i, i_items=node.params, i_len=node.params.length, item;
            for (i=0; i<i_len; i++) {
                item = node.params[i];
                item.__parent = {
                    name: 'params', 
                    len: node.params.length
                };
                format(tempparams, item, options);
            }
            ret.children.push(tempparams);
        }
    }
    processParams(ret);
    // process AST-node-property returnType and set it in a var
    var p_returnType = null;
    if (typeof(node.returnType) !== 'undefined') {
        p_returnType = {
            textified: null, 
            isText: false, 
            ASTProp: 'returnType', 
            children: [
                
            ]
        };
        if (node.returnType == null) {
            p_returnType.text = "null";
        }
        else {
            if (!node.returnType.type) {
                throw 'Node returnType has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp returnType before format'
            format(p_returnType, node.returnType, options);
            // log 'f_p_temp returnType after format', p_returnType
            if (p_returnType.children.length == 1) {
                p_returnType.tag = p_returnType.children[0].tag;
                if (!(p_returnType.children[0].isText || p_returnType.children[0].textified)) {
                    p_returnType.name = p_returnType.children[0].name;
                    p_returnType.source = p_returnType.children[0].source;
                    p_returnType.children = p_returnType.children[0].children;
                }
                else {
                    if (p_returnType.children[0].textified) {
                        p_returnType.textified = p_returnType.children[0].textified;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    if (p_returnType.children[0].isText) {
                        p_returnType.isText = true;
                        p_returnType.name = p_returnType.children[0].name;
                        p_returnType.source = p_returnType.children[0].source;
                    }
                    p_returnType.children = [];
                }
            }
        }
    }
    if (p_returnType) {
        p_returnType = {
            tag: ':return', 
            children: [
                p_returnType
            ]
        };
        ret.children.push(p_returnType);
    }
    if (node.async) {
        ret.tag = 'async-m-decl';
    }
    if (node.generator) {
        ret.tag += '*';
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSQualifiedName
format.TSQualifiedName = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSQualifiedName ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':qname', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSQualifiedName', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property left and set it in a var
    var p_left = null;
    if (typeof(node.left) !== 'undefined') {
        p_left = {
            textified: null, 
            isText: false, 
            ASTProp: 'left', 
            children: [
                
            ]
        };
        if (node.left == null) {
            p_left.text = "null";
        }
        else {
            if (!node.left.type) {
                throw 'Node left has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp left before format'
            format(p_left, node.left, options);
            // log 'f_p_temp left after format', p_left
            if (p_left.children.length == 1) {
                p_left.tag = p_left.children[0].tag;
                if (!(p_left.children[0].isText || p_left.children[0].textified)) {
                    p_left.name = p_left.children[0].name;
                    p_left.source = p_left.children[0].source;
                    p_left.children = p_left.children[0].children;
                }
                else {
                    if (p_left.children[0].textified) {
                        p_left.textified = p_left.children[0].textified;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    if (p_left.children[0].isText) {
                        p_left.isText = true;
                        p_left.name = p_left.children[0].name;
                        p_left.source = p_left.children[0].source;
                    }
                    p_left.children = [];
                }
            }
        }
    }
    // process AST-node-property right and set it in a var
    var p_right = null;
    if (typeof(node.right) !== 'undefined') {
        p_right = {
            textified: null, 
            isText: false, 
            ASTProp: 'right', 
            children: [
                
            ]
        };
        if (node.right == null) {
            p_right.text = "null";
        }
        else {
            if (!node.right.type) {
                throw 'Node right has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp right before format'
            format(p_right, node.right, options);
            // log 'f_p_temp right after format', p_right
            if (p_right.children.length == 1) {
                p_right.tag = p_right.children[0].tag;
                if (!(p_right.children[0].isText || p_right.children[0].textified)) {
                    p_right.name = p_right.children[0].name;
                    p_right.source = p_right.children[0].source;
                    p_right.children = p_right.children[0].children;
                }
                else {
                    if (p_right.children[0].textified) {
                        p_right.textified = p_right.children[0].textified;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    if (p_right.children[0].isText) {
                        p_right.isText = true;
                        p_right.name = p_right.children[0].name;
                        p_right.source = p_right.children[0].source;
                    }
                    p_right.children = [];
                }
            }
        }
    }
    if (isTextualNode(p_left)) {
        ret.name = getNodeText(p_left);
        if (isTextualNode(p_right)) {
            ret.name += '.' + getNodeText(p_right);
        }
        else {
            ret.children.push(p_right);
        }
    }
    else {
        ret.children.push(p_left);
        ret.children.push(p_right);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSExportAssignment
format.TSExportAssignment = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSExportAssignment ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':export', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSExportAssignment', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    if (['@expr', '@id', 'literal'].indexOf(p_expression.tag) > -1) {
        ret.name = getNodeText(p_expression);
    }
    else {
        ret.children.push(p_expression);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSImportEqualsDeclaration
format.TSImportEqualsDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSImportEqualsDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':import', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSImportEqualsDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    // log 'node.isExport', node.isExport
    if (!!node.isExport == true) {
        ret.children.push({
            tag: 'isExport', 
            children: [
                
            ]
        });
    }
    // process AST-node-property moduleReference and append ittfNode to `ret`
    if (node.moduleReference) {
        if (!node.moduleReference.type) {
            throw 'Node moduleReference has no type: ' + JSON.stringify(node, null, 2);
        }
        format(ret, node.moduleReference, options);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSNamespaceExportDeclaration
format.TSNamespaceExportDeclaration = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSNamespaceExportDeclaration ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':export-ns', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSNamespaceExportDeclaration', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // Process AST-node-property id and
    // set the resulting node.name on : ret || parent (cmd: onparent)
    // used mainly for Identifier(s)
    if (node.id) {
        if (!node.id.type) {
            throw 'Node id has no type: ' + JSON.stringify(node, null, 2);
        }
        var tempid = {
            children: [
                
            ]
        };
        format(tempid, node.id, options);
        /**
            if (tempid .children.length > 0) {
                throw 'node.id must result zero node, returned: ' + tempid.children.length + ' source: ' + options.input.substring(node.start, node.end);
            }
        */
        var appto = false ? parent : ret;
        if (tempid.children.length > 0) {
            appto.name = tempid.children[0].name;
        }
        else {
            appto.name = tempid.name;
        }
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
// process AST node TSExternalModuleReference
format.TSExternalModuleReference = function(parent, node, options) {
    var __isText = false;
    // log 'node : TSExternalModuleReference ----------------------------------------- parent ittf tag : ', parent.tag
    var i, i_items=Object.keys(node), i_len=Object.keys(node).length, item;
    for (i=0; i<i_len; i++) {
        item = Object.keys(node)[i];
        if (['type', 'start', 'end', 'loc'].indexOf(item) < 0) {
            if (verify.isNotEmpty(node[item])) {
                // log 'property', item, node[item]
            }
            else {
                // log 'property', item
            }
        }
    }
    var ret = {
        tag: ':require', 
        name: '', 
        isText: false, 
        textified: null, 
        AST: 'TSExternalModuleReference', 
        source: options.input.substring(node.start, node.end), 
        children: [
            
        ]
    };
    // process AST-node-property expression and set it in a var
    var p_expression = null;
    if (typeof(node.expression) !== 'undefined') {
        p_expression = {
            textified: null, 
            isText: false, 
            ASTProp: 'expression', 
            children: [
                
            ]
        };
        if (node.expression == null) {
            p_expression.text = "null";
        }
        else {
            if (!node.expression.type) {
                throw 'Node expression has no type: ' + JSON.stringify(node, null, 2);
            }
            // log 'f_p_temp expression before format'
            format(p_expression, node.expression, options);
            // log 'f_p_temp expression after format', p_expression
            if (p_expression.children.length == 1) {
                p_expression.tag = p_expression.children[0].tag;
                if (!(p_expression.children[0].isText || p_expression.children[0].textified)) {
                    p_expression.name = p_expression.children[0].name;
                    p_expression.source = p_expression.children[0].source;
                    p_expression.children = p_expression.children[0].children;
                }
                else {
                    if (p_expression.children[0].textified) {
                        p_expression.textified = p_expression.children[0].textified;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    if (p_expression.children[0].isText) {
                        p_expression.isText = true;
                        p_expression.name = p_expression.children[0].name;
                        p_expression.source = p_expression.children[0].source;
                    }
                    p_expression.children = [];
                }
            }
        }
    }
    if (['@expr', '@id', 'literal'].indexOf(p_expression.tag) > -1) {
        ret.name = getNodeText(p_expression);
    }
    else {
        ret.children.push(p_expression);
    }
    if (ret != null) {
        if (__isText) {
            ret.textified = ret.name;
        }
        if (typeof __skip === 'undefined' || __skip == false) {
            // log '### add ', ret.tag , 'to', parent.tag
            processLeadingComments(node, parent, options);
            parent.children.push(ret);
            processTrailingComments(node, parent, options);
        }
    }
};
var md = module.exports = {};
function processLeadingComments(node, ittfNode, options) {
    processComments(node.leadingComments, node, ittfNode, options, true);
}
function processTrailingComments(node, ittfNode, options) {
    processComments(node.trailingComments, node, ittfNode, options, false);
}
function processComments(comments, node, ittfNode, options, leading) {
    if (verify.isArray(comments) && comments.length > 0) {
        var hb;
        var i, i_items=comments, i_len=comments.length, item;
        for (i=0; i<i_len; i++) {
            item = comments[i];
            // log 'processComments', item
            if (item.type === 'CommentLine') {
                if (codeReplacer.isKey(item.value, options.replaceds)) {
                    if (options.commentManager.checkWritten(item) == true) {
                        options.commentManager.removeWritten(item);
                    }
                    var value = codeReplacer.restoreInside(item.value, options.replaceds);
                    hb = {
                        tag: '#', 
                        name: value, 
                        children: [
                            
                        ]
                    };
                    ittfNode.children.push(hb);
                }
                else {
                    if (options.commentManager.checkWritten(item) == true) {
                        options.commentManager.removeWritten(item);
                    }
                    hb = {
                        tag: '#', 
                        name: item.value, 
                        children: [
                            
                        ]
                    };
                    ittfNode.children.push(hb);
                }
                options.commentManager.addWritten(item, ittfNode.children, hb);
            }
            else if (item.type === 'CommentBlock') {
                if (codeReplacer.isKey(item.value, options.replaceds)) {
                    // log 'codeReplacer.isKey', true
                    if (options.commentManager.checkWritten(item) == true) {
                        options.commentManager.removeWritten(item);
                    }
                    hb = {
                        tag: '{{', 
                        name: codeReplacer.restore(item.value, options.replaceds), 
                        children: [
                            
                        ]
                    };
                    ittfNode.children.push(hb);
                }
                else {
                    // log 'codeReplacer.isKey', false
                    if (options.commentManager.checkWritten(item) == true) {
                        options.commentManager.removeWritten(item);
                    }
                    var ss = item.value.split(/\r\n|\r|\n/);
                    hb = {
                        tag: '#', 
                        children: [
                            
                        ]
                    };
                    var j, j_items=ss, j_len=ss.length, s;
                    for (j=0; j<j_len; j++) {
                        s = ss[j];
                        hb.children.push({
                            tag: '#', 
                            name: s, 
                            children: [
                                
                            ]
                        });
                    }
                    ittfNode.children.push(hb);
                }
                options.commentManager.addWritten(item, ittfNode.children, hb);
            }
        }
    }
}
function processParams(ittfNode) {
    var pos = getChildPosByTag(ittfNode, 'params');
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (pos == i) {
            var j, j_items=item.children, j_len=item.children.length, p;
            for (j=0; j<j_len; j++) {
                p = item.children[j];
                var plen = childrenLengthNoProps(p);
                // log 'processParams. p.tag', p.tag, 'plen', plen, JSON.stringify(p, null, 2)
                if (p.tag !== '{' && p.tag !== '[') {
                    if (isTextualNode(p)) {
                        p.tag = 'param';
                        p.name = getNodeText(p);
                    }
                    else if (verify.isNotEmpty(p.name)) {
                        p.tag = 'param';
                    }
                    else {
                        p.tag = 'param';
                    }
                    /**
                        else {
                            throw new Error('processParams.error. Param must be a textual or an ObjectPattern. Node:' + JSON.stringify(ittfNode));
                        }
                    */
                }
                if (plen == 1 && ( p.children[0].tag === ':|' || p.children[0].tag === ':&' )) {
                    // union and intersect
                    var temp_children = p.children[0];
                    p.children = [];
                    var k, k_items=temp_children.children, k_len=temp_children.children.length, ui;
                    for (k=0; k<k_len; k++) {
                        ui = temp_children.children[k];
                        ui.tag = temp_children.tag === ':|' ? '|' : '&';
                        p.children.push(ui);
                    }
                }
                if (plen == 2) {
                    if (['@id', '@expr', 'literal'].indexOf(p.children[1].tag) > -1) {
                        // has simple default value (is AssignmentPattern)
                        p.name = p.children[0].name;
                        if (p.children[0].children.length > 0) {
                            p.children[0].tag = p.children[0].children[0].tag;
                            p.children[0].name = '';
                            p.children[0].children = [];
                        }
                        p.children[1].tag = ':=';
                    }
                    else {
                        if (p.AST === 'AssignmentPattern') {
                            // has complex default value (is AssignmentPattern)
                            p.children[1] = {
                                tag: ':=', 
                                name: '', 
                                children: [
                                    p.children[1]
                                ]
                            };
                        }
                    }
                }
                temp.push(p);
            }
        }
        else {
            temp.push(item);
        }
    }
    // log 'wizzifiers.js.processParams.result', JSON.stringify(temp, null, 2)
    ittfNode.children = temp;
}
function getNodeText(ittfNode) {
    return ittfNode.textified || ittfNode.name;
}
function isTextualNode(ittfNode) {
    return ittfNode && (ittfNode.isText || ittfNode.textified);
}
function isTextualChildByTag(ittfNode, tag) {
    var item = getChildByTag(ittfNode, tag);
    return item && (item.isText || item.textified);
}
function replaceChildTag(ittfNode, oldTag, newTag) {
    var item = getChildByTag(ittfNode, oldTag);
    item.tag = newTag;
}
function removeChildByTag(ittfNode, tag) {
    var temp = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag !== tag) {
            temp.push(item);
        }
    }
    ittfNode.children = temp;
}
function getChildByTag(ittfNode, tag) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            return item;
        }
    }
    return null;
}
function getChildPosByTag(ittfNode, tag) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            return i;
        }
    }
    return -1;
}
function replaceChildrenOfChildWhenText(ittfNode, childPos, textTag) {
    if (childPos < 0) {
        return ;
    }
    ittfNode.children = replaceItemInColl(ittfNode.children, childPos, textifyChildren(ittfNode.children[childPos], textTag));
}
function replaceItemInColl(coll, pos, replacers) {
    var ret = [];
    var i, i_items=coll, i_len=coll.length, item;
    for (i=0; i<i_len; i++) {
        item = coll[i];
        if (pos == i) {
            var j, j_items=replacers, j_len=replacers.length, repl;
            for (j=0; j<j_len; j++) {
                repl = replacers[j];
                ret.push(repl);
            }
        }
        else {
            ret.push(item);
        }
    }
    return ret;
}
function textifyChildren(ittfNode, tag) {
    var ret = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.isText || item.textified) {
            // log '@@@@@@@ item.tag.isText', item.tag, item.isText
            ret.push({
                tag: tag, 
                name: item.isText ? item.name : item.textified, 
                textified: item.isText ? item.name : item.textified, 
                children: [
                    
                ]
            });
        }
        else {
            ret.push(item);
        }
    }
    // log '@@@@@@@@@@@@@@@ textifyChildren', ret
    return ret;
}
function setTextList(ittfNode, sep) {
    var sb = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        // log 'setTextList', item.tag, item.isText, item.textified
        if (item.isText) {
            sb.push(item.name);
        }
        else if (item.textified) {
            sb.push(item.textified);
        }
        else {
            return false;
        }
    }
    ittfNode.textified = sb.join(sep);
    ittfNode.children = [];
    return true;
}
function getTextList(ittfNode, sep) {
    var sb = [];
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.isText) {
            sb.push(item.name);
        }
        else if (item.textified) {
            sb.push(item.textified);
        }
        else {
            // log 'getTextList failed ***************', item
            return null;
        }
    }
    return sb.join(sep);
}
function setNameFromChildByTag(ittfNode, tag, forceText) {
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if (item.tag === tag) {
            if (forceText) {
                // log '...................setNameFromChildByTag', item
            }
            if (item.isText) {
                ittfNode.name = item.name;
                ittfNode.children.splice(i, 1);
                return ;
            }
            if (forceText && item.textified) {
                ittfNode.name = item.textified;
                ittfNode.children.splice(i, 1);
                return ;
            }
        }
    }
}
function objectDeclareKey(key) {
    return key.indexOf(' ') > 0 ? '["' + key + '"]' : key;
}
function replaceWithSingleChild(ittfNode, childTag, limit) {
    if (isChildrenCount(ittfNode, 1)) {
        var childTag = ittfNode.children[0].tag;
        var testTag = limit ? childTag.substr(0, limit) : childTag;
        if (testTag === childTag) {
            ittfNode.tag = ittfNode.children[0].tag;
            ittfNode.name = ittfNode.children[0].name;
            ittfNode.textified = ittfNode.children[0].textified;
            ittfNode.children = ittfNode.children[0].children;
            return true;
        }
    }
    return false;
}
function isChildrenCount(ittfNode, count) {
    return ittfNode.children && ittfNode.children.length == count;
}
function isChildrenCountGreaterEqualThen(ittfNode, count) {
    return ittfNode.children && ittfNode.children.length >= count;
}
function childrenLengthNoProps(ittfNode) {
    var ret = 0;
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        if ([':public', ':protected', ':private', ':readonly', ':optional', ':abstract', 'static'].indexOf(item.tag) < 0) {
            ret++;
        }
    }
    return ret;
}
function getLiteral(ittfNode) {
    var sb = [], temp;
    var i, i_items=ittfNode.children, i_len=ittfNode.children.length, item;
    for (i=0; i<i_len; i++) {
        item = ittfNode.children[i];
        // log 'getLiteral.item', item
        if (item.tag === '+') {
            temp = verify.replaceAll(verify.replaceAll(item.name, '\\n', '\n'), '\\b', ' ');
            sb.push(temp);
        }
        if (item.tag === '@') {
            sb.push('${' + item.name + '}');
        }
    }
    return sb.join('');
}
function isFlowPrimitiveTag(s) {
    return [':string', ':number', ':boolean', ':{', ':[', ':func', ':?string', ':?number', ':?boolean', ':?{', ':?[', ':?func', ':void', ':null'].indexOf(s) > -1;
}
function isTypeReference(s) {
    return [':ref', ':string', ':number', ':boolean', ':{', ':[', ':func', ':void', ':null', ':never'].indexOf(s) > -1;
}
var commonPlugins = [
    'jsx', 
    "objectRestSpread", 
    "classProperties", 
    "doExpressions", 
    ['decorators', { decoratorsBeforeExport: true }], 
    "classProperties", 
    "classPrivateProperties", 
    "classPrivateMethods", 
    "exportDefaultFrom", 
    "exportNamespaceFrom", 
    "asyncGenerators", 
    "functionBind", 
    "functionSent", 
    "dynamicImport", 
    "numericSeparator", 
    "optionalChaining", 
    "importMeta", 
    "bigInt", 
    "optionalCatchBinding", 
    "throwExpressions", 
    "nullishCoalescingOperator"
];
md.parse = function(input, babelOptions) {
    babelOptions = babelOptions || {};
    var plugins;
    if (babelOptions.ts_or_flow === 'typescript') {
        plugins = [
            'typescript'
        ].concat(commonPlugins);
    }
    else {
        plugins = [
            'flow'
        ].concat(commonPlugins);
    }
    // log 'jswizzifier.container.babelOptions', babelOptions
    return parser.parse(input, {
            sourceType: 'module', 
            plugins: plugins
        });
};
md.getCodeAST = function(input, options, callback) {
    options = options || {};
    options.input = input;
    options.stack = [];
    options.formatTextNodes = [];
    options.wizziIncludes = [];
    options.stateAST = [];
    var babelOptions = options.babel || {};
    var syntax;
    var cr;
    try {
        cr = codeReplacer.clean(input);
        syntax = md.parse(cr.codeCleaned, babelOptions);
    } 
    catch (ex) {
        return callback(ex);
    } 
    cleanBabel.cleanAst(syntax);
    callback(null, syntax);
};
md.getWizziTree = function(input, options, callback) {
    // log 'options', options
    options = options || {};
    options.input = input;
    options.stack = [];
    options.formatTextNodes = [];
    options.wizziIncludes = [];
    options.stateAST = [];
    var startTime = Date.now();
    var babelOptions = options.babel || {};
    // log 'Parsed in ' + (Date.now() - startTime) + ' ms'
    var syntax;
    var cr;
    try {
        cr = codeReplacer.clean(input);
        // log 'jsparser.container.cr', cr
        syntax = md.parse(cr.codeCleaned, babelOptions);
    } 
    catch (ex) {
        return callback(ex);
    } 
    if (options.syntaxOutFile) {
        file.write(options.syntaxOutFile, JSON.stringify(cleanBabel.cleanAst(syntax, cr), null, 2));
    }
    options.starter = true;
    options.replaceds = cr.replaceds;
    options.commentManager = new CommentManager();
    // log 'cr.codeCleaned', cr.codeCleaned
    // log 'cr.replaceds', cr.replaceds
    var root = {
        tag: 'module', 
        children: [
            
        ]
    };
    if (babelOptions.ts_or_flow !== 'typescript') {
        root.children.push({
            tag: 'kind', 
            name: 'react', 
            children: [
                
            ]
        });
    }
    try {
        format(root, syntax, options);
    } 
    catch (ex) {
        return callback(ex);
    } 
    // log "wizziTree", JSON.stringify(root, null, 2)
    // log 'options.wizziIncludes', options.wizziIncludes
    async.map(options.wizziIncludes, function(item, callback) {
        if (item.kind === 'css') {
            if (!csswizzifier) {
                csswizzifier = require('../../cssparser/css/wizzifier');
            }
            csswizzifier.getWizziTree(item.literal, {}, function(err, ittf) {
                // log 'getWizzifierIncludes.item.ittf', ittf
                item.node.children.push(ittf);
                return callback(null);
            });
        }
        else {
            if (!htmlwizzifier) {
                htmlwizzifier = require('../../htmlparser/wizzi/wizzifier');
            }
            htmlwizzifier.getWizziTree(item.literal, {}, function(err, ittf) {
                // log 'getWizzifierIncludes.item.ittf', ittf
                item.node.children.push(ittf);
                return callback(null);
            });
        }
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        return callback(null, root);
    });
};
md.getWizziIttf = function(input, options, callback) {
    // log '++++++++++ jswizzify.options', options
    md.getWizziTree(input, options, function(err, root) {
        if (err) {
            return callback(err);
        }
        var ittf = ittfwriter.stringify(root, { lang: 'js' });
        // log "md.getWizziIttf\n" + ittf
        callback(null, ittf);
    });
};
