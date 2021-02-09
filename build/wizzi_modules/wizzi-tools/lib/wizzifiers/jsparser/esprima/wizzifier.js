var util = require('util');
var verify = require('wizzi-utils').verify;
var file = require('wizzi-utils').file;
var parser = require('esprima');
var ittfwriter = require("../../../util/ittfwriter");
//STOPPED var validator = require("./validator");

var emitBlock = false;
var verbose = false;

function inspect(obj, depth) {
    return util.inspect(obj, { depth: depth || 2 });
}

function log(label, obj, force) {
    if (verbose || force) console.log(label, util.inspect(obj, { depth: 2 }));
}

function showstack(options) {
    /*
    var i = 0, d;
    while (options.stack.length > 0) {
        d = i < 3 ? 4 : 2;
        var ast = options.stack.pop();
        console.log('stack', util.inspect(ast, { depth: d }));
        i++;
        if (i > 4) break;
    }
    */
    // console.log('formatTextNodes', util.inspect(options.formatTextNodes, { depth: 1 }));
}

var format = function (parent, ast, options) {
    if (!ast) throw new Error('no ast parent is: ' + util.inspect(parent, { depth: 2 }));
    if (parent === null) {
        if (options.starter) { options.starter = false; }
        else if (options.returnText) {; }
        else { showstack(options); throw new Error('parent is null.' + inspect(ast, 4)); }
    }
    var formatter = format[ast.type];
    if (verbose) console.log('ast.type', ast.type);
    if (formatter) {
        options.stack.push(ast);
        result = formatter(parent, ast, options);
        options.stack.pop();
        return result;
    }
    throw new Error('no formatter for type: ' + ast.type);
};

var formatNameOrChilds = function (parent, ast, sep, options) {
    var dummy = createWizziNode('Dummy', 'dummy');
    var value = format(dummy, ast, options);
    if (typeof value === 'string')
        parent.name += (sep + value);
    else {
        var t = textify(dummy.children);
        if (t.result) {
            parent.name += (sep + t.text);
        } else {
            appendChilds(parent, dummy.children);
        }
    }
}

var formatAppend = function (parent, ast, options) {
    var value = format(parent, ast, options);
    if (typeof value === 'string') {
        var node = createWizziNode(ast.type, 'set', value);
        parent.children.push(node);
    }
}

var formatText = function (parent, ast, options, node) {
    var saveReturnText = options.returnText;
    options.returnText = true;
    if (node) { options.formatTextNodes.push(node); }
    var value = format(parent, ast, options);
    if (node) { options.formatTextNodes.pop(); }
    options.returnText = saveReturnText;
    return value;
}

format.Program = function (parent, node, options) {
    log('Program.node', node)
    var ret = createWizziNode('Program', 'module');
    ret.children.push({ tag: 'kind', name: 'jsfile', children: [] });
    var value;
    node.body.map(function (statement) {
        value = format(ret, statement, options);
        if (typeof value === 'string') {
            var node = createWizziNode('Program', 'set', value);
            ret.children.push(node);
        }
    });
    return ret;
};

format.Identifier = function (parent, node, options) {
    log('Identifier.ast', node)
    return node.name;
};

format.Literal = function (parent, node, options) {
    log('Literal.ast', node)
    return node.raw;
};

format.VariableDeclaration = function (parent, node, options) {
    log('VariableDeclaration.ast', node);

    if (options.returnText) {
        var dummy = createWizziNode('Dummy', 'dummy', 'var ');
        var first = true;
        var saveAppendToParent = options.appendToParent;
        options.appendToParent = true;
        node.declarations.map(function (declaration) {
            if (!first) dummy.name += ', ';
            first = false;
            format(dummy, declaration, options);
        });
        options.appendToParent = saveAppendToParent;
        log('VariableDeclaration.returnText.dummy', dummy);
        return dummy.name;
    }

    var ret = createWizziNode('VariableDeclaration', 'var');
    parent.children.push(ret);
    if (node.declarations.length == 1) {
        var saveAppendToParent = options.appendToParent;
        options.appendToParent = true;
        format(ret, node.declarations[0], options);
        options.appendToParent = saveAppendToParent;
    } else {
        var saveAppendToParent = options.appendToParent;
        options.appendToParent = false;
        node.declarations.map(function (declaration) {
            format(ret, declaration, options);
        });
        options.appendToParent = saveAppendToParent;
    }
};

format.VariableDeclarator = function (parent, node, options) {
    log('VariableDeclarator.ast', node);

    if (options.appendToParent) {
        parent.name += formatText(null, node.id, options, node);
        if (!node.init) {
            return;
        }
        formatNameOrChilds(parent, node.init, ' = ', options);
    } else {
        log('VariableDeclarator.ast', node, true);
        var ret = createWizziNode('VariableDeclarator', 'decl', formatText(null, node.id, options, node))
        parent.children.push(ret);
        ret.name = formatText(null, node.id, options, node);
        if (!node.init) {
            return;
        }
        formatNameOrChilds(ret, node.init, ' = ', options);
        log('VariableDeclarator.ret', ret, true);
    }
};

format.FunctionDeclaration = function (parent, node, options) {
    log('FunctionDeclaration.ast', node)
    var aster = node.generator ? '*' : '';
    var ret = createWizziNode('FunctionDeclaration', 'function' + aster, node.id ? formatText(null, node.id, options, node) : '');
    parent.children.push(ret);
    node.params.map(function (param) {
        ret.children.push({
            tag: 'param',
            name: formatText(null, param, options, node),
            children: []
        });
    });
    format(ret, node.body, options);
};

/*
 STATEMENTS
*/

format.EmptyStatement = function (parent, node, options) {
    if (options.returnText)
        return ';';
    else {
        var ret = createWizziNode('EmptyStatement', '+', ';');
        parent.children.push(ret);
    }
};

format.ExpressionStatement = function (parent, node, options) {
    log('ExpressionStatement.ast', node)
    if (options.returnText) {
        return formatText(null, node.expression, options, node);
    }
    var dummy = createWizziNode('Dummy', 'dummy');
    var value = format(dummy, node.expression, options);
    log('ExpressionStatement.dummy', dummy.children[0]);
    if (typeof value === 'string')
        return value;
    else {
        parent.children.push(dummy.children[0]);
    }
};

format.BlockStatement = function (parent, node, options) {
    log('Block.ast', node)
    if (options.returnText) {
        var text = [];
        text.push('{ ');
        node.body.map(function (statement) {
            text.push(formatText(null, statement, options, node));
            text.push('; ');
        });
        text.push(' }');
        return text.join('');
    } else {
        // log('Block.emitBlock', emitBlock, true);
        var ret = parent;
        if (emitBlock) {
            var tag = options.noblock ? '$group' : 'block';
            ret = createWizziNode('BlockStatement', tag);
            parent.children.push(ret);
        }
        var value;
        node.body.map(function (statement) {
            value = format(ret, statement, options);
            if (typeof value === 'string') {
                var node = createWizziNode('BlockStatement', 'set', value);
                ret.children.push(node);
            }
        });
    }
};

