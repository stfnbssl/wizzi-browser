/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\reducers\localStorage.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
class LocalStorage {
    constructor(keyprefix) {
        this.keyprefix = keyprefix;
    }
    k(key) {
        return this.keyprefix + '.' + key;
    }
    get(key, defaultValue, setDefault) {
        key = this.k(key);
        var ret = localStorage.getItem(key);
        if (ret === null) {
            if (typeof defaultValue !== 'undefined') {
                ret = defaultValue;
                if (setDefault) {
                    localStorage[key] = defaultValue;
                }
            }
        }
        try {
            ret = JSON.parse(ret);
            return ret;
        } 
        catch (ex) {
        } 
        return ret;
    }
    set(key, value) {
        key = this.k(key);
        value = typeof value === 'undefined' ? null : value;
        if (value === null) {
            localStorage[key] = value;
        }
        else {
            localStorage[key] = JSON.stringify(value);
        }
        return value;
    }
    append(key, value) {
        key = this.k(key);
        var s = this.get(key, '', true);
        this.set(key, s + value);
    }
    replace(key, search, replace) {
        key = this.k(key);
        var value = this.get(key);
        if (typeof value === 'string') {
            this.set(key, value.replace(search, replace));
        }
    }
    remove(key) {
        key = this.k(key);
        localStorage.removeItem(key);
    }
    isTrue(key, value) {
        key = this.k(key);
        if (typeof value === 'undefined') {
            return this.get(key) === 'true';
        }
        else {
            this.set(key, value ? 'true' : 'false');
        }
    }
    float(key, value) {
        key = this.k(key);
        if (typeof value === 'undefined') {
            return parseFloat(this.get(key));
        }
        else {
            this.set(key, value);
        }
    }
    increment(key) {
        key = this.k(key);
        value = this.get(key, "0", true);
        value = parseFloat(value) + 1;
        this.set(key, value);
    }
    unique(collectionName, propertyName, baseValue) {
        var items = this.get(collectionName);
        var item = this._find(items, propertyName, baseValue);
        if (item === null) {
            return baseValue;
        }
        else {
            var n = 1;
            while (item !== null) {
                n++;
                item = this._find(items, propertyName, baseValue + n);
            }
            return baseValue + n;
        }
    }
    _find(collection, propertyName, value) {
        var i, i_items=collection, i_len=collection.length, item;
        for (i=0; i<i_len; i++) {
            item = collection[i];
            if (item[propertyName] === value) {
                return item;
            }
        }
        return null;
    }
}
export default LocalStorage;
