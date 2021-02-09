/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-browser\src\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-browser\src\packages\wizzi-standalone\.wizzi\src\index.js.ittf
*/
'use strict';
var wizzi = require('wizzi');
var initialized = false;
var md = {
    __wf: null
};
md.wizzi = wizzi;
md.wizzi.IttfMTreeEx = require('wizzi-utils').IttfMTreeEx;
md.wizzi.asisLoader = require('wizzi-utils').asisLoader;
md.wizziUtils = require('wizzi-utils');
md.wizziJs = require('wizzi-js');
md.wizziWeb = require('wizzi-web');
md.wizziCore = require('wizzi-core');
md.JsonComponents = require('wizzi-repo').JsonComponents;
md.initialize = function() {
    if (initialized) {
        return ;
    }
    window.wizziJs = md.wizziJs;
    window.wizziWeb = md.wizziWeb;
    window.wizziCore = md.wizziCore;
    initialized = true;
};
var verify = md.wizziUtils.verify;
function DEFAULT_PLUGINS() {
    return [
            window.wizziCore, 
            window.wizziJs, 
            window.wizziWeb
        ];
}
var DEFAULT_ARTIFACTS = {
    css: 'css/document', 
    graphql: 'graphql/docs', 
    html: 'html/document', 
    js: 'js/module', 
    ts: 'ts/module', 
    json: 'json/document', 
    md: 'md/document', 
    scss: 'scss/document', 
    svg: 'svg/document', 
    text: 'text/document', 
    vtt: 'vtt/document', 
    vue: 'vue/document', 
    xml: 'xml/document'
};
function getDocumentInfo(ittfDocumentPath) {
    var idp = verify.replaceAll(ittfDocumentPath, '\\', '/').toLowerCase();
    var ss = idp.split('/');
    var name = ss[ss.length-1];
    ss = name.split('.');
    return {
            isIttf: ss[ss.length-1] === 'ittf', 
            schema: ss[ss.length-1] === 'ittf' ? ss[ss.length-2] : 'null'
        };
}
md.createFactory = function(options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (md.__wf != null) {
        return callback(null, md.__wf);
    }
    md.initialize();
    var mdItems = DEFAULT_PLUGINS().concat(options.mds || []);
    md.wizzi.browsernoaclFactory({
        plugins: {
            items: pluginItems
        }, 
        globalContext: options.globalContext || {}
    }, function(err, wf) {
        if (err) {
            return callback(err);
        }
        md.__wf = wf;
        return callback(null, wf);
    })
};
md.createJsonFactoryLight = function(options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    md.initialize();
    var pluginItems = DEFAULT_PLUGINS().concat(options.plugins || []);
    wizzi.jsonnoaclFactory({
        plugins: {
            items: pluginItems
        }, 
        jsonFsData: options.jsonFsData, 
        globalContext: options.globalContext || {}
    }, callback)
};
//
md.mtree = function(ittfDocumentPath, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var context = options.modelContext || {};
    md.createFactory(function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTree(ittfDocumentPath, context, callback)
    })
};
//
md.mtreeDebug = function(ittfDocumentPath, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var context = options.modelContext || {};
    md.createFactory(function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadMTreeDebugInfo(ittfDocumentPath, context, callback)
    })
};
md.canGen = function(schema, artifactName, callback) {
    if (typeof callback === 'undefined') {
        callback = artifactName;
        artifactName = null;
    }
    // TODO check artifactName
    return callback(null, !!DEFAULT_ARTIFACTS[schema]);
};
//
md.gen = function(ittfDocumentPath, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var di = getDocumentInfo(ittfDocumentPath);
    console.log('wizzi.standalone.gen.getDocumentInfo', di);
    if (di.isIttf == false) {
        return callback({
                message: 'Invalid ittfDocumentPath. Should be an ittf document path. Received: ' + ittfDocumentPath, 
                method: 'wizzi.standalone.gen'
            });
    }
    var artifactName = options.artifactName || DEFAULT_ARTIFACTS[di.schema];
    if (!artifactName) {
        return callback({
                message: 'Cannot find artifact generator for ittfDocumentPath: ' + ittfDocumentPath, 
                method: 'wizzi.standalone.gen'
            });
    }
    md.createFactory(function(err, wf) {
        if (err) {
            return callback(err);
        }
        wf.loadModelAndGenerateArtifact(ittfDocumentPath, {
            modelRequestContext: {
                mTreeBuildUpContext: options.modelContext
            }, 
            artifactRequestContext: options.artifactContext
        }, artifactName, callback)
    })
};
//
md.genFromText = function(ittfContent, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var schema;
    if (verify.isNotEmpty(options.artifactName)) {
        var ss = options.artifactName.split('/');
        schema = ss[0];
    }
    else {
        schema = options.schemaName || options.schema;
    }
    var artifactName = options.artifactName || DEFAULT_ARTIFACTS[schema];
    // A basefolder is required
    var tempIttfUri = "c:/basefolder/temp." + schema + '.ittf';
    var documents = [
        {
            path: tempIttfUri, 
            content: ittfContent
        }
    ];
    md.JsonComponents.createJsonFsData(documents, function(err, jsonFsData) {
        if (err) {
            return callback(err);
        }
        options.jsonFsData = jsonFsData;
        md.createJsonFactoryLight(options, function(err, wf) {
            if (err) {
                return callback(err);
            }
            wf.loadModelAndGenerateArtifact(tempIttfUri, {
                modelRequestContext: {
                    mTreeBuildUpContext: options.modelContext
                }, 
                artifactRequestContext: options.artifactContext
            }, artifactName, callback)
        })
    })
};
//
md.wizziJob = function(ittfDocumentPath, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var productionOptions = Object.assign({
        indentSpaces: 4, 
        verbose: 2
    }, options.productionOptions || {});
    var modelContext = options.modelContext || {};
    var globalContext = options.globalContext || {};
    md.createFactory(function(err, wf) {
        if (err) {
            return callback(err);
        }
        var pman = wf.createProductionManager(productionOptions, globalContext);
        if (pman && pman.__is_error) {
            console.log('__is_error ', pman);
            return callback(pman);
        }
        
        var notUsed = pman.addJobRequest({
            wfjob: {
                ittfDocumentUri: ittfDocumentPath
            }
        });
        if (notUsed && notUsed.__is_error) {
            console.log('__is_error ', notUsed);
            return callback(notUsed);
        }
        
        pman.run(function(err, runResult) {
            if (err) {
                return callback(err);
            }
            // log 'wizzi-standalone.job.result', result
            // r_cb( runResult )
            pman.persistToFile(function(err, persistResult) {
                if (err) {
                    return callback(err);
                }
                pman.terminate();
                return callback(null, {
                        run: runResult, 
                        persist: persistResult
                    });
            })
        })
    })
};
//
md.wizziSchema = function(ittfDocumentPath, options, callback) {
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    var productionOptions = Object.assign({
        indentSpaces: 4, 
        verbose: 2
    }, options.productionOptions || {});
    var modelContext = options.modelContext || {};
    var globalContext = options.globalContext || {};
    md.createFactory(function(err, wf) {
        if (err) {
            return callback(err);
        }
        var pman = wf.createProductionManager(productionOptions, globalContext);
        if (pman && pman.__is_error) {
            console.log('__is_error ', pman);
            return callback(pman);
        }
        
        var notUsed = pman.addJobRequest({
            wfjob: {
                ittfDocumentUri: ittfDocumentPath
            }
        });
        if (notUsed && notUsed.__is_error) {
            console.log('__is_error ', notUsed);
            return callback(notUsed);
        }
        
        pman.run(function(err, runResult) {
            if (err) {
                return callback(err);
            }
            // log 'wizzi-standalone.job.result', result
            // r_cb( runResult )
            pman.persistToFile(function(err, persistResult) {
                if (err) {
                    return callback(err);
                }
                pman.terminate();
                return callback(null, {
                        run: runResult, 
                        persist: persistResult
                    });
            })
        })
    })
};
export default md;
