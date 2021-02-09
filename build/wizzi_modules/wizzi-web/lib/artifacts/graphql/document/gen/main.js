/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\graphql\document\gen\main.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;
var myname = 'wizzi-web.lib.artifacts.graphql.schema.gen.main';

var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;

var lineParser = require('../../../util/lineParser');

var md = module.exports = {};
md.stm = {};
md.gen = function gen(model, ctx, callback) {
    if (typeof(callback) !== 'function') {
        throw new Error(
            error('InvalidArgument', 'gen', 'The callback parameter must be a function. Received: ' + callback)
        );
    };
    if (verify.isObject(model) === false) {
        return callback(error(
            'InvalidArgument', 'gen', { parameter: 'model', message: 'The model parameter must be an object. Received: ' + model }
        ));
    }
    if (verify.isObject(ctx) === false) {
        return callback(error(
            'InvalidArgument', 'gen', { parameter: 'ctx', message: 'The ctx parameter must be an object. Received: ' + ctx }
        ));
    }
    // log myname, 'enter', 'ctx.values', ctx.values
    // check the model is a wizzi model of type 'graphql'
    if (model.wzElement !== 'graphql') {
        return callback(ctx.error(myname + " error: the model paramater should be an 'graphql' wizzi model", model));
    }
    md.graphql(model, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        return callback(null, ctx);
    });
};
md.graphql = function(model, ctx, callback) {
    async.mapSeries(model.typeDefs, md.typeDef(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        async.mapSeries(model.operations, md.operation(ctx), function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    });
};
md.typeDef = function(ctx) {
    return function(model, callback) {
            var method = md[model.wzElement];
            method(model, ctx, callback);
        };
};
md.scalarTypeDef = function(model, ctx, callback) {
    ctx.w( 'scalar ' + model.wzName );
    return callback(null);
};
md.objectTypeDef = function(model, ctx, callback) {
    var impl = [];
    var i, i_items=model.ximplements, i_len=model.ximplements.length, item;
    for (i=0; i<i_len; i++) {
        item = model.ximplements[i];
        impl.push(item.wzName);
    }
    var implString = impl.length > 0 ? ' implements ' + impl.join(' & ') : '';
    ctx.w( 'type ' + model.wzName + implString + ' {' );
    ctx.indent();
    async.mapSeries(model.fieldDefs, md.fieldDef(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w( '}' );
        return callback(null);
    });
};
md.fieldDef = function(ctx) {
    return function(model, callback) {
            if (model.wzElement === 'method') {
                return md.method(model, ctx, callback);
            }
            else {
                var isList = model.wzElement === 'arrayType';
                var type = model.type;
                if (isList && model.itemType) {
                    var requiredChar = model.itemType.isRequired ? '!' : '';
                    type = '[' + model.itemType.wzName + requiredChar + ']';
                }
                var args = [];
                console.log('fieldDef', model.wzElement, model.wzName);
                var i, i_items=model.argumentDefs, i_len=model.argumentDefs.length, item;
                for (i=0; i<i_len; i++) {
                    item = model.argumentDefs[i];
                    args.push(getTypedArgumentDeclaration(item));
                }
                var argsString = args.length > 0 ? '(' + args.join(', ') + ')' : '';
                var directiveString = model.isDeprecated ? ' @deprecated' : '';
                var requiredChar = model.isRequired ? '!' : '';
                ctx.w( model.wzName + argsString + ': ' + type + requiredChar + directiveString);
                return callback(null);
            }
        };
};
md.method = function(model, ctx, callback) {
    var args = [];
    var i, i_items=model.fieldDefs, i_len=model.fieldDefs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.fieldDefs[i];
        args.push(getTypedArgumentDeclaration(item));
    }
    ctx.write( model.wzName + '(' + args.join(', ') + ') ' );
    if (model.selectionSet) {
        md.selectionSet(model.selectionSet, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }
    else {
        ctx.w(': ' + model.type);
        return callback(null);
    }
};
md.interfaceTypeDef = function(model, ctx, callback) {
    ctx.w( 'interface ' + model.wzName + ' {' );
    ctx.indent();
    async.mapSeries(model.fieldDefs, md.fieldDef(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w( '}' );
        return callback(null);
    });
};
md.unionTypeDef = function(model, ctx, callback) {
    ctx.write( 'union ' + model.wzName + ' = ');
    var i, i_items=model.unionMemberTypes, i_len=model.unionMemberTypes.length, item;
    for (i=0; i<i_len; i++) {
        item = model.unionMemberTypes[i];
        if (i > 0) {
            ctx.write(' | ');
        }
        ctx.write( item.wzName );
    }
    ctx.w();
    return callback(null);
};
md.enumTypeDef = function(model, ctx, callback) {
    ctx.w( 'enum ' + model.wzName + ' {' );
    ctx.indent();
    var i, i_items=model.enumValueDefs, i_len=model.enumValueDefs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.enumValueDefs[i];
        ctx.w( item.wzName );
    }
    ctx.deindent();
    ctx.w( '}' );
    return callback(null);
};
md.inputObjectTypeDef = function(model, ctx, callback) {
    ctx.write( 'input ' + model.wzName + ' ');
    if (model.objectValueDef) {
        md.objectValueDef(model.objectValueDef, ctx, callback);
    }
    else {
        return callback(null);
    }
};
md.objectValueDef = function(model, ctx, callback) {
    ctx.w('{');
    ctx.indent();
    async.mapSeries(model.valueDefs, md.valueDef(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    });
};
md.valueDef = function(ctx) {
    return function(model, callback) {
            console.log('valueDef', model.wzElement, model.wzName);
            ctx.w( model.wzName + ': ' + model.type);
            return callback(null);
        };
};
md.directiveDef = function(model, ctx, callback) {
    var args = [];
    console.log('fieldDef', model.wzElement, model.wzName);
    var i, i_items=model.argumentDefs, i_len=model.argumentDefs.length, item;
    for (i=0; i<i_len; i++) {
        item = model.argumentDefs[i];
        args.push(getTypedArgumentDeclaration(item));
    }
    var argsString = args.length > 0 ? '(' + args.join(', ') + ')' : '';
    var loc = [];
    var i, i_items=model.directiveLocations, i_len=model.directiveLocations.length, item;
    for (i=0; i<i_len; i++) {
        item = model.directiveLocations[i];
        loc.push(item.wzName);
    }
    var locString = loc.length > 0 ? ' on ' + loc.join(' | ') : '';
    ctx.w( 'directive ' + model.wzName + argsString + locString );
    return callback(null);
};
md.operation = function(ctx) {
    return function(model, callback) {
            console.log('calling operation', model.wzElement);
            var method = md[model.wzElement];
            method(model, ctx, callback);
        };
};
md.query = function(model, ctx, callback) {
    var vars = [];
    var i, i_items=model.variables, i_len=model.variables.length, item;
    for (i=0; i<i_len; i++) {
        item = model.variables[i];
        vars.push(getVariableDeclaration(item));
    }
    var varsDeclare = vars.length > 0 ? '(' + vars.join(', ') + ')' : '';
    ctx.w( 'query' + (model.wzName.length > 0 ? ' ' + model.wzName : '') + varsDeclare + ' {');
    ctx.indent();
    if (model.selectionSet) {
        md.selectionSet(model.selectionSet, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w( '}' );
            return callback(null);
        });
    }
    else {
        ctx.deindent();
        ctx.w( '}' );
        return callback(null);
    }
};
md.selectionSet = function(model, ctx, callback) {
    console.log('selectionSet', model.selections.length);
    if (model.wzName.length > 0) {
        ctx.write( model.wzName);
        writeArguments(model.xarguments, ctx);
        ctx.write( ' ' );
    }
    ctx.w( '{' );
    ctx.indent();
    async.mapSeries(model.selections, md.selection(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.deindent();
        ctx.w( '}' );
        return callback(null);
    });
};
md.selection = function(ctx) {
    return function(model, callback) {
            console.log('calling selection', model.wzElement);
            var method = md[model.wzElement];
            method(model, ctx, callback);
        };
};
md.field = function(model, ctx, callback) {
    if (model.alias && model.alias.length > 0) {
        ctx.write( model.alias + ': ' );
    }
    ctx.write( model.wzName );
    writeArguments(model.xarguments, ctx);
    ctx.w();
    return callback(null);
};
md.fragmentSpread = function(model, ctx, callback) {
    var directiveString = getDirectives(model.directives);
    ctx.w( '...' + model.wzName + directiveString );
    async.mapSeries(model.selections, md.selection(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};
md.inlineFragment = function(model, ctx, callback) {
    var directiveString = getDirectives(model.directives);
    ctx.w( '... on ' + model.wzName + directiveString + ' {');
    ctx.indent();
    if (model.selectionSet) {
        md.selectionSet(model.selectionSet, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            return callback(null);
        });
    }
    else {
        return callback(null);
    }
};
md.fragment = function(model, ctx, callback) {
    var typeCondition = model.typeCondition && model.typeCondition.length > 0 ? ' on ' + model.typeCondition : '';
    ctx.write( 'fragment ' + model.wzName + typeCondition + ' ' );
    if (model.selectionSet) {
        md.selectionSet(model.selectionSet, ctx, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            return callback(null);
        });
    }
    else {
        ctx.w();
        return callback(null);
    }
};
md.xargument = function(ctx) {
    return function(model, callback) {
        };
};
function getDirectives(directives, ctx) {
    var ret = [];
    var i, i_items=directives, i_len=directives.length, d;
    for (i=0; i<i_len; i++) {
        d = directives[i];
        var args = [];
        var j, j_items=d.arguments, j_len=d.arguments.length, a;
        for (j=0; j<j_len; j++) {
            a = d.arguments[j];
            args.push(getArgumentDeclaration(a));
        }
        var argsString = args.length > 0 ? '(' + args.join(', ') + ')' : '';
        ret.push('@' + model.wzName + argsString);
    }
    return ret.join(' ');
}
md.valueCtx = function(ctx) {
    return function(model, callback) {
            md.value(model, ctx, callback);
        };
};
md.value = function(model, ctx, callback) {
    var method = md[model.wzElement];
    if (method) {
        method(model, ctx, callback);
    }
    else {
        return callback(null);
    }
};
md.arrayValue = function(model, ctx, callback) {
    var saveState = ctx.genState;
    ctx.genState = 'arrayValue';
    ctx.write( '[' );
    async.mapSeries(model.values, md.valueCtx(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.write( ']' );
        ctx.genState = saveState;
        return callback(null);
    });
};
md.objectValue = function(model, ctx, callback) {
    var saveState = ctx.genState;
    ctx.genState = 'objectValue';
    ctx.write( '{' );
    async.mapSeries(model.values, md.valueCtx(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.write( '}' );
    });
    ctx.genState = saveState;
    return callback(null);
};
function writeArguments(args, ctx) {
    // sync method
    // no need to use include 'schema' in an argument fragment
    if (args.length == 0) {
        return ;
    }
    ctx.write('(');
    var i, i_items=args, i_len=args.length, arg;
    for (i=0; i<i_len; i++) {
        arg = args[i];
        if (i > 0) {
            ctx.write( ', ' );
        }
        if (arg.value) {
            ctx.write( arg.wzName + ': ');
            writeValue(arg.value, ctx);
        }
        else {
            var p = lineParser.parseNameValueRaw(arg.wzName, arg);
            var name = p.name();
            var value = p.value();
            ctx.write( name + ': ' + value );
        }
    }
    ctx.write(')');
}
function writeValue(model, ctx) {
    if (model.wzElement === 'arrayValue') {
        writeArrayValue(model, ctx);
    }
    else if (model.wzElement === 'objectValue') {
        writeObjectValue(model, ctx);
    }
    else if (model.wzElement === 'objectField') {
        writeObjectField(model, ctx);
    }
}
function writeArrayValue(model, ctx) {
    var saveState = ctx.genState;
    ctx.genState = 'arrayValue';
    ctx.write( '[' );
    var i, i_items=model.values, i_len=model.values.length, item;
    for (i=0; i<i_len; i++) {
        item = model.values[i];
        if (i > 0) {
            ctx.write(', ');
        }
        writeValue(item, ctx);
    }
    ctx.write( ']' );
    ctx.genState = saveState;
}
function writeObjectValue(model, ctx) {
    var saveState = ctx.genState;
    ctx.genState = 'objectValue';
    ctx.write( '{' );
    var i, i_items=model.values, i_len=model.values.length, item;
    for (i=0; i<i_len; i++) {
        item = model.values[i];
        if (i > 0) {
            ctx.write(', ');
        }
        writeValue(item, ctx);
    }
    ctx.write( '}' );
    ctx.genState = saveState;
}
function writeObjectField(model, ctx) {
    if (ctx.genState === 'objectValue') {
    }
    else {
        ctx.write( model.wzName );
    }
}
function getArgumentDeclaration(model, callback) {
    var p = lineParser.parseNameValueRaw(model.wzName, model);
    var name = p.name();
    var value = p.value();
    var ret = [ name ];
    if (value) {
        ret.push(' : ');
        ret.push( value );
        return callback(null, ret.join(''));
    }
    else {
        if (model.value) {
            md.value(model.value, ctx, function(err, result) {
                if (err) {
                    return callback(err);
                }
                ret.push(' : ');
                ret.push( result );
                return callback(null, ret.join(''));
            });
        }
    }
}
function getTypedArgumentDeclaration(model) {
    var type = model.isList ? '[' + model.type + ']' : model.type;
    type = model.isRequired ? type + '!' : type;
    var ret = [ model.wzName ];
    if (model.type) {
        ret.push(' : ');
        ret.push(type);
    }
    return ret.join('');
}
function getVariableDeclaration(model) {
    var name = '$' + model.wzName;
    var type = model.type;
    var ret = [ name ];
    if (type) {
        ret.push(' : ');
        ret.push(type);
    }
    return ret.join('');
}
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: 'wizzi-web@0.7.8.lib.artifacts.graphql.document.gen.main.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
