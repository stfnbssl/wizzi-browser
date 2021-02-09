/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\wizzifiers\htmlparser\wizzi\wizzifier.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = require('../../../util/lineparser');
var file = require('wizzi-utils').file;
var cloner = require('../../utils/cloner');
var ittfwriter = require("../../../util/ittfwriter");
var html_parser = require('./parser');
var cloner = require('./cloner');
var csswizzifier = null;
var jswizzifier = null;
function parseInternal(html, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    options = (options || {});
    options.wizziIncludes = options.wizziIncludes || [];
    var wizziTree = {
        children: []
    };
    var parser = new html_parser.Parser({
        onopentag: function(tagname, attribs) {
            var ittfTag = tagname;
            if (options.isForVue) {
                if (tagname.substr(0, 2) !== 'v-') {
                    if (['router-link', 'router-view'].indexOf(tagname) < 0) {
                        if (tagname[0] === tagname[0].toUpperCase() || tagname.indexOf('-') > -1) {
                            ittfTag = '< ' + tagname;
                        }
                    }
                }
            }
            else {
                if (tagname[0] === tagname[0].toUpperCase() || tagname.indexOf('-') > -1) {
                    ittfTag = '< ' + tagname;
                }
            }
            // log "OpenTag " + tagname, ittfTag, attribs
            var n = {
                tag: ittfTag, 
                name: '', 
                attribs: attribs, 
                children: []
            };
            n.parent = wizziTree;
            wizziTree.children.push(n);
            wizziTree = n;
        }, 
        ontext: function(text) {
            // log "================= Text", text, wizziTree.tag
            var lines = file.splitLines(text.trim());
            if (wizziTree.swig) {
                // log '++++++++++ wizziTree.swig'
                lines.forEach(function(l) {
                    var n = {
                        tag: '+', 
                        name: l, 
                        attribs: {}, 
                        children: []
                    };
                    wizziTree.children.push(n);
                });
            }
            else if ('script' === wizziTree.tag) {
                var literal = lines.join('\n');
                // log 'literal', literal, wizziTree.attribs['lang']
                options.wizziIncludes.push({
                    kind: wizziTree.attribs['lang'] || wizziTree.attribs['language'] || 'js', 
                    node: wizziTree, 
                    literal: literal
                });
            }
            else if ('style' === wizziTree.tag) {
                var literal = lines.join('\n');
                // log 'literal', literal
                options.wizziIncludes.push({
                    kind: 'css', 
                    node: wizziTree, 
                    literal: literal
                });
            }
            else if (lines.length == 1) {
                if (wizziTree.children.length > 0) {
                    var n = {
                        tag: '+', 
                        name: lines[0], 
                        attribs: {}, 
                        children: []
                    };
                    wizziTree.children.push(n);
                }
                else {
                    wizziTree.name += lines[0];
                }
            }
            else {
                lines.forEach(function(l) {
                    var n = {
                        tag: '++', 
                        name: l.trim(), 
                        attribs: {}, 
                        children: []
                    };
                    wizziTree.children.push(n);
                });
            }
        }, 
        onclosetag: function(tagname) {
            // log 'onclosetag', tagname
            if (wizziTree.parent != null) {
                wizziTree = wizziTree.parent;
            }
            else {
                console.log("WARNING overclose ", tagname);
            }
        }, 
        onswig: function(text) {
            var p = lineparser.parseNameValueRaw(text, {}),
                tag = p.name().trim().toLowerCase()
                ,
                text = p.value();
            // log "OpenSwig " + tag, text
            if (['for', 'if', 'block', 'autoescape', 'filter', 'macro', 'spaceless', 'raw'].indexOf(tag) >= 0) {
                var n = {
                    tag: tag, 
                    name: text, 
                    attribs: {}, 
                    children: [], 
                    lines: [], 
                    swig: true
                };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else if (['endfor', 'endif', 'endblock', 'endautoescape', 'endfilter', 'endmacro', 'endspaceless', 'endraw'].indexOf(tag) >= 0) {
                if (wizziTree.parent != null) {
                    wizziTree = wizziTree.parent;
                }
                else {
                    console.log("WARNING overclose ", tagname);
                }
            }
            else if (['extends', 'include', 'import', 'parent', 'set'].indexOf(tag) >= 0) {
                var n = {
                    tag: tag, 
                    name: text, 
                    attribs: {}, 
                    children: [], 
                    lines: [], 
                    swig: true
                };
                wizziTree.children.push(n);
            }
            else if (['else', 'elif', 'elseif'].indexOf(tag) >= 0) {
                if (wizziTree.parent != null) {
                    wizziTree = wizziTree.parent;
                }
                else {
                    console.log("WARNING overclose ", tagname);
                }
                var n = {
                    tag: tag, 
                    name: text, 
                    attribs: {}, 
                    children: [], 
                    lines: [], 
                    swig: true
                };
                n.parent = wizziTree;
                wizziTree.children.push(n);
                wizziTree = n;
            }
            else {
                throw new Error('Html.Wizzifier. Wizzi parse onswig unknown tag: ' + tag);
            }
        }
    });
    var addedWrapper = false;
    try {
        if (html && html.length > 0) {
            if (html.substr(0,'<html>'.length) == '<html>' || html.substr(0,'<!doctype>'.length) == '<!doctype>') {
                console.log('html document has root tag html');
            }
            else {
                console.log(html.substr(0,'<html>'.length), html.substr(0,'<!doctype>'.length));
                var i1 = html.indexOf('<');
                var i2 = html.indexOf('>');
                if (i1 > -1 && i2 > -1) {
                    var temp = html.substr(i1+1, i2-i1-1);
                    console.log('wizzi-tools.htmlparser.addedWrapper.temp', temp);
                    if (temp.toLowerCase().indexOf('!doctype') > -1) {
                        html = '<html>' + html.substr(i2+1) + '</html>';
                    }
                    else {
                        html = '<html>' + html + '</html>';
                    }
                    addedWrapper = true;
                    // log 'wizzi-tools.htmlparser.addedWrapper.html', html
                }
            }
            parser.write(html);
            parser.end();
        }
    } 
    catch (ex) {
        return callback(ex);
    } 
    while (wizziTree.parent != null) {
        wizziTree = wizziTree.parent;
    }
    if (addedWrapper) {
        wizziTree.children = wizziTree.children[0].children;
    }
    // log 'wizziTree', wizziTree
    console.log('wizzi-tools.htmlparser.wizzify.options.embedTag,wizziTree.children.length', options.embedTag, wizziTree.children.length);
    var synthax;
    if (wizziTree.children.length > 1 && typeof (options.embedTag) === 'string') {
        console.log('wizzi-tools.htmlparser.wizzify.options.embedTag, wizziTree.children[0]', options.embedTag, wizziTree.children[0]);
        if (options.embedTag === wizziTree.children[0].tag) {
            synthax = wizziTree.children[0];
        }
        else {
            synthax = {
                tag: options.embedTag, 
                name: '', 
                attribs: {}, 
                children: []
            };
            wizziTree.children.forEach(function(item) {
                synthax.children.push(item);
            });
        }
    }
    else {
        if (wizziTree.children.length == 1) {
            synthax = wizziTree.children[0];
        }
        else {
            synthax = {
                tag: 'html', 
                name: '__dummy_root__', 
                attribs: {}, 
                children: []
            };
            wizziTree.children.forEach(function(item) {
                synthax.children.push(item);
            });
        }
    }
    if (!synthax) {
        return callback(new Error('Html.Wizzifier.Wizzi parse failed. wizziTree: ' + util.inspect(wizziTree, {depth: 2})));
    }
    return callback(null, synthax);
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
md.getWizzifierIncludes = function(options, callback) {
    options.wizziIncludes = options.wizziIncludes || [];
    // log 'options.wizziIncludes', options.wizziIncludes
    async.map(options.wizziIncludes, function(item, callback) {
        if (item.kind === 'css') {
            if (!csswizzifier) {
                csswizzifier = require('../../cssparser/css/wizzifier');
            }
            csswizzifier.getWizziTree(item.literal, {}, function(err, ittf) {
                // log 'getWizzifierIncludes.item.ittf', ittf
                if (err) {
                    item.node.children.push({
                        tag: 'error', 
                        name: err.message, 
                        children: [
                            
                        ]
                    });
                }
                else {
                    if (options.isForVue) {
                        var i, i_items=ittf.children, i_len=ittf.children.length, ittfchild;
                        for (i=0; i<i_len; i++) {
                            ittfchild = ittf.children[i];
                            item.node.children.push(ittfchild);
                        }
                    }
                    else {
                        item.node.children.push(ittf);
                    }
                }
                return callback(null);
            });
        }
        else if (item.kind === 'ts') {
            if (!jswizzifier) {
                // log 'jswizzifier import 1'
                jswizzifier = require('../../jsparser/babel/wizzifier');
                // log 'jswizzifier import 2'
            }
            // log 'jswizzifier', jswizzifier
            jswizzifier.getWizziTree(item.literal, {
                babel: {
                    sourceType: 'module', 
                    ts_or_flow: 'typescript'
                }
            }, function(err, ittf) {
                // log 'getWizzifierIncludes.item.ittf', ittf
                if (err) {
                    item.node.children.push({
                        tag: 'error', 
                        name: err.message, 
                        children: [
                            
                        ]
                    });
                }
                else {
                    if (options.isForVue) {
                        var i, i_items=ittf.children, i_len=ittf.children.length, ittfchild;
                        for (i=0; i<i_len; i++) {
                            ittfchild = ittf.children[i];
                            // skip kind
                            if (i > 0) {
                                item.node.children.push(ittfchild);
                            }
                        }
                    }
                    else {
                        item.node.children.push(ittf);
                    }
                }
                return callback(null);
            });
        }
        else {
            if (!jswizzifier) {
                // log 'jswizzifier import 1'
                jswizzifier = require('../../jsparser/babel/wizzifier');
                // log 'jswizzifier import 2'
            }
            // log 'jswizzifier', jswizzifier
            jswizzifier.getWizziTree(item.literal, {}, function(err, ittf) {
                // log 'getWizzifierIncludes.item.ittf', ittf
                if (err) {
                    item.node.children.push({
                        tag: 'error', 
                        name: err.message, 
                        children: [
                            
                        ]
                    });
                }
                else {
                    if (options.isForVue) {
                        var i, i_items=ittf.children, i_len=ittf.children.length, ittfchild;
                        for (i=0; i<i_len; i++) {
                            ittfchild = ittf.children[i];
                            // skip kind
                            if (i > 0) {
                                item.node.children.push(ittfchild);
                            }
                        }
                    }
                    else {
                        item.node.children.push(ittf);
                    }
                }
                return callback(null);
            });
        }
    }, callback);
};
function wizzify(html, options, callback) {
    // log 'wizzi-tools.htmlparser.wizzify.html', html
    parseInternal(html, options, callback);
}
