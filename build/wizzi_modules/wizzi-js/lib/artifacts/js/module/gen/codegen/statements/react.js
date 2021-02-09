/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\codegen\statements\react.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../util/stm');
var lineParser = require('../util/lineParser');
var method;

var myname = 'wizzi-js.artifacts.js.module.gen.codegen.statements.react';
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
    cnt.stm.reactComponent = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.reactComponent');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.reactComponent. Got: ' + callback);
        }
        var childrenInfo = extractReactChildren(model);
        reactComponent_style(model, ctx, childrenInfo, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write('class ' + model.wzName + ' extends ');
            if (model.super && model.super.length > 0) {
                ctx.w(model.super + ' {');
            }
            else {
                ctx.w('React.Component {');
            }
            ctx.indent();
            var len_1 = model.statements.length;
            function repeater_1(index_1) {
                if (index_1 === len_1) {
                    return next_1();
                }
                var item_1 = model.statements[index_1];
                reactComponent_member(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    // log 'react.js 2 - render §§§§§§§§§§§§§§§§§§§§§§§§§§§§§'
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            repeater_1(0);
            function next_1() {
                // log 'react.js 3 - render §§§§§§§§§§§§§§§§§§§§§§§§§§§§§'
                reactComponent_close(model, ctx, childrenInfo, callback);
            }
        });
    };
    function reactComponent_style(model, ctx, childrenInfo, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.reactComponent_style');
        }
        if (childrenInfo.style != null) {
            ctx.w("const styles = theme => (");
            ctx.indent();
            childrenInfo.style.wzElement = 'jsObject';
            cnt.genItem(childrenInfo.style, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                childrenInfo.style.wzElement = 'style';
                ctx.deindent();
                ctx.w(");");
                ctx.w();
                return callback(null, null);
            });
        }
        else {
            return callback(null, null);
        }
    }
    function reactComponent_member(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.reactComponent_member');
        }
        // log 'reactComponent, model.wzElement', model.wzElement, model.wzName, model.wzParent.wzName
        if (model.wzElement == 'state') {
            ctx.write('state = ');
            model.wzElement = 'jsObject';
            cnt.genItem(model, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                model.wzElement = 'state';
                ctx.w(';');
                return callback(null, null);
            });
        }
        else if (model.wzElement == 'ctor') {
            ctx.w('constructor(props) {');
            ctx.indent();
            ctx.w('super(props);');
            writeMethodProps(model, ctx);
            ctx.deindent();
            writeIndented(model.statements, ctx, cnt, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w('}');
                return callback(null, null);
            });
        }
        else if (model.wzElement == 'willMount') {
            writeMethod('componentWillMount', model, ctx, cnt, callback);
        }
        else if (model.wzElement == 'didMount') {
            writeMethod('componentDidMount', model, ctx, cnt, callback);
        }
        else if (model.wzElement == 'willUnmount') {
            writeMethod('componentWillUnmount', model, ctx, cnt, callback);
        }
        else if (model.wzElement == 'shouldUpdate') {
            writeMethod('shouldComponentUpdate', model, ctx, cnt, callback);
        }
        else if (model.wzElement == 'willUpdate') {
            writeMethod('componentWillUpdate', model, ctx, cnt, callback);
        }
        else if (model.wzElement == 'didUpdate') {
            ctx.w('componentDidUpdate(prevProps, prevState) {');
            ctx.indent();
            writeMethodProps(model, ctx);
            ctx.deindent();
            writeIndented(model.statements, ctx, cnt, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w('}');
                return callback(null, null);
            });
        }
        else if (model.wzElement == 'willReceiveProps') {
            ctx.w('componentWillReceiveProps(nextProps) {');
            ctx.indent();
            writeMethodProps(model, ctx);
            ctx.deindent();
            writeIndented(model.statements, ctx, cnt, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w('}');
                return callback(null, null);
            });
        }
        else if (model.wzElement == 'render') {
            // log 'react.js - render §§§§§§§§§§§§§§§§§§§§§§§§§§§§§'
            writeMethod('render', model, ctx, cnt, callback);
        }
        else if (model.wzElement == 'method') {
            if (!method) {
                method = require('../method');
            }
            ctx.__is_react_class = true;
            new method.gen(model, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.__is_react_class = false;
                return callback(null, null);
            });
        }
        else if (model.wzElement == 'property' || model.wzElement == 'p') {
            ctx.w(model.wzName + ';');
            return callback(null, null);
        }
        else if (model.wzElement == 'arrowfunction' || model.wzElement == 'asyncarrowfunction') {
            ctx.__is_react_class = true;
            var async_str = model.wzElement == 'asyncarrowfunction' || model.xasync ? 'async ' : '';
            var onlyChildIsArrowFunction = u.onlyChildIs(model, 'arrowfunction');
            console.log("onlyChildIsArrowFunction", onlyChildIsArrowFunction);
            if (onlyChildIsArrowFunction) {
                ctx.write(model.wzName + ' = ' + async_str + '(' + model.paramNames.join(', ') + ') => ');
            }
            else {
                ctx.w(model.wzName + ' = ' + async_str + '(' + model.paramNames.join(', ') + ') => {');
            }
            ctx.indent();
            generateParamConstraints(model.wzName, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                writeMethodProps(model, ctx);
                ctx.deindent();
                writeIndented(model.statements, ctx, cnt, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    if (onlyChildIsArrowFunction == false) {
                        ctx.w('}');
                    }
                    // TODO ???
                    ctx.__is_react_class = false;
                    return callback(null, null);
                });
            });
        }
        else if (model.wzElement == 'prop' || model.wzElement == 'style') {
            // already done
            return callback(null, null);
        }
        else {
            cnt.genItem(model, ctx, callback);
        }
    }
    function reactComponent_close(model, ctx, childrenInfo, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in fn: ' + myname + '.reactComponent_close');
        }
        // log 'reactComponent_close'
        ctx.deindent();
        ctx.w('}');
        if (childrenInfo.items.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.propTypes = {');
            ctx.indent();
            var open = false;
            var i, i_items=childrenInfo.items, i_len=childrenInfo.items.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.items[i];
                if (open) {
                    ctx.w(',');
                }
                genReactPropType(p, ctx, cnt);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
        if (childrenInfo.itemsWithDefault.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.defaultProps  = {');
            ctx.indent();
            var open = false;
            var i, i_items=childrenInfo.itemsWithDefault, i_len=childrenInfo.itemsWithDefault.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.itemsWithDefault[i];
                if (open) {
                    ctx.w(',');
                }
                ctx.write(p.wzName + ': ' + p.defaultValue);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
        // log 'react.js 4 - render §§§§§§§§§§§§§§§§§§§§§§§§§§§§§'
        return callback(null, null);
    }
    cnt.stm.reactFunction = function(model, ctx, callback) {
        if (typeof callback === 'undefined') {
            throw new Error('Missing callback parameter in cnt.stm: ' + myname + '.reactFunction');
        }
        if (typeof callback !== 'function') {
            throw new Error('The callback parameter must be a function. In ' + myname + '.reactFunction. Got: ' + callback);
        }
        var childrenInfo = extractReactChildren(model);
        ctx.w('const ' + model.wzName + ' = (props) => {');
        ctx.indent();
        if (childrenInfo.items.length > 0) {
            var props = childrenInfo.items;
            ctx.w('const {');
            ctx.indent();
            var comma;
            var i, i_items=props, i_len=props.length, item;
            for (i=0; i<i_len; i++) {
                item = props[i];
                comma = i < props.length - 1 ? ',' : '';
                ctx.w(item.wzName + comma);
            }
            ctx.deindent();
            ctx.w('} = props;');
        }
        ctx.__is_react_class = true;
        var len_1 = model.statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = model.statements[index_1];
            if (item_1.wzElement == 'prop') {
                // already done
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            }
            else {
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
        }
        repeater_1(0);
        function next_1() {
            ctx.__is_react_class = false;
            ctx.deindent();
            ctx.w('}');
            writePropTypes(model, childrenInfo, ctx);
            return callback(null, null);
        }
    };
    function writeMethod(name, model, ctx, cnt, callback) {
        ctx.w(name + '() {');
        ctx.indent();
        writeMethodProps(model, ctx);
        ctx.deindent();
        writeIndented(model.statements, ctx, cnt, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            return callback(null, null);
        });
    }
    function writeIndented(statements, ctx, cnt, callback) {
        ctx.indent();
        var len_1 = statements.length;
        function repeater_1(index_1) {
            if (index_1 === len_1) {
                return next_1();
            }
            var item_1 = statements[index_1];
            // log 'writeIndented', item_1.wzElement
            if (item_1.wzElement == 'prop') {
                // done in writeMethodProps
                process.nextTick(function() {
                    repeater_1(index_1 + 1);
                });
            }
            else {
                cnt.genItem(item_1, ctx, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
        }
        repeater_1(0);
        function next_1() {
            ctx.deindent();
            return callback(null, null);
        }
    }
    function extractReactChildren(react) {
        var ret = {
            items: [], 
            itemsWithDefault: [], 
            style: null
        };
        var i, i_items=react.statements, i_len=react.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = react.statements[i];
            if (item.wzElement == 'prop') {
                ret.items.push(item);
                // log 'item.defaultValue', item.defaultValue
                if (item.defaultValue) {
                    ret.itemsWithDefault.push(item);
                }
            }
            if (item.wzElement == 'style') {
                if (ret.style == null) {
                    ret.style = item;
                }
                else {
                    var j, j_items=item.statements, j_len=item.statements.length, s;
                    for (j=0; j<j_len; j++) {
                        s = item.statements[j];
                        s.wzParent = ret.style;
                        ret.style.statements.push(s);
                    }
                }
            }
        }
        return ret;
    }
    function writeMethodProps(m, ctx) {
        var props = extractMethodProps(m);
        if (props.length > 0) {
            ctx.w('const {');
            ctx.indent();
            var comma;
            var i, i_items=props, i_len=props.length, item;
            for (i=0; i<i_len; i++) {
                item = props[i];
                comma = i < props.length - 1 ? ',' : '';
                ctx.w(item.wzName + comma);
            }
            ctx.deindent();
            ctx.w('} = this.props;');
        }
    }
    function extractMethodProps(m) {
        var ret = [];
        var i, i_items=m.statements, i_len=m.statements.length, item;
        for (i=0; i<i_len; i++) {
            item = m.statements[i];
            if (item.wzElement == 'prop') {
                ret.push(item);
            }
        }
        return ret;
    }
    function writePropTypes(model, childrenInfo, ctx) {
        if (childrenInfo.items.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.propTypes = {');
            ctx.indent();
            var open = false;
            var i, i_items=childrenInfo.items, i_len=childrenInfo.items.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.items[i];
                if (open) {
                    ctx.w(',');
                }
                genReactPropType(p, ctx, cnt);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
        if (childrenInfo.itemsWithDefault.length > 0) {
            ctx.w();
            ctx.w(model.wzName + '.defaultProps  = {');
            ctx.indent();
            var open = false;
            var i, i_items=childrenInfo.itemsWithDefault, i_len=childrenInfo.itemsWithDefault.length, p;
            for (i=0; i<i_len; i++) {
                p = childrenInfo.itemsWithDefault[i];
                if (open) {
                    ctx.w(',');
                }
                ctx.write(p.wzName + ': ' + p.defaultValue);
                open = true;
            }
            if (open) {
                ctx.w('');
            }
            ctx.deindent();
            ctx.w('}');
        }
    }
    var genReactPropType = (function() {
        var lc = {};
        lc.oneOfParam = function(model, ctx, cnt) {
            ctx.w(model.wzName + ': PropTypes.oneOf([');
            // log 'wizzi-codegen.statemts.t.reactPropTypes oneOfParam model: ', model
            writeValueList(model, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w('])');
            }
        };
        lc.oneOfTypeParam = function(model, ctx, cnt) {
            // log 'wizzi-codegen.statemts.t.reactPropTypes oneOfTypeParam model: ', model
            ctx.w(model.wzName + ': PropTypes.oneOfType([');
            writeTypeList(model, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w('])');
            }
        };
        lc.arrayOf = function(model, ctx, cnt) {
            ctx.write(model.wzName + ': PropTypes.arrayOf([');
            writeTypeList(model, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w('])');
            }
        };
        lc.instanceOf = function(model, ctx, cnt) {
            ctx.write(model.wzName + ': PropTypes.instanceOf(');
            writeTypeList(model, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.objectOf = function(model, ctx, cnt) {
            ctx.write(model.wzName + ': PropTypes.objectOf(');
            writeTypeList(model, ctx);
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.instanceOfParam = function(model, ctx, cnt) {
            var p = lineParser.parseNameValueRaw(model.wzName, model);
            ctx.write(p.name() + ': PropTypes.instanceOf(');
            ctx.write(p.value());
            if (model.isRequired) {
                ctx.w(').isRequired');
            }
            else {
                ctx.w(')');
            }
        };
        lc.shapeParam = function(model, ctx, cnt) {
            // log 'wizzi-codegen.statemts.t.reactPropTypes shapeParam model: ', model
            ctx.w(model.wzName + ': PropTypes.shape({');
            writePropList(model, ctx);
            if (model.isRequired) {
                ctx.w('}).isRequired');
            }
            else {
                ctx.w('})');
            }
        };
        lc.reactStyleParam = function(model, ctx, cnt) {
            ctx.w('style: stylePropType');
        };
        return function genReactPropType(prop, ctx, cnt) {
                // log 'wizzi-codegen.reactPropTypes', prop.wzName
                if (!prop.param) {
                    // default to string
                    // log 'wizzi-codegen.statemts.t.reactPropTypes < 1, prop.wzName:', prop.wzName, 'string'
                    ctx.write(prop.wzName + ': PropTypes.string');
                    if (prop.isRequired) {
                        ctx.write('.isRequired');
                    }
                }
                else {
                    var propParam = prop.param;
                    // log 'wizzi-codegen.statemts.t.reactPropTypes prop.wzName: ', prop.wzName, 'prop.param.wzElement', propParam.wzElement
                    // log 'prop', propParam.wzElement, lc[propParam.wzElement]
                    if (lc[propParam.wzElement]) {
                        lc[propParam.wzElement](prop, ctx, cnt);
                    }
                    else {
                        var name = propTypeFromWzElement(propParam.wzElement);
                        ctx.write(prop.wzName + ': PropTypes.' + name);
                        if (prop.isRequired) {
                            ctx.write('.isRequired');
                        }
                    }
                }
            };
    })();
    ;
    function writeTypeList(prop, ctx) {
        var pa = prop.param;
        if (!pa) {
            return ;
        }
        ctx.indent();
        var seen = false;
        var i, i_items=pa.params, i_len=pa.params.length, prm;
        for (i=0; i<i_len; i++) {
            prm = pa.params[i];
            if (seen) {
                ctx.w(',');
            }
            var name = propTypeFromWzElement(prm.wzElement);
            ctx.write('PropTypes.' + name);
            seen = true;
        }
        if (seen) {
            ctx.w();
        }
        ctx.deindent();
    }
    function writeValueList(prop, ctx) {
        var prm = prop.param;
        if (!prm) {
            return ;
        }
        ctx.indent();
        var seen = false;
        var i, i_items=prm.jsPropertyOrValues, i_len=prm.jsPropertyOrValues.length, value;
        for (i=0; i<i_len; i++) {
            value = prm.jsPropertyOrValues[i];
            if (seen) {
                ctx.w(',');
            }
            ctx.write(value.wzName);
            seen = true;
        }
        if (seen) {
            ctx.w();
        }
        ctx.deindent();
    }
    // TODO
    function writePropList(prop, ctx) {
        var prm = prop.param;
        if (!prm) {
            return ;
        }
        ctx.indent();
        var seen = false;
        var i, i_items=prm.props, i_len=prm.props.length, prop;
        for (i=0; i<i_len; i++) {
            prop = prm.props[i];
            if (seen) {
                ctx.w(',');
            }
            var name = 'string';
            if (prop.param) {
                name = propTypeFromWzElement(prop.param.wzElement);
            }
            ctx.write(prop.wzName + ': PropTypes.' + name);
            if (prop.isRequired) {
                ctx.write('.isRequired');
            }
            seen = true;
        }
        if (seen) {
            ctx.w();
        }
        ctx.deindent();
    }
    function propTypeFromWzElement(test) {
        if (test == 'stringParam') {
            return 'string';
        }
        else if (test == 'booleanParam') {
            return 'bool';
        }
        else if (test == 'numberParam') {
            return 'number';
        }
        else if (test == 'dateParam') {
            return 'date';
        }
        else if (test == 'functionParam') {
            return 'func';
        }
        else if (test == 'symbolParam') {
            return 'symbol';
        }
        else if (test == 'nodeParam') {
            return 'node';
        }
        else if (test == 'elementParam') {
            return 'element';
        }
        else if (test == 'exactParam') {
            return 'exact';
        }
        else if (test == 'anyParam') {
            return 'any';
        }
        else if (test == 'arrayParam') {
            return 'array';
        }
        else if (test == 'objectParam') {
            return 'object';
        }
        else {
            throw new TypeError('Unmanaged react prop type:' + test + ' in wizzi-codegen.statements.reactPropTypes');
        }
    }
    function generateParamConstraints(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
        if (hasCallback) {
            ctx.w("if (typeof(callback) !== 'function') {");
            ctx.w("    throw new Error(");
            ctx.w("        error('InvalidArgument', '" + methodName + "', 'The callback parameter must be a function. Received: ' + callback)");
            ctx.w("    );");
            ctx.w("};");
        }
        else if (hasOptionsCallback) {
            ctx.w("if (verify.isFunction(callback) === false && verify.isFunction(options) === true) {");
            ctx.indent();
            ctx.w("callback = options;");
            ctx.w("options = {};");
            ctx.deindent();
            ctx.w("}");
            ctx.w("if (verify.isFunction(callback) === false) {");
            ctx.w("    throw new Error(");
            ctx.w("        error('InvalidArgument', '" + methodName + "', 'The callback parameter must be a function. Received: ' + callback)");
            ctx.w("    );");
            ctx.w("};");
        }
        var i, i_items=parameters, i_len=parameters.length, p;
        for (i=0; i<i_len; i++) {
            p = parameters[i];
            var state = prmAnalizeParam(p);
            // log 'wizzi-codegen.js2.function.generateParamConstraints.state', state
            var j, j_items=state.candidates, j_len=state.candidates.length, item;
            for (j=0; j<j_len; j++) {
                item = state.candidates[j];
                var k, k_items=item.constraints, k_len=item.constraints.length, c;
                for (k=0; k<k_len; k++) {
                    c = item.constraints[k];
                    if (c.constraintType === 'required') {
                        if (c.paramType === 'string') {
                            ctx.w("if (verify.isNotEmpty(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a string', hasCallback, ctx);
                        }
                        else if (c.paramType === 'number') {
                            ctx.w("if (verify.isNumber(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a number', hasCallback, ctx);
                        }
                        else if (c.paramType === 'date') {
                            ctx.w("if (verify.isDate(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a date', hasCallback, ctx);
                        }
                        else if (c.paramType === 'boolean') {
                            ctx.w("if (verify.isBoolean(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a boolean', hasCallback, ctx);
                        }
                        else if (c.paramType === 'object') {
                            ctx.w("if (verify.isObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an object', hasCallback, ctx);
                        }
                        else if (c.paramType === 'array') {
                            ctx.w("if (verify.isArray(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array', hasCallback, ctx);
                        }
                        else if (c.paramType === 'arrayOrObject') {
                            ctx.w("if (verify.isArrayOrObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array or an object', hasCallback, ctx);
                        }
                        else if (c.paramType === 'function') {
                            ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
                        }
                        else if (c.paramType === 'any') {
                            // do nothing
                        }
                        else if (c.paramType === 'optionsCallback') {
                            // done already
                            // see above "if hasOptionsCallback" statement
                        }
                        else if (c.paramType === 'callback') {
                            // done already
                            // see above "if hasCallback" statement
                        }
                        else {
                            return callback(ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm));
                        }
                    }
                    if (c.constraintType === 'optional') {
                        if (c.paramType === 'string') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isNotEmpty(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a string', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'number') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isNumber(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a number', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'date') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isDate(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a date', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'boolean') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isBoolean(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a boolean', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'object') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an object', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'array') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isArray(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'arrayOrObject') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isArrayOrObject(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'an array or an object', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'function') {
                            ctx.w("if (verify.isNullOrUndefined(" + c.accessPath + ") === false) {");
                            ctx.indent();
                            ctx.w("if (verify.isFunction(" + c.accessPath + ") === false) {");
                            invalidParam(methodName, c.accessPath, 'a function', hasCallback, ctx);
                            ctx.deindent();
                            ctx.w("}");
                        }
                        else if (c.paramType === 'any') {
                            // do nothing
                        }
                        else if (c.paramType === 'optionsCallback') {
                            // done already
                            // see above "if hasOptionsCallback" statement
                        }
                        else if (c.paramType === 'callback') {
                            // done already
                            // see above "if hasCallback" statement
                        }
                        else {
                            return callback(ctx.error(myname + '.generateParamConstraints. Unknown param type: ' + c.paramType, item.prm));
                        }
                    }
                }
            }
        }
        return callback(null, null);
    }
    function invalidParam(methodName, name, type, hasCallback, ctx) {
        // log 'wizzi-codegen.js2.function.invalidParam.methodName', methodName, name, type
        if (hasCallback) {
            ctx.w("    return callback(error(");
            ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
            ctx.w("    ));");
            ctx.w("}");
        }
        else if (methodName === 'ctor' || methodName === 'iife') {
            ctx.w("    throw new Error(error(");
            ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
            ctx.w("    ));");
            ctx.w("}");
        }
        else {
            ctx.w("    return error(");
            ctx.w("        'InvalidArgument', '" + methodName + "', { parameter: '" + name + "', message: 'The " + name + " parameter must be " + type + ". Received: ' + " + name + " }");
            ctx.w("    );");
            ctx.w("}");
        }
    }
    function prmAnalizeParam(prm) {
        var state = {
            candidates: []
        };
        var candidate = {
            prm: prm, 
            accessPath: prm.wzName, 
            parent: null, 
            isRequired: false, 
            constraints: []
        };
        state.candidates.push(candidate);
        prmSelectAnalizer(candidate, state);
        return state;
    }
    function prmSelectAnalizer(candidate, state) {
        // log 'wizzi-codegen.js2.paramAnalizer.prmSelectAnalizer.candidate.name', candidate.prm.wzElement, candidate.prm.wzName
        if (candidate.prm.wzElement === 'objectParam') {
            prmAnalizeObject(candidate, state);
        }
        else if (candidate.prm.wzElement === 'arrayParam') {
            prmAnalizeArray(candidate, state);
        }
        else {
            prmAnalizeLeaf(candidate, state);
        }
    }
    function prmAnalizeObject(candidate, state) {
        prmAnalizeLeaf(candidate, state);
        // log 'wizzi-codegen.js2.paramAnalizer.prmAnalizeObject.candidate.name', candidate.prm.wzElement, candidate.prm.wzName
        var i, i_items=candidate.prm.params, i_len=candidate.prm.params.length, item;
        for (i=0; i<i_len; i++) {
            item = candidate.prm.params[i];
            var subcandidate = {
                prm: item, 
                accessPath: candidate.accessPath + '.' + item.wzName, 
                parent: candidate, 
                isRequired: false, 
                constraints: []
            };
            state.candidates.push(subcandidate);
            prmSelectAnalizer(subcandidate, state);
        }
    }
    function prmAnalizeArray(candidate, state) {
        prmAnalizeLeaf(candidate, state);
        if (candidate.prm.params.length == 1) {
            // TODO assume arrayOf ???
        }
    }
    function prmAnalizeLeaf(candidate, state) {
        // log 'wizzi-codegen.js2.paramAnalizer.prmAnalizeLeaf.candidate.name', candidate.prm.wzElement, candidate.prm.wzName, candidate.accessPath
        if (candidate.prm.isRequired || candidate.prm.isOptional) {
            candidate.constraints.push({
                constraintType: (candidate.prm.isRequired ? 'required' : 'optional'), 
                paramName: candidate.prm.wzName, 
                paramType: prmTypeFromElement(candidate.prm.wzElement), 
                accessPath: candidate.accessPath
            });
            candidate.isRequired = true;
            if (candidate.prm.isRequired) {
                requireParents(candidate);
            }
        }
    }
    function requireParents(candidate) {
        var ancestor = candidate.parent;
        while (ancestor) {
            if (!ancestor.isRequired) {
                ancestor.constraints.push({
                    constraintType: 'required', 
                    paramName: ancestor.prm.wzName, 
                    paramType: prmTypeFromElement(ancestor.prm.wzElement), 
                    accessPath: ancestor.accessPath
                });
                ancestor.isRequired = true;
            }
            ancestor = ancestor.parent;
        }
    }
    function prmTypeFromElement(wzElement) {
        if (wzElement === 'stringParam') {
            return 'string';
        }
        else if (wzElement === 'numberParam') {
            return 'number';
        }
        else if (wzElement === 'booleanParam') {
            return 'boolean';
        }
        else if (wzElement === 'anyParam') {
            return 'any';
        }
        else if (wzElement === 'functionParam') {
            return 'function';
        }
        else if (wzElement === 'objectParam') {
            return 'object';
        }
        else if (wzElement === 'arrayParam') {
            return 'array';
        }
        else if (wzElement === 'arrayOrObjectParam') {
            return 'arrayOrObject';
        }
        else if (wzElement === 'callbackParam') {
            return 'callback';
        }
        else if (wzElement === 'optionsCallbackParam') {
            return 'optionsCallback';
        }
    }
};
