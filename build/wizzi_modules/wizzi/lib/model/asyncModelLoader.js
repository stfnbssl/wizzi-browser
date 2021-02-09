/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\lib\model\asyncModelLoader.js.ittf
*/
'use strict';
/**
     Objects
     - Model
     Is the core object of the model driven wizzi factory.
     A model is a single object (wizzi model or POJO) acting as a context object in
     mTree loadings, model transformations and artifact generations.
     Models (single or group of similars) are described by wizzi.model.modelInfo api.
     - Templated model
     A templated model is a model that contains itself template commands and require
     one or more context objects. The process is recursive and has no limit except
     a guard to avoid infinite loops during recursive evaluation of contexts.
     - Context models
     Context models are an array of models acting as a context object for a templated
     model.
     Context models, being models themselves, are also described by wizzi.model.modelInfo api.
     - Model collection
     A model collection is an array property of a model, where each item of
     the array is used as a model acting as a context object.
     The properties of the item can be used to build the destination path of the generated artifact.
     Model collections are described in the wizzi.model.ModelCollectionInfo api.
*/
// TODO Implement transformModel context objects.
var path = require('path');
var util = require('util');
var async = require('async');
var _ = require('lodash');
var verify = require('wizzi-utils').verify;
var log = require('../util/log')(module)
;

function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}

