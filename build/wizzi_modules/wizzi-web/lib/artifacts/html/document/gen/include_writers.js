/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\html\document\gen\include_writers.js.ittf
*/
'use strict';

var myname = 'html.document.include_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeCssLegacy = function(ctx, model, callback) {
    model.get_css(function(err, cssModel) {
        if (err) {
            return callback(err);
        }
        // log myname, 'cssModel.rules', cssModel.rules
        if (cssModel.rules.length == 0 && verify.isEmpty(cssModel.wzName) == false) {
            // log myname, 1
            ctx.w('<link href="' + cssModel.wzName + '" rel="stylesheet" />');
            callback();
        }
        else {
            // log myname, 2
            md.generateCssArtifact(ctx, cssModel, function(err, artifactText) {
                if (err) {
                    return callback(err);
                }
                ctx.w('<style>');
                ctx.indent();
                ctx.writeAligned(artifactText);
                ctx.deindent();
                ctx.w('</style>');
                callback();
            });
        }
    });
};
md.generateCssArtifact = function(ctx, cssModel, callback) {
    // log myname, 3
    // log myname, 'cssModel', cssModel, 'cssModel.rules', cssModel.rules
    ctx.wizziFactory.generateArtifact(cssModel, 'generated from html model', 'css/document', {
        forHtmlStyle: true
    }, function(err, artifactText) {
        if (err) {
            return callback(err);
        }
        // log myname, 'css artifactText', artifactText
        return callback(null, artifactText);
    });
};
md.writeIncludeCss = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeJs'
    element.get_css(function(err, cssModel) {
        if (err) {
            return callback(err);
        }
        // log myname, 'cssModel', cssModel
        ctx.wizziFactory.generateArtifact(cssModel, 'generated from html model', 'css/document', {
            forHtmlStyle: true, 
            noGeneratorComments: true
        }, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log myname, 'css module artifactText', artifactText
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            return callback();
        });
    });
};
md.writeIncludeJs = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeJs'
    element.get_js(function(err, jsModel) {
        if (err) {
            return callback(err);
        }
        // log myname, 'jsModel', jsModel
        ctx.wizziFactory.generateArtifact(jsModel, 'generated from html model', 'js/module', {
            forHtmlScript: true, 
            noUseStrict: true, 
            noGeneratorComments: true
        }, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log myname, 'js module artifactText', artifactText
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            return callback();
        });
    });
};
md.writeIncludeSvg = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeSvg'
    element.get_svg(function(err, svgModel) {
        if (err) {
            return callback(err);
        }
        // log myname, 'svgModel', svgModel
        ctx.wizziFactory.generateArtifact(svgModel, 'generated from html model', 'svg/document', {
            forHtmlSvgElement: true
        }, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log myname, 'svg module artifactText', artifactText
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            return callback();
        });
    });
};
md.writeIncludeJson = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeSvg'
    element.get_json(function(err, jsonModel) {
        if (err) {
            return callback(err);
        }
        // log myname, 'jsonModel', jsonModel
        ctx.wizziFactory.generateArtifact(jsonModel, 'generated from html model', 'json/document', {
            forHtmlJson: true
        }, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log myname, 'json module artifactText', artifactText
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            return callback();
        });
    });
};
