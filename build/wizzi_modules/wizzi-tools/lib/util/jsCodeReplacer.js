/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\util\jsCodeReplacer.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var md = module.exports = {};
md.clean = function(code) {
    var replaceds = [];
    if (!code) {
        return replaceds;
    }
    var i = 0,
        len = code.length,
        state = 0,
        counter = 0,
        internalGraph = 0,
        ch;
    var codeCleaned = [];
    var codeSpan = [];
    var ws = [];
    while (true) {
        if (i >= len) {
            return {
                    replaceds: replaceds, 
                    codeCleaned: codeCleaned.join('')
                };
        }
        ch = code[i];
        if (ch == '{' && state == 0) {
            state = 1;
        }
        else if (ch == '{' && state == 1) {
            state = 2;
        }
        else if ((ch == ' ' || ch == '\t') && state == 1) {
            ws.push(ch);
        }
        else if (ch == '{' && state == 2) {
            codeSpan.push(ch);
            internalGraph++;
        }
        else if (ch == '}' && state == 2 && internalGraph > 0) {
            codeSpan.push(ch);
            internalGraph--;
        }
        else if (ch == '}' && state == 2) {
            state = 3;
        }
        else if ((ch == ' ' || ch == '\t') && state == 3) {
            ws.push(ch);
        }
        else if (ch == '}' && state == 3) {
            var token = '/*;;' + ++counter + ';;*/';
            var key = ';;' + counter + ';;';
            replaceds.push({
                token: token, 
                key: key, 
                code: codeSpan.join('')
            });
            codeCleaned.push(token);
            codeSpan.length = 0;
            state = 0;
        }
        else if (state == 2) {
            codeSpan.push(ch);
        }
        else if (state == 1) {
            codeCleaned.push('{');
            codeCleaned.push(ws.join(''));
            ws.length = 0;
            codeCleaned.push(ch);
            state = 0;
        }
        else if (state == 3) {
            codeCleaned.push('}');
            codeCleaned.push(ws.join(''));
            ws.length = 0;
            codeCleaned.push(ch);
            state = 2;
        }
        else {
            codeCleaned.push(ch);
        }
        // log '-', state, internalGraph, codeCleaned.join(''), '/', codeSpan.join('')
        // log '-', state, internalGraph, codeSpan.join('')
        i++;
    }
};
md.restore = function(code, replaceds) {
    if (!code) {
        return ;
    }
    var i, i_items=replaceds, i_len=replaceds.length, item;
    for (i=0; i<i_len; i++) {
        item = replaceds[i];
        code = verify.replaceAll(code, item.key, item.code);
    }
    return code;
};
md.restoreInside = function(code, replaceds) {
    if (!code) {
        return ;
    }
    var match = md.getKey(code, replaceds);
    if (match == null) {
        return ;
    }
    return verify.replaceAll(code, '/*' + match.key + '*/', '{{' + match.code + '}}');
};
md.isInside = function(code, replaceds) {
    var match = md.getKey(code, replaceds);
    if (match == null) {
        return false;
    }
    if (code.trim().length > match.key.length) {
        return true;
    }
};
md.isKey = function(code, replaceds) {
    return md.getKey(code, replaceds) != null;
};
md.getKey = function(code, replaceds) {
    var i, i_items=replaceds, i_len=replaceds.length, item;
    for (i=0; i<i_len; i++) {
        item = replaceds[i];
        console.log('isKey', code, item.key);
        if (code.indexOf(item.key) > -1) {
            return item;
        }
    }
    return null;
};
