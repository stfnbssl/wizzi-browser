/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\option.js.ittf
*/
'use strict';
/**
     TODO eliminate this
    
*/
var data = {};
var option = module.exports = function(key, value) {
    var no = key.match(/^no-(.+)$/);
    if (arguments.length === 2) {
        return data[key] = value;
    }
    else if (no) {
        return data[no[1]] === false;
    }
    else {
        return data[key];
    }
};
option.init = function(obj) {
    return data = (obj || {});
};
