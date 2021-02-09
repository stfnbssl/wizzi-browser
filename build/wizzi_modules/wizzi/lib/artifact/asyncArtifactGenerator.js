/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\lib\artifact\asyncArtifactGenerator.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var path = require('path');
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var GenContext = require('./genContext');
function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}

/**
     Generation functions are called by the wizzi.production.Runner.
     A generation produces an array of wizzi.artifact.genContext(s),
     text buffers containing the generated artifact.
     genContexts are accumulated into the artifactInfo.genContexts collection.
*/

var AsyncArtifactGenerator = {
    /**
         params
         { artifactInfo
         api-ref wizzi.artifact.artifactInfo
         { generator
         api-ref wizzi-plugin.artifactGenerator
         [ modelInfos
         { modelInfo
         api-ref wizzi.model.modelInfo
         [ mainSourceModels
         { mainSourceModel
         # wizzi model or POJO
         # 1 context model for each modelInfo
    */
    generate: function(artifactInfo, generator, modelInfos, mainSourceModels, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(artifactInfo) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo', message: 'The artifactInfo parameter must be an object. Received: ' + artifactInfo }
            ));
        }
        if (verify.isObject(artifactInfo.productionManager) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.productionManager', message: 'The artifactInfo.productionManager parameter must be an object. Received: ' + artifactInfo.productionManager }
            ));
        }
        if (verify.isObject(artifactInfo.productionManager.wizziFactory) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.productionManager.wizziFactory', message: 'The artifactInfo.productionManager.wizziFactory parameter must be an object. Received: ' + artifactInfo.productionManager.wizziFactory }
            ));
        }
        if (verify.isObject(artifactInfo.options) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.options', message: 'The artifactInfo.options parameter must be an object. Received: ' + artifactInfo.options }
            ));
        }
        if (verify.isObject(generator) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator', message: 'The generator parameter must be an object. Received: ' + generator }
            ));
        }
        if (verify.isFunction(generator.gen) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator.gen', message: 'The generator.gen parameter must be a function. Received: ' + generator.gen }
            ));
        }
        if (verify.isArray(modelInfos) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'modelInfos', message: 'The modelInfos parameter must be an array. Received: ' + modelInfos }
            ));
        }
        if (verify.isArray(mainSourceModels) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'mainSourceModels', message: 'The mainSourceModels parameter must be an array. Received: ' + mainSourceModels }
            ));
        }
        // log 'wizzi.production.AsyncArtifactGenerator.generate, modelInfos', modelInfos, 'mainSourceModels', mainSourceModels
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generate', artifactInfo));
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var mainSourceModel = mainSourceModels[i];
            var genContext = new GenContext({
                model: null, 
                srcPath: modelInfo.src(), 
                srcFullPath: modelInfo.srcFullPath(), 
                options: artifactInfo.options, 
                pman: artifactInfo.productionManager
            });
            genItems.push({
                generator: generator, 
                mainSourceModel: mainSourceModel, 
                genContext: genContext
            });
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function(err, genContexts) {
            if (err) {
                return callback(err);
            }
            var i, i_items=genContexts, i_len=genContexts.length, item;
            for (i=0; i<i_len; i++) {
                item = genContexts[i];
                artifactInfo.addGenContext(item);
            }
            callback(null, {
                oper: 'AsyncArtifactGenerator.generate', 
                status: 'success', 
                item: 'genContexts.count: ' + genContexts.length
            });
        });
    }, 
    generateModelCollection: function(artifactInfo, generator, modelInfos, mainSourceModelsOfModelCollection, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(artifactInfo) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo', message: 'The artifactInfo parameter must be an object. Received: ' + artifactInfo }
            ));
        }
        if (verify.isObject(artifactInfo.productionManager) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.productionManager', message: 'The artifactInfo.productionManager parameter must be an object. Received: ' + artifactInfo.productionManager }
            ));
        }
        if (verify.isObject(artifactInfo.productionManager.wizziFactory) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.productionManager.wizziFactory', message: 'The artifactInfo.productionManager.wizziFactory parameter must be an object. Received: ' + artifactInfo.productionManager.wizziFactory }
            ));
        }
        if (verify.isObject(artifactInfo.options) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.options', message: 'The artifactInfo.options parameter must be an object. Received: ' + artifactInfo.options }
            ));
        }
        if (verify.isObject(generator) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator', message: 'The generator parameter must be an object. Received: ' + generator }
            ));
        }
        if (verify.isFunction(generator.gen) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator.gen', message: 'The generator.gen parameter must be a function. Received: ' + generator.gen }
            ));
        }
        if (verify.isArray(modelInfos) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'modelInfos', message: 'The modelInfos parameter must be an array. Received: ' + modelInfos }
            ));
        }
        if (verify.isArray(mainSourceModelsOfModelCollection) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'mainSourceModelsOfModelCollection', message: 'The mainSourceModelsOfModelCollection parameter must be an array. Received: ' + mainSourceModelsOfModelCollection }
            ));
        }
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generateModelCollection', artifactInfo));
        }
        var genItems = [];
        for (var i = 0; i < modelInfos.length; i++) {
            var modelInfo = modelInfos[i];
            var mainSourceModels = mainSourceModelsOfModelCollection[i];
            for (var j = 0; j < mainSourceModels.length; j++) {
                var mainSourceModel = mainSourceModels[j];
                logme('AsyncArtifactGenerator.generateModelCollection', 'item', j, mainSourceModel);
                // api-ref wizzi.model.modelCollectionConfig
                var genContext = new GenContext({
                    model: mainSourceModel.___collItem, 
                    srcPath: modelInfo.src(), 
                    srcFullPath: modelInfo.srcFullPath(), 
                    options: artifactInfo.options, 
                    pman: artifactInfo.productionManager
                });
                genItems.push({
                    generator: generator, 
                    mainSourceModel: mainSourceModel, 
                    genContext: genContext
                });
            }
        }
        async.map(genItems, AsyncArtifactGenerator._gen_item, function(err, genContexts) {
            if (err) {
                return callback(err);
            }
            var i, i_items=genContexts, i_len=genContexts.length, item;
            for (i=0; i<i_len; i++) {
                item = genContexts[i];
                artifactInfo.addGenContext(item);
            }
            callback(null, {
                oper: 'AsyncArtifactGenerator.generate', 
                status: 'success', 
                item: 'genContexts.count: ' + genContexts.length
            });
        });
    }, 
    generateCodeWrite: function(artifactInfo, generator, contextModels, callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (verify.isObject(artifactInfo) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo', message: 'The artifactInfo parameter must be an object. Received: ' + artifactInfo }
            ));
        }
        if (verify.isObject(artifactInfo.productionManager) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.productionManager', message: 'The artifactInfo.productionManager parameter must be an object. Received: ' + artifactInfo.productionManager }
            ));
        }
        if (verify.isObject(artifactInfo.productionManager.wizziFactory) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.productionManager.wizziFactory', message: 'The artifactInfo.productionManager.wizziFactory parameter must be an object. Received: ' + artifactInfo.productionManager.wizziFactory }
            ));
        }
        if (verify.isObject(artifactInfo.options) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'artifactInfo.options', message: 'The artifactInfo.options parameter must be an object. Received: ' + artifactInfo.options }
            ));
        }
        if (verify.isObject(generator) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator', message: 'The generator parameter must be an object. Received: ' + generator }
            ));
        }
        if (verify.isFunction(generator.gen) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'generator.gen', message: 'The generator.gen parameter must be a function. Received: ' + generator.gen }
            ));
        }
        if (verify.isArray(contextModels) === false) {
            return callback(error(
                'InvalidArgument', '', { parameter: 'contextModels', message: 'The contextModels parameter must be an array. Received: ' + contextModels }
            ));
        }
        if (verify.isObject(generator) == false || verify.isFunction(generator.gen) == false) {
            return callback(error('The parameter "generator" must be an object and must contain the "gen" function.', 'generateCodeWrite', artifactInfo));
        }
        var mainSourceModel = {};
        var i, i_items=contextModels, i_len=contextModels.length, item;
        for (i=0; i<i_len; i++) {
            item = contextModels[i];
            mainSourceModel[item.___exportName] = item;
        }
        var genContext = new GenContext({
            model: null, 
            srcPath: null, 
            srcFullPath: null, 
            options: artifactInfo.options, 
            pman: artifactInfo.productionManager
        });
        new generator.gen(mainSourceModel, genContext);
        artifactInfo.addGenContext(genContext);
        callback(null, {
            oper: 'AsyncArtifactGenerator.generateCodeWrite', 
            status: 'success'
        });
    }, 
    _gen_item: function(genInfo, callback) {
        logme('AsyncArtifactGenerator._gen_item', 'genInfo.mainSourceModel', genInfo.mainSourceModel);
        new genInfo.generator.gen(genInfo.mainSourceModel, genInfo.genContext, callback);
    }
};

module.exports = {
    AsyncArtifactGenerator: AsyncArtifactGenerator
};
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
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
