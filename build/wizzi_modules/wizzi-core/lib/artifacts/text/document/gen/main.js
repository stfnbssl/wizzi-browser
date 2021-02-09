/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\text\document\gen\main.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};
var myname = 'text.document.main';

md.gen = function(model, ctx, callback) {
    if (model.wzElement !== 'text') {
        console.log('wizzi-core', 'artifact', 'model', model);
        callback(error('Invalid model schema. Expected "text". Received: ' + model.wzElement));
    }
    // log 'wizzi-core.artifact.text.document', model, model.toText
    if (model.toText) {
        ctx.write(model.toText());
    }
    else {
        ctx.write(model.content);
    }
    callback(null, ctx);
};
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/text/document', 
            message: message
        };
}
