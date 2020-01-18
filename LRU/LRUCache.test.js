const LRUCache = require('./LRUCache')

/*********************************************/
            /*  CONFIG TESTS  */
/*********************************************/
test('Set and Get Cache Max Entries Size', () => {
    let lruCache = new LRUCache({ size: 99 });   
    expect(lruCache.getLimit()).toBe(99);
})

test('Get default Cache Max Entries Size of 1 when no Size is provided', () => {
    let lruCache = new LRUCache();
    expect(lruCache.getLimit()).toBe(1);
})

test('Validate Config Size Value - Is Number and convert to Int', () => {
    let lruCache = new LRUCache({ size: 1 });
    expect(lruCache.getLimit()).toBe(1);

    lruCache = new LRUCache({ size: "2" });
    expect(lruCache.getLimit()).toBe(2);
})

test('Validate Config Size Value - Should be Greater than Zero else set Default Value of 1', () => {
    let lruCache = new LRUCache({ size: -1 });
    expect(lruCache.getLimit()).toBe(1);
})

/*********************************************/
        /*  GET AND SET VALUE TESTS */
/*********************************************/
test('Set and Get Cache', () => {
    let lruCache = new LRUCache({ size: 3 });
    lruCache.put("key1", "value1");
    lruCache.put("key2", "value2");
    lruCache.put("key3", "value3");
        
    expect(lruCache.get("key1")).toBe("value1");
    expect(lruCache.get("key2")).toBe("value2");
    expect(lruCache.get("key3")).toBe("value3");
})

test('Validate Values - Ignore Null and Undefined', () => {
    let lruCache = new LRUCache({ size: 3 });
    lruCache.put("key1", null);
    lruCache.put("key2", undefined);
    lruCache.put("key3", "hello world");

    expect(lruCache.get("key1")).toBe(null);
    expect(lruCache.get("key2")).toBe(null);
    expect(lruCache.get("key3")).toBe("hello world");
});

test('Validate Key as String and Int Only', () => {
    let lruCache = new LRUCache({ size: 4 });
    lruCache.put("key1", "hello string");
    lruCache.put(1, "hello int");
    lruCache.put(true, "bad boolean key");
    lruCache.put({ "bad": "object" }, "bad object key");

    expect(lruCache.count()).toBe(2);

    expect(lruCache.get("key1")).toBe("hello string");
    expect(lruCache.get(1)).toBe("hello int");
});

test('Get NULL when invalid key is used', () => {
    let lruCache = new LRUCache();
    expect(lruCache.get("invalidKey")).toBe(null);
});

/*********************************************/
            /*  DELETE TESTS  */
/*********************************************/
test('Delete by Valid Key', () => {
    let lruCache = new LRUCache({ size: 3 });
    lruCache.put("key1", "value1");
    lruCache.put("key2", "value2");
    lruCache.put("key3", "value3");

    expect(lruCache.count()).toBe(3);
    lruCache.del("key2");
    expect(lruCache.count()).toBe(2);
    expect(lruCache.get("key2")).toBe(null);
})

/*********************************************/
            /*  RESET TEST  */
/*********************************************/

test('Reset Cache', () => {
    let lruCache = new LRUCache({ size: 3 });
    lruCache.put("key1", "value1");
    lruCache.put("key2", "value2");
    lruCache.put("key3", "value3");

    expect(lruCache.count()).toBe(3);
    lruCache.reset();
    expect(lruCache.count()).toBe(0);
})