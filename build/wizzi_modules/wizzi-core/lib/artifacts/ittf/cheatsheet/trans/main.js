/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\ittf\cheatsheet\trans\main.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineparser = verify.lineParser;
var stringify = require('json-stringify-safe');
var prettify = require('wizzi-utils').prettifyFromString;

var md = module.exports = {};
var myname = 'wizzi-core.ittf.Cheatsheet.trans.main';

md.trans = function(model, ctx, callback) {
    var transformedModel = {};
    if (model.wzElement !== 'ittf') {
        console.log('wizzi-core', 'transformer', 'model', model);
        callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected "ittf". Received: ' + model.wzElement, model));
    }
    try {
        executeTrans(model, ctx, callback);
    } 
    catch (ex) {
        return callback(ex);
    } 
};
function executeTrans(model, ctx, callback) {
    // log 'Starting transform ittf/cheatsheet'
    var workObj = {
        elements: [
            
        ], 
        _all_items: [
            
        ]
    };
    loadCheats(model, workObj);
    generateArtifacts(ctx, workObj, function(err, result) {
        if (err) {
            return callback(err);
        }
        // log 'executeTrans.result', result
        callback(null, result);
    });
}
function loadCheats(model, workObj) {
    var i, i_items=model.children, i_len=model.children.length, itemTop;
    for (i=0; i<i_len; i++) {
        itemTop = model.children[i];
        if (itemTop.name !== 'element') {
            workObj[itemTop.name] = itemTop.value;
        }
    }
    var i, i_items=model.children, i_len=model.children.length, itemTop;
    for (i=0; i<i_len; i++) {
        itemTop = model.children[i];
        // log 'name, value', itemTop.name, itemTop.value
        if (itemTop.name === 'element') {
            var elementResult = {
                name: itemTop.value, 
                items: [
                    
                ]
            };
            var j, j_items=itemTop.children, j_len=itemTop.children.length, itemEl;
            for (j=0; j<j_len; j++) {
                itemEl = itemTop.children[j];
                if (itemEl.name === 'item') {
                    var itemResult = {
                        schema: workObj.schema, 
                        render: 'artifact'
                    };
                    var k, k_items=itemEl.children, k_len=itemEl.children.length, item;
                    for (k=0; k<k_len; k++) {
                        item = itemEl.children[k];
                        if (item.name === 'ittf') {
                            // log 'item.name, toIttf(item.children[0])', item.name, toIttf(item.children[0])
                            if (item.children.length == 1) {
                                if ((workObj.schema === 'json' && (item.children[0].name === '{' || item.children[0].name === '[')) || item.children[0].name === ittfRootFromSchema(workObj.schema) || ittfRootFromSchema(workObj.schema) === 'any') {
                                    // is already ok, has the correct root
                                    // ??? set itemResult[item.name] = toIttf(item.children[0])
                                    itemResult[item.name] = toIttf(item.children[0]);
                                    itemResult[item.name + 'Wrapped'] = itemResult[item.name];
                                }
                                else {
                                    // wrap it
                                    var ittfNode = wrapperForSchema(workObj.schema);
                                    var l, l_items=item.children, l_len=item.children.length, node;
                                    for (l=0; l<l_len; l++) {
                                        node = item.children[l];
                                        ittfNode.children.push(node);
                                    }
                                    itemResult[item.name] = toIttf(item.children[0]);
                                    itemResult[item.name + 'Wrapped'] = toIttf(ittfNode);
                                }
                            }
                            else {
                                // wrap them
                                var ittfNode = wrapperForSchema(workObj.schema);
                                var l, l_items=item.children, l_len=item.children.length, node;
                                for (l=0; l<l_len; l++) {
                                    node = item.children[l];
                                    ittfNode.children.push(node);
                                }
                                itemResult[item.name] = toIttf(item.children);
                                itemResult[item.name + 'Wrapped'] = toIttf(ittfNode);
                            }
                        }
                        else {
                            itemResult[item.name] = item.value;
                            // log item.name, item.value
                        }
                    }
                    elementResult.items.push(itemResult);
                    workObj._all_items.push(itemResult);
                }
                else {
                    elementResult[itemEl.name] = itemEl.value;
                }
            }
            workObj.elements.push(elementResult);
        }
    }
    var dump = stringify(workObj, null, 2);
    // log 'loadCheats, _all_items.length', workObj._all_items.length
    // log 'loadCheats, workObj\n', dump
}
function generateArtifacts(ctx, workObj, callback_main) {
    var counter = 0;
    async.mapSeries(workObj._all_items, function(item, callback) {
        // log 'counter', ++counter
        process.nextTick(function() {
            prettify(item.ittfWrapped, function(err, pretty) {
                if (err) {
                    return callback(err);
                }
                item.ittfPretty = pretty;
                // log 'pretty', pretty
                // log 'ittf.cheatsheet.ctx', ctx
                // log 'counter.prettified', counter
                if (item.render === 'script') {
                    // log 'ctx.wizziFactory.loadMTreeDebugInfoFromText', ctx.wizziFactory.loadMTreeDebugInfoFromText
                    ctx.wizziFactory.loadMTreeDebugInfoFromText(item.ittfWrapped, {}, function(err, script) {
                        // log 'counter', --counter
                        if (err) {
                            item.generated = '\n' + verify.htmlEscape(stringify(err, null, 2));
                        }
                        else {
                            item.generated = '\n' + verify.htmlEscape(script.mTreeBuildUpScript);
                        }
                        callback(null);
                    });
                }
                else {
                    // log 'ctx.wizziFactory.loadModelAndGenerateArtifactFromText', ctx.wizziFactory.loadModelAndGenerateArtifactFromText, artifactNameFromSchema(item.schema)
                    ctx.wizziFactory.loadModelAndGenerateArtifactFromText(item.ittfWrapped, {
                        artifactRequestContext: {
                            noUseStrict: true, 
                            noGeneratorComments: true
                        }
                    }, artifactNameFromSchema(item.schema), function(err, artifactText) {
                        // log 'err, artifactText', err, artifactText
                        // log 'counter', --counter
                        if (err) {
                            item.generated = '\n' + verify.htmlEscape(stringify(err, null, 2));
                        }
                        else {
                            artifactText = verify.htmlEscape(artifactText);
                            item.generated = '\n' + artifactText;
                        }
                        callback(null);
                    });
                }
            });
        });
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        var dump = stringify(workObj, null, 2);
        // log 'workObj final\n', dump
        // log 'Ending transform ittf/cheatsheet'
        callback_main(null, {
            schema: workObj.schema, 
            elements: workObj.elements
        });
    });
}
function toIttf(node) {
    var buffer = [];
    if (verify.isArray(node)) {
        var i, i_items=node, i_len=node.length, item;
        for (i=0; i<i_len; i++) {
            item = node[i];
            if (item.children) {
                _toIttfNodeDeep(item, 0, buffer);
            }
            else {
                item.nodes.forEach(function(node) {
                    _toIttfNodeDeep(node, 0, buffer);
                });
            }
        }
    }
    else {
        if (node && node.children) {
            _toIttfNodeDeep(node, 0, buffer);
        }
        else {
            node.nodes.forEach(function(node) {
                _toIttfNodeDeep(node, 0, buffer);
            });
        }
    }
    return buffer.join('\n');
}
function _toIttfNodeDeep(node, indent, buffer) {
    if (node.name) {
        buffer.push(spaces(indent * 4) + node.name + ' ' + (node.value || ''));
    }
    else {
        buffer.push(spaces(indent * 4) + node.n + ' ' + (node.v || ''));
    }
    var i, i_items=node.children, i_len=node.children.length, child;
    for (i=0; i<i_len; i++) {
        child = node.children[i];
        _toIttfNodeDeep(child, indent + 1, buffer);
    }
}
function spaces(num) {
    return Array(num + 1).join(" ")
    ;
}
function wrapperForSchema(schema) {
    if (schema === 'js' || schema === 'jsx') {
        return {
                n: 'module', 
                children: [
                    {
                        n: 'kind', 
                        v: 'react', 
                        children: [
                            
                        ]
                    }
                ]
            };
    }
    else if (schema === 'ts') {
        return {
                n: 'module', 
                children: [
                    
                ]
            };
    }
    else {
        return {
                n: schema, 
                children: [
                    
                ]
            };
    }
}
var schemaArtifactMap = {
    js: 'js/module', 
    jsx: 'js/module', 
    ts: 'ts/module', 
    html: 'html/document', 
    css: 'css/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    vtt: 'vtt/document', 
    md: 'md/document', 
    vue: 'vue/document', 
    graphql: 'graphql/document', 
    json: 'json/document', 
    ittf: 'ittf/document', 
    xml: 'xml/document', 
    text: 'text/document'
};
function artifactNameFromSchema(schema) {
    // log 'artifactNameFromSchema', schema, schemaArtifactMap[schema]
    return schemaArtifactMap[schema];
}
var schemaIttfRootMap = {
    js: 'module', 
    jsx: 'module', 
    html: 'html', 
    css: 'css', 
    scss: 'scss', 
    svg: 'svg', 
    md: 'md', 
    vtt: 'vtt', 
    vue: 'vue', 
    graphql: 'graphql', 
    json: '{', 
    ittf: 'any', 
    text: 'text', 
    xml: 'xml'
};
function ittfRootFromSchema(schema) {
    // log 'ittfRootFromSchema', schema, schemaIttfRootMap[schema]
    return schemaIttfRootMap[schema];
}
/**
     params
     string errorName
     # the error name or number
     string method
     string message
     # optional
     { model
     # optional
     { innerError
     # optional
*/
function error(errorName, method, message, model, innerError) {
    return new errors.WizziPluginError(message, model, {
            errorName: errorName, 
            method: 'wizzi-core/lib/artifacts/ittf/cheatsheet/trans/main.' + method, 
            sourcePath: __filename, 
            inner: innerError
        });
}
