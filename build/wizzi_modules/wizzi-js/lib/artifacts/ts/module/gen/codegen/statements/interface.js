/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statements\interface.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.interface';
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
    cnt.stm.typeInterface = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeInterface');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeInterface. Got: ' + callback);
        }
        ctx.write('interface ' + model.wzName);
        u.genTSTypeParameters(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.w(' {');
            cnt.genItems(model.statements, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w('}');
                return callback(null, null);
            });
        });
    };
    cnt.stm.typeProperty = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeProperty');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeProperty. Got: ' + callback);
        }
        u.genAccessorsAndExtra(model, ctx);
        ctx.write(model.wzName);
        if (model.typeOptional) {
            ctx.write('?');
        }
        var ptype = u.extractTSSimpleType(model);
        if (ptype) {
            ctx.write(': ');
            cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                var ivalue = u.extractTS(model, 'typeInitValue');
                if (ivalue) {
                    ctx.write(' = ');
                    statement.stm[ivalue.wzElement](ivalue, ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        return callback(null, null);
                    });
                }
                else if (model.statements.length > 0) {
                    ctx.indent();
                    model.wzElement = 'jsObject';
                    cnt.genItem(model, ctx, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        model.wzElement = ':p';
                        ctx.deindent();
                        ctx.w('');
                    });
                    return callback(null, null);
                }
                else {
                    ctx.w();
                    return callback(null, null);
                }
            });
        }
    };
    cnt.stm.typeMethod = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeMethod');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeMethod. Got: ' + callback);
        }
        u.genAccessorsAndExtra(model, ctx);
        var atype = u.extractTSSimpleType(model);
        // log 'typeMethod atype', atype
        ctx.write(model.wzName);
        ctx.write('(');
        u.genTSParams(model, ctx, cnt, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (atype) {
                if (!cnt.stm[atype.wzElement]) {
                    console.log('ts.module.gen.item.wzElement not managed', atype.wzElement);
                }
                ctx.write(': ');
                cnt.stm[atype.wzElement](atype, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    cnt.genItems(model.statements, ctx, function(err, notUsed) {
                        if (err) {
                            return callback(err);
                        }
                        ctx.w(';');
                        return callback(null, null);
                    });
                });
            }
            else {
                cnt.genItems(model.statements, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w(';');
                    return callback(null, null);
                });
            }
        });
    };
};
