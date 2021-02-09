/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\json\toyaml\gen\main.js.ittf
*/
'use strict';
var util = require('util');
var yaml = require('js-yaml');

var md = module.exports = {};
var myname = 'json.toyaml.main';

md.gen = function(model, ctx, callback) {
    delete model.___exportName
    ctx.w(yaml.dump(model, {
        flowLevel: 100, 
        styles: {
            '!!null': 'camelcase'
        }
    }));
    callback(null, ctx);
};
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/json/toyaml', 
            message: message
        };
}
