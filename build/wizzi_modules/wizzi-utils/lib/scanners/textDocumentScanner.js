/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\scanners\textDocumentScanner.js.ittf
*/
'use strict';
var verify = require('wizzi-helpers').verify;
var path = require('path');
var encdec = require('../crypto/encdec');
var vfile = require('../fs/vfile');
var verify = require('../verify');
// TODO repository store agnostic (defaults to filesystems)
var md = module.exports = {};
md.scan = function(documentPath, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(documentPath) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'documentPath', message: 'The documentPath parameter must be a string. Received: ' + documentPath }
        ));
    }
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (options.file) {
        md.scanExec(options.file, documentPath, options, callback);
    }
    else {
        vfile(function(err, file) {
            if (err) {
                return callback(err);
            }
            md.scanExec(file, documentPath, options, callback);
        });
    }
};
md.scanExec = function(file, documentPath, options, callback) {
    file.isFile(documentPath, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result == false) {
            return callback(error('999', 'scan', 'Parameter documentPath must be an existing file. Received: ' + documentPath));
        }
    });
    documentPath = verify.unixifyPath(documentPath);
    var documentUri = '';
    var breadCrumbs = [];
    if (options.rootFolder) {
        documentUri = verify.unixifyPath(documentPath.substr(options.rootFolder.length));
        var parts = documentUri.split('/');
        var partUri = '';
        var i, i_items=parts, i_len=parts.length, item;
        for (i=0; i<i_len; i++) {
            item = parts[i];
            if (item.length > 0) {
                partUri += '/' + item;
                breadCrumbs.push({
                    uri: partUri, 
                    name: item
                });
            }
        }
        breadCrumbs[breadCrumbs.length-1].isLast = true;
    }
    file.read(documentPath, function(err, content) {
        if (err) {
            return callback(err);
        }
        return callback(null, {
                id: "p_1_1", 
                primaryPath: documentPath, 
                primaryUri: documentUri, 
                primaryHash: encdec.encrypt(documentPath), 
                breadCrumbs: breadCrumbs, 
                primaryIttf: {
                    content: content, 
                    pretty: '<span class="pp-pln">' + content + '</span>'
                }, 
                fragments: [
                    
                ], 
                ittfReferences: [
                    
                ]
            });
    });
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
        method: 'wizzi-utils.lib.scanners.textDocumentScanner.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
