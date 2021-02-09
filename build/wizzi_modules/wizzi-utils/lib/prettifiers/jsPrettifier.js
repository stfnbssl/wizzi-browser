/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\prettifiers\jsPrettifier.js.ittf
*/
'use strict';
var beautify = require('js-beautify').js_beautify;
var fs = require('fs');
fs.readFile('foo.js', 'utf8', function(err, data) {
    if (err) {
        throw err;
    }
    console.log(beautify(data, { indent_size: 2 }));
});
