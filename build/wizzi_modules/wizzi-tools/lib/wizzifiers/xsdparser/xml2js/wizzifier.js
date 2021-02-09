/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\wizzifiers\xsdparser\xml2js\wizzifier.js.ittf
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
function wizzify(xml, options, callback) {
    parseInternal(xml, options, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (options.dumpfile) {
            file.write(options.dumpfile, JSON.stringify(result, null, 2));
        }
        const wizziTree = {
            tag: 'xsd', 
            name: '', 
            attribs: [], 
            children: []
        };
        for (var prop in result) {
            if (result.hasOwnProperty(prop)) {
                if (prop.indexOf('schema') < 0) {
                    return callback(new Error("Root is not a schema element. Prop: " + prop + ', root: ' + root));
                }
                var root = result[prop];
                if (verify.isObject(root) === false) {
                    return callback(new Error("Root is not an object. Prop: " + prop + ', root: ' + root));
                }
                var ctx = getNamespaces(root);
                appendXmlNodeToIttfNode(ctx, root, wizziTree);
            }
        }
        return callback(null, wizziTree);
    });
}
function appendXmlNodeToIttfNode(ctx, xmlNode, parent) {
    if (verify.isString(xmlNode)) {
        var ss = xmlNode.split('\n');
        if (ss.length > 1) {
            console.log('ss', ss);
            parent.name = ss[0];
            for (var j=1; j<ss.length; j++) {
                var tag = {
                    tag: '#', 
                    name: ss[j], 
                    children: []
                };
                parent.children.push(tag);
            }
        }
        else {
            parent.name = xmlNode;
        }
    }
    else {
        var parentTag = parent.tag;
        var ac = getAttribsAndChilds(ctx, xmlNode);
        if (parentTag[0] === '#' && ac.n) {
            var ss = ac.n.split(['\n', '\r']);
            var i, i_items=ss, i_len=ss.length, s;
            for (i=0; i<i_len; i++) {
                s = ss[i];
                var tag = {
                    tag: parentTag, 
                    name: s, 
                    children: []
                };
                parent.children.push(tag);
            }
        }
        // log 'parent.tag, ac.n', parent.tag, ac.n
        if (ac.n && !parent.name) {
            parent.name = ac.n;
        }
        var attribs = ac.a, aName, rName, nsn;
        if ((attribs.minOccurs || attribs.maxOccurs) && !parent.name) {
            parent.name = occurs(attribs.minOccurs) + '-' + occurs(attribs.maxOccurs);
            delete (attribs.minOccurs);
            delete (attribs.maxOccurs);
        }
        for (aName in attribs) {
            nsn = nsName(aName);
            if (nsn.prefix === 'xmlns') {
                parent.children.push({
                    tag: 'xmlns', 
                    name: nsn.local + ' ' + attribs[aName], 
                    children: []
                });
                continue;
            }
            rName = resolveAttrName(aName);
            if ((rName === 'schema-location') && (parentTag === 'include' || parentTag === 'import' || parentTag === 'redefine')) {
                parent.name = attribs[aName];
            }
            else if ((rName === 'value') && (parentTag === 'enum')) {
                parent.name = attribs[aName];
            }
            else if ((rName === 'value') && isFacetElementName(parentTag)) {
                parent.name = attribs[aName];
            }
            else if (rName === 'base' && (parentTag === 'restrict' || parentTag === 'extension') && verify.isEmpty(parent.name)) {
                parent.name = ': ' + attribs[aName];
            }
            else if ((rName === 'ref') && (parentTag === 'ag')) {
                parent.tag = 'ag-ref';
                parent.name = attribs[aName];
            }
            else if ((rName === 'ref') && (parentTag === 'e')) {
                parent.tag = 'e-ref';
                parent.name = attribs[aName];
            }
            else if ((rName === 'ref') && (parentTag === 'a')) {
                parent.tag = 'a-ref';
                parent.name = attribs[aName];
            }
            else if ((rName === 'ref') && (parentTag === 'group')) {
                parent.tag = 'group-ref';
                parent.name = attribs[aName];
            }
            else if ((rName === 'item-type') && (parentTag === 'list')) {
                parent.name = attribs[aName];
            }
            else if ((rName === 'member-types') && (parentTag === 'union')) {
                parent.name = attribs[aName];
            }
            else if (isEmitAttrName(rName)) {
                parent.children.push({
                    tag: rName, 
                    name: attribs[aName], 
                    children: []
                });
            }
            else if (rName === 'use') {
                parent.children.push({
                    tag: 'is-' + attribs[aName], 
                    children: []
                });
            }
            else if (rName === 'source' && parentTag === '#') {
                parent.children.push({
                    tag: '# source', 
                    name: attribs[aName], 
                    children: []
                });
            }
            else if (rName === 'abstract') {
                if (attribs[aName] === 'true') {
                    parent.children.push({
                        tag: 'is-' + rName, 
                        children: []
                    });
                }
            }
            else {
                parent.children.push({
                    tag: '@', 
                    name: rName + ' ' + attribs[rName], 
                    children: []
                });
            }
        }
        var i, i_items=ac.c, i_len=ac.c.length, childnode;
        for (i=0; i<i_len; i++) {
            childnode = ac.c[i];
            if (verify.isArray(childnode.value) === false) {
                console.log("Error: value is not an array: " + childnode.name + ',' + childnode.value);
            }
            else {
                var childXmlNodeName = resolveElementName(childnode.name);
                if (childXmlNodeName === '#') {
                    var j, j_items=childnode.value, j_len=childnode.value.length, childnodeItem;
                    for (j=0; j<j_len; j++) {
                        childnodeItem = childnode.value[j];
                        var ac2 = getAttribsAndChilds(ctx, childnodeItem);
                        if (!ac2.n && ac2.c.length == 1) {
                            appendParsedChildsToIttfNode(ctx, ac2.c, parent);
                        }
                        else {
                            throw ac2.c;
                        }
                    }
                }
                else if ((childXmlNodeName === 'restrict' || childXmlNodeName === 'extend') && (parent.tag === 'c-content' || parent.tag === 's-content') && childnode.value.length == 1) {
                    // log 'parent.tag', parent.tag, childXmlNodeName, childnode.value
                    var ac2 = getAttribsAndChilds(ctx, childnode.value[0]);
                    parent.tag = parent.tag + '-' + childXmlNodeName;
                    parent.name = ac2.a.base;
                    appendParsedChildsToIttfNode(ctx, ac2.c, parent);
                }
                else {
                    var j, j_items=childnode.value, j_len=childnode.value.length, childnodeItem;
                    for (j=0; j<j_len; j++) {
                        childnodeItem = childnode.value[j];
                        var tag = {
                            tag: childXmlNodeName, 
                            name: '', 
                            children: []
                        };
                        parent.children.push(tag);
                        appendXmlNodeToIttfNode(ctx, childnodeItem, tag);
                    }
                }
            }
        }
    }
}
function appendParsedChildsToIttfNode(ctx, parsedChilds, parent) {
    var i, i_items=parsedChilds, i_len=parsedChilds.length, childnode;
    for (i=0; i<i_len; i++) {
        childnode = parsedChilds[i];
        var childXmlNodeName = resolveElementName(childnode.name);
        var j, j_items=childnode.value, j_len=childnode.value.length, childnodeItem;
        for (j=0; j<j_len; j++) {
            childnodeItem = childnode.value[j];
            var tag = {
                tag: childXmlNodeName, 
                name: '', 
                children: []
            };
            parent.children.push(tag);
            appendXmlNodeToIttfNode(ctx, childnodeItem, tag);
        }
    }
}
function getAttribsAndChilds(ctx, node) {
    var name = null;
    var attribs = {};
    var children = [];
    for (var prop in node) {
        if (node.hasOwnProperty(prop)) {
            if (prop === '$') {
                var attribsObj = node[prop];
                // _ log('getAttribsAndChilds.$', attribsObj, true)
                for (var k in attribsObj) {
                    if (k === 'name') {
                        name = attribsObj[k];
                    }
                    else {
                        attribs[k] = attribsObj[k];
                    }
                }
            }
            else {
                var value = node[prop];
                var isArray = verify.isArray(value);
                if (isArray) {
                    var nsn = nsName(prop);
                    if (!nsn.prefix || ctx.xmlSchemaNsPrefix === nsn.prefix) {
                        children.push({
                            name: nsn.local, 
                            value: value
                        });
                    }
                    else {
                        children.push({
                            name: prop, 
                            value: value
                        });
                    }
                }
            }
        }
    }
    return {
            n: name, 
            a: attribs, 
            c: children
        };
}
function resolveElementName(name) {
    if (name === 'enumeration') {
        return 'enum';
    }
    else if (name === 'anyAttribute') {
        return 'any-a';
    }
    else if (name === 'restriction') {
        return 'restrict';
    }
    else if (name === 'extension') {
        return 'extend';
    }
    else if (name === 'simpleType') {
        return 's-type';
    }
    else if (name === 'complexType') {
        return 'c-type';
    }
    else if (name === 'complexContent') {
        return 'c-content';
    }
    else if (name === 'attribute') {
        return 'a';
    }
    else if (name === 'attributeGroup') {
        return 'ag';
    }
    else if (name === 'element') {
        return 'e';
    }
    else if (name === 'elementGroup') {
        return 'eg';
    }
    else if (name === 'annotation' || name === '\n') {
        return '#';
    }
    else if (name === 'documentation') {
        return '#';
    }
    else if (name === 'minLength') {
        return 'min-length';
    }
    else if (name === 'maxLength') {
        return 'max-length';
    }
    else if (name === 'minInclusive') {
        return 'min-inclusive';
    }
    else if (name === 'maxInclusive') {
        return 'max-inclusive';
    }
    else if (name === 'minExclusive') {
        return 'min-exclusive';
    }
    else if (name === 'maxExclusive') {
        return 'max-exclusive';
    }
    else if (name === 'fractionDigits') {
        return 'fraction-digits';
    }
    else if (name === 'totalDigits') {
        return 'total-digits';
    }
    else if (name === 'maxScale') {
        return 'max-scale';
    }
    else if (name === 'minScale') {
        return 'min-scale';
    }
    else if (name === 'explicitTimeZone') {
        return 'explicit-time-zone';
    }
    else {
        return name;
    }
}
function isFacetElementName(name) {
    var facetNames = [
        'length', 
        'min-length', 
        'max-length', 
        'min-inclusive', 
        'max-inclusive', 
        'min-exclusive', 
        'max-exclusive', 
        'fraction-digits', 
        'total-digits', 
        'max-scale', 
        'min-scale', 
        'pattern', 
        'explicit-time-zone', 
        'whitespace'
    ];
    return facetNames.indexOf(name) > -1;
}
function isEmitAttrName(name) {
    var emitAttrNames = [
        'id', 
        'type', 
        'fixed', 
        'mixed', 
        'default', 
        'attribute-form-default', 
        'element-form-default', 
        'language', 
        'member-types', 
        'min-occurs', 
        'max-occurs', 
        'namespace', 
        'substitution-group', 
        'process-contents', 
        'public', 
        'item-type', 
        'schema-location', 
        'system', 
        'target-namespace', 
        'version', 
        'xmlns', 
        'xpath'
    ];
    return emitAttrNames.indexOf(name) > -1;
}
function resolveAttrName(name) {
    if (name === 'attributeFormDefault') {
        return 'attribute-form-default';
    }
    else if (name === 'blockDefault') {
        return 'block-default';
    }
    else if (name === 'elementFormDefault') {
        return 'element-form-default';
    }
    else if (name === 'itemType') {
        return 'item-type';
    }
    else if (name === 'minOccurs') {
        return 'min-occurs';
    }
    else if (name === 'maxOccurs') {
        return 'max-occurs';
    }
    else if (name === 'memberTypes') {
        return 'member-types';
    }
    else if (name === 'processContents') {
        return 'process-contents';
    }
    else if (name === 'schemaLocation') {
        return 'schema-location';
    }
    else if (name === 'substitutionGroup') {
        return 'substitution-group';
    }
    else if (name === 'targetNamespace') {
        return 'target-namespace';
    }
    else if (name === 'xml:lang') {
        return 'language';
    }
    else {
        return name;
    }
}
function nsName(name) {
    var ss = name.split(':');
    if (ss.length == 2) {
        return {
                prefix: ss[0], 
                local: ss[1]
            };
    }
    else {
        return {
                local: name
            };
    }
}
function occurs(value) {
    return value === '0' ? value : value === 'unbounded' ? 'n' : (value || '');
}
function getNamespaces(rootXmlNode) {
    var ret = {
        targetNs: null, 
        defaultNs: null, 
        namespaces: []
    };
    var ac = getAttribsAndChilds({}, rootXmlNode);
    for (var k in ac.a) {
        if (k === 'targetNamespace') {
            ret.targetNs = ac.a[k];
        }
        else if (k === 'xmlns') {
            ret.defaultNs = ac.a[k];
        }
        else {
            var nsn = nsName(k);
            if (nsn.prefix === 'xmlns') {
                ret.namespaces.push({
                    prefix: nsn.local, 
                    ns: ac.a[k]
                });
            }
        }
    }
    ret.xmlSchemaNsIsDefault = ret.defaultNs === 'http://www.w3.org/2001/XMLSchema';
    ret.xmlSchemaNsIsTarget = ret.targetNs === 'http://www.w3.org/2001/XMLSchema';
    var i, i_items=ret.namespaces, i_len=ret.namespaces.length, item;
    for (i=0; i<i_len; i++) {
        item = ret.namespaces[i];
        if (item.ns === ret.targetNs) {
            ret.targetNsPrefix = item.prefix;
        }
        if (item.ns === 'http://www.w3.org/2001/XMLSchema') {
            ret.xmlSchemaNsPrefix = item.prefix;
        }
    }
    console.log('getNamespaces', ret);
    return ret;
}
