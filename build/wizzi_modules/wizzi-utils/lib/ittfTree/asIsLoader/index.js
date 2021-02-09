/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\ittfTree\asIsLoader\index.js.ittf
*/
'use strict';
var liner = require('./liner');
var nodifier = require('./nodifier');
function AsisLoader(ittfDocumentUri, options, callback) {
    var reader = options.file;
    reader.read(ittfDocumentUri, function(err, content) {
        if (err) {
            return callback(err);
        }
        var lines = liner(content, {});
        var count = 0;
        var asisMTree = {
            loadHistory: {
                getNewNodeId: function() {
                    return ++count;
                }
            }, 
            uri: ittfDocumentUri, 
            content: content
        };
        asisMTree.nodes = nodifier(lines, asisMTree);
        if (asisMTree.nodes.__is_error) {
            asisMTree.nodes = [
                {
                    name: 'Cannot load this ittf document: ' + asisMTree.nodes.message
                }
            ];
        }
        else {
            // log 'asis.loader.asisMTree.nodes.length', asisMTree.nodes.length, asisMTree.nodes.length != 1
            if (asisMTree.nodes.length != 1) {
                var message = 'wizzi-utils.asIsLoader.error. The ittf source document must have one node. Found: ' + asisMTree.nodes.length + ' in document: ' + ittfDocumentUri;
                if (callback) {
                    return callback({
                            __is_error: true, 
                            message: message
                        });
                }
                else {
                    throw new Error(message);
                }
            }
        }
        if (asisMTree.nodes && asisMTree.nodes.length > 0) {
            if (options.clean) {
                clean(asisMTree.nodes[0]);
            }
            else if (options.clean_remove) {
                asisMTree = clean(asisMTree.nodes[0]);
            }
        }
        if (callback) {
            callback(null, asisMTree);
        }
        else {
            return asisMTree;
        }
    });
}
function clean(node) {
    delete node.parent
    delete node.model
    delete node.hasMacro
    delete node.id
    if (node.children) {
        var i, i_items=node.children, i_len=node.children.length, item;
        for (i=0; i<i_len; i++) {
            item = node.children[i];
            clean(item);
        }
    }
    return node;
}
AsisLoader.createFromString = function(text, options, callback) {
    options = options || {};
    options.file = {
        read: function(dummy, callback) {
            if (callback) {
                return callback(null, text);
            }
            else {
                return text;
            }
        }
    };
    return AsisLoader('dummy', options, callback);
};
module.exports = AsisLoader;
