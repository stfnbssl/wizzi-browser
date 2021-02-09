/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\wizzifiers\cssparser\css\wizzifier.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('../../../util/lineparser');
var file = require('wizzi-utils').file;
var cloner = require('../../utils/cloner');
var ittfwriter = require("../../../util/ittfwriter");
var css_parser = require('css');
function parseInternal(css, options, callback) {
    var syntax;
    try {
        syntax = css_parser.parse(css);
    } 
    catch (ex) {
        return callback(ex);
    } 
    return callback(null, cloner(syntax));
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
var format = function(ast, options) {
    var formatter = format[ast.type];
    if (verbose) {
        console.log('ast.type', ast.type);
    }
    if (formatter) {
        return formatter(ast, options);
    }
    throw new Error('no formatter for type: ' + ast.type);
};
format['stylesheet'] = function(ast) {
    // log 'stylesheet.ast', ast
    var ret = {
        tag: 'css', 
        children: []
    };
    ast.stylesheet.rules.map(function(node) {
        ret.children.push(format(node));
    });
    return ret;
};
format['comment'] = function(ast) {
    var ret = {
        tag: '#', 
        children: []
    };
    var lines = file.splitLines(ast.comment);
    if (lines.length == 1) {
        ret.name = lines[0];
    }
    else {
        var i, i_items=lines, i_len=lines.length, l;
        for (i=0; i<i_len; i++) {
            l = lines[i];
            ret.children.push({
                tag: '#', 
                name: l, 
                children: []
            });
        }
    }
    return ret;
};
format['rule'] = function(ast) {
    var ret = {
        tag: '<', 
        children: []
    };
    var ls = ast.selectors.length;
    for (var i = 0; i < ls; i++) {
        if (i == 0) {
            ret.name = ast.selectors[i];
            if (ret.name.trim()[0] === '.') {
                ret.tag = '.';
                ret.name = ret.name.trim().substr(1);
            }
            else if (ret.name.trim()[0] === '#') {
                ret.tag = '#';
                ret.name = ret.name.trim().substr(1);
            }
        }
        else {
            ret.children.push({
                tag: '+', 
                name: ast.selectors[i], 
                children: []
            });
        }
    }
    ast.declarations.map(function(node) {
        ret.children.push(format(node));
    });
    return ret;
};
format['declaration'] = function(ast) {
    var ret = {
        tag: ast.property, 
        name: ast.value, 
        children: []
    };
    return ret;
};
format['media'] = function(ast) {
    var ret = {
        tag: 'media', 
        name: ast.media, 
        children: []
    };
    ast.rules.map(function(node) {
        ret.children.push(format(node));
    });
    return ret;
};
format['font-face'] = function(ast) {
    var ret = {
        tag: 'font-face', 
        children: []
    };
    ast.declarations.map(function(node) {
        ret.children.push(format(node));
    });
    return ret;
};
format['keyframes'] = function(ast) {
    var ret = {
        tag: 'keyframes', 
        name: ast.name, 
        children: []
    };
    ret.children.push({
        tag: 'vendor', 
        name: ast.vendor, 
        children: []
    });
    ast.keyframes.map(function(node) {
        ret.children.push(format(node));
    });
    return ret;
};
format['keyframe'] = function(ast) {
    var ret = {
        tag: 'keyframe', 
        children: []
    };
    var ls = ast.values.length;
    for (var i = 0; i < ls; i++) {
        if (i == 0) {
            ret.name = ast.values[i];
        }
        else {
            ret.children.push({
                tag: 'value', 
                name: ast.values[i], 
                children: []
            });
        }
    }
    ast.declarations.map(function(node) {
        ret.children.push(format(node));
    });
    return ret;
};
format['import'] = function(ast) {
    console.log('import', util.inspect(ast, {
        depth: null
    }));
    var ret = {
        tag: 'import', 
        name: ast.import, 
        children: []
    };
    return ret;
};
format['charset'] = function(ast) {
    console.log('charset', util.inspect(ast, {
        depth: null
    }));
    var ret = {
        tag: 'charset', 
        name: ast.charset, 
        children: []
    };
    return ret;
};
function wizzify(css, options, callback) {
    parseInternal(css, {}, function(err, syntax) {
        if (err) {
            return callback(err);
        }
        var node = format(syntax);
        // log "wizziTree", node
        return callback(null, node);
    });
}
