/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-js\.wizzi\ittf\lib\artifacts\js\module\gen\include_writers.js.ittf
*/
'use strict';

var myname = 'html.document.include_writers';

var verify = require('wizzi-utils').verify;

var md = module.exports = {};
md.writeIncludeCss = function(ctx, model, callback) {
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
