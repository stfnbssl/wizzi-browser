/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-tools\.wizzi\ittf\lib\wizzifiers\jsonparser\wizzi\parser.js.ittf
*/
'use strict';
var md = module.exports = {};
var START = 0;
var WAIT_PROP_NAME = 1;
var WAIT_PROP_VALUE = 2;
// VIA var WAIT_ITEM = 3
var PROP_NAME = 4;
var PROP_VALUE = 5;
var PROP_VALUE_STRING = 6;
var WAIT_PROP_COMMA = 7;
var WAIT_OBJECT_CLOSE = 8;
var WAIT_ARRAY_VALUE = 10;
var ARRAY_VALUE = 11;
var ARRAY_VALUE_STRING = 12;
var WAIT_ARRAY_COMMA = 13;
var WAIT_ARRAY_CLOSE = 14;
var WAIT_COLON = 20;
var COMMENT_COULD = 30;
var COMMENT_SINGLE_IS = 31;
var COMMENT_MULTI_IS = 32;
var COMMENT_MULTI_END_COULD = 33;
function isWhiteSpace(ch) {
    if (ch === '\n') {
        return true;
    }
    if (ch === '\t') {
        return true;
    }
    if (ch === '\r') {
        return true;
    }
    if (ch === ' ') {
        return true;
    }
    return false;
}
md.parse = function(input, handlers, callback) {
    // log 'input', input
    var state = {
        cur: START, 
        prev: null, 
        stack: [], 
        line: 1, 
        col: 1, 
        chprev: null, 
        name: [], 
        value: [], 
        hb: []
    };
    for (var k in handlers) {
        state[k] = handlers[k];
    }
    function onObject(open) {
        state.onObject(open);
    }
    function onArray(open) {
        state.onArray(open);
    }
    function onPropName() {
        state.onPropName(state.name.join(''));
        state.name.length = 0;
    }
    function onObjectProp() {
        state.onObjectProp(state.name.join(''));
        state.name.length = 0;
    }
    function onArrayProp() {
        state.onArrayProp(state.name.join(''));
        state.name.length = 0;
    }
    function onProp() {
        state.onProp(state.name.join(''), state.value.join(''));
        state.name.length = 0;
        state.value.length = 0;
    }
    function onClosePropName() {
        state.onClosePropName();
    }
    function onArrayValue() {
        state.onArrayValue(state.value.join(''));
        state.value.length = 0;
    }
    function onHandlebar() {
        state.onHandlebar(state.hb.join(''));
        state.hb.length = 0;
    }
    function error(ch) {
        state.ch = ch;
        return callback(state);
    }
    var ch,
        l = input.length;
    for (var i = 0; i < l; i++) {
        state.col++;
        ch = input[i];
        // log 'ch, state.cur', ch, ch.charCodeAt(0), state.cur
        function withEscapeCheck(arr) {
            // beware NO real ESCAPE !!!
            // this is not a real parser but simply a wizzifier !!!
            arr.push(ch);
            if (ch === '\\' && i + 1 < l) {
                i++;
                state.col++;
                ch = input[i];
                arr.push(ch);
            }
            // always true
            return true;
        }
        function setString() {
            if (state.cur === PROP_VALUE_STRING || state.cur === ARRAY_VALUE_STRING) {
                return withEscapeCheck(state.value);
            }
            else if (state.cur === PROP_NAME) {
                return withEscapeCheck(state.name);
            }
            else {
                return false;
            }
        }
        function tryCommentOrString(doSetString) {
            // log 'ch, state.cur', ch, ch.charCodeAt(0), state.cur
            if (ch === '/') {
                if (setString()) {
                    return true;
                }
                else if (state.cur === COMMENT_SINGLE_IS || state.cur === COMMENT_MULTI_IS) {
                    return true;
                }
                else if (state.cur === COMMENT_COULD) {
                    state.cur = COMMENT_SINGLE_IS;
                    return true;
                }
                else if (state.cur === COMMENT_MULTI_END_COULD) {
                    // log 'COMMENT_MULTI_END_COULD done', state.before_comment
                    state.cur = state.before_comment;
                    return true;
                }
                else {
                    // log 'COMMENT_COULD prev', state.cur
                    state.before_comment = state.cur;
                    state.cur = COMMENT_COULD;
                    return true;
                }
            }
            else if (ch === '*') {
                if (setString()) {
                    return true;
                }
                else if (state.cur === COMMENT_SINGLE_IS) {
                    return true;
                }
                else if (state.cur === COMMENT_COULD) {
                    state.cur = COMMENT_MULTI_IS;
                    return true;
                }
                else if (state.cur === COMMENT_MULTI_IS) {
                    // log 'COMMENT_MULTI_END_COULD'
                    state.cur = COMMENT_MULTI_END_COULD;
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if (state.cur === COMMENT_COULD) {
                    state.cur = state.before_comment;
                    setString('/');
                    if (doSetString) {
                        return setString();
                    }
                    else {
                        return false;
                    }
                }
                else if (state.cur === COMMENT_MULTI_END_COULD) {
                    if (ch === '/') {
                        state.cur = state.before_comment;
                    }
                    else {
                        state.cur = COMMENT_MULTI_IS;
                    }
                    return true;
                }
                else if (state.cur === COMMENT_SINGLE_IS) {
                    // log 'COMMENT_SINGLE_IS', ch === '\n'
                    if (ch === '\n') {
                        state.cur = state.before_comment;
                        state.line++;
                        state.col = 0;
                    }
                    return true;
                }
                else if (state.cur === COMMENT_MULTI_IS) {
                    if (ch === '*') {
                        state.cur = COMMENT_MULTI_END_COULD;
                    }
                    return true;
                }
                else {
                    if (doSetString) {
                        return setString();
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        function tryHB() {
            var j, chb, gop = 1;
            for (j = i+1; j < l; j++) {
                chb = input[j];
                // log 'tryHB state', state.cur, 'ch', chb, 'gop', gop
                if (gop == 1) {
                    if (chb === '{') {
                        gop++;
                    }
                    else if (isWhiteSpace(chb)) {
                        // ok
                    }
                    else {
                        return false;
                    }
                }
                else if (gop == 2) {
                    if ('{[]'.indexOf(chb) > -1) {
                        state.hb.length = 0;
                        return false;
                    }
                    else if (chb === '}') {
                        gop++;
                    }
                    else {
                        state.hb.push(chb);
                    }
                }
                else if (gop == 3) {
                    if (isWhiteSpace(chb)) {
                        // ok
                    }
                    else if (chb === '}') {
                        onHandlebar();
                        i = j;
                        return true;
                    }
                    else {
                        state.hb.length = 0;
                        return false;
                    }
                }
                else {
                    state.hb.length = 0;
                    return false;
                }
            }
        }
        if (ch === '{') {
            if (tryCommentOrString(true)) {
                // ok
            }
            else if (state.cur === START) {
                onObject(true);
                state.stack.push(state.cur);
                state.cur = WAIT_PROP_NAME;
            }
            else if (state.cur === WAIT_ARRAY_VALUE) {
                if (tryHB() == false) {
                    state.stack.push(WAIT_ARRAY_COMMA);
                    onObject(true);
                    state.cur = WAIT_PROP_NAME;
                }
            }
            else if (state.cur === WAIT_PROP_VALUE) {
                if (tryHB() == false) {
                    // _ onPropName
                    onObjectProp();
                    state.cur = WAIT_PROP_COMMA;
                    state.stack.push(state.cur);
                    // _ onObject(true)
                    state.cur = WAIT_PROP_NAME;
                }
            }
            else if (state.cur === ARRAY_VALUE) {
                onArrayValue();
                if (tryHB() == false) {
                    return error(ch);
                }
            }
            else if (state.cur === PROP_VALUE) {
                onObjectProp();
                if (tryHB() == false) {
                    return error(ch);
                }
            }
            else if (state.cur === WAIT_PROP_NAME) {
                if (tryHB() == false) {
                    onObject(true);
                    state.stack.push(state.cur);
                    state.cur = WAIT_PROP_NAME;
                }
            }
            else if (state.cur === WAIT_ARRAY_COMMA || state.cur === WAIT_PROP_COMMA) {
                if (tryHB() == false) {
                    return error(ch);
                }
            }
            else {
                return error(ch);
            }
        }
        else if (ch === '}') {
            // no setString
            if (tryCommentOrString(false)) {
                // ok
            }
            else if (state.cur === PROP_VALUE_STRING || state.cur === ARRAY_VALUE_STRING) {
                state.value.push(ch);
            }
            else if (state.cur === PROP_NAME) {
                state.name.push(ch);
            }
            else if (state.cur === PROP_VALUE) {
                onProp();
                onObject(false);
                state.cur = state.stack.pop(ch);
                /**
                    FIXME
                    if (state.cur === WAIT_PROP_COMMA) {
                        onClosePropName();
                    }
                */
            }
            else if (state.cur === WAIT_OBJECT_CLOSE) {
                // accept comma after last prop
                onObject(false);
                state.cur = state.stack.pop(ch);
            }
            else {
                onObject(false);
                state.cur = state.stack.pop(ch);
                /**
                    FIXME
                    if (state.cur === WAIT_PROP_COMMA) {
                        onClosePropName();
                    }
                */
            }
        }
        else if (ch === '[') {
            if (tryCommentOrString(true)) {
                // ok
            }
            else if (state.cur === START) {
                onArray(true);
                state.stack.push(state.cur);
                state.cur = WAIT_ARRAY_VALUE;
            }
            else if (state.cur === WAIT_ARRAY_VALUE) {
                onArray(true);
                state.stack.push(WAIT_ARRAY_COMMA);
            }
            else if (state.cur === WAIT_PROP_VALUE) {
                // _ onPropName
                onArrayProp();
                state.stack.push(WAIT_PROP_COMMA);
                // _ onArray(true)
                state.cur = WAIT_ARRAY_VALUE;
            }
            else {
                return error(ch);
            }
        }
        else if (ch === ']') {
            if (tryCommentOrString(true)) {
                // ok
            }
            else if (state.cur === ARRAY_VALUE) {
                onArrayValue();
                onArray(false);
                state.cur = state.stack.pop(ch);
                /**
                    FIXME
                    if (state.cur === WAIT_PROP_COMMA) {
                        onClosePropName();
                    }
                */
            }
            else if (state.cur === WAIT_ARRAY_VALUE) {
                // empty array
                onArray(false);
                state.cur = state.stack.pop(ch);
            }
            else if (state.cur === WAIT_ARRAY_CLOSE) {
                // accept comma after last value
                onArray(false);
                state.cur = state.stack.pop(ch);
            }
            else if (state.cur === WAIT_ARRAY_COMMA) {
                onArray(false);
                state.cur = state.stack.pop(ch);
            }
            else {
                return error(ch);
            }
            /**
                FIXME
                if (state.cur === WAIT_PROP_COMMA) {
                    onClosePropName();
                }
            */
        }
        else if (ch === ':') {
            if (tryCommentOrString(true)) {
                // ok
            }
            else if (state.cur === WAIT_COLON) {
                state.cur = WAIT_PROP_VALUE;
            }
            else {
                return error(ch);
            }
        }
        else if (ch === '"') {
            // no setString
            if (tryCommentOrString(false)) {
                // ok
            }
            else if (state.cur === WAIT_PROP_NAME) {
                state.cur = PROP_NAME;
            }
            else if (state.cur === PROP_NAME) {
                state.cur = WAIT_COLON;
            }
            else if (state.cur === WAIT_PROP_VALUE) {
                state.value.push(ch);
                state.cur = PROP_VALUE_STRING;
            }
            else if (state.cur === PROP_VALUE_STRING) {
                state.value.push(ch);
                onProp();
                state.cur = WAIT_PROP_COMMA;
            }
            else if (state.cur === WAIT_ARRAY_VALUE) {
                state.value.push(ch);
                state.cur = ARRAY_VALUE_STRING;
            }
            else if (state.cur === ARRAY_VALUE_STRING) {
                state.value.push(ch);
                onArrayValue();
                state.cur = WAIT_ARRAY_COMMA;
            }
            else {
                return error(ch);
            }
        }
        else if (ch === ',') {
            if (tryCommentOrString(true)) {
                // ok
            }
            else if (state.cur === PROP_VALUE) {
                onProp();
                state.cur = WAIT_PROP_NAME;
            }
            else if (state.cur === ARRAY_VALUE) {
                onArrayValue();
                state.cur = WAIT_ARRAY_VALUE;
            }
            else if (state.cur === WAIT_PROP_COMMA) {
                state.cur = WAIT_PROP_NAME;
            }
            else if (state.cur === WAIT_ARRAY_COMMA) {
                state.cur = WAIT_ARRAY_VALUE;
            }
            else if (state.cur === 	WAIT_ARRAY_VALUE) {
                // allow comma after last value
                state.cur = WAIT_ARRAY_CLOSE;
            }
            else if (state.cur === 	WAIT_PROP_NAME) {
                // allow comma after last prop
                state.cur = WAIT_OBJECT_CLOSE;
            }
            else {
                return error(ch);
            }
        }
        else {
            if (tryCommentOrString(true)) {
                // ok
            }
            else if (ch === '\n') {
                state.line++;
                state.col = 0;
            }
            else if (ch === ' ' || ch === '\t' || ch === '\r') {
                // skip
            }
            else if (state.cur === PROP_VALUE || state.cur === ARRAY_VALUE) {
                state.value.push(ch);
            }
            else if (state.cur === WAIT_PROP_VALUE) {
                state.value.push(ch);
                state.cur = PROP_VALUE;
            }
            else if (state.cur === WAIT_ARRAY_VALUE) {
                state.value.push(ch);
                state.cur = ARRAY_VALUE;
            }
            else {
                return error(ch);
            }
        }
    }
    return callback(null, state);
};
