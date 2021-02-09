/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\loader\evaluator.js.ittf
*/
'use strict';
var jsWizziRunner = require('../jswizzi/jsWizziRunner');
var JsWizziContext = require('../jswizzi/jsWizziContext');
var dateUtil = require('../jswizzi/functions/dateutil');
var JsWizziScriptCoder = require('../jswizzi/JsWizziScriptCoder');
var mTreeBuildUpScripter = require('./mTreeBuildUpScripter');
var requireFromString = null;
/**
     The final step of an mTree loading.
     Executes the expression evaluations and the
     template commands of the composedMTree and builds the final mTree:
     . creates the mTreeBuildUpScript from the composedMTree,
     . creates the jsWizziContext and loads the loadContext.mTreeBuildUpContext
     in the global context,
     . runs the script with the jsWizziRunner,
     . returns the builded mTree.
    
     params
     { composedMTree
     { loadContext
     { mTreeBuildUpContext
     { productionContext
     { runnerServer
     { options
     boolean isCompile
     callback
    
*/
module.exports = function(composedMTree, loadContext, callback) {
    loadContext.options = loadContext.options || {};
    var isCompile = loadContext.options.isCompile;
    var productionContext = loadContext.productionContext;
    var scriptCoder = new JsWizziScriptCoder();
    var jsWizziContext = new JsWizziContext(composedMTree, productionContext, scriptCoder);
    jsWizziContext.setGlobalValues(loadContext.mTreeBuildUpContext);
    var ctx = {
        brickKey: null, 
        counter: 0, 
        startTime: dateUtil.now_GMYHMS(), 
        isCompile: isCompile
    };
    // log 'isCompile', isCompile
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
    productionContext.addMTreeBuildUpScript(composedMTree.uri, scriptCoder);
    if (isCompile) {
        return callback(local_error('IttfLoadError', 'evaluator', 'The "isCompile" option cannot be used when "isWebpackTarget" is set to true'));
    }
    else {
        jsWizziRunner.run(scriptCoder.toCode(), jsWizziContext, {}, function(err, result) {
            if (err) {
                // set err.scriptCode = scriptCoder.toCode()
                return callback(err);
            }
            jsWizziContext.set_NodeContext();
            var $0 = jsWizziContext.getValue('$0');
            if (typeof($0) === 'undefined' || $0 == null || $0.children === 'undefined') {
                return callback(local_error('IttfEvaluationError', 'evaluator', 'No node returned after IttfEvaluation', composedMTree.nodes[0], null));
            }
            finalize(composedMTree, $0, ctx, callback);
        });
    }
};
function finalize(composedMTree, $0, ctx, callback) {
    composedMTree.nodes = [];
    var i, i_items=$0.children, i_len=$0.children.length, item;
    for (i=0; i<i_len; i++) {
        item = $0.children[i];
        item.parent = null;
        composedMTree.nodes.push(item);
    }
    composedMTree.data = {
        createdAt: ctx.startTime
    };
    callback(null, composedMTree);
}
function local_error(name, method, message, node, inner, other) {
    return new errors.WizziError(message, node, node ? node.mTreeBrick || node.model : null, {
            errorName: name, 
            method: method, 
            inner: inner, 
            ...other||{}
        });
}
