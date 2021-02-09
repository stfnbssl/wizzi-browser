/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\ittf\lib\json\jsonFsimpl.js.ittf
*/
'use strict';
// generated by v6-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var verify = require('wizzi-utils').verify;
var FsJson = require('./fs/fsjson'),
    DocumentManager = require('./fs/documentmanager'),
    jsonUriParser = require('wizzi-utils').uriParser;
/**
     class JsonFsImpl
    
     Implements the `fsimpl` interface for a json backed file system.
     It is used by repo/jsonDbStore that implements the json repo store.
     uses a json/DocumentManager instance to manage an in-memory json filesystem (json/fs/FsJson)
     ctor params
     { fsJsonData
     [ items
     # simple javascript array
     [ documents
     # simple javascript array
*/
var JsonFsImpl = (function () {
    function JsonFsImpl(fsJsonData) {
        _classCallCheck(this, JsonFsImpl);
        this.classType = 'wizzi-repo.json.JsonFsImpl';
        this.fsJsonData = fsJsonData;
        this.fsJson = null;
        this.docManager = null;
    }
    JsonFsImpl.prototype.db = function(callback) {
        if (typeof(callback) !== 'function') {
            throw new Error(
                error('InvalidArgument', 'db', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        if (this.docManager == null) {
            return callback(error('InvalidOperation', 'db', 'Connection not opened. The method `open` must be called before calling `db`.'));
        }
        else {
            return callback(null, this.docManager);
        }
    }
    JsonFsImpl.prototype.open = function(options, callback) {
        if (verify.isFunction(callback) === false && verify.isFunction(options) === true) {
            callback = options;
            options = {};
        }
        if (verify.isFunction(callback) === false) {
            throw new Error(
                error('InvalidArgument', 'open', 'The callback parameter must be a function. Received: ' + callback)
            );
        };
        var that = this;
        if (this.docManager) {
            return callback(null, this.docManager);
        }
        this.fsJson = options.fsJson ? options.fsJson : options.fsJsonData ? new FsJson(options.fsJsonData) : new FsJson(this.fsJsonData);
        ;
        that.docManager = new DocumentManager(this.fsJson);
        // log '***** json connected'
        return callback(null, that.docManager);
    }
    JsonFsImpl.prototype.close = function() {
        if (this.docManager) {
            // log '***** json start closing'
            this.docManager = null;
            // log '***** json closed'
        }
    }
    JsonFsImpl.prototype.stat = function(documentUri, callback) {
        // log 'wizzi-repo.json.jsonFsimpl.stat.documentUri', documentUri
        if (verify.isFunction(callback) === false) {
            throw new Error(error('InvalidArgument', 'stat', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (verify.isNotEmpty(documentUri) === false) {
            return callback(error('InvalidArgument', 'stat', {
                    parameter: 'documentUri', 
                    message: 'The documentUri parameter must be a string. Received: ' + documentUri
                }));
        }
        var parsedUri = jsonUriParser(documentUri, this.jsondbBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            console.log('__is_error ', parsedUri);
            return callback(parsedUri);
        }
        // log 'wizzi-repo.json.jsonFsimpl.stat.parsedUri', parsedUri
        var that = this;
        this.db(function(err, jsonDb) {
            if (err) {
                return callback(err);
            }
            jsonDb.stat(parsedUri.internalPath, function(err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    }
    JsonFsImpl.prototype.lstat = function(documentUri, callback) {
        // log 'wizzi-repo.json.jsonFsimpl.lstat.documentUri', documentUri
        if (verify.isFunction(callback) === false) {
            throw new Error(error('InvalidArgument', 'lstat', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (verify.isNotEmpty(documentUri) === false) {
            return callback(error('InvalidArgument', 'lstat', {
                    parameter: 'documentUri', 
                    message: 'The documentUri parameter must be a string. Received: ' + documentUri
                }));
        }
        var parsedUri = jsonUriParser(documentUri, this.jsondbBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            console.log('__is_error ', parsedUri);
            return callback(parsedUri);
        }
        // log 'wizzi-repo.json.jsonFsimpl.lstat.parsedUri', parsedUri
        var that = this;
        this.db(function(err, jsonDb) {
            if (err) {
                return callback(err);
            }
            jsonDb.stat(parsedUri.internalPath, function(err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    }
    JsonFsImpl.prototype.readFile = function(documentUri, options, callback) {
        // log 'wizzi-repo.json.jsonFsimpl.readFile.documentUri', documentUri
        if (typeof(callback) === 'undefined' && verify.isFunction(options)) {
            callback = options;
            options = {};
        }
        if (verify.isFunction(callback) === false) {
            throw new Error(error('InvalidArgument', 'readFile', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (verify.isNotEmpty(documentUri) === false) {
            return callback(error('InvalidArgument', 'readFile', {
                    parameter: 'documentUri', 
                    message: 'The documentUri parameter must be a string. Received: ' + documentUri
                }));
        }
        var parsedUri = jsonUriParser(documentUri, this.jsondbBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            console.log('__is_error ', parsedUri);
            return callback(parsedUri);
        }
        // log 'wizzi-repo.json.jsonFsimpl.readFile.parsedUri', parsedUri
        var that = this;
        this.db(function(err, jsonDb) {
            if (err) {
                return callback(err);
            }
            jsonDb.readFile(parsedUri.internalPath, function(err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    }
    JsonFsImpl.prototype.writeFile = function(documentUri, content, options, callback) {
        // log 'wizzi-repo.json.jsonFsimpl.writeFile.documentUri', documentUri
        if (typeof(callback) === 'undefined' && verify.isFunction(options)) {
            callback = options;
            options = {};
        }
        if (verify.isFunction(callback) === false) {
            throw new Error(error('InvalidArgument', 'writeFile', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (verify.isNotEmpty(documentUri) === false) {
            return callback(error('InvalidArgument', 'writeFile', {
                    parameter: 'documentUri', 
                    message: 'The documentUri parameter must be a string. Received: ' + documentUri
                }));
        }
        var parsedUri = jsonUriParser(documentUri, this.jsondbBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            console.log('__is_error ', parsedUri);
            return callback(parsedUri);
        }
        // log 'wizzi-repo.json.jsonFsimpl.writeFile.parsedUri', parsedUri
        var that = this;
        this.db(function(err, jsonDb) {
            if (err) {
                return callback(err);
            }
            jsonDb.writeFile(parsedUri.internalPath, content, function(err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    }
    JsonFsImpl.prototype.readdir = function(documentUri, options, callback) {
        // log 'wizzi-repo.json.jsonFsimpl.readdir.documentUri', documentUri
        if (typeof(callback) === 'undefined' && verify.isFunction(options)) {
            callback = options;
            options = {};
        }
        if (verify.isFunction(callback) === false) {
            throw new Error(error('InvalidArgument', 'readdir', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (verify.isNotEmpty(documentUri) === false) {
            return callback(error('InvalidArgument', 'readdir', {
                    parameter: 'documentUri', 
                    message: 'The documentUri parameter must be a string. Received: ' + documentUri
                }));
        }
        var parsedUri = jsonUriParser(documentUri, this.jsondbBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            console.log('__is_error ', parsedUri);
            return callback(parsedUri);
        }
        // log 'wizzi-repo.json.jsonFsimpl.readdir.parsedUri', parsedUri
        var that = this;
        this.db(function(err, jsonDb) {
            if (err) {
                return callback(err);
            }
            jsonDb.getDir(parsedUri.internalPath, options, function(err, result) {
                if (err) {
                    return callback(err);
                }
                var dir = [];
                var i, i_items=result, i_len=result.length, item;
                for (i=0; i<i_len; i++) {
                    item = result[i];
                    // log 'wizzi-repo.json.jsonFsimpl.readdir.parsedUri.internalPath, item', parsedUri.internalPath, item
                    dir.push(item.basename);
                }
                callback(null, dir);
            });
        });
    }
    JsonFsImpl.prototype.mkdir = function(documentUri, options, callback) {
        // log 'wizzi-repo.json.jsonFsimpl.mkdir.documentUri', documentUri
        if (typeof(callback) === 'undefined' && verify.isFunction(options)) {
            callback = options;
            options = {};
        }
        if (verify.isFunction(callback) === false) {
            throw new Error(error('InvalidArgument', 'mkdir', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (verify.isNotEmpty(documentUri) === false) {
            return callback(error('InvalidArgument', 'mkdir', {
                    parameter: 'documentUri', 
                    message: 'The documentUri parameter must be a string. Received: ' + documentUri
                }));
        }
        var parsedUri = jsonUriParser(documentUri, this.jsondbBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            console.log('__is_error ', parsedUri);
            return callback(parsedUri);
        }
        // log 'wizzi-repo.json.jsonFsimpl.mkdir.parsedUri', parsedUri
        var that = this;
        this.db(function(err, jsonDb) {
            if (err) {
                return callback(err);
            }
            jsonDb.createFolder(parsedUri.internalPath, function(err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    }
    JsonFsImpl.prototype.unlink = function(documentUri, callback) {
        // log 'wizzi-repo.json.jsonFsimpl.unlink.documentUri', documentUri
        if (verify.isFunction(callback) === false) {
            throw new Error(error('InvalidArgument', 'unlink', 'The callback parameter must be a function. Received: ' + callback));
        }
        if (verify.isNotEmpty(documentUri) === false) {
            return callback(error('InvalidArgument', 'unlink', {
                    parameter: 'documentUri', 
                    message: 'The documentUri parameter must be a string. Received: ' + documentUri
                }));
        }
        var parsedUri = jsonUriParser(documentUri, this.jsondbBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            console.log('__is_error ', parsedUri);
            return callback(parsedUri);
        }
        // log 'wizzi-repo.json.jsonFsimpl.unlink.parsedUri', parsedUri
        var that = this;
        this.db(function(err, jsonDb) {
            if (err) {
                return callback(err);
            }
            jsonDb.deleteFile(parsedUri.internalPath, function(err, result) {
                if (err) {
                    return callback(err);
                }
                callback(null, result);
            });
        });
    }
    JsonFsImpl.prototype.createWriteStream = function(documentUri) {
        if (verify.isNotEmpty(documentUri) === false) {
            return error(
                'InvalidArgument', 'createWriteStream', { parameter: 'documentUri', message: 'The documentUri parameter must be a string. Received: ' + documentUri }
            );
        }
        var parsedUri = jsonUriParser(documentUri, this.jsonBaseFolder);
        if (parsedUri && parsedUri.__is_error) {
            return parsedUri;
        }
        return this.docManager.createWriteStream(parsedUri.internalPath);
    }
    JsonFsImpl.prototype.toJson = function(callback) {
        this.fsJson.toJson(function(err, json) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            return callback(null, json);
        });
    }
    return JsonFsImpl;
})();

module.exports = JsonFsImpl;
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
        method: 'wizzi-repo.json.jsonFsimpl.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
