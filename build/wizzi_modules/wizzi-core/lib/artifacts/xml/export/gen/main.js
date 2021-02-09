/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\xml\export\gen\main.js.ittf
*/
'use strict';
var util = require('util');

var md = module.exports = {};
var myname = 'xml.export.main';

md.gen = function(model, ctx, callback) {
    if (model.wzElement !== 'xml') {
        console.log('wizzi-core', 'artifact', 'model', model);
        callback(error('Invalid model schema. Expected "xml". Received: ' + model.wzElement));
    }
    var xml;
    if (model.toXml) {
        xml = model.toXml();
    }
    else {
        return callback(error('The model has no toXml method'));
    }
    ctx.w(xml);
    callback(null, ctx);
};
function error(message) {
    return {
            __is_error: true, 
            source: 'wizzi-core/lib/artifacts/xml/export', 
            message: message
        };
}
