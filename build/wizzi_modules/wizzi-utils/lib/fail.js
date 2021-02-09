/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\fail.js.ittf
*/
'use strict';
var option = require('./option');
var chalk = require('chalk');
var md = module.exports = {};
md.code = {
    FATAL_ERROR: 1, 
    MISSING_WFJOBFILE: 2, 
    MISSING_ITTFDOCUMENT: 3, 
    MISSING_MIXIN: 4, 
    MISSING_INCLUDE: 5, 
    ITTF_LOADING_FAILURE: 6, 
    MODEL_LOADING_FAILURE: 7, 
    MISSING_MODELTRANSFORMER: 8, 
    MISSING_ARTIFACTGENERATOR: 9, 
    WARNING: 10
};
function dumpStack(e) {
    if (option('stack')) {
        if (e.origError && e.origError.stack) {
            loginfo(e.origError.stack);
        }
        else if (e.stack) {
            loginfo(e.stack);
        }
    }
}
md.fatal = function(e, errcode) {
    var msg = "Fatal error: " + String(e.message || e);
    logerror(msg);
    dumpStack(e);
    var code = typeof(errcode) === 'number' ? errcode : md.code.FATAL_ERROR;
    ;
    process.exit(code);
};
md.errorcount = 0;
md.warncount = 0;
md.warn = function(e, errcode) {
    var msg = 'Warning: ' + (typeof(e) === 'string' ? e : e.message);
    msg += option('force') ? '\nUsed --force, continuing.' : '\nUse --force to continue.';
    md.warncount++;
    logwarn(msg);
    if (!(option('force'))) {
        dumpStack(e);
        if (false) {
            logerror('Aborted due to warnings.');
            var code = typeof (errcode) === 'number' ? errcode : md.code.WARNING;
            ;
            process.exit(code);
        }
    }
};
md.report = function() {
    if (md.warncount > 0) {
        logerror('Done, but with warnings.');
    }
    else {
        logsuccess('Done, without errors.');
    }
};
function loginfo(msg) {
    console.log(msg);
}
function logsuccess(msg) {
    console.log(chalk.green(msg));
}
function logwarn(msg) {
    console.log(chalk.yellow(msg));
}
function logerror(msg) {
    console.log(chalk.red(msg));
}
