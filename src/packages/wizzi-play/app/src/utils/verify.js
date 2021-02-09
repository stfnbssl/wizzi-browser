/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\utils\verify.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
var md = {};
md.isString = function(test) {
    return test !== null && typeof(test) === 'string';
};
md.isEmpty = function(test) {
    return md.isString(test) == false || test.length == 0;
};
md.isNotEmpty = function(test) {
    return md.isString(test) && test.length > 0;
};
md.isObject = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object Object]';
};
md.isArray = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    if (Array.isArray) {
        return Array.isArray(test);
    }
    return {}.toString.call(test) === '[object Array]';
};
md.isFunction = function(test) {
    if (test === null || typeof(test) === 'undefined') {
        return false;
    }
    return {}.toString.call(test) === '[object Function]';
};
md.replaceAll = function(text, find, replace) {
    if (md.isEmpty(text)) {
        return text;
    }
    return text.replace(new RegExp(md.escapeRegExp(find), 'g'), replace);
};
md.escapeRegExp = function(text) {
    if (md.isEmpty(text)) {
        return text;
    }
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};
export default md;
