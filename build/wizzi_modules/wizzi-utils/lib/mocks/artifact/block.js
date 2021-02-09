/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\mocks\artifact\block.js.ittf
*/
'use strict';
// generated by v6-wizzi-js.artifacts.js.module.main
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var line = require('./line');
var Block = (function () {
    function Block(options) {
        _classCallCheck(this, Block);
        this.lines = [];
        this.options = (options || {});
        this.indentValue = (this.options.indent || 0);
        this.currentline = null;
    }
    Block.prototype.forceIndent = function(value) {
        var save = this.indentValue;
        this.indentValue = value;
        return save;
    }
    Block.prototype.indent = function(value) {
        this.indentValue += typeof (value) !== 'undefined' ? value : 1;
    }
    Block.prototype.deindent = function(value) {
        this.indentValue -= typeof (value) !== 'undefined' ? value : 1;
        this.indentValue = Math.max(0, this.indentValue);
    }
    Block.prototype.w = function(text) {
        if (this.currentline != null) {
            this.currentline.add(text);
            this.lines.push(this.currentline);
            this.currentline = null;
        }
        else {
            this.lines.push(new line(text, this.indentValue, this.options));
        }
    }
    Block.prototype.write = function(text) {
        if (this.currentline != null) {
            this.currentline.add(text);
        }
        else {
            this.currentline = new line(text, this.indentValue, this.options);
        }
    }
    Block.prototype.appendFile = function(filePath) {
        if (this.currentline != null) {
            this.currentline.addFile(filePath);
            this.lines.push(this.currentline);
            this.currentline = null;
        }
        else {
            this.lines.push(new line(filePath, this.indentValue, this.options, true));
        }
    }
    Block.prototype.toStream = function(stream, ctx) {
        var i, i_items=this.lines, i_len=this.lines.length, item;
        for (i=0; i<i_len; i++) {
            item = this.lines[i];
            item.toStream(stream, ctx);
        }
        if (this.currentline != null) {
            this.currentline.toStream(stream, ctx);
        }
    }
    Block.prototype.terminate = function() {
        delete (this.options);
        delete (this.currentline);
        var i, i_items=this.lines, i_len=this.lines.length, item;
        for (i=0; i<i_len; i++) {
            item = this.lines[i];
            item.terminate();
        }
    }
    Block.prototype.hydrate = function(lines, options) {
        this.currentline = null;
        this.lines = [];
        var l;
        var i, i_items=lines, i_len=lines.length, item;
        for (i=0; i<i_len; i++) {
            item = lines[i];
            l = new line('', 0, options);
            l.hydrate(item);
            this.lines.push(l);
        }
    }
    return Block;
})();

module.exports = Block;
