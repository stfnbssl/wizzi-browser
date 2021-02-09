/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-mtree\.wizzi\ittf\lib\jswizzi\errors.js.ittf
*/
'use strict';
var util = require('util');
var wizziUtils = require('wizzi-utils');
var f_verify = require('./functions/verify');

var pkgVersioned = ' (@wizzi/mtree.0.7.11)';

var md = module.exports = {};

function JsWizziRunnerError(message, node) {
    this.name = 'JsWizziRunnerError';
    this.message = message;
    this.node = node;
    this.__is_error = true;
    this.message = message + util.inspect(node.loc, {depth: null});
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziRunnerError.prototype.toString = function() {
    return this.message;
};
JsWizziRunnerError.prototype = Object.create(Error.prototype);
JsWizziRunnerError.prototype.constructor = JsWizziRunnerError;
md.JsWizziRunnerError = JsWizziRunnerError;

function InvalidVariableNameError(message) {
    this.name = 'InvalidVariableNameError';
    this.message = message;
    this.__is_error = true;
    this.message = message;
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
InvalidVariableNameError.prototype.toString = function() {
    return this.message;
};
InvalidVariableNameError.prototype = Object.create(Error.prototype);
InvalidVariableNameError.prototype.constructor = InvalidVariableNameError;
md.InvalidVariableNameError = InvalidVariableNameError;

function JsWizziSynthaxError(message, node) {
    this.name = 'JsWizziSynthaxError';
    this.message = message;
    this.node = node;
    this.__is_error = true;
    // log 'JsWizziSynthax.message', message
    if (f_verify.isObject(message) && message.lineNumber) {
        // In this case node = WizziJS source
        this.message = "Synthax error. " + message.description +' at line ' + message.lineNumber +' column ' + message.column +'\n' +getEsprimaErrorLines(message, node) +'\n';
        this.errorLines = getEsprimaErrorLines(message, node, true);
    }
    else {
        this.message = message;
    }
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziSynthaxError.prototype.toString = function() {
    return this.message;
};
JsWizziSynthaxError.prototype = Object.create(Error.prototype);
JsWizziSynthaxError.prototype.constructor = JsWizziSynthaxError;
md.JsWizziSynthaxError = JsWizziSynthaxError;

/**
    For
     vars or functions undeclared
     invalid values
*/
function JsWizziTypeError(message, node) {
    this.name = 'JsWizziTypeError';
    this.message = message;
    this.node = node;
    this.__is_error = true;
    this.message = message;
    this.message += pkgVersioned;
    // 5/8/17 set this.stack = (new Error()).stack
}
JsWizziTypeError.prototype.toString = function() {
    return this.message;
};
JsWizziTypeError.prototype = Object.create(Error.prototype);
JsWizziTypeError.prototype.constructor = JsWizziTypeError;
md.JsWizziTypeError = JsWizziTypeError;

md.esprimaNodeErrorLines = function(description, node, source, json) {
    if (node && node.loc) {
        // log 'jswizzi.errors.esprimaNodeErrorLines.source', source
        // log 'jswizzi.errors.esprimaNodeErrorLines.node.loc', node.loc
        return wizziUtils.errors.getErrorLines({
                row: node.loc.start.line, 
                col: node.loc.start.column, 
                description: description
            }, source, json);
    }
    else {
        console.log('jswizzi.errors.esprimaNodeErrorLines', 'node has no loc property', node);
        return ['No data available'];
    }
};
function getEsprimaErrorLines(esprimaException, source, json) {
    var statements = source.split('\n');
    var start = Math.max(0, (esprimaException.lineNumber - 4));
    var end = Math.min(statements.length, (esprimaException.lineNumber + 4));
    var ret = [];
    for (var i = start; i < end; i++) {
        ret.push(formatLineNumber(i + 1) + ' ' + statements[i]);
        if (i == esprimaException.lineNumber - 1) {
            var col = esprimaException.column;
            ret.push(spaces(col + 4) + '^ ' + esprimaException.description);
        }
    }
    return json ? ret : ret.join('\n');
}
function spaces(num) {
    if (num > 0) {
        return Array(num + 1).join(" ");
    }
    else {
        return '';
    }
}
function formatLineNumber(num) {
    if (num > 999) {
        return num;
    }
    if (num > 99) {
        return ('0' + num);
    }
    if (num > 9) {
        return ('00' + num);
    }
    return ('000' + num);
}
