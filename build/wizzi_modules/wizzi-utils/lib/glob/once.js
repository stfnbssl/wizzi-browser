/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\glob\once.js.ittf
*/
'use strict';
// FROM
// Copyright (c) Isaac Z. Schlueter and Contributors
// source https://github.com/isaacs/once/blob/master/once.js
// license (ISC)
var wrappy = require('./wrappy');
module.exports = wrappy(once);
module.exports.strict = wrappy(onceStrict);
once.proto = once(function() {
    Object.defineProperty(Function.prototype, 'once', {
        value: function() {
            return once(this);
        }, 
        configurable: true
    });
    Object.defineProperty(Function.prototype, 'onceStrict', {
        value: function() {
            return onceStrict(this);
        }, 
        configurable: true
    });
});
function once(fn) {
    var f = function() {
        if (f.called) {
            return f.value;
        }
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
}
function onceStrict(fn) {
    var f = function() {
        if (f.called) {
            throw new Error(f.onceError);
        }
        f.called = true;
        return f.value = fn.apply(this, arguments);
    };
    var name = (fn.name || 'Function wrapped with `once`');
    f.onceError = (name + " shouldn't be called more than once");
    f.called = false;
    return f;
}
