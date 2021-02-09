/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\db\fbFsClient.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import path from 'path';
import verify from '../../utils/verify';
class FbFsClient {
    constructor() {
        this.user = 'default';
        this.project = 'default';
        this.refsPool = {};
    }
    init() {
        firebase.initializeApp({
            apiKey: "AIzaSyACBhxkQICMYxWeftA2DmsOzCAqVf3aTOQ", 
            authDomain: "wizzifactory.firebaseapp.com", 
            databaseURL: "https://wizzifactory.firebaseio.com", 
            projectId: "wizzifactory", 
            storageBucket: "", 
            messagingSenderId: "676985835415"
        });
        
        this.firestore = firebase.firestore();
        
        this.firestore.settings({
            // your settings...
            timestampsInSnapshots: true
        });
    }
    getFirestore() {
        return this.firestore;
    }
    setDocument(docPath, data, callback) {
        // log 'this.firestore', this.getFirestore()
        var dRef = this.getFirestore().doc(docPath);
        dRef.set(data).then(() => {
            const message = 'setDocument successful';
            console.log(message);
            return callback(null, message);
        }).catch((err) => {
            const message = 'setDocument failed';
            console.log(message);
            return callback(err);
        })
    }
    getDocument(docPath, callback) {
        var dRef = this.getFirestore().doc(docPath);
        dRef.get().then((doc) => {
            if (doc && doc.exists) {
                return callback(null, doc.data());
            }
            else {
                const message = 'FbFsClient.getDocument. Doc not found: ' + docPath;
                console.log(message);
                return callback(null, null);
            }
        }).catch(function(err) {
            const message = 'FbFsClient.getDocument. Got an error reading document ' + docPath + ' : ' + err + '\n' + err.stack;
            console.log(message);
            return callback(new Error(message));
        })
    }
    getCollection(collPath, options, callback) {
        if (typeof callback === 'undefined') {
            callback = options;
            options = {};
        }
        console.log('*** getCollection', collPath);
        var cRef = this.getFirestore().collection(collPath);
        if (options.where) {
            cRef = cRef.where(options.where.field, options.where.op, options.where.value);
        }
        const that = this;
        cRef.get().then((coll) => {
            console.log('*** getCollection', collPath, coll);
            that._extractCollection(coll, callback);
        }).catch(function(err) {
            const message = 'FbFsClient.getCollection. Got an error reading collection ' + collPath + ' : ' + err + '\n' + err.stack;
            console.log(message);
            return callback(new Error(message));
        })
    }
    _extractCollection(coll, callback) {
        const returnItems = [];
        if (coll) {
            coll.docs.forEach((doc) =>
                returnItems.push({
                    id: doc.id, 
                    path: doc.ref.path, 
                    data: doc.data()
                }));
            return callback(null, returnItems);
        }
        else {
            const message = 'FbFsClient.getCollection. Collection not found: ' + collPath;
            return callback(new Error(message));
        }
    }
    deleteDocument(docPath, callback) {
        var dRef = this.getFirestore().doc(docPath);
        dRef.delete().then(() => {
            const message = 'FbFsClient.deleteDocument. Document deleted: ' + docPath;
            return callback(new Error(message));
        }).catch(function(err) {
            const message = 'FbFsClient.deleteDocument. Got an error deleting document ' + docPath + ' : ' + err + '\n' + err.stack;
            console.log(message);
            return callback(new Error(message));
        })
    }
    renameDocument(oldDocPath, newDocPath, callback) {
        var oldDocRef = this.getFirestore().doc(oldDocPath);
        var newDocRef = this.getFirestore().doc(newDocPath);
        this.getFirestore().runTransaction((t) => {
            console.log('FbFsClient.renameDocument.transaction.start', oldDocPath, newDocPath);
            return t.get(oldDocRef).then((doc) => {
                    console.log('FbFsClient.renameDocument.transaction.got', doc.data());
                    var data = doc.data();
                    t.set(newDocRef, data);
                    t.delete(oldDocRef);
                })
            ;
        }).then(() => {
            console.log('FbFsClient.renameDocument.transaction.ended.success');
            callback(null, {
                message: 'FbFsClient.renameDocument. Document renamed'
            });
        }).catch((err) => {
            console.log('FbFsClient.renameArchive.transaction.ended.failure');
            callback(new Error('FbFsClient.renameDocument. Document rename failed: ' + err));
        })
        
    }
    setBatch(parentCollPath, documents, callback) {
        if (verify.isObject(documents)) {
            var temp = [];
            for (var k in documents) {
                temp.push({
                    name: k, 
                    content: documents[k]
                });
            }
            documents = temp;
        }
        if (documents.length > 0) {
            let wBatch = this.getFirestore().batch();
            var dRef;
            var i, i_items=documents, i_len=documents.length, d;
            for (i=0; i<i_len; i++) {
                d = documents[i];
                dRef = this.getFirestore().doc(parentCollPath + '/' + d.name);
                wBatch.set(dRef, d.content);
                console.log('setBatch. item ', parentCollPath + '/' + d.name);
            }
            wBatch.commit().then(() => {
                const message = 'setBatch successful, to parentCollPath: ' + parentCollPath;
                console.log(message);
                return callback(null, message);
            }).catch((err) => {
                const message = 'setBatch failed, to parentCollPath: ' + parentCollPath + ', Error: ' + err + '\n' + err.stack;
                console.log(message);
                return callback(err);
            })
        }
        else {
            const message = 'setBatch failed, no documents to upload';
            console.log(message);
            return callback(null, message);
        }
    }
    batchFromUpdatesQueue(updatesQueue, callback) {
        var updates = updatesQueue.startBatch();
        if (updates.length > 0) {
            let wBatch = this.getFirestore().batch();
            var dRef;
            var i, i_items=updates, i_len=updates.length, item;
            for (i=0; i<i_len; i++) {
                item = updates[i];
                dRef = this.getFirestore().doc(item.path);
                if (item.oper === 'set') {
                    wBatch.set(dRef, item.data);
                    console.log('batchFromUpdatesQueue. set item ', item.path);
                }
                else if (item.oper === 'delete') {
                    wBatch.delete(dRef);
                    console.log('batchFromUpdatesQueue. delete item ', item.path);
                }
            }
            wBatch.commit().then(() => {
                const message = 'batchFromUpdatesQueue successful';
                console.log(message);
                updatesQueue.commitBatch();
                return callback(null, message);
            }).catch((err) => {
                const message = 'batchFromUpdatesQueue failed, Error: ' + err + '\n' + err.stack;
                console.log(message);
                updatesQueue.rollbackBatch();
                return callback(err);
            })
        }
        else {
            const message = 'batchFromUpdatesQueue failed, no documents to upload';
            console.log(message);
            return callback(null, message);
        }
    }
}
export default FbFsClient;
