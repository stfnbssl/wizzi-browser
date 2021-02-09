/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi\.wizzi\ittf\lib\production\runner.js.ittf
*/
'use strict';
// generated by v6-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var assert = require('assert');
var path = require('path');
var util = require('util');
var verify = require('wizzi-utils').verify;
var log = require('../util/log')(module)
;
var GenContext = require('../artifact/genContext');
var AsyncFrontMatterLoader = require('../model/asyncFrontMatterLoader');
var AsyncModelLoader = require('../model/asyncModelLoader');
var AsyncArtifactGenerator = require('../artifact/asyncArtifactGenerator').AsyncArtifactGenerator;
var AsyncWizziModelTypesRunner = require('./asyncWizziModelTypesRunner');

/**
     Async artifact generation runner.
     A runner instance runs a single artifactInfo.
     Input: an ArtifactInfo (constructor injected).
     Output: the ArtifactInfo enriched with (one or many) genContext(s),
     ready to be persisted (callback ok result).
     A Runner can run
     a WfJob (a wizzi job)
     a WfSchema (a wizzi model types generation)
     a ModelArtifact
     a ModelCollectionArtifact
     a CodeWriteArtifact
     a FinalArtifact (a simple copy from source to destination)
*/

function logme() {
    if (false) {
        console.log.apply(console, arguments);
    }
}

