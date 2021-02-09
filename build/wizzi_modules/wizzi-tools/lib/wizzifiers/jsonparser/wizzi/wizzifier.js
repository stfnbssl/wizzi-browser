/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\wizzifiers\jsonparser\wizzi\wizzifier.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('../../../util/lineparser');
var file = require('wizzi-utils').file;
var cloner = require('../../utils/cloner');
var ittfwriter = require("../../../util/ittfwriter");
var json_parser = require('./parser');
var cloner = require('./cloner');
function parseInternal(jsonString, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = (options || {});
    var wizziTree = {
        children: []
    };
    json_parser.parse(jsonString, {
        onObject: function(open) {
            // log  'onObject', open
            if (open) {
                var n = {
                    tag: '{', 
                    name: '', 
                    children: []
                };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else {
                // log  "onObject wizziTree.tag", wizziTree.tag
                wizziTree = wizziTree.parent;
                // log  "onObject wizziTree.tag", wizziTree.tag
            }
        }, 
        onArray: function(open) {
            // log  'onArray', open
            if (open) {
                var n = {
                    tag: '[', 
                    name: '', 
                    children: []
                };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else {
                // FIXME
                // log  "onArray wizziTree.tag", wizziTree.tag
                wizziTree = wizziTree.parent;
                // log  "onArray wizziTree.tag", wizziTree.tag
            }
        }, 
        onPropName: function(name) {
            // log  "onPropName", name
            var n = {
                tag: name, 
                name: '', 
                children: []
            };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            // log  wizziTree.tag
            wizziTree = n;
            // log  wizziTree.tag
        }, 
        onProp: function(name, value) {
            // log  "onProp", name, value
            var n = {
                tag: name, 
                name: value, 
                children: []
            };
            n.parent = wizziTree;
            wizziTree.children.push(n);
        }, 
        onObjectProp: function(name) {
            // log  "onObjectProp", name
            var n = {
                tag: '{', 
                name: name, 
                children: []
            };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        }, 
        onArrayProp: function(name) {
            // log  "onObjectProp", name
            var n = {
                tag: '[', 
                name: name, 
                children: []
            };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        }, 
        onClosePropName: function() {
            // log  'onClosePropName'
            wizziTree = wizziTree.parent;
        }, 
        onArrayValue: function(value) {
            // log  "onArrayValue", value
            var n = {
                tag: value, 
                name: '', 
                children: []
            };
            wizziTree.children.push(n);
        }, 
        onHandlebar: function(hb) {
            // log  "onHandlebar", hb
            var n = {
                tag: '{{', 
                name: hb, 
                children: []
            };
            wizziTree.children.push(n);
        }
    }, function(err, result) {
        if (err) {
            return callback(err);
        }
        while (wizziTree.parent != null) {
            wizziTree = wizziTree.parent;
        }
        // log  'wizziTree\n', wizziTree
        var synthax = wizziTree.children[0];
        if (!synthax) {
            return callback(new Error('Json.Wizzifier.Wizzi parse failed. wizziTree: ' + util.inspect(wizziTree, {depth: 2})));
        }
        return callback(null, synthax);
    });
}
var verbose = false;
function log(label, obj, force) {
    if (verbose || force) {
        console.log(label, util.inspect(obj, {
            depth: null
        }));
    }
}
var md = module.exports = {};
md.getCodeAST = function(input, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = options || {};
    parseInternal(input, options, callback);
};
md.getWizziTree = function(input, options, callback) {
    options = (options || {});
    if (typeof (options.verbose) !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    // log 'startTime', startTime
    wizzify(input, options, function(err, syntax) {
        if (err) {
            return callback(err);
        }
        if (options.syntaxOutFile) {
            parseInternal(input, options, function(err, syntax) {
                if (err) {
                    return callback(err);
                }
                file.write(options.syntaxOutFile, JSON.stringify(syntax, null, 2));
            });
        }
        // log 'Parsed in ' + Date.now() - startTime + ' ms'
        callback(null, syntax);
    });
};
md.getWizziIttf = function(input, options, callback) {
    md.getWizziTree(input, options, function(err, result) {
        if (err) {
            return callback(err);
        }
        md.getWizzifierIncludes(options, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            result = cloner(result, options);
            callback(null, ittfwriter.stringify(result, options));
        });
    });
};
// ovveridable
md.getWizzifierIncludes = function(options, callback) {
    return callback(null);
};
function wizzify(json, options, callback) {
    parseInternal(json, options, callback);
}
