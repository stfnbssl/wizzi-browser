/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\ittf\lib\json\index.js.ittf
*/
'use strict';
var async = require('async');
var md = {};
module.exports = md;
var Collection = require('../utils/collection');
md.directoryTree = require('./directoryTree');
md.FsJson = require('./fs/fsjson');
md.DocumentManager = require('./fs/documentmanager');
/**
     params
     { jsonFsData
     [ items
     [ documents
     jsonFsData is simply a transport (DTO)
     to get the updated jsonFsData you
     must call the toJson method of the DocumentManager instance
*/
md.createDocumentManager = function(fsJsonDataOrFsJson) {
    if (fsJsonDataOrFsJson && fsJsonDataOrFsJson.classType === 'wizzi-repo.json.FsJson') {
        return new md.DocumentManager(fsJsonDataOrFsJson);
    }
    else {
        var jsonFsData = fsJsonDataOrFsJson || {};
        jsonFsData.items = jsonFsData.items || [];
        jsonFsData.documents = jsonFsData.documents || [];
        return new md.DocumentManager(new md.FsJson(jsonFsData));
    }
};
md.createFsJson = function(documents, callback) {
    md.createJsonFsData(documents, function(err, jsonFsData) {
        if (err) {
            return callback(err);
        }
        var fsJson = new md.FsJson(jsonFsData);
        return callback(null, fsJson);
    });
};
md.createFsJsonByJsonFsData = function(jsonFsData, callback) {
    var fsJson = new md.FsJson(jsonFsData);
    return callback(null, fsJson);
};
md.createJsonFsData = function(documents, callback) {
    const doc = this.createDocumentManager();
    async.map(documents, (document, callback) =>
        doc.writeFile(document.path, document.content, callback), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        doc.toJson(callback);
    });
};
md.addToJsonFsData = function(jsonFsData, documents, callback) {
    const doc = this.createDocumentManager(jsonFsData);
    async.map(documents, (document, callback) =>
        doc.writeFile(document.path, document.content, callback), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        doc.toJson(callback);
    });
};