format.IfStatement = function (parent, node, options) {
    log('IfStatement.node', node);
    if (!parent) {
        return ('error IfStatement - textFormat not managed ' + inspect(node, 10));
    }
    var ret = createWizziNode('IfStatement', '$group');
    parent.children.push(ret);

    var nif, test, testOk = true;
    // try formatText
    try {
        test = formatText(null, node.test, options, node);
    } catch (ex) {
        testOk = false;
    }

    if (testOk) {
        if (!test) log('IfStatement.options', options, true);
        nif = createWizziNode('IfStatement', 'if', test);
        ret.children.push(nif);
    } else {
        nif = createWizziNode('IfStatement', 'if');
        ret.children.push(nif);
        test = createWizziNode('IfStatement', 'test');
        nif.children.push(test);
        format(test, node.test, options);

    }

    formatAppend(nif, node.consequent, options);
    if (node.alternate) {
        if (node.alternate.type === 'IfStatement') {
            var nelif, alternate = node.alternate;
            while (alternate) {
                nelif = createWizziNode('IfStatement', 'elif', formatText(null, alternate.test, options, alternate));
                ret.children.push(nelif);
                formatAppend(nelif, alternate.consequent, options);
                if (alternate.alternate) {
                    if (alternate.alternate.type === 'IfStatement') {
                        alternate = alternate.alternate;
                    } else {
                        nelif = createWizziNode('IfStatement', 'else');
                        ret.children.push(nelif);
                        formatAppend(nelif, alternate.alternate, options);
                        alternate = null;
                    }
                }
                else
                    alternate = null;
            }
        }
        else {
            var nelse = createWizziNode('IfStatement', 'else');
            ret.children.push(nelse);
            formatAppend(nelse, node.alternate, options);
        }
    }
};

format.ForStatement = function (parent, node, options) {
    log('ForStatement.node', node);
    if (options.returnText) {
        var sb = [];
        sb.push('for (');
        sb.push((node.init ? formatText(null, node.init, options, node) : '') + '; ' +
            (node.test ? formatText(null, node.test, options, node) : '') + '; ' +
            (node.update ? formatText(null, node.update, options, node) : ''));
        sb.push(') {');
        sb.push(formatText(null, node.body, options));
        sb.push('}');
        return sb.join();
    } else {
        var ret = createWizziNode('ForStatement', 'for',
            (node.init ? formatText(null, node.init, options, node) : '') + '; ' +
            (node.test ? formatText(null, node.test, options, node) : '') + '; ' +
            (node.update ? formatText(null, node.update, options, node) : '')
        );
        parent.children.push(ret);
        formatAppend(ret, node.body, options);
    }
};

format.ForInStatement = function (parent, node, options) {
    log('ForInStatement.node', node);
    var ret = createWizziNode('ForInStatement', 'for',
        formatText(null, node.left, options, node) + ' in ' + formatText(null, node.right, options, node)
    );
    parent.children.push(ret);
    formatAppend(ret, node.body, options);
    // log('ForInStatement.ret', ret, true);
};

format.WhileStatement = function (parent, node, options) {
    log('WhileStatement.node', node);
    var ret = createWizziNode('WhileStatement', 'while', formatText(null, node.test, options, node));
    parent.children.push(ret);
    formatAppend(ret, node.body, options);
};

format.DoWhileStatement = function (parent, node, options) {
    log('DoWhileStatement.node', node);
    var ret = createWizziNode('DoWhileStatement', 'do', formatText(null, node.test, options, node));
    parent.children.push(ret);
    formatAppend(ret, node.body, options);
};

format.SwitchStatement = function (parent, node, options) {
    log('SwitchStatement.node', node);
    var ret = createWizziNode('SwitchStatement', 'switch', formatText(null, node.discriminant, options, node));
    parent.children.push(ret);

    var value;
    node.cases.map(function (statement) {
        formatAppend(ret, statement, options);
    });

};

format.SwitchCase = function (parent, node, options) {
    log('SwitchCase.node', node);
    var ret;
    if (node.test == null) {
        ret = createWizziNode('SwitchCase', 'default', node.test ? formatText(null, node.test, options, node) : '');
    } else {
        ret = createWizziNode('SwitchCase', 'case', node.test ? formatText(null, node.test, options, node) : '');
    }
    parent.children.push(ret);
    if (verify.isArray(node.consequent)) {
        node.consequent.map(function (statement) {
            formatAppend(ret, statement, options);
        });
    } else {
        formatAppend(ret, node.consequent, options);
    }
};

format.DefaultClause = function (parent, node, options) {
    log('DefaultClause.node', node);
    var ret = createWizziNode('DefaultClause', 'default');
    parent.children.push(ret);
    if (verify.isArray(node.consequent)) {
        node.consequent.map(function (statement) {
            formatAppend(ret, statement, options);
        });
    } else {
        formatAppend(ret, node.consequent, options);
    }
};

format.BreakStatement = function (parent, node, options) {
    var label = node.label ? formatText(null, node.label, options, node) : '';
    var ret = createWizziNode('BreakStatement', 'break', label);
    parent.children.push(ret);
};

format.ContinueStatement = function (parent, node, options) {
    var label = node.label ? formatText(null, node.label, options, node) : '';
    var ret = createWizziNode('ContinueStatement', 'continue', label);
    parent.children.push(ret);
};

format.ReturnStatement = function (parent, node, options) {
    log('ReturnStatement.ast', node)
    if (options.returnText) {
        return formatText(null, node.argument, options, node);
    } else {
        var ret = createWizziNode('ReturnStatement', 'return');
        parent.children.push(ret);
        if (node.argument != null) {
            formatNameOrChilds(ret, node.argument, '', options);
        }
    }
};

format.LabeledStatement = function (parent, node, options) {
    log('LabeledStatement.node', node);
    var label = formatText(null, node.label, options, node);
    log('LabeledStatement.label', label);
    var ret = createWizziNode('LabeledStatement', 'label', label);
    parent.children.push(ret);
    formatAppend(ret, node.body, options);
};

format.TryStatement = function (parent, node, options) {
    log('TryStatement.ast', node)
    if (options.returnText) {
        var sb = []
        sb.push(' try { ');
        sb.push(formatText(null, node.block, options));
        sb.push(' } ');
        if (node['handler']) {
            sb.push(formatText(null, node['handler'], options));
        }
        if (node['finalizer']) {
            sb.push(formatText(fin, node['finalizer'], options));
        }
        return sb.join();
    } else {
        var ret = createWizziNode('TryStatement', '$group');
        parent.children.push(ret);
        var ntry = createWizziNode('TryStatement', 'try');
        ret.children.push(ntry);

        //var saveNoblock = options.noblock;
        //options.noblock = true;
        formatAppend(ntry, node.block, options);
        //options.noblock = saveNoblock;

        if (node['handler']) {
            formatAppend(ret, node['handler'], options);
        }
        if (node['finalizer']) {
            var fin = createWizziNode('TryStatement', 'finally');
            ret.children.push(fin);
            formatAppend(fin, node['finalizer'], options);
        }
    }
};

