/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\scanners\folderScanner.js.ittf
*/
'use strict';
var verify = require('wizzi-helpers').verify;
var path = require('path');
var verify = require('../verify');
var vfile = require('../fs/vfile');
var IttfMTreeEx = require('../ittfTree/ittfMTreeEx');
var IttfFsNode = require('./ittfFsNode');
var md = module.exports = {};
/**
    
     Scans a folder searching for *.ittf files
     Returns a wizzi.utils.IttfMTreeEx instance
     loaded with an mTree conformant to the
     'wzpackage' schema.
    
     params
     string folderPath
     { options
     string name
     # the name of the 'wzpackage' wizzi model that
     # will be generated from this folder
     string gitPath
     # the base path to the 'main' generated artifact
     # in the future, could be used for linking the ittf document
     # of a language type to the generated code.
     { file
     virtual filesystem
     optional
    
*/
md.scan = function(folderPath, options, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', '', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isNotEmpty(folderPath) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'folderPath', message: 'The folderPath parameter must be a string. Received: ' + folderPath }
        ));
    }
    if (verify.isObject(options) === false) {
        return callback(error(
            'InvalidArgument', '', { parameter: 'options', message: 'The options parameter must be an object. Received: ' + options }
        ));
    }
    if (typeof callback === 'undefined') {
        callback = options;
        options = {};
    }
    if (options.file) {
        md.scanExec(options.file, folderPath, options, callback);
    }
    else {
        vfile(function(err, file) {
            if (err) {
                return callback(err);
            }
            md.scanExec(file, folderPath, options, callback);
        });
    }
};
md.scanExec = function(file, folderPath, options, callback) {
    file.isDirectory(folderPath, function(err, result) {
        if (err) {
            return callback(err);
        }
        if (result == false) {
            return callback(error('999', 'scan', 'Parameter folderPath must be an existing folder'));
        }
        var removeRoot = path.dirname(folderPath);
        // log 'folderPath, removeRoot', folderPath, removeRoot
        var baseFolder = path.basename(folderPath);
        file.getGlobbedFilesEx(path.join(folderPath, '**/*.ittf'), {
            removeRoot: removeRoot, 
            dot: true, 
            ignore: path.join(folderPath, '**/node_modules/**/*.*')
        }, function(err, ittfs) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            // log 'ittfs\n', JSON.stringify(ittfs, null, 2)
            var ittfMTreeEx = new IttfMTreeEx('wzpackage', options.name);
            var root = new IttfFsNode(baseFolder, null, {
                isDirectory: true, 
                file: file
            });
            root.setSourcePaths({
                ittfBasePath: removeRoot, 
                jsCodeBasePath: options.gitPath
            });
            // create the IttfFsNode tree structure of the scanned folder
            var i, i_items=ittfs, i_len=ittfs.length, ittf;
            for (i=0; i<i_len; i++) {
                ittf = ittfs[i];
                root.addDocument(( ittf[0] === '/' ? ittf.substr(1) : ittf ), {
                    basePath: removeRoot, 
                    gitPath: options.gitPath
                });
            }
            // analize all IttfFsNode(s) starting from root
            // this also searches mixed or included ittf fragments that are
            // outside (up) of folderPath
            root.analize2(function(err, notUsed) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                // export folder infos to an mTree conformant to the
                // 'wzpackage' schema.
                root.toIttf2(ittfMTreeEx);
                // log 'IttfFsNode.ittfMTreeEx\n', ittfMTreeEx.toString()
                return callback(null, ittfMTreeEx);
            });
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
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
