/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statements\call.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.call';
var md = module.exports = {};

function hasStatements(model) {
    return countStatements(model) > 0;
}
function countStatements(model) {
    var count = 0;
    var i, i_items=model.statements, i_len=model.statements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.statements[i];
        if (item.wzElement != 'comment') {
            count++;
        }
    }
    return count;
}
md.load = function(cnt) {
    cnt.stm.typeCallSignature = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeCallSignature');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeCallSignature. Got: ' + callback);
        }
        var ptypeDecl = u.extractTSParameterDecl(model);
        if (ptypeDecl) {
            cnt.stm[ptypeDecl.wzElement](ptypeDecl, ctx, () => {});
        }
        ctx.write('(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            var ptype = u.extractTSSimpleType(model);
            if (ptype) {
                console.log('property', ptype.wzElement);
                ctx.write(': ');
                cnt.stm[ptype.wzElement](ptype, ctx, () => {});
            }
            ctx.w(';');
            return callback(null, null);
        });
    };
};