format.CatchClause = function (parent, node, options) {
    log('Catch.ast', node)
    if (options.returnText) {
        var sb = []
        sb.push(' catch( ');
        sb.push(formatText(null, node.param, options));
        sb.push(' ) {');
        sb.push(formatText(null, node.body, options));
        sb.push(' } ');
        return sb.join();
    } else {
        var ret = createWizziNode('CatchClause', 'catch', formatText(null, node.param, options, node));
        parent.children.push(ret);
        // body
        //var saveNoblock = options.noblock;
        //options.noblock = true;
        formatAppend(ret, node.body, options);
        //options.noblock = saveNoblock;
    }
};

format.Finally = function (parent, node, options) {
    log('Finally.ast', node)
    if (options.returnText) {
        var sb = []
        sb.push(' finally { ');
        sb.push(formatText(null, node.block, options));
        sb.push(' } ');
        return sb.join();
    } else {
        var ret = createWizziNode('Finally', 'finally');
        parent.children.push(ret);
        // body
        //var saveNoblock = options.noblock;
        //options.noblock = true;
        formatAppend(ret, node.block, options);
        //options.noblock = saveNoblock;
    }
};

format.ThrowStatement = function (parent, node, options) {
    var ret = createWizziNode('ThrowStatement', 'throw');
    parent.children.push(ret);
    formatNameOrChilds(ret, node.argument, '', options);
};

/*
 EXPRESSIONS
*/

format.UnaryExpression = function (parent, node, options) {
    log('UnaryExpression.ast', node);
    if (node.operator === '!') {
        if (options.returnText) {
            return node.operator + ' (' + formatText(null, node.argument, options, node) + ')';
        } else {
            var ret = createWizziNode('Not', '!');
            parent.children.push(ret);
            format(ret, node.argument, options);
            return ret;
        }
    }
    else if (node.operator === 'void') {
        if (options.returnText) {
            return node.operator + ' (' + formatText(null, node.argument, options, node) + ')';
        } else {
            var ret = createWizziNode('Void', 'void');
            parent.children.push(ret);
            format(ret, node.argument, options);
            return ret;
        }
    }
    else if (node.prefix) {
        var iife = node.argument.type === 'CallExpression' && node.argument.callee.type === 'FunctionExpression';
        iife = iife || node.argument.type === 'CallExpression' && node.argument.callee.type === 'MemberExpression' && node.argument.callee.object.type === 'FunctionExpression';
        if (iife) {
            if (parent === null) {
                showstack(options);
                throw new Error('UnaryExpression + iife called inside a format text. Not managed.');
            }
            log('UnaryExpression.options', options);
            var saveUnaryIife = options.unaryIife;
            options.unaryIife = true;
            options.unaryIifeOperator = node.operator;
            format(parent, node.argument, options);
            options.unaryIife = saveUnaryIife;
        } else {
            return node.operator + ' (' + formatText(null, node.argument, options, node) + ')';
        }
    }
    else
        return '(' + formatText(null, node.argument, options, node) + ')' + node.operator;
};

format.BinaryExpression = function (parent, node, options) {
    log('BinaryExpression.ast', node)
    try {
        var left = formatText(null, node.left, options, node);
        var right = formatText(null, node.right, options, node);
        // log('BinaryExpression.makeBinary', makeBinary(left, right, node.operator, node.left, node.right), true);
        return makeBinary(left, right, node.operator, node.left, node.right);
    } catch (ex) {
        log('BinaryExpression.failed formatText, message ' + ex.message + '\n' + ex.stack + '\n. continue ...', node, true);
        options.returnText = false; // reset
    }
    var dummyLeft = createWizziNode('Dummy', 'dummy');
    var left = format(dummyLeft, node.left, options);
    var dummyRight = createWizziNode('Dummy', 'dummy');
    var right = format(dummyRight, node.right, options);
    if (typeof left === 'string' && typeof right === 'string') {
        var po1 = getOpenParen(node.operator, node.left, node.right);
        var pc1 = getCloseParen(node.operator, node.left, node.right);
        var poL = getOpenParen('', node.left, '');
        var pcL = getCloseParen('', node.left, '');
        var poR = getOpenParen('', '', node.right);
        var pcR = getCloseParen('', '', node.right);
        return po1 + poL + left + pcL + ' ' + node.operator + ' ' + poR + right + pcR + pc1;
    } else {
        if (options.returnText) {
            showstack(options);
            throw new Error('BinaryExpression returnText not managed\n' + inspect(node, null));
        }
        var ret = createWizziNode('BinaryExpression', 'op' + node.operator);
        parent.children.push(ret);
        if (typeof left === 'string') {
            var v = createWizziNode('LogicalExpression', 'set', left);
            ret.children[0] = v;
        } else {
            log('BinaryExpression.dummyLeft', dummyLeft.children[0]);
            ret.children[0] = dummyLeft.children[0];
        }
        if (typeof right === 'string') {
            var v = createWizziNode('LogicalExpression', 'set', right);
            ret.children[1] = v;
        } else {
            ret.children[1] = dummyRight.children[0];
        }
    }
};

format.UpdateExpression = function (parent, node, options) {
    log('UpdateExpression.ast', node)
    if (node.prefix)
        return node.operator + formatText(null, node.argument, options, node);
    else
        return formatText(null, node.argument, options, node) + node.operator;
};

format.ConditionalExpression = function (parent, node, options) {
    var paren = ['AssignmentExpression'].indexOf(node.test.type) > -1;
    var dummyTest = createWizziNode('Dummy', 'dummy');
    var test = formatText(dummyTest, node.test, options, node);

    test = paren ? '(' + test + ')' : test;

    var dummyCons = createWizziNode('Dummy', 'dummy');
    var cons = format(dummyCons, node.consequent, options);
    var dummyAlt = createWizziNode('Dummy', 'dummy');
    var alt = format(dummyAlt, node.alternate, options);
    // console.log('ConditionalExpression', test, cons, alt);
    if (typeof cons === 'string' && typeof alt === 'string') {
        return test + ' ? ' + cons + ' : ' + alt;
    }
    var ret = createWizziNode('ConditionalExpression', 'iif', test);
    var rcons = createWizziNode('ConditionalExpression', 'then');
    var ralt = createWizziNode('ConditionalExpression', 'else');
    parent.children.push(ret);
    ret.children.push(rcons);
    ret.children.push(ralt);

    if (typeof cons === 'string') {
        rcons.name = cons;
    } else {
        appendChilds(rcons, dummyCons.children);
    }
    if (typeof alt === 'string') {
        ralt.name = alt;
    } else {
        appendChilds(ralt, dummyAlt.children);
    }
};

