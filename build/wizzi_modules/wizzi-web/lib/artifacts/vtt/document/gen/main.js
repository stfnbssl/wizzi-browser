/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\vtt\document\gen\main.js.ittf
*/
'use strict';
var verify = require('wizzi-utils').verify;

var myname = 'wizzi-web.lib.artifacts.vtt.document.gen.main';

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
    // check the model is a wizzi model of type 'vtt'
    if (model.wzElement !== 'vtt') {
        return callback(ctx.error(myname + " error: the model paramater should be a 'vtt' wizzi model", model));
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
stm.vtt = function(model, ctx, callback) {
    ctx.w( 'WEBVTT' );
    ctx.w();
    writeComments(ctx, model);
    genItems(model.styles, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        genItems(model.regions, ctx, {
            indent: false, 
            from: 0
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            genItems(model.vttCues, ctx, {
                indent: false, 
                from: 0
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                return callback(null);
            });
        });
    });
};
stm.vttCue = function(model, ctx, callback) {
    writeComments(ctx, model);
    writeCueTime( ctx, model );
    if (typeof model.region !== 'undefined') {
        ctx.write( ' region:' + model.region);
    }
    if (typeof model.direction !== 'undefined') {
        ctx.write( ' vertical:' + model.direction);
    }
    if (typeof model.line !== 'undefined') {
        ctx.write( ' line:' + model.line);
    }
    if (typeof model.position !== 'undefined') {
        ctx.write( ' position:' + model.position);
    }
    if (typeof model.size !== 'undefined') {
        ctx.write( ' size:' + model.size);
    }
    if (typeof model.align !== 'undefined') {
        ctx.write( ' align:' + model.align);
    }
    if (typeof model.lineAlign !== 'undefined') {
        ctx.write( ' line-align:' + model.lineAlign);
    }
    if (typeof model.positionAlign !== 'undefined') {
        ctx.write( ' position-align:' + model.positionAlign);
    }
    ctx.w();
    genItems(model.cueTexts, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w();
        return callback(null);
    });
};
stm.cueText = function(model, ctx, callback) {
    ctx.write( model.wzName );
    var saveIsInsideText = !!ctx.isInsideText;
    ctx.isInsideText = true;
    genItems(model.cueTexts, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (saveIsInsideText == false) {
            ctx.w();
        }
        ctx.isInsideText = saveIsInsideText;
        return callback(null);
    });
};
stm.p = function(model, ctx, callback) {
    ctx.write( '- ' + model.wzName );
    var saveIsInsideText = !!ctx.isInsideText;
    ctx.isInsideText = true;
    genItems(model.cueTexts, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (saveIsInsideText == false) {
            ctx.w();
        }
        ctx.isInsideText = saveIsInsideText;
        return callback(null);
    });
};
stm.u = function(model, ctx, callback) {
    writeCueText(ctx, model, 'u', callback);
};
stm.i = function(model, ctx, callback) {
    writeCueText(ctx, model, 'i', callback);
};
stm.b = function(model, ctx, callback) {
    writeCueText(ctx, model, 'b', callback);
};
stm.c = function(model, ctx, callback) {
    writeCueText(ctx, model, 'c', callback);
};
stm.voiceSpan = function(model, ctx, callback) {
    writeCueText(ctx, model, 'v', callback);
};
stm.lang = function(model, ctx, callback) {
    writeCueText(ctx, model, 'lang', callback);
};
stm.time = function(model, ctx, callback) {
    ctx.write( '<' + tag );
    ctx.write(formatTime( model.wzName ));
    ctx.w('<');
};
stm.componentClass = function(model, ctx, callback) {
    ctx.write( '.' + model.wzName );
    return callback(null);
};
stm.style = function(model, ctx, callback) {
    ctx.w( 'STYLE' );
    genItems(model.rules, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.w();
        return callback(null);
    });
};
stm.cueRule = function(model, ctx, callback) {
    ctx.w( '::cue(' + model.wzName + ') {' );
    ctx.indent();
    async.mapSeries(model.getProperties(), getWriteProperty(ctx), function() {
        ctx.deindent();
        ctx.w('}');
        return callback(null);
    });
};
function getWriteProperty(ctx) {
    return function writeProperty(prop, callback) {
            var name = prop.name;
            var value = prop.value;
            if (name === "appearance") {
                ctx.w("-webkit-appearance: " + value  + ";");
                ctx.w("-moz-appearance: " + value  + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "background-image") {
                if (value && value.indexOf && value.indexOf("linear-gradient") >= 0) {
                    ctx.w(name + ": " + value.replace("linear-gradient", "-webkit-linear-gradient") + ";");
                    ctx.w(name + ": " + value.replace("linear-gradient", "-moz-linear-gradient") + ";");
                    ctx.w(name + ": " + value.replace("linear-gradient", "-o-linear-gradient") + ";");
                    ctx.w(name + ": " + value.replace("linear-gradient", "-ms-linear-gradient") + ";");
                    ctx.w(name + ": " + value + ";");
                }
                else {
                    ctx.w(name + ": " + value + ";");
                }
            }
            else if (name === "border-radius") {
                ctx.w("-webkit-border-radius: " + value + ";");
                ctx.w("-khtml-border-radius: " + value + ";");
                ctx.w("-moz-border-radius: " + value + ";");
                ctx.w("-o-border-radius: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "box-shadow") {
                ctx.w("-webkit-box-shadow: " + value + ";");
                ctx.w("-moz-box-shadow: " + value + ";");
                ctx.w("-o-box-shadow: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "display" && value === 'flex') {
                ctx.w(name + ": -ms-flexbox;");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex") {
                ctx.w("-ms-flex: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flexbox") {
                ctx.w("-webkit-box: " + value + ";");
                ctx.w("-webkit-flex: " + value + ";");
                ctx.w("-moz-box: " + value + ";");
                ctx.w("-ms-flexbox: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-basis") {
                ctx.w("-ms-flex-preferred-size: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-grow") {
                ctx.w("-ms-flex-positive: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-wrap") {
                ctx.w("-ms-flex-wrap: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "order") {
                ctx.w("-ms-flex-order: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "flex-flow") {
                ctx.w("-webkit-flex-flow: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "justify-content") {
                ctx.w("-webkit-justify-content: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "transition") {
                ctx.w("-webkit-transition: " + value + ";");
                ctx.w("-moz-transition: " + value + ";");
                ctx.w("-o-transition: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else if (name === "user-select") {
                ctx.w("-webkit-user-select: " + value + ";");
                ctx.w("-moz-user-select: " + value + ";");
                ctx.w("-ms-user-select: " + value + ";");
                ctx.w("-o-user-select: " + value + ";");
                ctx.w(name + ": " + value + ";");
            }
            else {
                ctx.w(name + ": " + value + ";");
            }
            process.nextTick(callback);
        };
}
stm.region = function(model, ctx, callback) {
    ctx.w( 'REGION' );
    ctx.w( 'id:' + model.wzName );
    if (typeof model.width !== 'undefined') {
        ctx.w( 'width:' + model.width);
    }
    if (typeof model.lines !== 'undefined') {
        ctx.w( 'lines:' + model.lines);
    }
    if (typeof model.regionAnchor !== 'undefined') {
        ctx.w( 'regionanchor:' + model.regionAnchor);
    }
    if (typeof model.viewportAnchor !== 'undefined') {
        ctx.w( 'viewportanchor:' + model.viewportAnchor);
    }
    if (typeof model.scroll !== 'undefined') {
        ctx.w( 'scroll:' + model.scroll);
    }
    ctx.w();
    return callback(null);
};
function writeComments(ctx, model) {
    if (model.comments.length == 1) {
        ctx.w( 'NOTE ' + model.comments[0].wzName );
        ctx.w();
    }
    if (model.comments.length > 1) {
        ctx.w( 'NOTE' );
        var i, i_items=model.comments, i_len=model.comments.length, item;
        for (i=0; i<i_len; i++) {
            item = model.comments[i];
            ctx.w( item.wzName );
        }
        ctx.w();
    }
}
function writeCueText(ctx, model, tag, callback) {
    ctx.write( '<' + tag );
    genItems(model.componentClasses, ctx, {
        indent: false, 
        from: 0
    }, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        ctx.write( '>' + model.wzName );
        var saveIsInsideText = !!ctx.isInsideText;
        ctx.isInsideText = true;
        genItems(model.cueTexts, ctx, {
            indent: false, 
            from: 0
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.write( '</' + tag + '>' );
            if (saveIsInsideText == false) {
                ctx.w();
            }
            ctx.isInsideText = saveIsInsideText;
            return callback(null);
        });
    });
}
function writeCueTime(ctx, model) {
    if (typeof model.id !== 'undefined') {
        ctx.w( model.id );
    }
    var ss = model.wzName.split(' ').filter(function(el) {
        return el != null;
    });
    ctx.write(formatTime( ss.length == 1 ? 0 : ss[0] ));
    ctx.write(' --> ');
    ctx.write(formatTime( ss.length == 1 ? ss[0] : ss[1] ));
}
function formatTime(t) {
    var ss = t.split(':');
    if (ss.length == 1) {
        return '00:00:' + zeroPad(ss[0], 2) + '.000';
    }
    else if (ss.length == 2) {
        return '00:' + zeroPad(ss[0], 2) + ':' + zeroPad(ss[1], 2) + '.000';
    }
    else if (ss.length == 3) {
        return zeroPad(ss[0], 2) + ':' + zeroPad(ss[1], 2) + ':' + zeroPad(ss[2], 2);
    }
    else {
        return zeroPad(ss[0], 2) + ':' + zeroPad(ss[0], 2) + ':' + zeroPad(ss[1], 2) + ':' + zeroPad(ss[2], 3);
    }
}
function zeroPad(n, len) {
    n = parseInt(n);
    if (len == 2) {
        return n > 9 ? n : '0' + n;
    }
    else {
        return n > 99 ? n : n > 9 ? '0' + n : '00' + n;
    }
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
        method: 'wizzi-web.lib.artifacts.vtt.document.gen.main.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
