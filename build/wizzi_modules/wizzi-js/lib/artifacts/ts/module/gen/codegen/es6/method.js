/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\es6\method.js.ittf
*/
'use strict';
var u = require('../../../../../js/module/gen/codegen/util/stm');
var statement = require('../statement');
var md = module.exports = {};
var myname = 'wizzi.js.artifacts.module.gen.codegen.es6.method';
md.gen = function(model, ctx, callback) {
    if (typeof callback === 'undefined') {
        throw new Error('Missing callback parameter in ' + myname + '.gen');
    }
    if (typeof callback !== 'function') {
        throw new Error('The callback parameter must be a function. In ' + myname + '.gen. Got: ' + callback);
    }
    var method = model.wzName;
    if (model.static) {
        ctx.write('static ');
    }
    if (model.async) {
        ctx.write('async ');
    }
    u.genAccessorsAndExtra(model, ctx);
    ctx.write(method);
    u.genTSTypeParameters(model, ctx, statement, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.write('(');
        u.genTSParams(model, ctx, statement, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(')');
            if (model.typeReturn) {
                ctx.write(': ');
                statement.stm.typeReturn(model.typeReturn, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    method_step_1(model, ctx, callback);
                });
            }
            else {
                method_step_1(model, ctx, callback);
            }
        });
    });
};
function method_step_1(model, ctx, callback) {
    ctx.w(' {');
    ctx.indent();
    statement.genMany(model.statements, ctx, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w('}');
        return callback(null, null);
    });
}
