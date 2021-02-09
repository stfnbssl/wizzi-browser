/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\scanners\ittfDocumentScanner.js.ittf
*/
'use strict';
var verify = require('wizzi-helpers').verify;
var path = require('path');
var async = require('async');
var stringify = require('json-stringify-safe');
var encdec = require('../crypto/encdec');
var vfile = require('../fs/vfile');
var verify = require('../verify');
var IttfMTreeEx = require('../ittfTree/ittfMTreeEx');
var IttfDocumentState = require('./ittfDocumentState');
var mTreeHtmlPrettifier = require('../prettifiers/mTreeHtmlPrettifier');
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
        scanExec(options.file, documentPath, options, callback);
    }
    else {
        vfile(function(err, file) {
            if (err) {
                return callback(err);
            }
            scanExec(file, documentPath, options, callback);
        });
    }
};
function scanMTree(file, documentPath, options, callback) {
    file.isFile(documentPath, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result == false) {
            return callback(error('999', 'scan', 'Parameter documentPath must be an existing file. Received: ' + documentPath));
        }
        IttfMTreeEx.createFrom(documentPath, {
            file: file
        }, function(err, mTree) {
            if (err) {
                return callback(err);
            }
            mTree.analize({
                rootFolder: options.rootFolder
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                // log 'scanMTree.mTree.fragments',  mTree.fragments
                // log 'scanMTree.mTree.ittfReferences',  mTree.ittfReferences
                // log 'scanMTree.mTree.errorFragments',  mTree.errorFragments
                return callback(null, {
                        mTree: mTree, 
                        fragments: mTree.fragments, 
                        ittfReferences: mTree.ittfReferences, 
                        errorFragments: mTree.errorFragments
                    });
            });
        });
    });
}
function scanExec(file, documentPath, options, callback) {
    var idCounter = options.baseIdCounter || 1;
    options.scanIdCounter = idCounter;
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
    var ittfDocumentState = new IttfDocumentState(documentPath, documentUri, breadCrumbs, options);
    scanMTree(file, documentPath, options, function(err, scanResult) {
        if (err) {
            return callback(err);
        }
        var primary = scanResult.mTree;
        ittfDocumentState.setIttfContent(primary.content);
        var pretty = mTreeHtmlPrettifier(primary);
        ittfDocumentState.setIttfPretty(pretty.prettyLines.join(''));
        ittfDocumentState.setFromScanResult(scanResult);
        var msg = stringify(ittfDocumentState, null, 2);
        // log 'related', msg
        var guard = 0;
        function loopNext(done) {
            // log 'loopNext', guard
            if (done) {
                return callback(null, ittfDocumentState);
            }
            guard++;
            if (guard > 5) {
                return callback(null, ittfDocumentState);
            }
            scanState(function(err, result) {
                if (err) {
                    return callback(err);
                }
                loopNext(result);
            });
        }
        loopNext(false);
        function scanState(callback) {
            // log 'scanState.ittfDocumentState.hasUnscanned()', ittfDocumentState.hasUnscanned()
            if (ittfDocumentState.hasUnscanned() == false) {
                return callback(null, true);
            }
            scanStateFragments(function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                scanStateIttfReferences(function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null, false);
                });
            });
        }
        function scanStateFragments(callback) {
            // log 'scanStateFragments.getUnscannedFragments.length', ittfDocumentState.getUnscannedFragments().length
            async.map(ittfDocumentState.getUnscannedFragments(), function(fragment, callback) {
                fragment.hash = encdec.encrypt(fragment.uri);
                scanMTree(file, fragment.uri, options, function(err, scanResult) {
                    if (err) {
                        return callback(err);
                    }
                    var primary = scanResult.mTree;
                    var msg = stringify(scanResult, null, 2);
                    // log 'scanResult', fragment.uri, msg
                    ittfDocumentState.setFromScanResult(scanResult);
                    fragment.ittfContent = primary.content;
                    var pretty = mTreeHtmlPrettifier(primary);
                    fragment.ittfPretty = pretty.prettyLines.join('');
                    return callback(null);
                });
            }, callback);
        }
        function scanStateIttfReferences(callback) {
            // log 'scanStateFragments.getUnscannedIttfReferences.length', ittfDocumentState.getUnscannedIttfReferences()
            async.map(ittfDocumentState.getUnscannedIttfReferences(), function(reference, callback) {
                scanExec(file, reference.uri, {
                    rootFolder: options.rootFolder, 
                    baseIdCounter: ++idCounter
                }, function(err, documentState) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    reference.documentState = documentState;
                    return callback(null);
                });
            }, callback);
        }
    });
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
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-utils.lib.scanners.ittfDocumentScanner.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
