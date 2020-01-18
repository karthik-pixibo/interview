'use strict';

class LRUCache {
    constructor(config) {
        this.maxEntries = parseInt((config || {}).size) || 1; //check if number and parse
        if (this.maxEntries < 1) this.maxEntries = 1; //make sure the max size is more than 0
        this.cache = new Map(); //initialize the storage
    }

    get(key) {
        if (this.validateKey(key)) {
            let item = this.cache.get(key);
            if (item) // refresh key
            {
                this.cache.delete(key);
                this.cache.set(key, item);
            }
            return item || null;
        } else
            return null;
    }

    put(key, val) {
        if (this.validateKey(key) && this.validate(val)) {
            if (this.cache.has(key)) // refresh key
                this.cache.delete(key);
            else if (this.cache.size == this.maxEntries) // evict oldest
                this.cache.delete(this._first());
            this.cache.set(key, val);
        }
    }

    reset() { //clear the cache
        this.cache.clear();
    }

    del(key) { //delete key
        if (this.cache.has(key)) this.cache.delete(key);
    }

    getLimit() { //get max size count
        return this.maxEntries;
    }

    count() { //get current cache size
        return this.cache.size;
    }

    _first() { //the first item is the one which was inserted first
        return this.cache.keys().next().value;
    }

    validateKey(key) { //make sure the key is only either a string or a number
        return (this.validate(key) && (typeof key === "string" || typeof key === "number"));
    }

    validate(value) { //Check if value is not null or undefined
        return !(value == null);
    }
}

module.exports = LRUCache;