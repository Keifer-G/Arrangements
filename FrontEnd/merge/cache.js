let cache = {
    /**
     * @param {Map} storage 
     */
    initLocalStorage: function (storages) {
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
    addLocalStorage: function (key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (err) {
            console.error(err);
        }
    }

}