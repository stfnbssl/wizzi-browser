/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\loader\debugInfoBuilder.js.ittf
*/
'use strict';
var JsWizziContext = require('../jswizzi/jsWizziContext');
var dateUtil = require('../jswizzi/functions/dateutil');
var JsWizziScriptCoder = require('../jswizzi/JsWizziScriptCoder');
var mTreeBuildUpScripter = require('./mTreeBuildUpScripter');
var requireFromString = null;
/**
     Returns for debug purposes:
     . the mTreeBuildUpScript
*/
module.exports = function(composedMTree, loadContext, callback) {
    var productionContext = loadContext.productionContext;
    loadContext.options = loadContext.options || {};
    var jsWizziContext = new JsWizziContext(composedMTree, productionContext);
    jsWizziContext.setGlobalValues(loadContext.mTreeBuildUpContext);
    var ctx = {
        brickKey: null, 
        counter: 0, 
        startTime: dateUtil.now_GMYHMS(), 
        isCompile: loadContext.options.isCompile
    };
    var isCompile = loadContext.options.isCompile;
    var scriptCoder = new JsWizziScriptCoder();
    scriptCoder.w('// ' + ctx.startTime + '  by ' + __filename);
    if (isCompile) {
        scriptCoder.w('module.exports = function($, $ctx) {');
        scriptCoder.indent();
        var i, i_items=Object.keys(jsWizziContext.getIsCompileGlobals()), i_len=Object.keys(jsWizziContext.getIsCompileGlobals()).length, k;
        for (i=0; i<i_len; i++) {
            k = Object.keys(jsWizziContext.getIsCompileGlobals())[i];
            scriptCoder.w('var ' + k + ' = $ctx.' + k + ';');
        }
    }
    scriptCoder.w('$.n(); // set the context state to NodeContext');
    scriptCoder.w('var $0 = {}; // the root node of the MTree buildup');
    var i, i_items=composedMTree.nodes, i_len=composedMTree.nodes.length, item;
    for (i=0; i<i_len; i++) {
        item = composedMTree.nodes[i];
        mTreeBuildUpScripter.codify(item, 0, scriptCoder, ctx);
    }
    if (isCompile) {
        scriptCoder.w('return $0;');
        scriptCoder.deindent();
        scriptCoder.w('}');
    }
    callback(null, {
        mTreeBuildUpScript: scriptCoder.toCode()
    });
};