format.FunctionExpression = function (parent, node, options) {
    log('Function.ast', node)
    var aster = node.generator ? '*' : '';
    var id = node.id ? formatText(null, node.id, options, node) : '';
    if (options.returnText) {
        var text = [];
        text.push('function' + aster + ' ' + id + '(');
        var first = true;
        node.params.map(function (param) {
            if (!first) text.push(', ');
            text.push(formatText(null, param, options, node));
            first = false;
        });
        text.push(')');
        text.push(formatText(null, node.body, options, node));
        return text.join('');
    } else {
        var ret = createWizziNode('FunctionExpression', 'function' + aster, id);
        parent.children.push(ret);
        node.params.map(function (param) {
            ret.children.push(createWizziNode('FunctionExpression', 'param', formatText(null, param, options, node)));
        });
        formatAppend(ret, node.body, options);
    }
};

format.CallExpression = function (parent, node, options) {
    if (!options.stack) throw new Error("CallExpression.options.stack\n" + inspect(node, null));
    log('CallExpression.ast', node);
    log('CallExpression.node.callee.type', node.callee.type);
    if (options.returnText && options.unaryIife !== true) {
        try {
            var text = formatText(null, node.callee, options, node);
            if (['LogicalExpression', 'ConditionalExpression'].indexOf(node.callee.type) >= 0) {
                text = '(' + text + ')';
            }
            return text + addArguments(null, node.arguments, '(', ')', options);
        } catch (ex) {
            showstack(options);
            throw new Error('CallExpression returnText not managed\n' + inspect(node, null));
        }
    }
    var ret;
    if (node.callee.type === 'FunctionExpression') { // iife

        ret = createWizziNode('CallExpression', 'iife', '');
        parent.children.push(ret);
        if (options.unaryIife) {
            options.unaryIife = false; // only once
            var uprefix = createWizziNode('CallExpression', 'unary-prefix', options.unaryIifeOperator);
            ret.children.push(uprefix);
        }
        formatAppend(ret, node.callee, options); // ???
        addArguments(ret, node.arguments, '(', ')', options);
    } else if (node.callee.type === 'Identifier') {
        ret = createWizziNode('CallExpression', '_', formatText(null, node.callee, options, node));
        parent.children.push(ret);
        log('CallExpression.arguments', node.arguments);
        addArguments(ret, node.arguments, '(', ')', options);
    } else if (node.callee.type === 'MemberExpression' && node.callee.object.type === 'FunctionExpression') {
        ret = createWizziNode('CallExpression', 'iife', '');
        parent.children.push(ret);
        if (options.unaryIife) {
            options.unaryIife = false; // only once
            var uprefix = createWizziNode('CallExpression', 'unary-prefix', options.unaryIifeOperator);
            ret.children.push(uprefix);
        }
        formatAppend(ret, node.callee.object, options); // ???
        var call = createWizziNode('CallExpression', '._', formatText(null, node.callee.property, options, node));
        ret.children.push(call);
        addArguments(call, node.arguments, '(', ')', options);
    } else if (node.callee.type === 'MemberExpression') {
        var dummy = createWizziNode('Dummy', 'dummy');
        var value = format(dummy, node.callee.object, options);
        if (typeof value === 'string') {
            if (['UpdateExpression', 'BinaryExpression', 'UnaryExpression', 'ConditionalExpression', 'AssignmentExpression'].indexOf(node.callee.object.type) > -1) {
                value = '(' + value + ')';
            }
            if (node.callee.computed) {
                ret = createWizziNode('CallExpression', CallExprTag(parent), value + '[' + formatText(null, node.callee.property, options, node) + ']');
                if (options.returnText) {
                    ret.name += addArguments(null, node.arguments, '(', ')', options);
                    return ret.name;
                } else {
                    addArguments(ret, node.arguments, '(', ')', options);
                    parent.children.push(ret);
                }
                return;
            } else {
                ret = createWizziNode('CallExpression', CallExprTag(parent), value + '.' + formatText(null, node.callee.property, options, node));
                if (options.returnText) {
                    ret.name += addArguments(null, node.arguments, '(', ')', options);
                    return ret.name;
                } else {
                    addArguments(ret, node.arguments, '(', ')', options);
                    parent.children.push(ret);
                }
                return;
            }
            // throw new Error('CallExpression node.object as string not managed.\n' + inspect(node.callee.object, null));
        }
        var value = dummy.children[0];
        // log('CallExpression.MemberExpression.node.callee.object(formatted)', value, true);
        if (value.children.length === 0 && value.tag === 'set') {
            value.tag = '_';
            if (node.callee.computed) {
                value.name += '[' + formatText(null, node.callee.property, options, node) + ']';
            } else {
                value.name += '.' + formatText(null, node.callee.property, options, node);
            }
            addArguments(value, node.arguments, '(', ')', options);
        } else {
            var lastchild = value;
            //log('CallExpression.MemberExpression.lastchild at 0', lastchild, true);
            if (lastchild.children.length > 0) {
                //log('CallExpression.MemberExpression.lastchild.children.length at 0', lastchild.children.length, true);
                //log('CallExpression.MemberExpression.lastchild.lastchild.isArg at 0', lastchild.children[lastchild.children.length - 1].isArg, true);
                //log('CallExpression.MemberExpression.lastchild.lastchild. _ ._ indexOf(tag)', ['_', '._'].indexOf(lastchild.children[lastchild.children.length - 1].tag), true);
            }
            while (lastchild.children.length > 0 &&
                   !(lastchild.children[lastchild.children.length - 1].isArg === true) &&
                   ['_', '._'].indexOf(lastchild.children[lastchild.children.length - 1].tag) > -1) {
                lastchild = lastchild.children[lastchild.children.length - 1];
                //log('CallExpression.MemberExpression.lastchild at n', lastchild, true);
            }
            //log('CallExpression.MemberExpression.lastchild final', lastchild, true);
            if (node.callee.computed) {
                ret = createWizziNode('CallExpression', '.[');
                lastchild.children.push(ret);
                var ndx = createWizziNode('CallExpression', '@', formatText(null, node.callee.property, options, node));
                ret.children.push(ndx);
                var args = createWizziNode('CallExpression', '(');
                ret.children.push(args);
                var saveOnlyChilds = options.onlyChilds;
                options.onlyChilds = true;
                addArguments(args, node.arguments, '', '', options);
                options.onlyChilds = saveOnlyChilds;
            } else {
                ret = createWizziNode('CallExpression', '._', formatText(null, node.callee.property, options, node));
                lastchild.children.push(ret);
                addArguments(ret, node.arguments, '(', ')', options);
            }
        }
        parent.children.push(value);
    } else if (node.callee.type === 'CallExpression') {
        var dummy = createWizziNode('Dummy', 'dummy');
        var value = format(dummy, node.callee, options);
        log('CallExpression.CallExpression.dummy.children[0]', dummy.children[0]);
        if (typeof value === 'string') {
            var saveReturnText = options.returnText;
            options.returnText = true;
            value += addArguments(ret, node.arguments, '(', ')', options);
            options.returnText = saveReturnText;
            return value;
        } else {
            value = dummy.children[0];
            var lastchild = value;
            while (lastchild.children.length > 0 &&
                   !(lastchild.children[lastchild.children.length - 1].isArg === true) &&
                   ['_', '._'].indexOf(lastchild.children[lastchild.children.length - 1].tag) > -1) {
                lastchild = lastchild.children[lastchild.children.length - 1];
            }
            if (options.returnText) {
                showstack(options);
                throw new Error('CallExpression.CallExpression returnText not managed\n' + inspect(node, null));
            }
            parent.children.push(value);
            var args = createWizziNode('CallExpression', '(');
            lastchild.children.push(args);

            var saveOnlyChilds = options.onlyChilds;
            options.onlyChilds = true;
            addArguments(args, node.arguments, '', '', options);
            options.onlyChilds = saveOnlyChilds;
        }
    } else if (node.callee.type === 'LogicalExpression' ||
               node.callee.type === 'ConditionalExpression') {
        // try formatText
        if (options.returnText) {
            showstack(options);
            throw new Error('CallExpression.' + node.callee.type + ' returnText not managed\n' + inspect(node, null));
        }
        var value = formatText(null, node.callee, options, node);
        ret = createWizziNode('CallExpression', '_', '(' + value + ')');
        parent.children.push(ret);
        addArguments(ret, node.arguments, '(', ')', options);
    } else if (node.callee.type === 'Super') {
        node.arguments.map(function (arg) {
            ret = createWizziNode('CallExpression', 'base', '');
            parent.children.push(ret);
            formatNameOrChilds(ret, arg, '', options);
        });
    } else if (node.callee.type === 'NewExpression') {
        // TODO not sure it is so
        if (options.returnText) {
            return formatText(null, node.callee, options, node);
        } else {
            throw new Error('CallExpression. node.callee.type: NewExpression, not options.returnText not managed\n' + inspect(node, null));
        }
    } else if (node.callee.type === 'AssignmentExpression') {
        // TODO not sure it is so
        if (options.returnText) {
            return formatText(null, node.callee, options, node);
        } else {
            var ret = createWizziNode('AssignmentExpression', 'op' + node.operator);
            parent.children.push(ret);
            // TODO
        }
    } else {
        throw new Error('CallExpression.callee.type not managed: ' + inspect(node, null));
    }
};

