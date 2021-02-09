/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\loader\nodifier.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var errors = require('../errors');
/**
     TODO Error management
*/
/**
     Nodifies the lines of an IttfDocument and creates a
     tree structure object based on line indentation.
     . detects the $params command
     . implements line continuation
     . assigns an id to each node
     !!! A line object is transformed in place into a node object
     without recreation (no cloning) !!!
    
     Inputs
     - the lines produced by the liner
     - a newly created, empty, mTreeBrick
     Outputs
     [ nodes
     { line -> mTreeNode
     { parent
     // parent mTreeNode
     { model
     // the mTreeBrick to which the line belongs
     [ children
     // the children mTreeNodes
     id: Number,
     indent: Number,
     name: String,
     value: String,
     row: Number,
     col: Number,
     sourceKey: String,
     tagSuffix: undefined || '('
     hasMacro: Boolean
    
     Ittf commands:
     $params  // the param values are stored in the MTree
     \        // implements line continuation
     //   the value is appendend to the value of the parent line
     //   without separators
            // implements line continuation
     //   the value is appendend to the value of the parent line
     //   with a space separator:  prevLine,value += ' ' + currentLine.value
     \n       // implements line continuation
     //   the value is appendend to the value of the parent line
     //   with a line break separator:  prevLine,value += '\n' + currentLine.value
    
*/
module.exports = function(lines, mTreeBrick) {
    if (verify.isArray(lines) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'lines', message: 'The lines parameter must be an array. Received: ' + lines }
        );
    }
    if (verify.isObject(mTreeBrick) === false) {
        return error(
            'InvalidArgument', '', { parameter: 'mTreeBrick', message: 'The mTreeBrick parameter must be an object. Received: ' + mTreeBrick }
        );
    }
    var nodes = [],
        root = null,
        current = null,
        nameFirstChar = null,
        nameLength = 0,
        line,
        i,
        l = lines.length;
    for (var i = 0; i < l; i++) {
        line = lines[i];
        nameFirstChar = line.name[0];
        nameLength = line.name.length;
        line.id = mTreeBrick.loadHistory.getNewNodeId();
        // deprecated
        line.model = mTreeBrick;
        line.mTreeBrick = mTreeBrick;
        if (line.indent == 0 && current == null) {
            line.parent = null;
            nodes.push(line);
        }
        else if (current == null) {
            return local_error('InvalidIttfError', 'default', 'Malformed tree, root node cannot have an indent.', line, mTreeBrick);
        }
        else if (line.indent == current.indent) {
            if (typeof(current.parent) === 'undefined' || current.parent === null) {
                return local_error('InvalidIttfError', 'default', 'Malformed tree, only one root note allowed.', line, mTreeBrick);
            }
            line.parent = current.parent;
            current.parent.children.push(line);
        }
        else if (line.indent > current.indent) {
            if (nameFirstChar == '$' && line.name === '$params') {
                if (current.indent > 0) {
                    if (current.name !== '$fragment') {
                        return local_error('InvalidIttfError', 'default', 'The $params node must be a child of the root node.', line, mTreeBrick);
                    }
                    else {
                        current.$params = line.value;
                    }
                }
                else {
                    current.model.$params = line.value;
                }
                continue;
            }
            else if (nameFirstChar == '\\' && nameLength == 1) {
                // value continuation on new line
                current.value += line.value;
                continue;
            }
            else if (nameFirstChar == '\\' && line.name === '\\b') {
                // value continuation on new line with space
                current.value += (' ' + line.value);
                continue;
            }
            else if (nameFirstChar == '\\' && line.name === '\\n') {
                // value continuation on new line with line break
                current.value += ('\n' + line.value);
                continue;
            }
            else {
                line.parent = current;
                current.children.push(line);
            }
        }
        else if (line.indent < current.indent) {
            var parent = current.parent;
            while (parent != null && line.indent < parent.indent) {
                parent = parent.parent;
            }
            line.parent = parent.parent;
            if (parent.parent) {
                parent.parent.children.push(line);
            }
            else {
                return local_error('InvalidIttfError', 'default', 'Malformed tree, only one root note allowed.', line, mTreeBrick);
            }
        }
        current = line;
        current.children = [];
    }
    return nodes;
};
function local_error(name, method, message, line, mTreeBrick) {
    return new errors.WizziError(message, line, mTreeBrick, {
            errorName: name, 
            method: method
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
        method: 'wizzi-mtree@0.7.11.loader.nodifier.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