function loadMany(modelInfos, callback) {
    if (modelInfos.length > 0) {
        log.setLevel(modelInfos[0].productionManager().options.verbose);
    }
    // log '+ asyncModelLoader.loadMany, modelInfos', modelInfos
    async.map(modelInfos, _load_item, function(err, wizziModels) {
        if (err) {
            return callback(err);
        }
        // log 'asyncModelLoader.loadMany, wizziModels', wizziModels
        return callback(null, wizziModels);
    });
}
function load(modelInfo, callback) {
    log.setLevel(modelInfo.productionManager().options.verbose);
    _load_item(modelInfo, function(err, wizziModel) {
        if (err) {
            return callback(err);
        }
        // log 'asyncModelLoader.load, wizziModel', wizziModel
        return callback(null, wizziModel);
    });
}
/**
     Load a single wizzi model using ModelInfo data
     The master ModelInfo may contain one or many context ModelInfos
     params
     { masterModelInfo
     string id
     [ contexts
     [ transformers
     string exportName
     string schema
     { coll
     boolean generatorRequireContextOnly
     func getLoadModel
     func productionManager
     func srcFullPath
*/
function _load_item(masterModelInfo, callback) {
    // log '+ asyncModelLoader._load_item, masterModelInfo', masterModelInfo
    logme('AsyncModelLoader._load_item.masterModelInfo.config', util.inspect(masterModelInfo.config, {
        depth: 3
    }));
    if (masterModelInfo.contexts && masterModelInfo.contexts.length > 0) {
        // The master modelInfo has context ModelInfos, so it is a 'templated model'.
        // First of all recursively load and evaluate its 'context models'
        
        // (obsolete VIA) step 1 - set the production state on each contextModelInfo
        var i, i_items=masterModelInfo.contexts, i_len=masterModelInfo.contexts.length, contextModelInfo;
        for (i=0; i<i_len; i++) {
            contextModelInfo = masterModelInfo.contexts[i];
            // (obsolete VIA) set contextModelInfo.___state = masterModelInfo.___state
            logme('AsyncModelLoader._load_item.context', contextModelInfo.id, contextModelInfo.srcFullPath());
        }
        
        // log '====== ++++++ masterModelInfo.contexts', masterModelInfo.contexts
        
        // step 2 - recurse contextModelInfo loading
        async.map(masterModelInfo.contexts, _load_item, function(err, contextWizziModels) {
            // log '+ asyncModelLoader._load_item, after load contexts.contextWizziModels', contextWizziModels
            if (err) {
                log.error('Error.AsyncModelLoader._load_item', util.inspect(err, {
                    depth: null
                }));
                return callback(err, null);
            }
            // log '====== ++++++ contextWizziModels.length', contextWizziModels.length
            // step 3 - Prepare the loading context object for the master model loading.
            // If one context is a model collection, prepare the model collection context
            var wizziModelWithModelCollection = null,
                modelCollectionContextWizziModelIndex = -1,
                masterLoadingContext = {};
            for (var i = 0; i < contextWizziModels.length; i++) {
                var contextWizziModel = contextWizziModels[i];
                masterLoadingContext[contextWizziModel.___exportName] = contextWizziModel;
                if (contextWizziModel.___coll) {
                    wizziModelWithModelCollection = contextWizziModel;
                    modelCollectionContextWizziModelIndex = i;
                }
            }
            // log '====== ++++++ modelCollectionContextWizziModelIndex', modelCollectionContextWizziModelIndex
            if (modelCollectionContextWizziModelIndex > -1) {
                // Yes one of the loaded context models is a model collection.
                // step 3.b - Prepare the context object of each item of the model collection.
                // This is quite complex:
                // . We must create a context object for each item in the model collection.
                // . Every context object must contain (as properties) all the loaded contextWizziModels
                // plus the item itself of the model collection.
                var collectionItemsContextObjects = prepareCollectionItemsContextObjects(masterModelInfo, contextWizziModels, wizziModelWithModelCollection, masterLoadingContext);
                if (collectionItemsContextObjects && collectionItemsContextObjects.__is_error) {
                    console.log('__is_error ', collectionItemsContextObjects);
                    return callback(collectionItemsContextObjects);
                }
                if (masterModelInfo.generatorRequireContextOnly) {
                    // There is no source document for the artifact to be generated.
                    // The ArtifactGenerator simply requires a context object.
                    // So collect the loaded contexts in an array and pass them back.
                    var collModelInstances = [];
                    var i, i_items=collectionItemsContextObjects, i_len=collectionItemsContextObjects.length, itemContextObject;
                    for (i=0; i<i_len; i++) {
                        itemContextObject = collectionItemsContextObjects[i];
                        collModelInstances.push(_.assign({}, itemContextObject.context, {
                            ___collItem: itemContextObject.itemObject
                        }));
                    }
                    return callback(null, collModelInstances);
                }
                else {
                    // step 4.b - load a context for each item of the collection context
                    return async.map(collectionItemsContextObjects, load_collection_item, callback);
                }
            }
            else {
                // step 3.1 - load the context model
                masterModelInfo.getLoadModel(function(err, wizziModelFactory) {
                    if (err) {
                        return callback(err);
                    }
                    var loadContext = {
                        mTreeBuildUpContext: _.assign({}, masterModelInfo.getGlobalContextForLoading(), masterLoadingContext), 
                        __productionManager: masterModelInfo.productionManager(), 
                        options: {
                            isCompile: masterModelInfo.isCompile
                        }
                    };
                    // log '====== ++++++ wizziModelFactory, masterModelInfo.srcFullPath()', wizziModelFactory, masterModelInfo.srcFullPath(), Object.keys(masterLoadingContext)
                    wizziModelFactory(masterModelInfo.srcFullPath(), loadContext, function(err, wizziModel) {
                        if (err) {
                            return callback(err);
                        }
                        wizziModel.___exportName = (masterModelInfo.exportName || masterModelInfo.schema);
                        // log '====== ++++++ wizziModel.___exportName', wizziModel.___exportName
                        if (masterModelInfo.coll) {
                            wizziModel.___coll = masterModelInfo.coll;
                        }
                        logme('AsyncModelLoader._load_item', 'success with masterLoadingContext no collectionContext, masterModelInfo', masterModelInfo.id, 'exportName', wizziModel.___exportName);
                        return callback(null, wizziModel);
                    });
                });
            }
        });
    }
    else {
        // The master modelInfo has no context ModelInfos
        // simply load it.
        var srcFullPath = masterModelInfo.srcFullPath();
        masterModelInfo.getLoadModel(function(err, wizziModelFactory) {
            if (err) {
                return callback(err);
            }
            var loadContext = {
                mTreeBuildUpContext: _.assign({}, masterModelInfo.getGlobalContextForLoading()), 
                __productionManager: masterModelInfo.productionManager(), 
                options: {
                    isCompile: masterModelInfo.isCompile
                }
            };
            wizziModelFactory(srcFullPath, loadContext, function(err, wizziModel) {
                if (err) {
                    return callback(err);
                }
                if (masterModelInfo.transformers && masterModelInfo.transformers.length > 0) {
                    recurseTransform(masterModelInfo.transformers, wizziModel, masterModelInfo, function(err, transformedWizziModel) {
                        if (err) {
                            return callback(err);
                        }
                        transformedWizziModel.___exportName = (masterModelInfo.exportName || masterModelInfo.schema);
                        if (masterModelInfo.coll) {
                            // this wizziModel is a context model from which
                            // will be extracted a collection context,
                            // when bubbling up from the recursive loading
                            transformedWizziModel.___coll = masterModelInfo.coll;
                        }
                        // cache the loaded model, one day, may be, will be useful
                        masterModelInfo.productionManager().setStateModel(srcFullPath, transformedWizziModel);
                        logme('AsyncModelLoader._load_item', 'success after transformation, masterModelInfo', masterModelInfo.id, 'exportName', wizziModel.___exportName);
                        // log '+ asyncModelLoader._load_item.after transformations', transformedWizziModel
                        return callback(null, transformedWizziModel);
                    });
                }
                else {
                    wizziModel.___exportName = (masterModelInfo.exportName || masterModelInfo.schema);
                    if (masterModelInfo.coll) {
                        // this wizziModel is a context model from which
                        // will be extracted a collection context,
                        // when bubbling up from the recursive loading
                        wizziModel.___coll = masterModelInfo.coll;
                    }
                    // cache the loaded model, one day, may be, will be useful
                    masterModelInfo.productionManager().setStateModel(srcFullPath, wizziModel);
                    logme('AsyncModelLoader._load_item', 'success, masterModelInfo', masterModelInfo.id, 'exportName', wizziModel.___exportName);
                    return callback(null, wizziModel);
                }
            });
        });
    }
}
function recurseTransform(modelTransformers, instance, modelInfo, callback) {
    var len = modelTransformers.length;
    function do_transform(index) {
        if (index >= len) {
            return callback(null, instance);
        }
        var transformerConfig = modelTransformers[index];
        modelInfo.getModelTransformer(transformerConfig.name, function(err, modelTransformer) {
            if (err) {
                return callback(err);
            }
            modelTransformer.trans(instance, {
                wizziFactory: modelInfo.getWizziFactory()
            }, function(err, transformedWizziModel) {
                if (err) {
                    return callback(err);
                }
                if (transformerConfig.dumpFile) {
                    transformerConfig.dumpFile(transformedWizziModel);
                }
                instance = transformedWizziModel;
                do_transform(index + 1);
            });
        });
    }
    do_transform(0);
}
function prepareCollectionItemsContextObjects(modelInfo, wizziModelContexts, wizziModelWithModelCollection, masterLoadingContext) {
    logme('prepareCollectionItemsContextObjects', 'modelInfo', modelInfo.id);
    var collName = wizziModelWithModelCollection.___coll.name;
    var collItemExportName = wizziModelWithModelCollection.___coll.itemName;
    logme('prepareCollectionItemsContextObjects', 'collName, collItemExportName', collName, collItemExportName);
    var collectionArray = wizziModelWithModelCollection[collName];
    if (!verify.isArray(collectionArray)) {
        return error('Collection is not an array. Name: ' + collName + ', ' + modelInfo.toString(), 'prepareCollectionItemsContextObjects');
    }
    var itemContextObjects = [],
        context;
    var i, i_items=collectionArray, i_len=collectionArray.length, itemObject;
    for (i=0; i<i_len; i++) {
        itemObject = collectionArray[i];
        context = _.assign({}, masterLoadingContext);
        context[collItemExportName] = itemObject;
        itemContextObjects.push({
            modelInfo: modelInfo, 
            itemObject: itemObject, 
            context: context
        });
        if (itemContextObjects.length == 1) {
            for (var k in context) {
                logme('prepareCollectionItemsContextObjects', 'context exportName', k);
            }
        }
        logme('prepareCollectionItemsContextObjects', 'itemObject', itemObject.wzName);
    }
    return itemContextObjects;
}
/**
     Load a single WizziModel using a single collection item as a context.
     params
     { collectionLoadData
     { modelInfo
     string schema
     { ___state
     { pman // ProductionManager
     function srcFullPath
     boolean isCompile
     { context
     # prepared by prepareCollectionItemsContextObjects
     { itemObject
*/
function load_collection_item(collectionLoadData, callback) {
    var modelInfo = collectionLoadData.modelInfo,
        context = collectionLoadData.context,
        itemObject = collectionLoadData.itemObject;
    modelInfo.getLoadModel(function(err, wizziModelFactory) {
        if (err) {
            return callback(err);
        }
        logme("AsyncModelLoader.load_collection_item", "modelInfo", modelInfo.id, "schema", modelInfo.schema);
        var loadContext = {
            mTreeBuildUpContext: _.assign({}, modelInfo.getGlobalContextForLoading(), context), 
            __productionManager: modelInfo.productionManager(), 
            options: {
                isCompile: modelInfo.isCompile
            }
        };
        // log 'asyncModelLoader.load_collection_item.loadContext', loadContext
        wizziModelFactory(modelInfo.srcFullPath(), loadContext, function(err, wizziModel) {
            if (err) {
                return callback(err);
            }
            logme("AsyncModelLoader.load_collection_item", "success, wizziModel root", wizziModel.wzTag, wizziModel.wzName);
            wizziModel.___collItem = itemObject;
            return callback(null, wizziModel);
        });
    });
}
function error(message, method) {
    var err = {
        __is_error: true, 
        message: message, 
        source: "wizzi/lib/model/asyncModelLoader/" + method
    };
    logme(err);
    return err;
}

module.exports = {
    loadMany: loadMany,
    load: load,
    _load_item: _load_item,
    recurseTransform: recurseTransform,
    prepareCollectionItemsContextObjects: prepareCollectionItemsContextObjects,
    load_collection_item: load_collection_item
};