function CallExprTag(parent) {
    return parent && ['MemberExpression'].indexOf(parent.src) > -1 ? '._' : '_';
}

format.ObjectPattern = function (parent, node, options) {
    log('ObjectPattern.ast', node, true);
    options.__is_ObjectPattern = true;
    if (options.returnText) {
        var retText = '{';
        var first = true;
        node.properties.map(function (property) {
            if (!first) retText += ', ';
            retText += formatText(null, property, options, node);
            first = false;
        });
        options.__is_ObjectPattern = false;
        return retText + '}';
    } else {
        var ret = createWizziNode('ObjectPattern', '{');
        parent.children.push(ret);
        node.properties.map(function (property) {
            format(ret, property, options);
        });
        options.__is_ObjectPattern = false;
    }
}

format.ObjectExpression = function (parent, node, options) {
    log('ObjectExpression.ast', node)
    if (options.returnText) {
        var retText = '{';
        var first = true;
        node.properties.map(function (property) {
            if (!first) retText += ', ';
            retText += formatText(null, property, options, node);
            first = false;
        });
        return retText + '}';
    } else {
        var ret = createWizziNode('ObjectExpression', '{');
        parent.children.push(ret);
        node.properties.map(function (property) {
            format(ret, property, options);
        });
    }
};

format.Property = function (parent, node, options) {
    log('Property.ast', node)
    var bL = node.computed ? '[' : '';
    var bR = node.computed ? ']' : '';
    //if (node.computed) {
    //    throw new Error('Not implemented. Property computed: ' + inspect(node, null));
    //}
    if (node.kind !== 'init' && node.kind !== 'get' && node.kind !== 'set') {
        throw new Error('Not implemented. Property kind: ' + inspect(node, null));
    }
    if (options.returnText) {
        var sb = [];
        var key = formatText(null, node.key, options, node);
        var value = formatText(null, node.value, options, node);
        if (node.kind === 'get') {
            sb.push('get ' + key + '{' + value + '}')
        }
        else if (node.kind === 'set') {
            sb.push('set ' + key + '{' + value + '}')
        } else {
            if (options.__is_ObjectPattern && key === value) {
                sb.push(key);
            } else {
                sb.push(bL + key + bR + ': ' + value);
            }
        }
        return sb.join();
    } else {
        if (node.kind === 'get' || node.kind === 'set') {
            var ret = createWizziNode('Property', 'get', formatText(null, node.key, options, node));
            parent.children.push(ret);
            formatNameOrChilds(ret, node.value, ' ', options);
        }
        else {
            var ret = createWizziNode('Property', '@', bL + formatText(null, node.key, options, node) + bR);
            parent.children.push(ret);
            formatNameOrChilds(ret, node.value, ' ', options);
        }
    }
};

format.ArrayExpression = function (parent, node, options) {
    log('ArrayExpression.ast', node)
    if (options.returnText) {
        return '[' + addArguments(null, node.elements, '', '', options) + ']';
    }
    var ret = createWizziNode('ArrayExpression', '[');
    parent.children.push(ret);
    var saveOnlyChilds = options.onlyChilds;
    options.onlyChilds = true;
    addArguments(ret, node.elements, '', '', options);
    options.onlyChilds = saveOnlyChilds;
};

format.AssignmentExpression = function (parent, node, options) {
    log('AssignmentExpression.ast', node)
    // TODO we need a criteria to force an AssignmentExpression inline
    if (['FunctionExpression', 'ObjectExpression'].indexOf(node.right.type) < 0) {
        try {
            var left = formatText(null, node.left, options, node);
            var right = formatText(null, node.right, options, node);
            // log('BinaryExpression.makeBinary', makeBinary(left, right, node.operator, node.left, node.right), true);
            return left + ' ' + node.operator + ' ' + right;
        } catch (ex) {
            log('AssignmentExpression.failed formatText, message ' + ex.message + '\n' + '\n. continue ...', node, true);
            options.returnText = false; // reset
        }
    }
    var dummyLeft = createWizziNode('Dummy', 'dummy');
    var left = formatText(dummyLeft, node.left, options, node);
    var dummyRight = createWizziNode('Dummy', 'dummy');
    var right = format(dummyRight, node.right, options, node);
    /*
    log('AssignmentExpression.right', right, true)
    log('AssignmentExpression.typeof right', typeof right, true)
    log('AssignmentExpression.left', left, true)
    log('AssignmentExpression.typeof left', typeof left, true)
    */
    if (typeof left === 'string' && typeof right === 'string') {
        return left + ' ' + node.operator + ' ' + right;
        /* TODO
        if (options.returnText) {
            return left + ' ' + node.operator + ' ' + right;
        } else {
            var ret = createWizziNode('AssignmentExpression', 'set', left + ' ' + node.operator + ' ' + right);
            parent.children.push(ret);
        }
        */
    } else {
        if (options.returnText) {
            showstack(options);
            throw new Error('AssignmentExpression returnText not managed\n' + inspect(node, null));
        }
        var ret = createWizziNode('AssignmentExpression', 'set', node.operator);
        parent.children.push(ret);
        if (typeof left === 'string') {
            ret.name = left + ' ' + node.operator;
        } else {
            ret.children[0] = dummyLeft.children[0];
        }
        if (typeof right === 'string') {
            var v = createWizziNode('LogicalExpression', 'set', right);
            ret.children[1] = v;
        } else {
            ret.children[1] = dummyRight.children[0];
        }
    }
};

