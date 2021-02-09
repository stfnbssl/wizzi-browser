/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\loader\index.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var util = require('util');
var path = require('path');
var verify = require('wizzi-utils').verify;
var errors = require('../errors');
var node = require('../util/node');
var MTreeBrickProvider = require('./mTreeBrickProvider');
var frontMatter = require('./frontMatter');
var includer = require('./includer');
var mixer = null;
var appender = require('./appender');
var evaluator = require('./evaluator');
var debugInfoBuilder = require('./debugInfoBuilder');
var md = module.exports = {};
/**
     The Big JOB of an mTree loading manages:
     normalization of loadContext objects
     instantiation of the modelProvider
     liner
     nodifier
     includer
     mixer
     appender
     evaluator
     params
     Are checked in wizzi-mtree/index.js. See there for doc.
     There should be no direct access to this method except for testing.
*/
md.loadMTree = function loadMTree(primaryIttfDocumentUri, loadContext, callback) {
    var originalloadContext = loadContext;
    loadContext = normalizeRequestContext(loadContext);
    if (loadContext.__is_error) {
        loadContext.ittfDocumentUri = primaryIttfDocumentUri;
        loadContext.instance = originalloadContext;
        return callback(loadContext);
    }
    // log 'wizzi-mtree.index.primaryIttfDocumentUri', primaryIttfDocumentUri
    MTreeBrickProvider.createFromUri(primaryIttfDocumentUri, loadContext, function(err, createdProvider) {
        if (err) {
            err.primaryIttfDocumentUri = primaryIttfDocumentUri;
            // VIA 22/10/18 set err.MTreeLoaderIndexStack = (new Error()).stack
            return callback(err);
        }
        var primaryMTreeBrick = createdProvider.getPrimaryMTreeBrick();
        if (!primaryMTreeBrick.nodes || primaryMTreeBrick.nodes.length == 0) {
            return callback(null, primaryMTreeBrick);
        }
        // log 'wizzi-mtree.loader.index.primaryMTreeBrick', primaryMTreeBrick.dump()
        // resolve $-- (front matter) commands
        frontMatter(primaryMTreeBrick, function(err, frontMatterResolvedMTreePiece) {
            if (err) {
                return callback(err);
            }
            // resolve $include commands
            includer(frontMatterResolvedMTreePiece, createdProvider, function(err, includedMTreePiece) {
                if (err) {
                    return callback(err);
                }
                if (mixer == null) {
                    mixer = require('./mixer');
                }
                // mix primary mTreeBrick and mixins
                mixer(includedMTreePiece, createdProvider, function(err, mixedMTreePiece) {
                    if (err) {
                        return callback(err);
                    }
                    loadContext.productionContext.addMixedMTree(primaryIttfDocumentUri, mixedMTreePiece);
                    // resolve $group, $hook and $append commands
                    appender(mixedMTreePiece, function(err, appendedMTreePiece) {
                        if (err) {
                            return callback(err);
                        }
                        // evaluate
                        evaluator(appendedMTreePiece, loadContext, function(err, finalMTree) {
                            if (err) {
                                // log 'wizzi-mTree.loader.index.err', err
                                err.ittfDocumentUri = primaryIttfDocumentUri;
                                return callback(err);
                            }
                            // log 'wizzi-mTree.loader.index.createdProvider.loadHistory', createdProvider.loadHistory
                            finalMTree.loadHistory = createdProvider.loadHistory;
                            loadContext.productionContext.addEvaluatedMTree(primaryIttfDocumentUri, finalMTree);
                            callback(null, finalMTree);
                        });
                    });
                });
            });
        });
    });
};
/**
     Load the raw primaryIttfDocumentUri only and extract the front-matter values.
*/
md.loadMTreeFrontMatter = function loadMTreeRaw(primaryIttfDocumentUri, loadContext, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'loadMTreeRaw', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(primaryIttfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'primaryIttfDocumentUri', message: 'The primaryIttfDocumentUri parameter must be a string. Received: ' + primaryIttfDocumentUri }
        ));
    }
    if (verify.isObject(loadContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext', message: 'The loadContext parameter must be an object. Received: ' + loadContext }
        ));
    }
    if (verify.isObject(loadContext.__productionManager) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__productionManager', message: 'The loadContext.__productionManager parameter must be an object. Received: ' + loadContext.__productionManager }
        ));
    }
    if (verify.isObject(loadContext.__productionManager.productionContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__productionManager.productionContext', message: 'The loadContext.__productionManager.productionContext parameter must be an object. Received: ' + loadContext.__productionManager.productionContext }
        ));
    }
    if (verify.isObject(loadContext.__productionManager.productionContext.aclstat) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__productionManager.productionContext.aclstat', message: 'The loadContext.__productionManager.productionContext.aclstat parameter must be an object. Received: ' + loadContext.__productionManager.productionContext.aclstat }
        ));
    }
    if (verify.isObject(loadContext.__ittfDocumentStore) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__ittfDocumentStore', message: 'The loadContext.__ittfDocumentStore parameter must be an object. Received: ' + loadContext.__ittfDocumentStore }
        ));
    }
    md.loadMTreeRaw(primaryIttfDocumentUri, loadContext, function(err, primaryMTreeBrick) {
        if (err) {
            return callback(err);
        }
        // resolve $-- (front matter) commands
        frontMatter(primaryMTreeBrick, callback);
    });
};
/**
     Load the raw primaryIttfDocumentUri only.
     This is mainly for debug or documentation purposes.
*/
md.loadMTreeRaw = function loadMTreeRaw(primaryIttfDocumentUri, loadContext, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'loadMTreeRaw', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(primaryIttfDocumentUri) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'primaryIttfDocumentUri', message: 'The primaryIttfDocumentUri parameter must be a string. Received: ' + primaryIttfDocumentUri }
        ));
    }
    if (verify.isObject(loadContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext', message: 'The loadContext parameter must be an object. Received: ' + loadContext }
        ));
    }
    if (verify.isObject(loadContext.__productionManager) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__productionManager', message: 'The loadContext.__productionManager parameter must be an object. Received: ' + loadContext.__productionManager }
        ));
    }
    if (verify.isObject(loadContext.__productionManager.productionContext) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__productionManager.productionContext', message: 'The loadContext.__productionManager.productionContext parameter must be an object. Received: ' + loadContext.__productionManager.productionContext }
        ));
    }
    if (verify.isObject(loadContext.__productionManager.productionContext.aclstat) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__productionManager.productionContext.aclstat', message: 'The loadContext.__productionManager.productionContext.aclstat parameter must be an object. Received: ' + loadContext.__productionManager.productionContext.aclstat }
        ));
    }
    if (verify.isObject(loadContext.__ittfDocumentStore) === false) {
        return callback(error(
            'InvalidArgument', 'loadMTreeRaw', { parameter: 'loadContext.__ittfDocumentStore', message: 'The loadContext.__ittfDocumentStore parameter must be an object. Received: ' + loadContext.__ittfDocumentStore }
        ));
    }
    var originalloadContext = loadContext;
    loadContext = normalizeRequestContext(loadContext);
    if (loadContext.__is_error) {
        loadContext.ittfDocumentUri = primaryIttfDocumentUri;
        loadContext.instance = originalloadContext;
        return callback(loadContext);
    }
    MTreeBrickProvider.createFromUri(primaryIttfDocumentUri, loadContext, function(err, createdProvider) {
        if (err) {
            err.primaryIttfDocumentUri = primaryIttfDocumentUri;
            return callback(err);
        }
        var primaryMTreeBrick = createdProvider.getPrimaryMTreeBrick();
        return callback(null, primaryMTreeBrick);
    });
};
/**
     Load mTree debug info.
     This is mainly for debug or documentation purposes.
*/
md.loadMTreeDebugInfo = function loadMTree(primaryIttfDocumentUri, loadContext, callback) {
    var originalloadContext = loadContext;
    loadContext = normalizeRequestContext(loadContext);
    if (loadContext.__is_error) {
        loadContext.ittfDocumentUri = primaryIttfDocumentUri;
        loadContext.instance = originalloadContext;
        return callback(loadContext);
    }
    MTreeBrickProvider.createFromUri(primaryIttfDocumentUri, loadContext, function(err, createdProvider) {
        if (err) {
            err.primaryIttfDocumentUri = primaryIttfDocumentUri;
            // VIA 22/10/18 set err.MTreeLoaderIndexStack = (new Error()).stack
            return callback(err);
        }
        var primaryMTreeBrick = createdProvider.getPrimaryMTreeBrick();
        if (!primaryMTreeBrick.nodes || primaryMTreeBrick.nodes.length == 0) {
            return callback(null, primaryMTreeBrick);
        }
        // log 'wizzi-mtree.loader.index.primaryMTreeBrick', primaryMTreeBrick.dump()
        // resolve $-- (front matter) commands
        frontMatter(primaryMTreeBrick, function(err, frontMatterResolvedMTreePiece) {
            if (err) {
                return callback(err);
            }
            // resolve $include commands
            includer(primaryMTreeBrick, createdProvider, function(err, includedMTreePiece) {
                if (err) {
                    return callback(err);
                }
                if (mixer == null) {
                    mixer = require('./mixer');
                }
                // mix primary mTreeBrick and mixins
                mixer(includedMTreePiece, createdProvider, function(err, mixedMTreePiece) {
                    if (err) {
                        return callback(err);
                    }
                    loadContext.productionContext.addMixedMTree(primaryIttfDocumentUri, mixedMTreePiece);
                    // resolve $group, $hook and $append commands
                    appender(mixedMTreePiece, function(err, appendedMTreePiece) {
                        if (err) {
                            return callback(err);
                        }
                        // build debug info
                        debugInfoBuilder(appendedMTreePiece, loadContext, callback);
                    });
                });
            });
        });
    });
};
/**
     normalized means:
     { loadContext
     { productionContext
     { mTreeBuildUpContext
     { options
    
*/
function normalizeRequestContext(loadContext) {
    // log 'wizzi-mtree.loader.index.normalizeRequestContext.loadContext', loadContext
    /**
        for var k in loadContext
         log 'normalizeRequestContext.k', k
    */
    loadContext.productionContext = loadContext.__productionManager.productionContext;
    if (verify.isObject(loadContext.mTreeBuildUpContext) == false) {
        loadContext.mTreeBuildUpContext = {};
    }
    // TODO this seems out of place, remove
    // if verify.isObject(loadContext.artifactContext) == false
    // set loadContext.artifactContext = {}
    if (verify.isObject(loadContext.options) == false) {
        loadContext.options = {};
    }
    return loadContext;
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-mtree.loader.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
