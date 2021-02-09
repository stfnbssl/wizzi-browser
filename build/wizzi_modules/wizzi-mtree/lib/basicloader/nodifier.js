/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\basicloader\nodifier.js.ittf
*/
'use strict';
var util = require('util');
/**
     Nodify the lines of an IttfDocument and creates a
     tree structure object based on line indentation.
     . detects the $params command
     . implements line continuation
     . assigns an id to each node
     !!! A line object is transformed in place into a node object
     without recreation (no cloning) !!!
    
     Inputs
     - the lines produced by the liner
     Outputs
     nodes: Array of [
     line -> mTreeNode : {
     + parent: Object, // parent mTreeNode
     + model: Object, // the MTreeBrick to which the line belongs
     + children: Array, // the children mTreeNodes
     id: Number,
     indent: Number,
     name: String,
     value: String,
     row: Number,
     col: Number,
     sourceKey: String,
     tagSuffix: undefined || '('
     hasMacro: Boolean
     }
     ]
    
     Ittf commands:
     $params  // the param values are stored in the MTreeBrick
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
module.exports = function(lines, mTree) {
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
        line.id = mTree.getNewNodeId();
        line.model = mTree;
        if (line.indent == 0 && current == null) {
            line.parent = null;
            nodes.push(line);
        }
        else if (current == null) {
            return error('Malformed tree, root node cannot have an indent.', line, mTree);
        }
        else if (line.indent == current.indent) {
            if (typeof(current.parent) === 'undefined' || current.parent === null) {
                return error('Malformed tree, only one root note allowed.', line, mTree);
            }
            line.parent = current.parent;
            current.parent.children.push(line);
        }
        else if (line.indent > current.indent) {
            if (nameFirstChar == '$' && line.name === '$params') {
                if (current.indent > 0) {
                    return error('The $params node must be a child of the root node.', line, mTree);
                }
                current.model.$params = line.value;
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
                return error('Malformed tree, only one root note allowed.', line, mTree);
            }
        }
        current = line;
        current.children = [];
    }
    return nodes;
};
function error(message, line, mTree) {
    message = message + '\nNode ' + line.name + ' ' + (line.value || '') + ' row: ' + line.row + ' col: ' + line.col + '.\n Filepath: ' + mTree.uri;
    return {
            __is_error: true, 
            message: message, 
            source: 'wizzi-mtree/lib/loader/nodifier'
        };
}
