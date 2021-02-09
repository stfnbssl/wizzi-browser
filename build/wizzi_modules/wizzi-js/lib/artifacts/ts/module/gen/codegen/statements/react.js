/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\ts\module\gen\codegen\statements\react.js.ittf
*/
'use strict';
var util = require('util');
var verify = require('wizzi-utils').verify;
var node = require('wizzi-utils').node;
var u = require('../../../../../js/module/gen/codegen/util/stm');
var method;

var myname = 'wizzi-js.artifacts.ts.module.gen.codegen.statements.react';
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
                    process.nextTick(function() {
                        repeater_1(index_1 + 1);
                    });
                });
            }
            repeater_1(0);
            function next_1() {
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
        // log 'reactComponent, model.wzElement', model.wzElement
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
        else if (model.wzElement == 'property') {
            ctx.w(model.wzName + ';');
            return callback(null, null);
        }
        else if (model.wzElement == 'arrowfunction') {
            ctx.__is_react_class = true;
            ctx.w(model.wzName + ' = (' + model.paramNames.join(', ') + ') => {');
            ctx.indent();
            generateParams(model.wzName, model.constrainedParams, model.hasCallbackParam, model.hasOptionsCallbackParam, ctx, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                writeMethodProps(model, ctx);
                ctx.deindent();
                writeIndented(model.statements, ctx, cnt, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w('}');
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
                ctx.w(', ');
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
                ctx.w(', ');
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
    function generateReturnType(model, ctx) {
        var rtype = u.extractTS(model, 'typeReturn');
        if (rtype) {
            cnt.stm[rtype.wzElement](rtype, ctx, () => {});
        }
    }
    function generateParams(methodName, parameters, hasCallback, hasOptionsCallback, ctx, callback) {
        return callback(null, null);
    }
};