format.MemberExpression = function (parent, node, options) {

    log('MemberExpression.ast', node);
    var dummy = createWizziNode('Dummy', 'dummy');
    var value = format(dummy, node.object, options);
    if (typeof value === 'string') {
        if (['UpdateExpression', 'BinaryExpression', 'UnaryExpression', 'ConditionalExpression', 'AssignmentExpression'].indexOf(node.object.type) > -1) {
            value = '(' + value + ')';
        }
        if (node.computed) {
            ret = createWizziNode('MemberExpression', 'set', value + '[' + formatText(null, node.property, options, node) + ']');
        } else {
            ret = createWizziNode('MemberExpression', 'set', value + '.' + formatText(null, node.property, options, node));
        }
        if (options.returnText) {
            return ret.name;
        } else {
            parent.children.push(ret);
        }
        return;
        // throw new Error('MemberExpression node.object as string not managed.\n' + inspect(node));
    }
    if (options.returnText) {
        showstack(options);
        throw new Error('MemberExpression returnText not managed\n' + inspect(node, null));
    }
    if (!parent) { showstack(options); throw new Error('parent is null.' + inspect(node, 4)); }

    var value = dummy.children[0];
    if (['UpdateExpression', 'BinaryExpression', 'UnaryExpression', 'ConditionalExpression', 'AssignmentExpression'].indexOf(node.object.type) > -1) {
        if (value.children.length === 0)
            value.name = '(' + value.name + ')';
    }
    parent.children.push(value);

    // log('MemberExpression.value', value, true);

    var lastchild = value;
    while (lastchild.children.length > 0 &&
           !(lastchild.children[lastchild.children.length - 1].isArg === true) &&
           ['_', '._', '.['].indexOf(lastchild.children[lastchild.children.length - 1].tag) > -1) {
        lastchild = lastchild.children[lastchild.children.length - 1];
    }

    if (node.object.type === 'MemberExpression') {
        if (node.computed) {
            if (lastchild.children.length === 0) {
                lastchild.name += ('[' + formatText(null, node.property, options, node) + ']');
            } else {
                var index = createWizziNode('MemberExpression', '@', formatText(null, node.property, options, node));
                lastchild.children.push(index);
            }
        } else {
            if (lastchild.children.length === 0) {
                lastchild.name += ('.' + formatText(null, node.property, options, node));
            } else {
                var member = createWizziNode('MemberExpression', '.', formatText(null, node.property, options, node));
                lastchild.children.push(member);
            }
        }
    } else {
        if (node.computed) {
            // log('MemberExpression.ast', node, true);
            var ret = createWizziNode('MemberExpression', '.[');
            lastchild.children.push(ret);
            var index = createWizziNode('MemberExpression', '@', formatText(null, node.property, options, node));
            ret.children.push(index);
            // log('MemberExpression.ret.index', ret, true);
        } else {
            ret = createWizziNode('MemberExpression', '.', formatText(null, node.property, options, node));
            lastchild.children.push(ret);
        }
    }
}

format.NewExpression = function (parent, node, options) {
    log('NewExpression.ast', node)
    if (options.returnText) {
        try {
            var text = 'new ' + formatText(null, node.callee, options, node);
            if (node.arguments && node.arguments.length > 0) {
                text += addArguments(ret, node.arguments, '(', ')', options);
            }
            else text += "()";
            return text;
        } catch (ex) {
            log('NewExpression.failed formatText, message ' + ex.message + '\n' + ex.stack + '\n. continue ...', node, true);
            options.returnText = false; // reset
        }
        showstack(options);
        throw new Error('NewExpression returnText not managed\n' + inspect(node, null));
    }
    var ret = createWizziNode('NewExpression', 'new');
    parent.children.push(ret);
    var dummy = createWizziNode('Dummy', 'dummy');
    var value = format(dummy, node.callee, options);
    if (typeof value === 'string') {
        ret.name = value;
    } else if (dummy.children[0].children.length === 0) {
        ret.name = dummy.children[0].name;
    } else {
        var type = createWizziNode('NewExpression', 'type');
        appendChilds(type, dummy.children);
        ret.children.push(type);
    }
    if (node.arguments && node.arguments.length > 0) {
        addArguments(ret, node.arguments, '(', ')', options);
    }
    else ret.name += "()";
};

format.LogicalExpression = function (parent, node, options) {
    log('LogicalExpression.ast', node)
    try {
        var left = formatText(null, node.left, options, node);
        var right = formatText(null, node.right, options, node);
        // log('BinaryExpression.makeBinary', makeBinary(left, right, node.operator, node.left, node.right), true);
        return makeBinary(left, right, node.operator, node.left, node.right);
    } catch (ex) {
        log('LogicalExpression.failed formatText, message ' + ex.message + '\n' + ex.stack + '\n. continue ...', node, true);
        options.returnText = false; // reset
    }
    var dummyLeft = createWizziNode('Dummy', 'dummy');
    var left = format(dummyLeft, node.left, options);
    var dummyRight = createWizziNode('Dummy', 'dummy');
    var right = format(dummyRight, node.right, options);
    if (typeof left === 'string' && typeof right === 'string') {
        var po1 = getOpenParen(node.operator, node.left, node.right);
        var pc1 = getCloseParen(node.operator, node.left, node.right);
        var poL = getOpenParen('', node.left, '');
        var pcL = getCloseParen('', node.left, '');
        var poR = getOpenParen('', '', node.right);
        var pcR = getCloseParen('', '', node.right);
        return po1 + poL + left + pcL + ' ' + node.operator + ' ' + poR + right + pcR + pc1;
    } else {
        if (options.returnText) {
            showstack(options);
            throw new Error('LogicalExpression returnText not managed\n' + inspect(node, null));
        }
        var ret = createWizziNode('LogicalExpression', 'op' + node.operator);
        parent.children.push(ret);
        if (typeof left === 'string') {
            var v = createWizziNode('LogicalExpression', 'set', left);
            ret.children[0] = v;
        } else {
            ret.children[0] = dummyLeft.children[0];
        }
        if (typeof right === 'string') {
            var v = createWizziNode('LogicalExpression', 'set', right);
            ret.children[1] = v;
        } else {
            ret.children[1] = dummyRight.children[0];
        }
    }
};

