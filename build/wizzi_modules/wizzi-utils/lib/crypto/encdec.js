/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\crypto\encdec.js.ittf
*/
'use strict';
// VIA var randomstring = require("randomstring")
var Hashids = require("hashids");
if (Hashids.__esModule == true) {
    Hashids = Hashids.default;
}
// log 'Hashids', Hashids
var crypto = require('crypto');
// Must be 256 bytes (32 characters)
var ENCRYPTION_KEY = process.env.PROCESS_ENCRYPTION_KEY || "C9jM6ONATgsd1W30g6T8N3elW7sgHF4q";
console.log('crypto/endec.ENCRYPTION_KEY', ENCRYPTION_KEY);
// For AES, this is always 16
var IV_LENGTH = 16;
// simple
var hashids = new Hashids("im Anfang toll");
function encrypt(text) {
    var iv = crypto.randomBytes(IV_LENGTH);
    var cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([
        encrypted, 
        cipher.final()
    ]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
function decrypt(text) {
    var textParts = text.split(':');
    var iv = new Buffer(textParts.shift(), 'hex');
    var encryptedText = new Buffer(textParts.join(':'), 'hex');
    var decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([
        decrypted, 
        decipher.final()
    ]);
    return decrypted.toString();
}
function encryptSimple(text) {
    var hex = Buffer(text).toString('hex');
    return hashids.encodeHex(hex);
}
function decryptSimple(text) {
    var decodedHex = hashids.decodeHex(text);
    return Buffer(decodedHex, 'hex').toString('utf8');
}
module.exports = {
    decrypt: decrypt, 
    encrypt: encrypt, 
    decryptSimple: decryptSimple, 
    encryptSimple: encryptSimple
};
