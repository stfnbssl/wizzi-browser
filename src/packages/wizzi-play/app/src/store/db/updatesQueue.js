/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\db\updatesQueue.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
class UpdatesQueue {
    constructor() {
        this.queue = [];
    }
    set(path, data) {
        this._removePrevious('set', path);
        this.queue.push({
            oper: 'set', 
            path: path, 
            data: data
        });
    }
    delete(path) {
        this._removePrevious('delete', path);
        this.queue.push({
            oper: 'delete', 
            path: path
        });
    }
    startBatch() {
        const updates = [];
        this.pendingUpdates = [];
        var i, i_items=this.queue, i_len=this.queue.length, item;
        for (i=0; i<i_len; i++) {
            item = this.queue[i];
            updates.push(item);
            this.pendingUpdates.push(item);
        }
        this.queue = [];
        return updates;
    }
    commitBatch() {
        delete this.pendingUpdates
    }
    rollbackBatch() {
        var i, i_items=this.queue, i_len=this.queue.length, item;
        for (i=0; i<i_len; i++) {
            item = this.queue[i];
            this.pendingUpdates.push(item);
        }
        this.queue = this.pendingUpdates;
        delete this.pendingUpdates
    }
    _removePrevious(oper, path) {
        const copy = [];
        var i, i_items=this.queue, i_len=this.queue.length, item;
        for (i=0; i<i_len; i++) {
            item = this.queue[i];
            if (item.path === path && item.oper === oper) {
                // skip
            }
            else {
                copy.push(item);
            }
        }
        this.queue = copy;
    }
}
export default UpdatesQueue;
