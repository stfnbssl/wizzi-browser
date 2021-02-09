/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\importers\fileImporter.js.ittf
*/
'use strict';
var path = require('path');
var wizziUtils = require('wizzi-utils');
var verify = wizziUtils.verify;
var packageRoot = require('../../index');
function importFile(filePath, baseImportPath, baseExportPath, vfile, callback) {
    if (typeof callback === 'undefined') {
        callback = vfile;
        // vfile() defaults to local filesystem
        vfile = wizziUtils.vfile();
    }
    const dirname = path.dirname(filePath);
    const basename = path.basename(filePath);
    const extension = path.extname(filePath);
    var schema = extension.substr(1);
    var name = basename.substr(0, basename.length - extension.length);
    var filePathNorm = verify.replaceAll(filePath, '\\', '/');
    var baseImportPathNorm = verify.replaceAll(baseImportPath, '\\', '/');
    var baseExportPathNorm = verify.replaceAll(baseExportPath, '\\', '/');
    var folderNorm = dirname.substr(baseImportPathNorm.length + 1);
    // log 'importFile', baseImportPath, folderNorm, name, schema
    var source = vfile.read(filePath);
    var isVue = false;
    if (schema.toLowerCase() === 'vue') {
        source = '<vue>' + source + '</vue>';
        schema = 'html';
        isVue = true;
    }
    if (schema.toLowerCase() === 'tsx') {
        schema = 'ts';
    }
    if (schema.toLowerCase() === 'jsx') {
        schema = 'js';
    }
    if (!packageRoot.canBeWizzified(schema)) {
        // log '0', folderNorm, basename
        if (folderNorm.length > 0) {
            vfile.write(path.join(baseExportPathNorm, folderNorm, basename), source, callback);
        }
        else {
            vfile.write(path.join(baseExportPathNorm, basename), source, callback);
        }
    }
    else {
        var options = {};
        if (isVue) {
            options = {
                embedTag: 'vue', 
                isForVue: true
            };
        }
        console.log(' --- wizzify from ' + filePath);
        console.log('             schema ' + schema);
        packageRoot.wizzify(schema, source, options, function(err, result) {
            if (isVue) {
                schema = 'vue';
            }
            var outpath;
            if (folderNorm.length > 0) {
                // log '1', folderNorm, name + '.' + schema + '.ittf'
                outpath = path.join(baseExportPathNorm, folderNorm, name + '.' + schema + '.ittf');
            }
            else {
                // log '2', folderNorm, name + '.' + schema + '.ittf'
                outpath = path.join(baseExportPathNorm, name + '.' + schema + '.ittf');
            }
            console.log('             to ' + outpath);
            if (err) {
                console.log('Error', outpath, err);
                vfile.write(outpath, err, callback);
            }
            else {
                vfile.write(outpath, result, callback);
            }
        });
    }
}
module.exports = importFile;
