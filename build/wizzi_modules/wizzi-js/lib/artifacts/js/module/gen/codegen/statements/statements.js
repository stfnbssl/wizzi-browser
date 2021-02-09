/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\statements.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var lineParser = require('../util/lineParser');

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.statements';
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
    cnt.stm.statement = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.statement');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.statement. Got: ' + callback);
        }
        // log 'wizzi-js.module.statements.statement', model.wzParent.wzElement, u.isTopStatement(model, ctx), model.wzName
        if (model.__templateChild) {
            ctx.write(verify.replaceAll(verify.replaceAll(model.wzName, '\\b', ' '), '\\n', '\n'));
            return callback(null, null);
        }
        else if (ctx.__inside_html == true && ctx.__jskind !== 'react') {
            var text = model.wzName.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push(" + ip.join() + ");");
        }
        else {
            if (u.isTopStatement(model, ctx)) {
                // 4/2/19 _ ctx.write(model.wzName)
                ctx.w(model.wzName);
            }
            else {
                ctx.write(model.wzName);
            }
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, callback);
    };
    cnt.stm.statementmultiline = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.statementmultiline');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.statementmultiline. Got: ' + callback);
        }
        if (ctx.__inside_html == true) {
            var text = model.wzName.trim();
            var ip = lineParser.parseInterpolation(text, model, ctx.__inside_handlebar, ctx.__inside_ng);
            ctx.w("__html.push('\\n' + " + ip.join() + ");");
        }
        else {
            ctx.w(model.wzName);
        }
        cnt.genItems(model.statements, ctx, {
            indent: true
        }, callback);
    };
    cnt.stm.require = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.require');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.require. Got: ' + callback);
        }
        var items = model.wzName.split(' ');
        var seenwizzi = false;
        var i, i_items=items, i_len=items.length, item;
        for (i=0; i<i_len; i++) {
            item = items[i];
            if (item === 'wizzi') {
                seenwizzi = true;
                ctx.w("var wizzi = require('wizzi');");
            }
            else if (item === 'log') {
                if (seenwizzi) {
                    ctx.w("var log = wizzi.log(module);");
                }
                else {
                    ctx.w("var log = require('wizzi').log(module);");
                }
            }
            else {
                ctx.w("var " + item + " = require('" + item + "');");
            }
        }
        return callback(null, null);
    };
    cnt.stm.ximport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.ximport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.ximport. Got: ' + callback);
        }
        if (ctx.__ecma === 'es5') {
            var nv = lineParser.parseNameValueRaw(model.wzName, model);
            if (nv.value()) {
                var nv2 = lineParser.parseNameValueRaw(nv.value());
                ctx.w("var " + nv.name() + " = require(" + nv2.value() + ");");
            }
            else {
                ctx.w("var " + nv.name() + " = require('" + nv.name() + "');");
            }
        }
        else {
            var name = model.wzName || '';
            if (model.xas) {
                if (name.length > 0) {
                    name += ', ';
                }
                name += '* as ' + model.xas;
            }
            ctx.write("import " + name);
            if (model.specifiers.length > 0) {
                if (name.length > 0) {
                    ctx.write(', ');
                }
                ctx.write('{');
                var i, i_items=model.specifiers, i_len=model.specifiers.length, item;
                for (i=0; i<i_len; i++) {
                    item = model.specifiers[i];
                    if (i > 0) {
                        ctx.write(', ');
                    }
                    ctx.write(item.wzName);
                    if (item.xas) {
                        ctx.write(' as ' + item.xas);
                    }
                }
                ctx.write('}');
                ctx.write(' from ' + model.from);
            }
            else {
                if (model.from && model.from.length > 0) {
                    if (name.trim().length > 0) {
                        ctx.write(' from');
                    }
                    ctx.write(' ' + model.from);
                }
            }
            ctx.w(u.semicolon(name));
        }
        return callback(null, null);
    };
    cnt.stm.typeImport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeImport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeImport. Got: ' + callback);
        }
        ctx.write('import ' + model.wzName);
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.w(u.semicolon(model.wzName));
            return callback(null, null);
        });
    };
    cnt.stm.typeRequire = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeRequire');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeRequire. Got: ' + callback);
        }
        ctx.write('require ' + model.wzName);
        cnt.genItems(model.statements, ctx, callback);
    };
    cnt.stm.exportDefault = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.exportDefault');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.exportDefault. Got: ' + callback);
        }
        if (ctx.__ecma === 'es5') {
            // log 'wizzi-codegen.js2.statements.ecma,jskind', ctx.__ecma, ctx.__jskind
            ctx.artifactGenerationError('export statement invalid in ecma 5', 'js/module', model);
            return callback(null, null);
        }
        if (hasStatements(model) == false) {
            ctx.w("export default " + model.wzName + u.semicolon(model.wzName));
            return callback(null, null);
        }
        else {
            ctx.write('export default ');
            return cnt.genItems(model.statements, ctx, {
                    indent: true
                }, callback);
        }
        if (model.__function) {
            cnt.stm.exportfunction(model, ctx, callback);
            return callback(null, null);
        }
        return callback(null, null);
    };
    cnt.stm.xexport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xexport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xexport. Got: ' + callback);
        }
        if (ctx.__ecma === 'es5') {
            // log 'wizzi-codegen.js2.statements.ecma,jskind', ctx.__ecma, ctx.__jskind
            ctx.artifactGenerationError('export statement invalid in ecma 5', 'js/module', model);
            return callback(null, null);
        }
        if (hasStatements(model) == false && !!model.from == false && model.specifiers.length == 0) {
            ctx.w("export " + model.wzName + u.semicolon(model.wzName));
            return callback(null, null);
        }
        if (model.__function) {
            cnt.stm.exportfunction(model, ctx, callback);
            return callback(null, null);
        }
        var name = model.wzName || '';
        ctx.write('export ' + name);
        // log 'js.module.xexport', name, model.from, model.statements.length, model.specifiers.length
        if (model.from) {
            exportSpecifiers(model, ctx, name);
            ctx.write(' from ' + model.from);
            ctx.w(u.semicolon(name));
            return callback(null, null);
        }
        else {
            if (model.statements.length > 0) {
                ctx.write(name.length > 0 ? ' ' : '');
                var indented = false;
                ctx.__inside_expr = true;
                cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    // log 1, model.statements.length
                    if (model.statements.length < 2) {
                        return callback(null, null);
                    }
                    // log 2
                    var len_1 = model.statements.length;
                    function repeater_1(index_1) {
                        if (index_1 === len_1) {
                            return next_1();
                        }
                        var item_1 = model.statements[index_1];
                        // log 3, item_1.wzElement
                        if (ctx.__needs_comma) {
                            ctx.write(',');
                            ctx.__needs_comma = false;
                        }
                        if (ctx.__needs_crlf) {
                            ctx.w();
                            ctx.__needs_crlf = false;
                        }
                        if (index_1 == 1) {
                            ctx.indent();
                            indented = true;
                        }
                        cnt.genItem(item_1, ctx, function(err, notUsed) {
                            if (err) {
                                return callback(err);
                            }
                            process.nextTick(function() {
                                repeater_1(index_1 + 1);
                            });
                        });
                    }
                    repeater_1(1);
                    function next_1() {
                        // _ ctx.w(';') // 11/1/19
                        // 28/3/19
                        ctx.w();
                        if (indented) {
                            ctx.deindent();
                        }
                        ctx.__needs_crlf = ctx.__needs_comma = ctx.__inside_expr = false;
                        return callback(null, null);
                    }
                });
            }
            else {
                exportSpecifiers(model, ctx, name);
                ctx.w(u.semicolon(name));
                return callback(null, null);
            }
        }
    };
    function exportSpecifiers(model, ctx, name) {
        if (model.specifiers.length > 0) {
            if (name.length > 0) {
                ctx.write(', ');
            }
            ctx.write('{');
            var i, i_items=model.specifiers, i_len=model.specifiers.length, item;
            for (i=0; i<i_len; i++) {
                item = model.specifiers[i];
                if (i > 0) {
                    ctx.write(', ');
                }
                ctx.write(item.wzName);
                if (item.xas) {
                    ctx.write(' as ' + item.xas);
                }
            }
            ctx.write('}');
        }
    }
    cnt.stm.typeExport = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeExport');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeExport. Got: ' + callback);
        }
        ctx.write('export = ');
        ctx.w(u.semicolon(model.wzName));
        return callback(null, null);
    };
    cnt.stm.typeExportNamespace = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.typeExportNamespace');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.typeExportNamespace. Got: ' + callback);
        }
        ctx.w('export as namespace ');
        ctx.w(u.semicolon(model.wzName));
        return callback(null, null);
    };
    cnt.stm.comment = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.comment');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.comment. Got: ' + callback);
        }
        if (hasStatements(model) == false) {
            if (ctx.__inside_comment) {
                ctx.w(model.wzName ? (' ' + model.wzName) : '');
            }
            else {
                ctx.w('//' + (model.wzName ? (' ' + model.wzName) : ''));
            }
            ctx.__needs_crlf = false;
            return callback(null, null);
        }
        // log 'ctx.__inside_comment', ctx.__inside_comment
        var enter_inside_comment = ctx.__inside_comment;
        if (!ctx.__inside_comment) {
            ctx.w('/**');
        }
        ctx.indent();
        if (model.wzName.length > 0) {
            ctx.w(model.wzName);
        }
        ctx.__inside_comment = true;
        cnt.genItems(model.statements, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.__inside_comment = enter_inside_comment;
            ctx.deindent();
            if (!enter_inside_comment) {
                ctx.w('*/');
            }
            ctx.__needs_crlf = false;
            return callback(null, null);
        });
    };
    cnt.stm.commentmultiline = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.commentmultiline');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.commentmultiline. Got: ' + callback);
        }
        ctx.w('/**');
        ctx.w(('    ' + model.wzName));
        ctx.w('*/');
        return callback(null, null);
    };
    cnt.stm.xdelete = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.xdelete');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.xdelete. Got: ' + callback);
        }
        ctx.w('delete ' + model.wzName);
        return callback(null, null);
    };
    cnt.stm.set = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.set');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.set. Got: ' + callback);
        }
        var text;
        // FIXME this hack require refactoring
        if (model.wzName === 'work.textSep = "__TS__"') {
            text = model.wzName;
        }
        else {
            text = node.inlinedTextToTextLines(model.wzName, {
                singleLine: true
            });
        }
        if (hasStatements(model) == false) {
            if (u.isDeclare(model)) {
                ctx.write(text);
            }
            else {
                ctx.write(text);
                if (u.isTopStatement(model, ctx)) {
                    ctx.w(u.semicolon(text));
                }
            }
            return callback(null, null);
        }
        if (model.statements[0].wzEntity === 'function') {
            ctx.w('');
        }
        if (model.statements.length == 2) {
            cnt.genItem(model.statements[0], ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.write(' ' + model.wzName + ' ');
                cnt.genItem(model.statements[1], ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    if (u.isTopStatement(model, ctx)) {
                        ctx.w(';');
                    }
                    return callback(null, null);
                });
            });
        }
        else {
            ctx.write(u.setOperator(text, model.statements));
            cnt.genItems(model.statements, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                if (u.isTopStatement(model, ctx)) {
                    ctx.w(';');
                }
                return callback(null, null);
            });
        }
    };
    cnt.stm.block = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.block');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.block. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, callback);
    };
    cnt.stm.sequence = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.sequence');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.sequence. Got: ' + callback);
        }
        cnt.genItems(model.statements, ctx, { sep: ',' }, callback);
    };
};
