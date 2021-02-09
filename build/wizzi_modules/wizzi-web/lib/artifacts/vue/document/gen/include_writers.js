/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-web\.wizzi\ittf\lib\artifacts\vue\document\gen\include_writers.js.ittf
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
        md.generateCssArtifact(ctx, cssModel, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            ctx.write('<style');
            if (model.scoped) {
                ctx.write(' scoped');
            }
            ctx.w('>');
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            ctx.w('</style>');
            callback();
        });
    });
};
md.generateCssArtifact = function(ctx, cssModel, callback) {
    // log myname, 3
    // log myname, 'cssModel', cssModel, 'cssModel.rules', cssModel.rules
    ctx.wizziFactory.generateArtifact(cssModel, 'generated from html model', 'css/document', {
        forVueStyle: true
    }, function(err, artifactText) {
        if (err) {
            return callback(err);
        }
        // log myname, 'css artifactText', artifactText
        return callback(null, artifactText);
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
            forVueScript: true, 
            noUseStrict: true, 
            noGeneratorComments: true
        }, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log myname, 'js module artifactText', artifactText
            ctx.w('<script>');
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            ctx.w('</script>');
            return callback();
        });
    });
};
md.writeIncludeTypescript = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeTypescript'
    element.get_ts(function(err, tsModel) {
        if (err) {
            return callback(err);
        }
        // log myname, 'tsModel', tsModel
        ctx.wizziFactory.generateArtifact(tsModel, 'generated from html model', 'ts/module', {
            forVueScript: true, 
            noUseStrict: true, 
            noGeneratorComments: true
        }, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log myname, 'ts module artifactText', artifactText
            ctx.w('<script lang="ts">');
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            ctx.w('</script>');
            return callback();
        });
    });
};
md.writeIncludeHtml = function(ctx, element, callback) {
    // log myname, 'enter writeIncludeHtml'
    element.get_html(function(err, htmlModel) {
        if (err) {
            return callback(err);
        }
        // log myname, 'htmlModel', htmlModel
        ctx.wizziFactory.generateArtifact(htmlModel, 'generated from html model', 'html/document', {
            forVueTemplate: true
        }, function(err, artifactText) {
            if (err) {
                return callback(err);
            }
            // log myname, 'html module artifactText', artifactText
            ctx.w('<template>');
            ctx.indent();
            ctx.writeAligned(artifactText);
            ctx.deindent();
            ctx.w('</template>');
            return callback();
        });
    });
};
