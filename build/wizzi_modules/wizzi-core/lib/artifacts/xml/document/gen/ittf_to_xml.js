/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-core\.wizzi\ittf\lib\artifacts\xml\document\gen\ittf_to_xml.js.ittf
*/
'use strict';
var myname = 'ittf_to_xml';
module.exports = function(ittf) {
    return toxml(ittf);
};
function toxml(model) {
    var ret = {
        tag: model.n, 
        attribs: [], 
        elements: []
    };
    var i, i_items=model.children, i_len=model.children.length, item;
    for (i=0; i<i_len; i++) {
        item = model.children[i];
        if (item.n === '@') {
            ret.attribs.push(toattr(item.v));
        }
        else {
            ret.elements.push(toxml(item));
        }
    }
    return ret;
}
function toattr(text) {
    var ret = {
        name: '', 
        value: ''
    },
        state = 0;
    for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (state == 0 && (ch == ' ' || ch == '\t')) {
            ;
        }
        else if (state == 0) {
            ret.name += ch;
            state = 1;
        }
        else if (state == 1 && (ch == ' ' || ch == '\t')) {
            state = 2;
        }
        else if (state == 1) {
            ret.name += ch;
        }
        else if (state == 2) {
            ret.value += ch;
        }
    }
    return ret;
}
