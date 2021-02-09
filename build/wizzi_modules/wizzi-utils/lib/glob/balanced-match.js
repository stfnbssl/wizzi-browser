/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\glob\balanced-match.js.ittf
*/
'use strict';
// FROM
// Copyright (c) 2013 Julian Gruber <julian@juliangruber.com>
// source: https://github.com/juliangruber/balanced-match
// license (MIT)
module.exports = balanced;
function balanced(a, b, str) {
    if (a instanceof RegExp) {
        a = maybeMatch(a, str);
    }
    if (b instanceof RegExp) {
        b = maybeMatch(b, str);
    }
    var r = range(a, b, str);
    return r && {start: r[0], end: r[1], pre: str.slice(0, r[0]), body: str.slice((r[0] + a.length), r[1]), post: str.slice((r[1] + b.length))};
}
function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
}
balanced.range = range;
function range(a, b, str) {
    var begs,
        beg,
        left,
        right,
        result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, (ai + 1));
    var i = ai;
    if ((ai >= 0) && (bi > 0)) {
        begs = [];
        left = str.length;
        while ((i >= 0) && ! (result)) {
            if (i == ai) {
                begs.push(i);
                ai = str.indexOf(a, (i + 1));
            }
            else if (begs.length == 1) {
                result = [begs.pop(), bi];
            }
            else {
                beg = begs.pop();
                if (beg < left) {
                    left = beg;
                    right = bi;
                }
                bi = str.indexOf(b, (i + 1));
            }
            i = ((ai < bi) && (ai >= 0)) ? ai : bi;
        }
        if (begs.length) {
            result = [left, right];
        }
    }
    return result;
}
