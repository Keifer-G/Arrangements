let utils = {
    /**
     * 
     * @param {*} v 
     * @returns {Boolean}
     */
    isEmpty: function (v) {
        return v == null || v === "";
    },
    /**
     * 
     * @param {Null|Array} v 
     * @returns {Boolean}
     */
    isEmptyCollection: function (v) {
        return v == null || v.length == 0;
    },
    /**
     * @param {Null|Object} v 
     * @returns {Boolean}
     */
    isEmptyObject: function (v) {
        return v == null || Object.keys(v).length == 0;
    },
    /**
     * get param's type
     * 
     * @param {*} v 
     * @returns {String}
     */
    getType: function (v) {
        let type = Object.prototype.toString.call(v).substring(8);
        return type.substring(0, type.length - 1);
    },
    /**
     * 
     * @param {String} u 
     * @returns {Boolean}
     */
    isURL: function (u) {
        var strRegex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
        var re = new RegExp(strRegex);
        if (re.test(u))
            return true;
        else
            return false;
    },
    /**
     * 
     * @param {*} arr
     * @returns {Boolean}
     */
    isAarry: function (arr) {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(arr);
        }
        return Object.prototype.toString.call(arr) === '[object Array]';
    },
    isIE: function () {
        if (!!window.ActiveXObject || "ActiveXObject" in window) return true;
        return false;
    },
    isMac: function () {
        return /macintosh|mac os x/i.test(navigator.userAgent);
    },
    isIOS: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua)) {
            return true;
        } else if (/android/.test(ua)) {
            return false;
        }
    },
    playAudio: function (url) {
        const audio = new Audio(url)
        return {
            promise: audio.play(),
            element: audio,
            play: async () => audio.play(),
            pause: () => audio.pause(),
            stop: () => audio.remove()
        }
    },
}