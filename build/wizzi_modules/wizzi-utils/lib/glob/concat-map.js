/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\glob\concat-map.js.ittf
*/
'use strict';
// FROM
// Copyright
// source: https://github.com/substack/node-concat-map/blob/master/index.js
// license (MIT)
module.exports = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) {
            res.push.apply(res, x);
        }
        else {
            res.push(x);
        }
    }
    return res;
};
var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};