var Runner = (function () {
    function Runner(artifactInfo) {
        _classCallCheck(this, Runner);
        this.artifactInfo = artifactInfo;
        log.setLevel((artifactInfo.options.verbose || 0));
    }
    Runner.prototype.run = function(callback) {
        if (this.artifactInfo.modelInfo) {
            this._runOnModelInfo(this.artifactInfo.modelInfo, callback);
        }
        else {
            this._runOnContextInfos(this.artifactInfo.contextInfos, callback);
        }
    }
    Runner.prototype._runOnContextInfos = function(contextInfos, callback) {
        if (this.artifactInfo.isCodeWriteArtifact()) {
            this.runCodeWriteArtifact(this.artifactInfo.modelInfo, this.artifactInfo.gen, callback);
        }
        else {
            return callback(error('999', '_runOnContextInfos', 'Artifact is in an invalid state: ' + util.inspect(this.artifactInfo, {depth: 2})));
        }
    }
    Runner.prototype._runOnModelInfo = function(modelInfo, callback) {
        var gen = this.artifactInfo.gen;
        if (this.artifactInfo.isWizziModelTypesArtifact()) {
            this.runWizziModelTypesArtifact(modelInfo, callback);
        }
        else if (this.artifactInfo.isWizziModelArtifact()) {
            this.runWizziModelArtifact(modelInfo, gen, callback);
        }
        else if (this.artifactInfo.isModelCollectionArtifact()) {
            this.runModelCollectionArtifact(modelInfo, gen, callback);
        }
        else if (this.artifactInfo.isFinalArtifact()) {
            this.runFinalArtifact(modelInfo, callback);
        }
        else {
            return callback(error('999', '_runOnModelInfo', 'Artifact is in an invalid state: ' + util.inspect(this.artifactInfo, {depth: 2})));
        }
    }
    Runner.prototype.runWizziModelTypesArtifact = function(modelInfo, callback) {
        var that = this;
        log.warn('runWizziModelTypesArtifact ' + this.artifactInfo.name);
        var outputPackageFolder = this.artifactInfo.getDestinationUri();
        // log 'wizzi.production.runner.runWizziModelTypesArtifact.outputPackageFolder', outputPackageFolder
        modelInfo.getModelInfos({
            final: false
        }, function(err, modelInfos) {
            if (err) {
                return callback(err);
            }
            if (modelInfos.length != 1) {
                return callback(error('999', 'runWizziModelTypesArtifact', 'Expected exactly one wizzi.model.modelInfo. Received: ' + modelInfos.length));
            }
            var wfschemaIttfDocumentUri = modelInfos[0].srcFullPath();
            var basenameParts = path.basename(wfschemaIttfDocumentUri).split('.');
            if (basenameParts.length != 3) {
                return callback(error('999', 'runWizziModelTypesArtifact', "The name of the source 'wfschema' ittf document must be in the format '<schema-name>.wfschema.ittf'. Received: " + path.basename(wfschemaIttfDocumentUri)));
            }
            var schemaName = basenameParts[0];
            var wmtRequest = {
                modelInfo: modelInfos[0], 
                schemaName: schemaName, 
                wfschemaIttfDocumentUri: wfschemaIttfDocumentUri, 
                outputPackageFolder: outputPackageFolder
            };
            AsyncWizziModelTypesRunner.run(wmtRequest, function(err, result) {
                if (err) {
                    return callback(err);
                }
                // TODO how to expose results ?
                callback(null, that.artifactInfo);
            });
        });
    }
    Runner.prototype.runWizziModelArtifact = function(modelInfo, gen, callback) {
        var that = this;
        modelInfo.getModelInfos({
            final: false
        }, function(err, modelInfos) {
            if (err) {
                return callback(err);
            }
            // log '+ wizzi.production.runner.runWizziModelArtifact, modelInfos, gen', modelInfos, gen
            modelInfo.getArtifactGenerator(gen.generator, function(err, generator) {
                if (err) {
                    return callback(err);
                }
                // log '+ wizzi.production.runner.runWizziModelArtifact, generator', generator
                AsyncModelLoader.loadMany(modelInfos, function(err, mainSourceModels) {
                    if (err) {
                        return callback(err);
                    }
                    // log '+ wizzi.production.runner.runWizziModelArtifact, mainSourceModels', mainSourceModels
                    AsyncArtifactGenerator.generate(that.artifactInfo, generator, modelInfos, mainSourceModels, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        callback(null, that.artifactInfo);
                    });
                });
            });
        });
    }
    Runner.prototype.runModelCollectionArtifact = function(modelInfo, gen, callback) {
        var that = this;
        modelInfo.getModelInfos({
            final: false
        }, function(err, modelInfos) {
            if (err) {
                return callback(err);
            }
            var i, i_items=modelInfos, i_len=modelInfos.length, mi;
            for (i=0; i<i_len; i++) {
                mi = modelInfos[i];
                logme("runModelCollectionArtifact.modelInfo to load", mi);
            }
            modelInfo.getArtifactGenerator(gen.generator, function(err, generator) {
                if (err) {
                    return callback(err);
                }
                AsyncModelLoader.loadMany(modelInfos, function(err, mainSourceModelsOfModelCollection) {
                    if (err) {
                        return callback(err);
                    }
                    logme('runModelCollectionArtifact got mainSourceModelsOfModelCollection', mainSourceModelsOfModelCollection);
                    AsyncArtifactGenerator.generateModelCollection(that.artifactInfo, generator, modelInfos, mainSourceModelsOfModelCollection, function(err, result) {
                        if (err) {
                            return callback(err);
                        }
                        logme('runModelCollectionArtifact result', result);
                        callback(null, that.artifactInfo);
                    });
                });
            });
        });
    }
    Runner.prototype.runCodeWriteArtifact = function(contextInfos, gen, callback) {
        var that = this;
        modelInfo.getArtifactGenerator(gen.generator, function(err, generator) {
            if (err) {
                return callback(err);
            }
            AsyncModelLoader.loadMany(contextInfos, function(err, mainSourceModels) {
                if (err) {
                    return callback(err);
                }
                AsyncArtifactGenerator.generateCodeWrite(that.artifactInfo, generator, mainSourceModels, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    callback(null, that.artifactInfo);
                });
            });
        });
    }
    // TODO execute copy without loading content in genContext
    Runner.prototype.runFinalArtifact = function(modelInfo, callback) {
        var that = this;
        modelInfo.isDirectory(function(err, isDirectory) {
            if (err) {
                return callback(err);
            }
            if (isDirectory) {
                modelInfo.getFiles({
                    final: true
                }, function(err, files) {
                    if (err) {
                        return callback(err);
                    }
                    var i, i_items=files, i_len=files.length, fileInfo;
                    for (i=0; i<i_len; i++) {
                        fileInfo = files[i];
                        var genContext = new GenContext({
                            model: null, 
                            srcPath: fileInfo.relpath, 
                            srcFullPath: fileInfo.fullpath, 
                            options: that.artifactInfo.options, 
                            pman: modelInfo.productionManager()
                        });
                        genContext.writeFile(fileInfo.fullpath);
                        that.artifactInfo.addGenContext(genContext);
                    }
                    return callback(null, that.artifactInfo);
                });
            }
            else {
                var genContext = new GenContext({
                    model: null, 
                    srcPath: modelInfo.src(), 
                    srcFullPath: modelInfo.srcFullPath(), 
                    options: that.artifactInfo.options, 
                    pman: modelInfo.productionManager()
                });
                modelInfo.getSource(function(err, content) {
                    if (err) {
                        return callback(err);
                    }
                    genContext.write(content);
                    that.artifactInfo.addGenContext(genContext);
                    return callback(null, that.artifactInfo);
                });
            }
        });
    }
    Runner.prototype.runFrontMatter = function(callback) {
        if (this.artifactInfo.modelInfo) {
            this.artifactInfo.modelInfo.getModelInfos({
                final: false
            }, (err, modelInfos) => {
                if (err) {
                    return callback(err);
                }
                // log 'runFrontMatter.modelInfos', modelInfos.length
                AsyncFrontMatterLoader.loadMany(modelInfos, (err, frontMatters) => {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, {
                            collection: this.artifactInfo.collection, 
                            items: frontMatters
                        });
                });
            });
        }
        else {
            // log 'runFrontMatter.contextInfos', this.artifactInfo.contextInfos.length
            AsyncFrontMatterLoader.loadMany(this.artifactInfo.contextInfos, (err, frontMatters) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, {
                        collection: this.artifactInfo.collection, 
                        items: frontMatters
                    });
            });
        }
    }
    return Runner;
})();

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
    return verify.error(innerError, {
            name: ( verify.isNumber(code) ? 'Err-' + code : code ), 
            method: 'wizzi.production.runner.' + method, 
            sourcePath: __filename
        }, message || 'Error message unavailable');
}

module.exports = {
    Runner: Runner
};