format.ThisExpression = function (parent, node, options) {
    return 'this';
};

format.SequenceExpression = function (parent, node, options) {
    log('SequenceExpression.ast', node);
    var saveReturnText = options.returnText;
    try {
        var retText = '';
        var first = true;
        node.expressions.map(function (expr) {
            if (!first) retText += ', ';
            first = false;
            retText += formatText(null, expr, options, node);
        });
        return retText;
    } catch (ex) {
        log('SequenceExpression.failed formatText, message ' + ex.message + '\n' + ex.stack + '\n. continue ...', node, true);
        options.returnText = saveReturnText; // reset
    }
    if (options.returnText) {
        showstack(options);
        throw new Error('SequenceExpression returnText not managed\n' + inspect(node, null));
    }
    var ret = createWizziNode('SequenceExpression', 'sequence');
    parent.children.push(ret);
    node.expressions.map(function (expr) {
        var dummy = createWizziNode('Dummy', dummy);
        var value = format(dummy, expr, options);
        if (typeof value === 'string') {
            var node = createWizziNode('SequenceExpression', 'set', value);
            ret.children.push(node);
        } else {
            appendChilds(ret, dummy.children);
        }
    });
}

format.YieldExpression = function (parent, node, options) {
    log('YieldExpression.ast', node, true)
    var ret = createWizziNode('YieldExpression', 'yield');
    parent.children.push(ret);
    format(ret, node.argument, options);
}

//==================================================================
function makeBinary(left, right, op, nodeleft, noderight) {
    var po1 = getOpenParen(op, nodeleft, noderight);
    var pc1 = getCloseParen(op, nodeleft, noderight);
    var poL = getOpenParen('', nodeleft, '');
    var pcL = getCloseParen('', nodeleft, '');
    var poR = getOpenParen('', '', noderight);
    var pcR = getCloseParen('', '', noderight);
    return po1 + poL + left + pcL + ' ' + op + ' ' + poR + right + pcR + pc1;
}

function getOpenParen(oper, left, right) {
    var paren = ['LogicalExpression', 'AssignmentExpression', 'ConditionalExpression', 'BinaryExpression'].indexOf(left.type) > -1;
    paren = paren || ['LogicalExpression', 'AssignmentExpression', 'ConditionalExpression', 'BinaryExpression'].indexOf(right.type) > -1;
    var value = paren || parenOp.indexOf(oper) > -1 ? '(' : '';
    log('getOpenParen', left.type + right.type + value);
    return value;
}

function getCloseParen(oper, left, right) {
    var paren = ['LogicalExpression', 'AssignmentExpression', 'ConditionalExpression', 'BinaryExpression'].indexOf(left.type) > -1;
    paren = paren || ['LogicalExpression', 'AssignmentExpression', 'ConditionalExpression', 'BinaryExpression'].indexOf(right.type) > -1;
    return paren || parenOp.indexOf(oper) > -1 ? ')' : '';
}

var parenOp = ['||', '>>>', '>>', '+', '-'];

//============================================================
//format.NumericLiteral = function (node) {
//    return node.value.toString();
//};




//format.ParenthesizedExpression = function (node) {
//    return "(" + format(node.value) + ")";
//};

//format.VariableDeclarations = function (node) {
//    var ret = {
//        tag: 'var',
//        children: []
//    }
//    if (node.declarations.length == 1) {
//        console.log('VariableDeclarations.node.declarations[0]', node.declarations[0])
//        appendChilds(ret, format(node.declarations[0]));
//    }
//    else {
//        var nset = {
//            tag: 'set',
//            children: []
//        }
//        appendChilds(nset, format(declaration));
//        ret.children.push(nset);
//    }
//    return ret;
//};



function addArguments(ret, arguments, lparen, rparen, options) {

    if (!options.stack) throw new Error("addArguments.options.stack\n" + inspect(arguments, null));

    var dummy, value, a, args = [], argsText = [], onlyText = true;
    arguments.map(function (item) {
        if (options.returnText) {
            if (!item) {
                // TODO
            } else {
                value = formatText(dummy, item, options);
                argsText.push(value);
            }
        } else {
            dummy = createWizziNode('Dummy', 'dummy');
            if (!item) {
                console.log(inspect(arguments, 4));
                // TODO
            } else {
                value = format(dummy, item, options);
                if (typeof value === 'string') {
                    onlyText = onlyText && true;
                    argsText.push(value);
                    args.push(value);
                }
                else {
                    appendItems(args, dummy.children);
                    onlyText = onlyText && false;
                }
            }
        }
    })

    if (options.returnText) {
        return lparen + argsText.join(', ') + rparen;
    } else {
        if (onlyText) {
            if (options.onlyChilds) {
                argsText.map(function (item) {
                    appendChildsOrET(ret, item);
                });
            }
            else
                ret.name += lparen + argsText.join(', ') + rparen;
        } else {
            args.map(function (item) {
                item.isArg = true;
                appendChildsOrET(ret, item);
            });
        }
    }
}


format.StringLiteral = function (node) {
    if (node.value == null) return "\"\"";
    console.log('StringLiteral', node, node.value);
    return JSON.stringify(node.value);
};

format.BooleanLiteral = function (node) {
    return node.value ? 'true' : 'false';
};

format.NullLiteral = function (node) {
    return 'null';
};

format.Variable = function (node) {
    console.log('Variable.name', node.name);
    return node.name;
};

format.PropertyAccessXX = function (node) {
    console.log('PropertyAccess.node', node);
    var ret = {
        tag: 'propertyaccess',
        children: []
    }
    var base = format(node.base);
    console.log('+++base', base);
    if (isText(base)) {
        ret.name = base;
    } else {
        appendChilds(ret, base);
        ret.name = '';
    }
    if (node.name.type) {
        ret.name += '[' + format(node.name) + ']';
    } else {
        ret.name += '.' + node.name;
    }
    console.log('PropertyAccess.ret', ret);
    return isText(ret) ? ret.name : ret;
};



format.PostfixExpressionXX = function (node) {
    return format(node.expression) + node.operator;
};



format.RegularExpressionLiteral = function (node) {
    return '/' + node.body + '/' + node.flags;
};



