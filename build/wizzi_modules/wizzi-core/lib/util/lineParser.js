/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\util\lineParser.js.ittf
*/
'use strict';

var verify = require('./verify');

var md = module.exports = {};
/**
     ignore quotes
     name = first not (blank or tab) char sequence
     value = all remaining chars after name + (blank or tab)
     example
     "trip to the london bridge"
     name() = "trip"
     value() = "to the london bridge"
*/
md.parseNameValueRaw = function(text, node) {
    var name = '',
        value = '';
    if (verify.isNotEmpty(text)) {
        var ch,
            state = 0,
            l = text.length;
        for (var i = 0; i < l; i++) {
            ch = text[i];
            if (ch == ' ' || ch == '\t') {
                if (state == 0) {
                    ;
                }
                else if (state == 1) {
                    state = 2;
                }
                else if (state == 2) {
                    value += ch;
                }
            }
            else {
                if (state == 0) {
                    name = ch;
                    state = 1;
                }
                else if (state == 1) {
                    name += ch;
                }
                else if (state == 2) {
                    value += ch;
                }
            }
        }
    }
    return {
            name: function() {
                return name;
            }, 
            value: function() {
                return value;
            }, 
            hasValue: function() {
                return value.length > 0;
            }
        };
};
