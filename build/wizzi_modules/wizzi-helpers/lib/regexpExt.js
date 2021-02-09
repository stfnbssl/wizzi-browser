/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-helpers\.wizzi\ittf\lib\regexpExt.js.ittf
*/
'use strict';
var util = require('util');
var chalk = require('chalk');
var md = module.exports = {};
md.getAllRegExp = function(regexp) {
    var ret = new RegExp(regexp.source, 'g' + (regexp.ignoreCase ? 'i' : '') + (regexp.multiline  ? 'm' : ''));
    // override RegExp#exec
    ret.exec = function(string) {
        var results = [], result, checkLoop = -1;
        var result = RegExp.prototype.exec.call(this, string);
        while (result !== null) {
            if (this.lastIndex === checkLoop) {
                result.loop = true;
                break;
            }
            checkLoop = this.lastIndex;
            results.push(result[0]);
            result = RegExp.prototype.exec.call(this, string);
        }
        return results.length > 0 || results.loop ? results : null;
    };
    return ret;
};
md.namedRegExp = function(regexp) {
    // taken from to https://github.com/cho45/named-regexp.js
    // (c) cho45 http://cho45.github.com/mit-license
    // and adapted
    var names = [];
    var ret = new RegExp(regexp.source.replace(/\(:<(\w+)>/g, function(err, name) {
        names.push(name);
        return '(';
    }), (regexp.global     ? 'g' : '') + (regexp.ignoreCase ? 'i' : '') + (regexp.multiline  ? 'm' : ''));
    var captures = function(matched) {
        if (!matched) {
            return matched;
        }
        var captures = {};
        var i, i_items=names, i_len=names.length, name;
        for (i=0; i<i_len; i++) {
            name = names[i];
            if (!captures[name]) {
                captures[name] = [];
            }
            captures[name].push(matched[i + 1]);
        }
        matched.captures = captures;
        matched.capture = function(name) {
            return captures[name][ captures[name].length - 1 ];
        };
        return matched;
    };
    // override RegExp#exec
    ret.exec = function(string) {
        return captures(RegExp.prototype.exec.call(this, string));
    };
    // like String#replace
    ret.replace = function(string, replace) {
        if (typeof replace == 'function') {
            return string.replace(this, function() {
                    return replace(captures(Array.prototype.slice.call(arguments)));
                });
        }
        else {
            return string.replace(this, replace);
        }
    };
    return ret;
};
