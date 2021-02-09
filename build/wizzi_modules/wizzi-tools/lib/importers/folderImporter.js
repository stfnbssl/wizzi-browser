/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\importers\folderImporter.js.ittf
*/
'use strict';
var async = require('async');
var wizziUtils = require('wizzi-utils');
var importFile = require('./fileImporter');
function importFolder(baseImportPath, baseExportPath, options, vfile, callback) {
    console.log('****************************************');
    console.log(' wizzi-tools FOLDER IMPORTER');
    console.log('----------------------------------------');
    console.log(' from ' + baseImportPath);
    console.log(' to ' + baseExportPath);
    console.log('========================================');
    if (typeof vfile === 'undefined') {
        callback = options;
        options = {};
        vfile = wizziUtils.vfile();
    }
    else if (typeof callback === 'undefined') {
        callback = vfile;
        // vfile() defaults to local filesystem
        vfile = wizziUtils.vfile();
    }
    const files = vfile.getFiles(baseImportPath);
    async.mapSeries(files, function(f, callback) {
        var skip = false;
        if (options.excludes) {
            var i, i_items=options.excludes, i_len=options.excludes.length, item;
            for (i=0; i<i_len; i++) {
                item = options.excludes[i];
                if (f.fullPath.indexOf(item) > -1) {
                    skip = true;
                }
            }
        }
        if (skip) {
            return callback(null);
        }
        importFile(f.fullPath, baseImportPath, baseExportPath, vfile, function(err, result) {
            if (err) {
                return callback(null, err);
            }
            else {
                return callback(null, result);
            }
        });
    }, callback);
}
module.exports = importFolder;
