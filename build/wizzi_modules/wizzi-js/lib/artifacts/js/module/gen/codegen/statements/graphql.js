/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\graphql.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.graphql';
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
    cnt.stm.graphqlQuery = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.graphqlQuery');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.graphqlQuery. Got: ' + callback);
        }
        ctx.isGraphql = true;
        if (u.isArgumentOfCall(model)) {
            ctx.w("`");
            ctx.w("{");
            cnt.genItems(model.statements, ctx, {
                indent: true
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w("");
                ctx.w("}");
                ctx.write("`");
                ctx.isGraphql = false;
                return callback(null, null);
            });
        }
        else {
            ctx.w("graphql`");
            ctx.indent();
            ctx.w("query " + (model.wzName || "") + " {");
            cnt.genItems(model.statements, ctx, {
                indent: true
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w("}");
                ctx.deindent();
                ctx.w("`");
                ctx.isGraphql = false;
                return callback(null, null);
            });
        }
    };
    cnt.stm.graphqlMutation = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.graphqlMutation');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.graphqlMutation. Got: ' + callback);
        }
        ctx.isGraphql = true;
        ctx.w("graphql`");
        ctx.indent();
        ctx.w("mutation " + (model.wzName || "") + " {").cnt.genItems(model.statements, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w("}");
            ctx.deindent();
            ctx.w("`");
            ctx.isGraphql = false;
            return callback(null, null);
        })
    };
    cnt.stm.namedCallParam = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.namedCallParam');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.namedCallParam. Got: ' + callback);
        }
        ctx.isNamedCallParam = true;
        if (model.statements.length > 0) {
            ctx.write( model.wzName + ': ');
            cnt.genItems(model.statements, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.isNamedCallParam = false;
                return callback(null, null);
            });
        }
        else {
            var p = lineParser.parseNameValueRaw(model.wzName, model);
            ctx.write(p.name() + ': ');
            ctx.write(p.value());
            ctx.isNamedCallParam = false;
            return callback(null, null);
        }
    };
};
