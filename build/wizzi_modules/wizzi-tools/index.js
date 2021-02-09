/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\root\index.js.ittf
*/
'use strict';
var wizziUtils = require('wizzi-utils');
var jswizzifier = require('./lib/wizzifiers/jsparser/babel/wizzifier');
var xmlwizzifier = require('./lib/wizzifiers/xmlparser/xml2js/wizzifier');
var csswizzifier = require('./lib/wizzifiers/cssparser/css/wizzifier');
// var scsswizzifier = require('./lib/wizzifiers/scssparser/salesforce/wizzifier')
var scsswizzifier = require('./lib/wizzifiers/scssparser/gonzales/wizzifier');
var htmlwizzifier = require('./lib/wizzifiers/htmlparser/wizzi/wizzifier');
var jsonwizzifier = require('./lib/wizzifiers/jsonparser/wizzi/wizzifier');
var xsdwizzifier = require('./lib/wizzifiers/xsdparser/xml2js/wizzifier');
var svgwizzifier = require('./lib/wizzifiers/svgparser/xml2js/wizzifier');
var graphqlwizzifier = require('./lib/wizzifiers/graphqlparser/graphql/wizzifier');
var ittfwriter = require('./lib/util/ittfwriter');
var md = module.exports = {};
md.ittfwriter = ittfwriter;
md.jswizzifier = jswizzifier;
md.tswizzifier = jswizzifier;
md.xmlwizzifier = xmlwizzifier;
md.csswizzifier = csswizzifier;
md.scsswizzifier = scsswizzifier;
md.svgwizzifier = svgwizzifier;
md.htmlwizzifier = htmlwizzifier;
md.jsonwizzifier = jsonwizzifier;
md.graphqlwizzifier = graphqlwizzifier;
md.wizzify_js = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            kind: 'react', 
            babel: {
                sourceType: 'module'
            }, 
            syntaxOutFile: null
        };
    }
    // log 'wizzi-tools.wizzify_js.options', options
    jswizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_ts = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            kind: 'react', 
            babel: {
                sourceType: 'module', 
                ts_or_flow: 'typescript'
            }, 
            syntaxOutFile: null
        };
    }
    // log 'wizzi-tools.wizzify_ts.options', options
    jswizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_xml = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    xmlwizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_xsd = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    xsdwizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_svg = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    svgwizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_css = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    csswizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_scss = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    scsswizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_html = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    options.embedTag = 'html';
    htmlwizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_json = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    jsonwizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_graphql = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    graphqlwizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify_vue = function(codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {
            syntaxOutFile: null
        };
    }
    options.isForVue = true;
    options.embedTag = 'vue';
    htmlwizzifier.getWizziIttf(codeSnippet, options, callback);
};
md.wizzify = function(schemaName, codeSnippet, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (schemaName === 'ts' && !options.babel) {
        options.babel = {
            sourceType: 'module', 
            ts_or_flow: 'typescript'
        };
    }
    try {
        var wizzifier = md['wizzify_' + schemaName.toLowerCase()];
        // log 'wizzi-tools.wizzify', schemaName, wizzifier
        if (!wizzifier) {
            return callback(new Error("Non wizzifier found for schema: " + schemaName));
        }
        wizzifier(codeSnippet, options, callback);
    } 
    catch (ex) {
        console.log(ex);
        return callback(ex);
    } 
};
md.canBeWizzified = function(schemaName) {
    if (wizziUtils.verify.isEmpty(schemaName)) {
        return false;
    }
    return wizziUtils.verify.isFunction(md['wizzify_' + schemaName.toLowerCase()]);
};
md.getCodeAST = function(schemaName, codeSnippet, callback) {
    try {
        var wizzifier = md[schemaName.toLowerCase() + 'wizzifier'];
        if (!wizzifier) {
            return callback(new Error("Non wizzifier found for schema: " + schemaName));
        }
        var options = {};
        if (schemaName === 'ts') {
            options = {
                babel: {
                    sourceType: 'module', 
                    ts_or_flow: 'typescript'
                }
            };
        }
        wizzifier.getCodeAST(codeSnippet, options, callback);
    } 
    catch (ex) {
        return callback(ex);
    } 
};
md.toIttfTreeEx = function(ittfContent) {
    return wizziUtils.IttfMTreeEx.createFrom(ittfContent, {
            fromString: true, 
            clean: true
        });
};
