/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\preprocess.js.ittf
*/
'use strict';
var md = module.exports = {};
var myname = 'js.module.preprocess';
md.exec = function(model, ctx) {
    ctx.__wzModule = {
        seen: false, 
        vars: [], 
        consts: [], 
        functions: [], 
        classes: [], 
        requires: []
    };
    ctx.__wzItems = [];
    var i, i_items=model.statements, i_len=model.statements.length, topitem;
    for (i=0; i<i_len; i++) {
        topitem = model.statements[i];
        if (checkWzItem(topitem, ctx.__wzModule)) {
        }
        else if (topitem.wzElement === "wzIife") {
            ctx.__wzItems.push(wzTopLevel(topitem));
        }
    }
};
function wzTopLevel(topitem) {
    var wzItems = topitem.__wzItems = wzItems = {
        seen: false, 
        vars: [], 
        consts: [], 
        functions: [], 
        classes: [], 
        requires: []
    };
    var i, i_items=topitem.statements, i_len=topitem.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = topitem.statements[i];
        checkWzItem(item, wzItems);
    }
    // log 'wzItems.requires.length', wzItems.requires.length
    // log 'wzItems.vars.length', wzItems.vars.length
    // log 'wzItems.consts.length', wzItems.consts.length
    // log 'wzItems.functions.length', wzItems.functions.length
    // log 'wzItems.classes.length', wzItems.classes.length
    return wzItems;
}
function checkWzItem(item, wzItems) {
    if (item.wzElement === "wzVar") {
        wzItems.vars.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzConst") {
        wzItems.consts.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzFunction") {
        wzItems.functions.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzClass") {
        wzItems.functions.push(item);
        wzItems.seen = true;
        return true;
    }
    else if (item.wzElement === "wzRequire") {
        wzItems.requires.push(item);
        wzItems.seen = true;
        return true;
    }
    return false;
}