format.PropertyAssignmentXX = function (node) {
    var ret = {
        tag: '@',
        name: JSON.stringify(node.name),
        children: []
    }
    appendChilds(ret, format(node.value));
    return ret;
};
format.ArrowFunctionExpression = function (parent, node, options) {
    console.log(node);
    inspect(node, 3);
    var ret = {
        tag: '=>',
        name: JSON.stringify(node.name),
        children: []
    }
    node.params.map(function (param) {
        value = format(ret, param, options);
        if (typeof value === 'string') {
            var node = createWizziNode('ArrowFunctionExpression', 'param', value);
            ret.children.push(node);
        }
    });
    format(ret, node.body, options);
    appendChilds(parent, ret);
};
format.ExportDefaultDeclaration = function (parent, node, options) {
    console.log(node);
    inspect(node, 3);
    var ret = {
        tag: 'export',
        name: JSON.stringify(node.name),
        children: []
    }
    format(ret, node.declaration, options);
    appendChilds(parent, ret);
};
format.RestElement = function (parent, node, options) {
    inspect(node, 3);
    var ret = createWizziNode('RestElement', 'param');
    formatNameOrChilds(ret, node.argument, '...', options);
    appendChilds(parent, ret);
};
format.ClassDeclaration = function (parent, node, options) {
    inspect(node, 3);
    var ret = createWizziNode('ClassDeclaration', 'class');
    formatNameOrChilds(ret, node.id, '', options);
    appendChilds(parent, ret);
    if (node.superClass) {
        var sup = createWizziNode('ClassDeclaration', 'super');
        formatNameOrChilds(sup, node.superClass, '', options);
        appendChilds(ret, sup);
    }
    if (node.body) {
        format(ret, node.body, options);
    }
};
format.ClassBody = function (parent, node, options) {
    inspect(node, 3);
    if (node.body) {
        node.body.map(function (body) {
            format(parent, body, options);
        });
    }
};
format.MethodDefinition = function (parent, node, options) {
    inspect(node, 3);
    var ret = createWizziNode('MethodDefinition', 'm');
    appendChilds(parent, ret);
    if (node.key) {
        formatNameOrChilds(ret, node.key, '', options);
        if (ret.name === 'constructor') {
            ret.tag = 'ctor';
            ret.name = '';
        }
    }
    if (node.value) {
        if (node.value.type === "FunctionExpression") {
            node.value.params.map(function (param) {
                ret.children.push({
                    tag: 'param',
                    name: formatText(null, param, options),
                    children: []
                });
            });
            format(ret, node.value.body, options);
        } else {
            format(ret, node.value, options);
        }
    }
};

format.TemplateLiteral = function (parent, node, options) {
    inspect(node, 3);
    //if (options.returnText) {
    var ret = ["`"];
    node.expressions.map(function (iten) {
        ret.push(formatText(null, iten, options, node))
    });
    ret.push("`");
    return ret.join('');
    //} else {
    //    throw new Error('TemplateLiteral not managed when  options.returnText == false\n' + inspect(node, null));
    //}
}
//== HELPERS ============================================================
function createWizziNode(src, tag, name) {
    return {
        src: src,
        tag: tag,
        name: name || '',
        children: []
    };
}
function undot(text) {
    return text.substr(0, 1) === '.' ? text.substr(1) : text;
}
function isText(node) {
    log('isText', node);
    if (verify.isString(node)) return true;
    // TODO what's the rule?
    if (node.tag === 'new') return false;
    return verify.isString(node.name) && node.children.length == 0;
}
function getText(node) {
    if (verify.isString(node)) return node;
    return node.getText ? node.getText() : node.name;
}
function isBlock(node) {
    if (emitBlock) return false;
    return node.tag === 'block';
}
function isMemberExpression(node) {
    if (verify.isArray(node) && node.length > 0 && node[0].src === 'MemberExpression') {
        return true;
    }
    return false;
}

function appendItems(parent, child) {
    if (verify.isArray(child)) {
        child.forEach(function (item) {
            appendItems(parent, item);
        });
        return;
    }
    parent.push(child);
}

function appendETChild(parent, child) {
    parent.children.push({
        tag: '@',
        name: child,
        children: []
    });
}
function appendChildsOrET(parent, child) {
    if (verify.isArray(child)) {
        child.forEach(function (item) {
            appendChildsOrET(parent, item);
        });
        return;
    }
    if (typeof child === 'string') {
        parent.children.push({
            tag: '@',
            name: child,
            children: []
        });
    } else if (['{', '[', 'function', 'new', '_'].indexOf(child.tag) < 0 && child.children.length === 0) {
        parent.children.push({
            tag: '@',
            name: child.name,
            children: []
        });
    }
    else
        appendChilds(parent, child);
}
function appendChilds(parent, child, textToparent) {
    if (verify.isArray(child)) {
        child.forEach(function (item) {
            appendChilds(parent, item, textToparent);
        });
        return;
    }
    if (isBlock(child)) {
        child.children.forEach(function (item) {
            parent.children.push(item);
        });
    } else if (textToparent && isText(child)) {
        parent.name = parent.name || '';
        parent.name += getText(child) + ' ';
    } else {
        parent.children.push(child);
    }
}
function appendBlock(parent, child) {
    log('appendBlock', child);
    if (isBlock(child)) {
        child.children.forEach(function (item) {
            parent.children.push(item);
        });
    } else {
        parent.children.push(child);
    }
}

function textify(children) {
    console.log('textify', util.inspect(children));
    if (children.length !== 1) return { result: false };
    var node = children[0];
    if (node.children.length > 0) return { result: false };
    if (node.tag === 'set' || node.tag === '_') {
        return { result: true, text: node.name };
    }
    return { result: false };
}

var md = module.exports = {};

md.parse = function (input) {
    return parser.parse(input);
};

md.getWizziTree = function (input, options) {
    options = options || {};
    options.stack = [];
    if (typeof options.emitBlock !== 'undefined') {
        emitBlock = options.emitBlock;
    }
    if (typeof options.verbose !== 'undefined') {
        verbose = options.verbose;
    }
    var startTime = Date.now();
    var esprimaOptions = options.esprima || {};
    var syntax = parser.parse(input, esprimaOptions);
    if (typeof options.syntaxOutFile !== 'undefined') {
        file.write(options.syntaxOutFile, JSON.stringify(syntax, null, 2));
    }
    console.log('Parsed in ' + (Date.now() - startTime) + ' ms');
    options.starter = true;
    var node = format(null, syntax, options);
    log("wizziTree", node);
    return node;
};

md.getWizziIttf = function (input, options, callback) {
    try {
        options.formatTextNodes = [];
        var node = null, hasEmitBlock = options.emitBlock === true;
        if (options.checked) {
            var saveEmitBlock = options.emitBlock;
            options.emitBlock = true;
            node = md.getWizziTree(input, options);
            options.emitBlock = saveEmitBlock;
        } else {
            node = md.getWizziTree(input, options);
        }
        var ittf = ittfwriter.stringify(node, { lang: 'js' });
        if (false && options.checked /* VALIDATION IS STOPPED */) {
            validator.checkDiffInMemory(input, ittf, function (err, data) {
                if (err) { callback(err); return; }
                if (data.ok) {
                    if (hasEmitBlock) {
                        ittf = '$$ cheched\n' + ittf;
                        callback(null, ittf);
                    } else {
                        options.emitBlock = false;
                        node = md.getWizziTree(input, options);
                        ittf = ittfwriter.stringify(node, { lang: 'js' });
                        ittf = '$$ cheched\n' + ittf;
                        callback(null, ittf);
                    }
                }
                else { callback(null, data.message); }
            });
        } else {
            callback(null, ittf);
        }
    } catch (ex) {
        callback("Js wizzifier error:\n" + ex.message + '\n' + ex.stack);
    }
};

