/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\scss\document\gen\main.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;

var myname = 'wizzi-web.lib.artifacts.scss.document.gen.main';

var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;

var lineParser = require('../../../util/lineParser');

var md = module.exports = {};
var stm = {};
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
    // check the model is a wizzi model of type 'scss'
    if (model.wzElement !== 'scss') {
        return callback(ctx.error(myname + " error: the model paramater should be a 'scss' wizzi model", model));
    }
    getGenItem(ctx)(model, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        console.log(myname, 'exit err', err);
        return callback(null, ctx);
    })
};
function getGenItem(ctx) {
    return function(model, callback) {
            if (stm[model.wzElement]) {
                // log myname, 'known element', model.wzElement
                stm[model.wzElement](model, ctx, function(err, done) {
                    if (err) {
                        return callback(err);
                    }
                    return callback(null);
                });
            }
            else {
                callback(ctx.error(myname + " error: model element not managed: " + model.wzElement, model));
            }
        };
}
function genItems(items, ctx, options, callback) {
    var opt = options || {},
        from = opt.from || 0,
        indent = typeof opt.indent === 'undefined' ? true : opt.indent;
    if (indent) {
        ctx.indent();
    }
    var goitems = [];
    for (var i = from; i < items.length; i++) {
        if (options.sep && i > from) {
            goitems.push({
                wzElement: 'separator', 
                wzName: options.sep
            });
        }
        goitems.push(items[i]);
    }
    async.mapSeries(goitems, getGenItem(ctx), function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (indent) {
            ctx.deindent();
        }
        return callback(null);
    });
}
stm.scss = function(model, ctx, callback) {
    genItems(model.rules, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        return callback(null);
    });
};
stm.typeRule = function(model, ctx, callback) {
    writeOpenRule( ctx, '', model );
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w( '}' );
        return callback(null);
    });
};
stm.idRule = function(model, ctx, callback) {
    writeOpenRule( ctx, '#', model );
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w( '}' );
        return callback(null);
    });
};
stm.classRule = function(model, ctx, callback) {
    writeOpenRule( ctx, '.', model );
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w( '}' );
        return callback(null);
    });
};
stm.parentRule = function(model, ctx, callback) {
    ctx.w( model.getValue() + ' {');
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w( '}' );
        return callback(null);
    });
};
stm.combinator = function(model, ctx, callback) {
    if (model.pseudoClasses.length < 1) {
        callback(ctx.error(myname + " error: combinator must have psedoClasses", model));
    }
    ctx.write( '>' );
    var i, i_items=model.pseudoClasses, i_len=model.pseudoClasses.length, item;
    for (i=0; i<i_len; i++) {
        item = model.pseudoClasses[i];
        ctx.write( ' :' + item.wzName );
        if (item.rules.length > 0) {
            ctx.write( '(' + item.paramSelectorNames.join(', ') + ')' );
        }
    }
    ctx.w( ' {' );
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w( '}' );
        return callback(null);
    });
};
stm.propertyRule = function(model, ctx, callback) {
    var p = lineParser.parseNameValueRaw(model.wzName, model);
    if (p.hasValue()) {
        ctx.w( p.name() + ': ' + p.value() + ';' );
    }
    else {
        ctx.write( p.name() );
    }
    return callback(null);
};
stm.importRule = function(model, ctx, callback) {
    ctx.w( '@import ' + model.wzName + ';');
    return callback(null);
};
stm.extendRule = function(model, ctx, callback) {
    ctx.w( '@extend ' + model.wzName + ';');
    return callback(null);
};
stm.includeRule = function(model, ctx, callback) {
    ctx.write( '@include ' + model.wzName);
    if (model.rules.length > 0) {
        ctx.write( '(' );
        genItems(model.rules, ctx, {
            indent: false, 
            from: 0, 
            sep: 'comma'
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            if (model.block) {
                ctx.w( ') {' );
                genItems(model.block.rules, ctx, {
                    indent: true, 
                    from: 0
                }, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    ctx.w( '}' );
                    return callback(null);
                });
            }
            else {
                ctx.w( ');' );
                return callback(null);
            }
        });
    }
    else {
        if (model.block) {
            ctx.w( ' {' );
            genItems(model.block.rules, ctx, {
                indent: true, 
                from: 0
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.w( '}' );
                return callback(null);
            });
        }
        else {
            ctx.w();
            return callback(null);
        }
    }
};
stm.mixinRule = function(model, ctx, callback) {
    ctx.w( '@mixin ' + model.wzName + '(' + model.paramNames.join(', ') + ') {');
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        return callback(null);
    });
};
stm.forRule = function(model, ctx, callback) {
    ctx.w( '@for ' + model.wzName + ' {');
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        return callback(null);
    });
};
stm.eachRule = function(model, ctx, callback) {
    ctx.w( '@each ' + model.wzName + ' {');
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        return callback(null);
    });
};
stm.whileRule = function(model, ctx, callback) {
    ctx.w( '@while ' + model.wzName + ' {');
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        return callback(null);
    });
};
stm.functionRule = function(model, ctx, callback) {
    ctx.w( '@function ' + model.wzName + '(' + model.paramNames.join(', ') + ') {');
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w('}');
        return callback(null);
    });
};
stm.returnRule = function(model, ctx, callback) {
    ctx.w( '@return ' + model.wzName + ';');
    return callback(null);
};
stm.callRule = function(model, ctx, callback) {
    ctx.write( model.wzName + '(');
    genItems(model.rules, ctx, {
        indent: true, 
        from: 0, 
        sep: 'comma'
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.write(')');
        return callback(null);
    });
};
stm.setRule = function(model, ctx, callback) {
    var p = lineParser.parseNameValueRaw(model.wzName, model);
    ctx.w( '$' + p.name() + ': ' + p.value() + ';' );
    return callback(null);
};
stm.separator = function(model, ctx, callback) {
    ctx.write( getSeparator(model.wzName) );
    return callback(null);
};
function writeOpenRule(ctx, prefix, model) {
    ctx.write( prefix );
    ctx.write( model.wzName || '');
    if (model.addedSelectorNames.length > 0) {
        ctx.write( ' ' + model.addedSelectorNames.join(' '));
    }
    ctx.w( ' {' );
}
function getSeparator(sep) {
    return sep === 'comma' ? ', ' : sep;
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
        method: 'wizzi-web.lib.artifacts.scss.document.gen.main.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
