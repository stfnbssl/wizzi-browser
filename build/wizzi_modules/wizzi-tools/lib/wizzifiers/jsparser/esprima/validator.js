/*
    VALIDATION IS STOPPED
*/

var verify = require('../../../util/verify');
var artifacts = require("wizzi");
var wizzifier = null;

function rejsize(item, outittfPath, reinPath, callback) {
    var start = Date.now();
    artifacts.jsModule(outittfPath, { __data: { __preserveBlock: true } }, function (err, result) {
        if (err) {
            throw new Error(err);
        }
        file.write(reinPath, result);
        console.log('rejsized ' + item + ' in ' + (Date.now() - start) + ' ms');
        callback(null, null);
    });
}

function checkDiff(item) {
    var start = Date.now();
    var reinPath = 'rein/' + item;
    var parsed1, parsed2;
    if (wizzifier === null) wizzifier = require('./wizzifier');
    try {
        parsed1 = wizzifier.parse(file.read(item));
    } catch (ex) {
        ex.message = 'Path: ' + item + '.\n' + ex.message;
        throw ex;
    }
    try {
        parsed2 = wizzifier.parse(file.read(reinPath));
    } catch (ex) {
        ex.message = 'Path: ' + reinPath + '.\n' + ex.message;
        throw ex;
    }
    execDiff(item, parsed1, parsed2);
    console.log('checked diff ' + item + ' in ' + (Date.now() - start) + ' ms');
}

function execDiff(name, a, b) {
    var astr = JSON.stringify(a),
        bstr = JSON.stringify(b);
    astr = verify.replaceAll(astr, '{\"type\":\"EmptyStatement\"},', '');
    bstr = verify.replaceAll(bstr, '{\"type\":\"EmptyStatement\"},', '');
    var l = Math.min(astr.length, bstr.length),
        buf = [],
        resa = [],
        resb = [],
        i, cha, chb;
    for (i = 0; i < l; i++) {
        cha = astr[i];
        chb = bstr[i];
        if (cha !== chb) break;
    }
    var astAPath = 'check/' + name + '.ast.a';
    file.write(astAPath, JSON.stringify(a, null, 2));
    var astBPath = 'check/' + name + '.ast.b';
    file.write(astBPath, JSON.stringify(b, null, 2));
    var astDiffPath = 'check/' + name + '.ast.diff';
    if (i < l) {
        var k = Math.max(0, i - 100);
        var start = Math.min(1500, l - k - 1)
        var count = Math.min(1500, l - k - 1)
        file.write(astDiffPath,
            'len = ' + l + ', diff at ' + i + '\n' +
            astr.substr(k, count) + '\n' +
            bstr.substr(k, count) + '\n'
            );
        console.log(chalk.red('check of ' + name + ' failed'));
    } else {
        file.delete(astDiffPath);
        console.log(chalk.green('check of ' + name + ' is ok'));
    }
}

function rejsizeInMemory(ittfResult, callback) {
    artifacts.jsModuleFromString(ittfResult, { __data: { __preserveBlock: true } }, function (err, result) {
        if (err) { callback(err); return; }
        callback(null, result);
    });
}

function execDiffInMemory(a, b) {
    var astr = JSON.stringify(a),
        bstr = JSON.stringify(b);
    astr = verify.replaceAll(astr, '{\"type\":\"EmptyStatement\"},', '');
    bstr = verify.replaceAll(bstr, '{\"type\":\"EmptyStatement\"},', '');
    var l = Math.min(astr.length, bstr.length),
        buf = [],
        resa = [],
        resb = [],
        i, cha, chb;
    for (i = 0; i < l; i++) {
        cha = astr[i];
        chb = bstr[i];
        if (cha !== chb) break;
    }
    if (i < l) {
        var k = Math.max(0, i - 100);
        var start = Math.min(1500, l - k - 1)
        var count = Math.min(1500, l - k - 1)
        var message =
            'len = ' + l + ', diff at ' + i + '\n' +
            astr.substr(k, count) + '\n' +
            bstr.substr(k, count) + '\n'
            ;
        return { ok: false, message: message };
    } else {
        return { ok: true };
    }
}

var md = module.exports = {};

md.checkDiffInMemory = function checkDiffInMemory(sourceJs, ittfResult, callback) {
    console.log('ittfResult', ittfResult);
    rejsizeInMemory(ittfResult, function (err, jsResult) {
        if (err) { console.log('jsResult.err', err); callback(err); return; }
        console.log('jsResult', jsResult);
        var parsedSource, parsedResult;
        if (wizzifier === null) wizzifier = require('./wizzifier');
        try {
            parsedSource = wizzifier.parse(sourceJs);
        } catch (ex) {
            callback('Error parsing js source: ' + ex.message + '\n' + ex.stack);
            return;
        }
        try {
            parsedResult = wizzifier.parse(jsResult);
        } catch (ex) {
            callback('Error parsing js result for validation: ' + ex.message + '\n' + ex.stack);
            return;
        }
        var result = execDiffInMemory(parsedSource, parsedResult);
        callback(null, result);
    });
}
