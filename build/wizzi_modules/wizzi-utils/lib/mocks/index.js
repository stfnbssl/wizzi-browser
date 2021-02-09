/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\mocks\index.js.ittf
*/
'use strict';
var verify = require('../verify');
var file = require('../fs/file');
var loader = require('./loader');
var errors = require('./errors');
var genContext = require('./artifact/genContext');
var md = module.exports = {};
md.repo = require('./repo/index');
md.getFactoryWizziObject = function() {
    return {
            loadMTree: loader.loadMTree, 
            file: file, 
            verify: verify, 
            errors: errors
        };
};
md.getGenContext = function(wizziFactory) {
    return new genContext({
            options: {
                CRLF: '\n', 
                indentSpaces: 4
            }, 
            pman: {
                wizziFactory: wizziFactory
            }
        });
};
md.getLoadModelContext = function(modelContext) {
    modelContext.__productionManager = md.getProductionManager();
    return modelContext;
};
md.getProductionManager = function() {
    return {
            wizziFactory: {}, 
            productionContext: md.createProductionContext(), 
            globalContext: function() {
                return {};
            }
        };
};
md.errors = require('./errors');
md.createProductionContext = function createProductionContext() {
    return {
            aclstat: {}, 
            ittfEvaluationScripts: {}, 
            setAclStat: function() {
            }, 
            addIttfDocument: function() {
            }, 
            addMTreeBuildUpScript: function(uri, ittfEvalScript) {
                this.ittfEvaluationScripts[uri] = {
                    uri: uri, 
                    ittfEvalScript: ittfEvalScript
                };
            }, 
            addMixedMTree: function() {
            }, 
            addEvaluatedMTree: function() {
            }, 
            addMTree: function() {
            }, 
            addWizziModel: function() {
            }, 
            addArtifact: function() {
            }, 
            raiseIttfEvaluationScriptError: function(uri, exception) {
                var script = this.ittfEvaluationScripts[uri];
                if (script && script.ittfEvalScript && exception && exception.lineNumber) {
                    var lines = script.ittfEvalScript.getErrorLines(exception).join('\n')
                    ;
                    exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + lines + '\n';
                }
                else {
                    exception.message = '\nError evaluating ittf in uri: ' + uri + '\n' + exception.message + '\n';
                }
                fail.warn(exception);
                throw exception;
            }
        };
};
