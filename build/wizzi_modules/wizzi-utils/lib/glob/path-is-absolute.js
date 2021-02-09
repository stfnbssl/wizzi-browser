/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\glob\path-is-absolute.js.ittf
*/
'use strict';
// FROM
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
// source https://github.com/sindresorhus/path-is-absolute/blob/master/index.js
// license (MIT)
function posix(path) {
    // wizzi factory storekind mongodb
    if (path.substr(0,3) === 'db:' || path.substr(0,3) === 'ls:' || path.substr(0,5) === 'json:') {
        return true;
    }
    return path.charAt(0) === '/';
}
function win32(path) {
    // wizzi factory storekind mongodb
    if (path.substr(0,3) === 'db:' || path.substr(0,3) === 'ls:' || path.substr(0,5) === 'json:') {
        return true;
    }
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = (result[1] || '');
    var isUnc = Boolean((device && (device.charAt(1) !== ':')));
    return Boolean((result[2] || isUnc));
}
module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;
