// create global vmc
let vmc = {};
(function(){
// register method collections
// register codes come from merge.js
// first run merge.js to create methods then copy here
vmc.cache = {
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
vmc.ajax = {
    get: function (url) {
        
    }
}
vmc.fetch = {
    get: function (url) {
        let req = new Request(url, { method: 'GET', credentials: 'include'});
        fetch(req).then(function (response) {
            if (response.ok){
                return response.json();
            }else {
                return Promise.reject(response.text());
            }
        })
    }
}
vmc.timeUtils = {
    getYear: function () {
        console.log(new Date());
    },
    /**
     * 
     * @param {*} days Days difference
     * @param {String} link Date connector
     * @returns {String} 
     */
    getDay: function (days, link = "-") {
        let dayNum = parseInt(days);
        let now = new Date().getTime();
        let someoneday = now + (isNaN(dayNum) ? 0 : dayNum * 1000 * 60 * 60 * 24);
        let newd = new Date(someoneday);
        let newm = newd.getMonth(),
            newdate = newd.getDate();
        return newd.getFullYear() + link + (newm + 1 < 10 ? "0" + (newm + 1) : newm) + link + (newdate < 10 ? "0" + newdate : newdate);
    },
    /**
     * 
     * @param {Date|String|Long} date1 
     * @param {Date|String|Long} date2
     * @returns 
     */
    getDateDiffrence: function (date1, date2) {


        let startDate = Date.parse(dateString1);
        let endDate = Date.parse(dateString2);
        let days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
        return days;
    },
    /**
     * 
     * @param {Date|String|Long} obj 
     */
    parseDateTime: function (obj) {
        let getType;
        if (vmc && vmc.utils && vmc.utils.getType) {
            getType = vmc.utils.getType;
        } else {
            getType = function (v) {
                let type = Object.prototype.toString.call(v).substring(8);
                return type.substring(0, type.length - 1);
            }
        }
        let objType = getType(obj);
        if (!(objType == "String" || objType == "Number" || objType == "Date")) {
            return null;
        }
    },
    /**
     * format Date
     * @param {Date} date 
     * @param {String} fmt 
     * @returns {String}
     */
    format: function (date, fmt) {
        if(Object.prototype.toString.call(date) != '[object Date]'){
            console.error("type error! date must be Date!");
            return;
        }
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    transFormat: function(datestr, fmt){
        
    }
    

}
vmc.utils = {
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
})();