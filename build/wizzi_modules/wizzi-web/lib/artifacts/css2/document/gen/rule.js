/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\css2\document\gen\rule.js.ittf
*/
'use strict';
var util = require('util');
var async = require('async');
var verify = require('wizzi-utils').verify;
var lineParser = require('../../../util/lineParser');
var md = module.exports = {};
var myname = 'css.document.rule';
md.load = function(cnt) {
    cnt.stm.elementRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(cnt, model, ctx, callback);;
        }
        else {
            callback();
        }
    };
    cnt.stm.classRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(cnt, model, ctx, callback);;
        }
        else {
            callback();
        }
    };
    cnt.stm.idRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(cnt, model, ctx, callback);;
        }
        else {
            callback();
        }
    };
    cnt.stm.gtRule = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(cnt, model, ctx, callback);;
        }
        else {
            callback();
        }
    };
    cnt.stm.ampersand = function(model, ctx, callback) {
        if (model.hasContent()) {
            return writeRule(cnt, model, ctx, callback);;
        }
        else {
            return callback(null);
        }
    };
    cnt.stm.placeholder = function(model, ctx, callback) {
        writeRule(cnt, model, ctx, callback);
    };
    cnt.stm.media = function(model, ctx, callback) {
        if (model.wzName.indexOf(')') > -1) {
            ctx.w('@media ' + model.wzName + ' {');
        }
        else {
            ctx.w('@media (' + model.wzName + ') {');
        }
        ctx.indent();
        var selector = model.getSelector();
        // log '*** selector', selector
        if (selector && selector.length > 0) {
            ctx.w(model.getSelector() + ' {');
            ctx.indent();
            async.mapSeries(model.getProperties(), getWriteProperty(ctx), function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.deindent();
                ctx.w('}');
                cnt.genItems(model.rules, ctx, {
                    indent: false
                }, function(err, notUsed) {
                    if (err) {
                        return callback(err);
                    }
                    // _ writeRule(cnt, model, ctx);
                    ctx.deindent();
                    ctx.w('}');
                    callback();
                });
            });
        }
        else {
            cnt.genItems(model.rules, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                // _ writeRule(cnt, model, ctx);
                ctx.deindent();
                ctx.w('}');
                callback();
            });
        }
    };
    cnt.stm.fontface = function(model, ctx, callback) {
        ctx.w('@font-face {');
        ctx.indent();
        if (verify.isNotEmpty(model.fontFamily)) {
            ctx.w('font-family: ' + model.fontFamily + ';');
        }
        if (verify.isNotEmpty(model.src)) {
            ctx.w('src: ' + model.src + ';');
        }
        if (verify.isNotEmpty(model.fontStretch)) {
            ctx.w('font-stretch: ' + model.fontStretch + ';');
        }
        if (verify.isNotEmpty(model.fontStyle)) {
            ctx.w('font-style: ' + model.fontStyle + ';');
        }
        if (verify.isNotEmpty(model.fontWeight)) {
            ctx.w('font-weight: ' + model.fontWeight + ';');
        }
        if (verify.isNotEmpty(model.unicodeRange)) {
            ctx.w('unicode-range: ' + model.unicodeRange + ';');
        }
        cnt.genItems(model.rules, ctx, {
            indent: false
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.deindent();
            ctx.w('}');
            callback();
        });
    };
    cnt.stm.keyframes = function(model, ctx, callback) {
        ctx.w('@' + (model.vendor || '') + 'keyframes ' + model.wzName + ' {');
        cnt.genItems(model.rules, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            callback();
        });
    };
    cnt.stm.keyframe = function(model, ctx, callback) {
        ctx.w(model.wzName + ' {');
        cnt.genItems(model.rules, ctx, {
            indent: true
        }, function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            ctx.w('}');
            callback();
        });
    };
    cnt.stm.ximport = function(model, ctx, callback) {
        ctx.w('@import ' + model.wzName + ';');
        callback();
    };
    cnt.stm.comment = function(model, ctx, callback) {
        if (model.rules && model.rules.length > 0) {
            if (ctx.__comment_level === 0) {
                ctx.w('/**');
            }
            ctx.indent();
            if (model.wzName.length > 0) {
                ctx.w(model.wzName);
            }
            ctx.__comment_level++;
            cnt.genItems(model.rules, ctx, {
                indent: false
            }, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                ctx.__comment_level--;
                ctx.deindent();
                if (ctx.__comment_level === 0) {
                    ctx.w('*/');
                }
                callback();
            });
        }
        else {
            if (ctx.__comment_level > 0) {
                ctx.w(model.wzName ? (' ' + model.wzName) : '');
            }
            else {
                ctx.w('/**' + (model.wzName ? (' ' + model.wzName) : '') + ' */');
            }
            callback();
        }
    };
};
function writeRule(cnt, model, ctx, callback) {
    // log 'writeRule, model.ruleParts', model.ruleParts
    var wzName = model.wzElement === 'ampersand' ? '&' + model.wzName : model.wzName;
    var ruleText = model.getSelector(true);
    ctx.w(ruleText + ' {');
    ctx.indent();
    async.mapSeries(model.getProperties(), getWriteProperty(ctx), function() {
        ctx.deindent();
        ctx.w('}');
        cnt.genItems(model.rules, ctx, {
            indent: false
        }, callback);
    });
}
function getWriteProperty(ctx) {
    return function writeProperty(prop, callback) {
            var name = prop.name;
            var value = prop.value;
            if (prop.wzElement && prop.prop && prop.prop.get_svg) {
                if (prop.wzElement === "background_image") {
                    prop.prop.get_svg(function(err, svgModel) {
                        if (err) {
                            return callback(err);
                        }
                        // log myname, 'svgModel', svgModel
                        ctx.wizziFactory.generateArtifact(svgModel, 'generated from css model', 'svg/document', {
                            CRLF: '', 
                            forCssImage: true
                        }, function(err, artifactText) {
                            if (err) {
                                return callback(err);
                            }
                            console.log(myname, 'artifactText', artifactText);
                            ctx.w('background-image: url("data:image/svg+xml,' + artifactText + '");');
                            callback();
                        });
                    });
                }
                else {
                    throw ctx.error(myname + '. writeProperty unknown  prop.wzElement: ' + prop.wzElement);
                }
            }
            else {
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
            }
        };
}
