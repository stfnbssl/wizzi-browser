/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\util\stm.js.ittf
*/
'use strict';
var verify = require('./verify');
var myname = 'wizzi-js.artifacts.js.module.codegen.util.stm';
var md = module.exports = {};
var parents_of_top_statements = [
    'xfunction', 
    'asyncfunction', 
    'asyncarrowfunction', 
    'arrowfunction', 
    'generatorfunction', 
    'xclass', 
    'ctor', 
    'method', 
    'module', 
    'xmodule', 
    'ready', 
    'html_f', 
    'html_dom', 
    'html_hb', 
    'block', 
    'xfor', 
    'foreach', 
    'backeach', 
    'each', 
    'filter', 
    'reduce', 
    'find', 
    'xwhile', 
    'xdo', 
    'xif', 
    'xelse', 
    'elif', 
    'xtry', 
    'xfinally', 
    'xcatch', 
    'xcase', 
    'xdefault', 
    'describe', 
    'iife', 
    'it', 
    'before', 
    'itAsync', 
    'beforeAsync', 
    'afterAsync', 
    'beforeEach', 
    'after', 
    'afterEach', 
    'xlabel', 
    'wzIife', 
    'wzFunction', 
    'render', 
    'willMount', 
    'didMount', 
    'willUnmount', 
    'shouldUpdate', 
    'didUpdate', 
    'willUpdate', 
    'willReceiveProps', 
    '_js', 
    '_css', 
    'codeline', 
    'statement', 
    'exportDefault', 
    'xexport'
];
var __tags = "a abbr address area article aside audio b base bdi bdo big blockquote body br" + " button canvas caption cite code col colgroup data datalist dd del details dfn" + " dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5" + " h6 head header hr html i iframe img input ins kbd keygen label legend li link" + " main map mark menu menuitem meta meter nav noscript object ol optgroup option" + " output p param picture pre progress q rp rt ruby s samp script section select" + " small source span strong _style sub summary sup svg table tbody td textarea tfoot th" + " thead time title tr track u ul var video wbr" + " altGlyph altGlyphDef altGlyphItem animate animateColor animateMotion animateTransform" + " circle clipPath color-profile cursor defs desc discard ellipse" + " @filter font font-face font-face-format font-face-name font-face-src font-face-uri" + " foreignObject g glyph glyphRef hatch hatchpath hkern image line linearGradient" + " marker mask metadata missing-glyph mpath @param path pattern polygon polyline radialGradient" + " rect solidcolor stop style svg switch symbol text textPath tref tspan" + " unknown use video view vkern";

