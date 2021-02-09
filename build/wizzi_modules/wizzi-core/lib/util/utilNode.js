/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\util\utilNode.js.ittf
*/
'use strict';

var verify = require('./verify');

var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";

var md = module.exports = {};
md.inlinedTextToTextLines = function(text) {
    if (typeof(text) === 'undefined' || text == null) {
        return {
                text: text, 
                lines: null
            };
    }
    var text = verify.replaceAll(text, work.textSep, '\n');
    var ss = text.split('\n');
    if (ss.length == 1) {
        return {
                text: ss[0], 
                lines: null
            };
    }
    else {
        var lines = verify.replaceAll(ss[1], work.lineSep, '\n').split('\n')
        ;
        return {
                text: ss[0], 
                lines: lines
            };
    }
};
