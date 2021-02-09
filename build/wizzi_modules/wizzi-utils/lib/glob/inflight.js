/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\glob\inflight.js.ittf
*/
'use strict';
// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source https://github.com/npm/inflight/blob/master/inflight.js
// license (ISC)
var wrappy = require('wrappy');
var reqs = Object.create(null);
var once = require('./once');
module.exports = wrappy(inflight);
function inflight(key, cb) {
    if (reqs[key]) {
        reqs[key].push(cb);
        return null;
    }
    else {
        reqs[key] = [cb];
        return makeres(key);
    }
}
function makeres(key) {
    return once(function RES() {
            var cbs = reqs[key];
            var len = cbs.length;
            var args = slice(arguments);
            try {
                for (var i = 0; i < len; i++) {
                    cbs[i].apply(null, args);
                }
            } 
            finally {
                if (cbs.length > len) {
                    cbs.splice(0, len);
                    process.nextTick(function() {
                        RES.apply(null, args);
                    });
                }
                else {
                    delete (reqs[key]);
                }
            } 
        });
}
function slice(args) {
    var length = args.length;
    var array = [];
    for (var i = 0; i < length; i++) {
        array[i] = args[i];
    }
    return array;
}