var fb_html_supported_tags = __tags.split(' ');
md.isDescendentOf = function(model, ancestor) {
    if (!model.wzParent) {
        return false;
    }
    if (model.wzParent.wzElement == ancestor) {
        return true;
    }
    return md.isDescendentOf(model.wzParent, ancestor);
};
md.isTopStatement = function(model, ctx) {
    if (!model.wzParent) {
        return true;
    }
    if (typeof ctx === 'undefined') {
        throw new Error('stm.isTopStatement called withot ctx parameter');
    }
    if (ctx.arrowFunctionNoGraphs) {
        return false;
    }
    var prnElement = model.wzParent.wzElement;
    return parents_of_top_statements.indexOf(prnElement) > - 1;
};
md.isDeclare = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['xvar'].indexOf(model.wzParent.wzElement) > -1;
};
md.isObjectProperty = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['jsObject', 'state'].indexOf(model.wzParent.wzElement) > -1;
};
md.isMemberAccess = function(model) {
    if (['memberAccess', 'memberAccessComputed', 'memberCall', 'decoratorCall', 'callOnValue'].indexOf(model.wzElement) > -1) {
        return true;
    }
};
md.isMemberAccessOrCall = function(model) {
    if (['memberAccess', 'memberAccessComputed', 'memberCall', 'decoratorCall', 'callOnValue'].indexOf(model.wzElement) > -1) {
        return true;
    }
    if (!model.wzParent) {
        return false;
    }
    if (model.wzElement === 'call' && model.wzParent.wzElement === 'call') {
        return true;
    }
    return false;
};
md.isCallArgument = function(model) {
    return model.wzElement === 'call' && model.wzParent && model.wzParent.wzElement === 'call';
};
md.isArgumentOfCall = function(model) {
    return model.wzParent && ['call', 'memberCall', 'decoratorCall', 'callOnValue'].indexOf(model.wzParent.wzElement) > -1;
};
md.onlyChildIs = function(model, element) {
    return model.statements && model.statements.length == 1 && model.statements[0].wzElement === element;
};
md.onlyChildIsHtmlElement = function(model) {
    return model.statements && model.statements.length == 1 && ( fb_html_supported_tags.indexOf(model.statements[0].wzElement) > -1 || model.statements[0].wzElement === 'htmlelement' );
};
md.hasStatementChildren = function(model) {
    if (model.statements && model.statements.length > 0) {
        var i, i_items=model.statements, i_len=model.statements.length, stm;
        for (i=0; i<i_len; i++) {
            stm = model.statements[i];
            if (stm.wzElement != 'comment') {
                return true;
            }
        }
    }
    return false;
};
md.parentIs = function(model, element) {
    return model.wzParent && model.wzParent.wzElement === element;
};
md.parentIsHtmlElement = function(model) {
    if (! (model.wzParent)) {
        return false;
    }
    var test = model.wzParent.wzElement;
    if (test == 'htmlelement') {
        return true;
    }
    // return ['htmlelement', 'a', 'br', 'button', 'div', 'form', 'h1', 'h2', 'h3', 'h4', 'head', 'header', 'i', 'img', 'input', 'label', 'legend', 'li', 'meta', 'option', 'p', 'select', 'span', 'table', 'tbody', 'td', 'textarea', 'th', 'thead', 'tr', 'ul'].indexOf(model.wzParent.wzElement) > - (1)
    return fb_html_supported_tags.indexOf(model.wzParent.wzElement) > -1;
};
md.isValue = function(model) {
    if (! (model.wzParent)) {
        return false;
    }
    return ['jsArray', 'jsPropertyOrValue', 'memberAccessComputed', 'or', 'and'].indexOf(model.wzParent.wzElement) > -1;
};
md.isParamValue = function(model) {
    if (!model.wzParent) {
        return false;
    }
    return ['call', 'memberCall', 'decoratorCall', 'callOnValue', 'iife', 'xnew', 'arrayOf', 'concat'].indexOf(model.wzParent.wzElement) > -1;
};
md.semicolon = function(text) {
    return verify.endsWith(text, ';') ? '' : ';';
};
md.unparen = function(text) {
    if (verify.isEmpty(text)) {
        return text;
    }
    var s = text.trim();
    return md.isParenEnclosed(s) ? s.substr(1, s.length - 2) : text;
};
md.setOperator = function(text, statements) {
    if (verify.isEmpty(text)) {
        return '';
    }
    text = text.trim();
    if (statements.length === 1 && statements[0].wzElement === 'memberAccessComputed') {
        return text + '';
    }
    var t1 = text.substr(-1, 1);
    var t2 = text.substr(-2, 2);
    if (op1.indexOf(t1) > -1) {
        return text + ' ';
    }
    if (op2.indexOf(t2) > -1) {
        return text + ' ';
    }
    return text + ' = ';
};
md.encloseParen = function(text) {
    var s = text.trim();
    if (md.isParenEnclosed(s) === false) {
        if (s.substr(0, 1) !== '(') {
            s = '(' + s;
        }
        if (s.substr(-1, 1) !== ')' && s.substr(-2, 2) !== ');') {
            s = s + ')';
        }
        return s;
    }
    else {
        return text;
    }
};
md.isGraphEnclosed = function(text) {
    if (verify.isEmpty(text)) {
        return false;
    }
    text = text.trim();
    return text.substr(0, 1) === '{' && text.substr(-1, 1) === '}';
};
md.isParenEnclosed = function(text) {
    if (verify.isEmpty(text)) {
        return false;
    }
    text = text.trim();
    var hasEndParens = text.substr(-1, 1) === ')' || text.substr(-2, 2) === ');';
    if (!hasEndParens || text.substr(0, 1) !== '(') {
        return false;
    }
    var count = 1,
        quote = null;
    for (var ch, i = 1; i < text.length; i++) {
        ch = text[i];
        if (ch === '"' || ch === "'") {
            if (quote === ch) {
                quote = null;
            }
            else if (quote === null) {
                quote = ch;
            }
        }
        else if (quote !== null) {
            ;
        }
        else if (ch === '(') {
            count++;
        }
        else if (ch === ')') {
            count--;
        }
        if (i < (text.length - 1) && count === 0) {
            return false;
        }
    }
    return true;
};
md.arrowFunctionRequiresGraphs = function(model) {
    if (model.statements.length == 0 || model.statements.length > 1) {
        return true;
    }
    if (['call', 'statement', 'set'].indexOf(model.statements[0].wzElement) > -1) {
        return false;
    }
    return true;
};
md.isQuoted = function(text) {
    if (verify.isEmpty(text) || text.length < 2) {
        return false;
    }
    return (text.substr(0, 1) === '"' && text.substr(-1, 1) === '"') || (text.substr(0, 1) === '\'' && text.substr(-1, 1) === '\'');
};
md.unquote = function(text) {
    if (verify.isEmpty(text) || text.length < 2) {
        return text;
    }
    if (md.isQuoted(text)) {
        return text.substr(1, text.length-2);
    }
    else {
        return text;
    }
};
var op1 = [
    '='
];
var op2 = [
    '+=', 
    '-=', 
    '/=', 
    '*='
];
var parenOp = [
    '||', 
    '>>>', 
    '>>'
];
md.getOpenParen = function(oper) {
    return parenOp.indexOf(oper) > -1 ? '(' : '';
};
md.getCloseParen = function(oper) {
    return parenOp.indexOf(oper) > -1 ? ')' : '';
};
md.getParentOfType = function(model, type) {
    var prn = model.wzParent;
    while (prn != null && prn.wzElement !== type) {
        prn = prn.wzParent;
    }
    return prn;
};
md.hasArguments = function(callText) {
    if (typeof(callText) !== 'string') {
        return false;
    }
    callText = callText.trim();
    var hasEndParens = ((callText.substr(- (1), 1) === ')') || (callText.substr(- (2), 2) === ');'));
    if (!hasEndParens) {
        return false;
    }
    var namecount = 0;
    var enclosedcount = 0;
    var seen = false;
    var count = 0,
        quote = null;
    for (var ch, i = 0; i < callText.length; i++) {
        ch = callText[i];
        if ((ch === '"') || (ch === "'")) {
            if (quote === ch) {
                quote = null;
            }
            else if (quote === null) {
                quote = ch;
            }
        }
        else if (quote !== null) {
            ;
        }
        else if (ch === '(') {
            seen = true;
            count++;
        }
        else if (ch === ')') {
            count--;
            if (count === 0) {
                enclosedcount++;
            }
        }
        else if (! (seen)) {
            namecount++;
        }
    }
    return seen && (namecount > 0 || enclosedcount > 1) && count == 0;
};
md.emitBlock = function(cnt, tag, model, items, count, ctx, callback) {
    emitBlock_begin(cnt, tag, model, items, count, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        emitBlock_end(cnt, items, ctx, count, callback);
    });
};
function emitBlock_begin(cnt, tag, model, items, count, ctx, callback) {
    var blockIndex = items.length > 0 && items[0].wzElement === 'test' ? 1 : 0;
    if (ctx.values.__preserveBlock) {
        if (count > blockIndex && items[blockIndex].wzElement === 'block') {
            if (tag === 'case') {
                ctx.w(tag + ' ' + model.wzName + ': {');
                return callback(null, null);
            }
            else if (tag === 'else') {
                ctx.w(tag + ' {');
                return callback(null, null);
            }
            else {
                md.emitTest(cnt, tag, model, items, ctx, ' {', callback);
            }
        }
        else {
            if (tag === 'case') {
                ctx.w(tag + ' ' + model.wzName + ':');
                return callback(null, null);
            }
            else if (tag === 'else') {
                ctx.w(tag);
                return callback(null, null);
            }
            else {
                md.emitTest(cnt, tag, model, items, ctx, '', callback);
            }
        }
    }
    else {
        if (tag === 'case') {
            ctx.w(tag + ' ' + model.wzName + ': {');
            return callback(null, null);
        }
        else if (tag === 'else') {
            ctx.w(tag + ' {');
            return callback(null, null);
        }
        else {
            md.emitTest(cnt, tag, model, items, ctx, ' {', callback);
        }
    }
}
function emitBlock_end(cnt, items, ctx, count, callback) {
    var blockIndex = items.length > 0 && items[0].wzElement === 'test' ? 1 : 0;
    var from = items.length > 0 && items[0].wzElement === 'test' ? 1 : 0;
    cnt.genItems(items, ctx, {
        indent: true, 
        from: from
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (ctx.values.__preserveBlock) {
            if (count > blockIndex && items[blockIndex].wzElement === 'block') {
                ctx.w('}');
            }
        }
        else {
            ctx.w('}');
        }
        return callback(null, null);
    });
}
md.emitTest = function(cnt, tag, model, items, ctx, open, callback) {
    if (items.length > 0 && items[0].wzElement === 'test') {
        ctx.write(tag + ' ');
        cnt.genItem(items[0], ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w(open);
            return callback(null, null);
        });
    }
    else {
        ctx.w(tag + ' (' + md.unparen(model.wzName) + ')' + open);
        return callback(null, null);
    }
};
/**
     TYPESCRIPT
*/
md.isTSSimpleType = function(model) {
    return [
            'typeNumber', 
            'typeString', 
            'typeBoolean', 
            'typeAny', 
            'typeArray', 
            'typeObject', 
            'typeObjectLiteral', 
            'typeVoid', 
            'typeNull', 
            'typeUndefined', 
            'typeLiteral', 
            'typeTypeof', 
            'typeReference', 
            'typeFunction', 
            'typeArrowFunction', 
            'typeUnion', 
            'typeIntersect', 
            'typeKeyOf'
        ].indexOf(model.wzElement) > -1;
};
md.extractTSSimpleType = function(model) {
    if (!model.statements || model.statements.length == 0) {
        return ;
    }
    var ret, retIndex;
    model.statements.some((item, index) => {
        if (md.isTSSimpleType(item)) {
            ret = item;
            retIndex = index;
            return true;
        }
    });
    if (ret) {
        model.statements.splice(retIndex, 1);
    }
    return ret;
};
md.extractTSParameterDecl = function(model) {
    if (!model.statements || model.statements.length == 0) {
        return ;
    }
    var ret, retIndex;
    model.statements.some((item, index) => {
        if (item.wzElement == 'typeParameterDecl') {
            ret = item;
            retIndex = index;
            return true;
        }
    });
    if (ret) {
        model.statements.splice(retIndex, 1);
    }
    return ret;
};
md.extractTS = function(model, element) {
    if (!model.statements || model.statements.length == 0) {
        return ;
    }
    var ret, retIndex;
    model.statements.some((item, index) => {
        if (item.wzElement === element) {
            ret = item;
            retIndex = index;
            return true;
        }
    });
    if (ret) {
        model.statements.splice(retIndex, 1);
    }
    return ret;
};
md.genTSParams = function(model, ctx, cnt, callback) {
    if (!!(model.params && model.params.length > 0) == false) {
        return callback(null, null);
    }
    // log 'genTSParams enter', model.wzElement, model.params
    var len_1 = model.params.length;
    function repeater_1(index_1) {
        if (index_1 === len_1) {
            return next_1();
        }
        var item_1 = model.params[index_1];
        var p = item_1;
        // log 'genTSParams p', p
        if (index_1 > 0) {
            ctx.write(', ');
        }
        var ptype = md.extractTSSimpleType(p);
        md.genAccessorsAndExtra(p, ctx);
        // log 'genTSParams', index_1, p.statements.length, ptype && ptype.wzElement
        if (p.statements.length == 0) {
            ctx.write(p.wzName);
            if (p.typeOptional) {
                ctx.write('?');
            }
            if (ptype) {
                ctx.write(': ');
                cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            else {
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            }
        }
        else if (p.wzElement === 'objectParam' || p.wzElement === 'jsObject') {
            p.wzElement = 'jsObject';
            cnt.stm[p.wzElement](p, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                p.wzElement = 'objectParam';
                if (ptype) {
                    ctx.write(': ');
                    cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        });
                    });
                }
                else {
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                }
            });
        }
        else if (p.statements.length == 1) {
            ctx.write(p.wzName);
            if (p.typeOptional) {
                ctx.write('?');
            }
            var s0 = p.statements[0];
            // log 'genTSParams.s0.wzElement', s0.wzElement
            // if s0.wzElement === 'typeInitValue' || s0.wzElement === 'typeCTor' || s0.wzElement === 'typeNever'
            // log 'genTSParams.s0.statements.length', s0.statements.length
            if (ptype) {
                ctx.write(': ');
                cnt.stm[ptype.wzElement](ptype, ctx, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    genTSParams_close(s0, ctx, cnt, (err, notUsed) => {
                        if (err) {
                            return callback(err);
                        }
                        process.nextTick(function() {
                            repeater_1(index_1 + 1);
                        });
                    });
                });
            }
            else {
                genTSParams_close(s0, ctx, cnt, (err, notUsed) => {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            // else
            // throw new Error('jswizzifier.genTSParams.statements[0].wzElement should be "typeInitValue or typeCTor".found: ' + s0.wzElement)
        }
        else {
            // log 'jswizzifier.genTSParams.p', p, 'statements', p.statements
            callback(ctx.error(myname + '.genTSParams.statements.length should be 0 or 1.found: ' + p.statements.length, model));
        }
    }
    repeater_1(0);
    function next_1() {
        // log 'genTSParams.exit'
        return callback(null, null);
    }
};
function genTSParams_close(s0, ctx, cnt, callback) {
    if (s0.statements.length == 2) {
        var item = s0.statements[0];
        // log 'genTSParams_close 1 item.wzElement', item.wzElement
        cnt.stm[item.wzElement](item, ctx, (err, notUsed) => {
            if (err) {
                return callback(err);
            }
            ctx.write(' = ');
            var item = s0.statements[1];
            // log 'genTSParams_close 2 item.wzElement', item.wzElement
            cnt.stm[item.wzElement](item, ctx, callback);
        });
    }
    else {
        ctx.write(' = ');
        // log 'genTSParams_close 3 item.wzElement', s0.wzElement
        cnt.stm[s0.wzElement](s0, ctx, callback);
    }
}
md.genAccessorsAndExtra = function(model, ctx) {
    if (model.typePublic) {
        ctx.write('public ');
    }
    if (model.typeProtected) {
        ctx.write('protected ');
    }
    if (model.typePrivate) {
        ctx.write('private ');
    }
    if (model.typeReadonly) {
        ctx.write('readonly ');
    }
    if (model.typeAbstract) {
        ctx.write('abstract ');
    }
};
md.genTSTypeParameters = function(model, ctx, cnt, callback) {
    genTSTypeParameters_partial(model, ctx, cnt, (err, notUsed) => {
        if (err) {
            return callback(err);
        }
        if (model.extends && model.extends.length > 0) {
            ctx.write( ' extends ');
            model.extends.forEach((e, index) => {
                if (index > 0) {
                    ctx.write(', ');
                }
                ctx.write(e.wzName);
            });
        }
        return callback(null, null);
    });
};
function genTSTypeParameters_partial(model, ctx, cnt, callback) {
    if (model.typeParameterDecls && model.typeParameterDecls.length > 0) {
        ctx.write('<');
        var len_1 = model.typeParameterDecls.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.typeParameterDecls[index_1];
            if (index_1 > 0) {
                ctx.write(', ');
            }
            cnt.stm.typeParameterDecl(item_1, ctx, (err, notUsed) => {
                if (err) {
                    return callback(err);
                }
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            });
        }
        repeater_1(0);
        function next_1() {
            ctx.write('>');
            return callback(null, null);
        }
    }
    else {
        return callback(null, null);
    }
}
md.indexedTSNeedsGraphs = function(model) {
    return [
            'typeMapped', 
            'typeConditional'
        ].indexOf(model.wzElement) > -1;
};
