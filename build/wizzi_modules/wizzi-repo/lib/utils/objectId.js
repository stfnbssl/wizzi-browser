/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-repo\.wizzi\ittf\lib\utils\objectId.js.ittf
*/
'use strict';
var MACHINE_ID = parseInt(Math.random() * 0xffffff, 10);
var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');
try {
    if (Buffer && Buffer.from) {
        var hasBufferType = true;
    }
} 
catch (err) {
    hasBufferType = false;
} 
var ObjectID = function ObjectID(id) {
    if (id instanceof ObjectID) {
        return id;
    }
    if (! (this instanceof ObjectID)) {
        return new ObjectID(id);
    }
    this._bsontype = 'ObjectID';
    if ((id == null) || (typeof (id) === 'number')) {
        this.id = this.generate(id);
        if (ObjectID.cacheHexString) {
            this.__id = this.toString('hex');
        }
        return ;
    }
    var valid = ObjectID.isValid(id);
    if (! (valid) && (id != null)) {
        throw new Error('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
    }
    else if (valid && (typeof (id) === 'string') && id.length === 24 && hasBufferType) {
        return new ObjectID(new Buffer(id, 'hex'));
    }
    else if (valid && (typeof (id) === 'string') && id.length === 24) {
        return ObjectID.createFromHexString(id);
    }
    else if (id != null && id.length === 12) {
        this.id = id;
    }
    else if (id != null && id.toHexString) {
        return id;
    }
    else {
        throw new Error('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
    }
    if (ObjectID.cacheHexString) {
        this.__id = this.toString('hex');
    }
};
var hexTable = [];
for (var i = 0; i < 256; i++) {
    hexTable[i] = ((i <= 15 ? '0' : '') + i.toString(16));
}
ObjectID.prototype.toHexString = function() {
    if (ObjectID.cacheHexString && this.__id) {
        return this.__id;
    }
    var hexString = '';
    if (! (this.id) || ! (this.id.length)) {
        throw new Error(((('invalid ObjectId, ObjectId.id must be either a string or a Buffer, but is [' + JSON.stringify(this.id))) + ']'));
    }
    if (this.id instanceof _Buffer) {
        hexString = convertToHex(this.id);
        if (ObjectID.cacheHexString) {
            this.__id = hexString;
        }
        return hexString;
    }
    for (var i = 0; i < this.id.length; i++) {
        hexString += hexTable[this.id.charCodeAt(i)];
    }
    if (ObjectID.cacheHexString) {
        this.__id = hexString;
    }
    return hexString;
};
ObjectID.prototype.get_inc = function() {
    return ObjectID.index = (ObjectID.index + 1) % 0xffffff;
};
ObjectID.prototype.getInc = function() {
    return this.get_inc();
};
ObjectID.prototype.generate = function(time) {
    if ('number' !== typeof (time)) {
        time = ~ (~ (Date.now() / 1000));
    }
    var pid = (((typeof (process) === 'undefined') || (process.pid === 1)) ? Math.floor(Math.random() * 100000) : process.pid) % 0xffff;
    var inc = this.get_inc();
    var buffer = new Buffer(12);
    buffer[3] = time & 0xff;
    buffer[2] = (((time >> 8)) & 0xff);
    buffer[1] = (((time >> 16)) & 0xff);
    buffer[0] = (((time >> 24)) & 0xff);
    buffer[6] = MACHINE_ID & 0xff;
    buffer[5] = (((MACHINE_ID >> 8)) & 0xff);
    buffer[4] = (((MACHINE_ID >> 16)) & 0xff);
    buffer[8] = pid & 0xff;
    buffer[7] = (((pid >> 8)) & 0xff);
    buffer[11] = inc & 0xff;
    buffer[10] = (((inc >> 8)) & 0xff);
    buffer[9] = (((inc >> 16)) & 0xff);
    return buffer;
};
ObjectID.prototype.toString = function(format) {
    if (this.id && this.id.copy) {
        return this.id.toString(typeof (format) === 'string' ? format : 'hex');
    }
    return this.toHexString();
};
ObjectID.prototype.inspect = ObjectID.prototype.toString;
ObjectID.prototype.toJSON = function() {
    return this.toHexString();
};
ObjectID.prototype.equals = function equals(otherId) {
    if (otherId instanceof ObjectID) {
        return this.toString() === otherId.toString();
    }
    else if (typeof (otherId) === 'string' && ObjectID.isValid(otherId) && otherId.length === 12 && (this.id instanceof _Buffer)) {
        return otherId === this.id.toString('binary');
    }
    else if (typeof (otherId) === 'string' && ObjectID.isValid(otherId) && otherId.length === 24) {
        return otherId.toLowerCase() === this.toHexString();
    }
    else if (typeof (otherId) === 'string' && ObjectID.isValid(otherId) && otherId.length === 12) {
        return otherId === this.id;
    }
    else if (otherId != null && (otherId instanceof ObjectID || otherId.toHexString)) {
        return otherId.toHexString() === this.toHexString();
    }
    else {
        return false;
    }
};
ObjectID.prototype.getTimestamp = function() {
    var timestamp = new Date();
    var time = (((this.id[3] | (this.id[2] << 8)) | (this.id[1] << 16))) | (this.id[0] << 24);
    timestamp.setTime(Math.floor(time) * 1000);
    return timestamp;
};
ObjectID.index = ~ (~ (Math.random() * 0xffffff));
ObjectID.createPk = function createPk() {
    return new ObjectID();
};
ObjectID.createFromTime = function createFromTime(time) {
    var buffer = new Buffer([
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0, 
        0
    ]);
    buffer[3] = time & 0xff;
    buffer[2] = (((time >> 8)) & 0xff);
    buffer[1] = (((time >> 16)) & 0xff);
    buffer[0] = (((time >> 24)) & 0xff);
    return new ObjectID(buffer);
};
var decodeLookup = [];
i = 0;
while (i < 10) {
    decodeLookup[(0x30 + i)] = i++;
}
while (i < 16) {
    decodeLookup[(((0x41 - 10)) + i)] = decodeLookup[(((0x61 - 10)) + i)] = i++;
}
var _Buffer = Buffer;
var convertToHex = function(bytes) {
    return bytes.toString('hex');
};
ObjectID.createFromHexString = function createFromHexString(string) {
    if (typeof(string) === 'undefined' || (string != null && string.length !== 24)) {
        throw new Error('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters');
    }
    if (hasBufferType) {
        return new ObjectID(new Buffer(string, 'hex'));
    }
    var array = new _Buffer(12);
    var n = 0;
    var i = 0;
    while (i < 24) {
        array[n++] = ((decodeLookup[string.charCodeAt(i++)] << 4) | decodeLookup[string.charCodeAt(i++)]);
    }
    return new ObjectID(array);
};
ObjectID.isValid = function isValid(id) {
    if (id == null) {
        return false;
    }
    if (typeof (id) === 'number') {
        return true;
    }
    if (typeof (id) === 'string') {
        return ((id.length === 12) || (((id.length === 24) && checkForHexRegExp.test(id))));
    }
    if (id instanceof ObjectID) {
        return true;
    }
    if (id instanceof _Buffer) {
        return true;
    }
    if (id.toHexString) {
        return ((id.id.length === 12) || (((id.id.length === 24) && checkForHexRegExp.test(id.id))));
    }
    return false;
};
Object.defineProperty(ObjectID.prototype, 'generationTime', {
    enumerable: true, 
    get: function() {
        return (((((this.id[3] | (this.id[2] << 8))) | (this.id[1] << 16))) | (this.id[0] << 24));
    }, 
    set: function(value) {
        this.id[3] = value & 0xff;
        this.id[2] = (((value >> 8)) & 0xff);
        this.id[1] = (((value >> 16)) & 0xff);
        this.id[0] = (((value >> 24)) & 0xff);
    }
});
module.exports = ObjectID;
module.exports.ObjectID = ObjectID;
module.exports.ObjectId = ObjectID;
