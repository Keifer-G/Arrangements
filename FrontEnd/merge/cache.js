let cache = {
    /**
     * @param {Map} storage 
     */
    init: function (storages) {
        if (!storages instanceof Object || storages instanceof Array) {
            console.error("storages type not correct!");
        }
        try {
            for (let key in storages) {
                window.localStorage.setItem(key, storages[key]);
            }
        } catch (err) {
            console.error("storages type not correct!");
        }
    },
    /**
     * @param {String} key 
     * @param {Object} value 
     */
    set: function (key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (err) {
            console.error(err);
        }
    },
    clear: function () {
        window.localStorage.clear();
    },
    remove: function (key) {
        window.localStorage.removeItem(key);
    }
}