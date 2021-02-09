/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\wizzifiers\xmlparser\xml2js\wizzifier.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('../../../util/lineparser');
var file = require('wizzi-utils').file;
var cloner = require('../../utils/cloner');
var ittfwriter = require("../../../util/ittfwriter");
var xml2js = require('xml2js');
var xml_parser = new xml2js.Parser();
function parseInternal(xml, options, callback) {
    xml_parser.parseString(xml, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result);
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
function appendChilds(name, nodeArray, parent) {
    // log 'appendChilds.name', name
    var i, i_items=nodeArray, i_len=nodeArray.length, node;
    for (i=0; i<i_len; i++) {
        node = nodeArray[i];
        if (verify.isString(node)) {
            parent.name = node;
        }
        else {
            var ac = getAttribsAndChilds(node);
            var tag = {
                tag: name, 
                children: []
            };
            parent.children.push(tag);
            var aObj = ac.a;
            for (var aName in aObj) {
                tag.children.push({
                    tag: '@', 
                    name: (((aName + ' ')) + aObj[aName]), 
                    children: []
                });
            }
            var j, j_items=ac.c, j_len=ac.c.length, childnode;
            for (j=0; j<j_len; j++) {
                childnode = ac.c[j];
                if (verify.isArray(childnode.value) === false) {
                    console.log("Error: value is not an array: " + childnode.name + ',' + childnode.value);
                }
                else {
                    appendChilds(childnode.name, childnode.value, tag);
                }
            }
        }
    }
}
function getAttribsAndChilds(node) {
    var attribs = {};
    var children = [];
    for (var prop in node) {
        if (node.hasOwnProperty(prop)) {
            if (prop === '$') {
                var attribsObj = node[prop];
                // log('getAttribsAndChilds.$', attribsObj, true)
                for (var k in attribsObj) {
                    attribs[k] = attribsObj[k];
                }
            }
            else {
                var value = node[prop];
                var isArray = verify.isArray(value);
                children.push({
                    name: prop, 
                    value: node[prop]
                });
            }
        }
    }
    return {
            a: attribs, 
            c: children
        };
}
function wizzify(xml, options, callback) {
    var wizziTree = {
        children: []
    };
    parseInternal(xml, options, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (options.dumpfile) {
            file.write(options.dumpfile, JSON.stringify(result, null, 2));
        }
        for (var prop in result) {
            if (result.hasOwnProperty(prop)) {
                var root = result[prop];
                if (verify.isObject(root) === false) {
                    return callback(new Error("Root is not an object. Prop: " + prop + ', root: ' + root));
                }
                var ac = getAttribsAndChilds(root);
                wizziTree = {
                    tag: prop, 
                    attribs: [], 
                    children: []
                };
                var aObj = ac.a;
                for (var aName in aObj) {
                    wizziTree.children.push({
                        tag: '@', 
                        name: (((aName + ' ')) + aObj[aName]), 
                        children: []
                    });
                }
                for (var j = 0; j < ac.c.length; j++) {
                    var childnode = ac.c[j];
                    if (verify.isArray(childnode.value) === false) {
                        console.log("Error: value is not an array: " + childnode.name + ',' + childnode.value);
                    }
                    else {
                        appendChilds(childnode.name, childnode.value, wizziTree);
                    }
                }
            }
        }
        console.log("wizziTree", wizziTree);
        callback(null, wizziTree);
    });
}
