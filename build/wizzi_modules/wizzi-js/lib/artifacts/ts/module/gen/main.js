/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var statement = require('./codegen/statement');
var wzIife = require('./codegen/wziife');

var md = module.exports = {};

var myname = 'v5-wizzi-ts.artifacts.ts.module.main';

md.gen = function(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback));
    }
    if (verify.isObject(model) == false) {
        return callback(error('InvalidArgument', 'gen', 'The model parameter must be an object. Received: ' + model));
    }
    if (model.wzElement !== 'xmodule') {
        console.log('v5-wizzi-ts', 'artifact', 'model', model);
        return callback(error('InvalidArgument', 'gen', 'Invalid model schema. Expected root element "xmodule". Received: ' + model.wzElement));
    }
    /**
        return callback(ctx.error('test', model));
    */
    try {
        ctx.__ecma = 'es6';
        ctx.__jskind = 'react';
        main_init(model, ctx);
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            // log 'main item_1.wzElement', item_1.wzElement
            if (item_1.wzElement === 'wzIife') {
                wzIife.gen(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w("");
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            else {
                statement.gen(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
        }
        repeater_1(0);
        function next_1() {
            terminate_artifact();
        }
    } 
    catch (ex) {
        return callback(ex);
    } 
    function terminate_artifact() {
        if (ctx.artifactGenerationErrors.length > 0) {
            return callback(ctx.artifactGenerationErrors);
        }
        else {
            return callback(null, ctx);
        }
    }
};
function main_init(model, ctx) {
    // log myname, 'ctx.values', ctx.values
    if ((!!ctx.values.noGeneratorComments) == false) {
        ctx.w('/*');
        ctx.w('    artifact generator: ' + __filename);
        ctx.w('    package: wizzi-js@0.7.8');
        ctx.w('    primary source IttfDocument: ' + model.wzSourceFilepath('f1'));
        if ((!!ctx.values.isPackageDeploy) == false) {
            ctx.w('    utc time: ' + new Date().toUTCString());
        }
        ctx.w('*/');
    }
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
    return verify.error(innerError, {
            name: ( verify.isNumber(code) ? 'Err-' + code : code ), 
            method: myname + '.' + method, 
            sourcePath: __filename
        }, message || 'Error message unavailable');
}
