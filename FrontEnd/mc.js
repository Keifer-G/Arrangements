// create global mc
let mc = {};
(function(){
// register method collections
// register codes come from merge.js
// first run merge.js to create methods then copy here
mc.cache = {
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
mc.ajax = {
    request: function (url, method, callback, data, flag) {
        let xhr;
        flag = flag || true;
        method = method.toUpperCase();
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHttp');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(2)
                callback(xhr.responseText);
            }
        }

        if (method && method.toUpperCase() == 'GET') {
            var date = new Date(),
                timer = date.getTime();
            xhr.open('GET', url + '?' + data + '&timer' + timer, flag);
            xhr.send()
        } else if (method && method.toUpperCase() == 'POST') {
            xhr.open('POST', url, flag);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    }
}
mc.fetch = {
    GET: { method: 'GET', credentials: 'include' },
    POST: { method: 'POST', credentials: 'include' },
    get: function (url) {
        let req = new Request(url, this.GET);
        fetch(req).then(function (response) {
            if (response.ok){
                return response.json();
            }else {
                return Promise.reject(response.text());
            }
        })
    }
}


mc.element = {
    /**
     * Prevent event bubbling
     * @param {HTMLElement} e 
     */
    stopBubble: function (e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
    },
    /**
     * asynchronous loading script label
     * @param {String} url 
     * @param {Function} callback 
     */
    loadScript: function (url, callback) {
        var oscript = document.createElement('script');
        if (oscript.readyState) { // ie8???????????????
            oscript.onreadystatechange = function () {
                if (oscript.readyState === 'complete' || oscript.readyState === 'loaded') {
                    callback();
                }
            }
        } else {
            oscript.onload = function () {
                callback()
            };
        }
        oscript.src = url;
        document.body.appendChild(oscript);
    },
    /**
     * ???????????????????????????????????????
     * @returns {Boolean}
     */
    bottomVisible: function () {
        return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
    }
}
mc.file = {
    /**
     * ???????????????????????????????????????
     * @param file
     * @param accept ??????????????????????????????????????????????????????
     * @param size ???????????????KB???????????????????????????????????????????????????????????????0
     * @param width ???????????????????????????????????????????????????
     * @param height ???????????????????????????????????????????????????
     * @return {Promise<{validation: boolean, message: string, error:number}>}
     */
    checkUpload: function (file, accept, size, width, height) {
        return new Promise((resolve) => {
            if (/^\[object File]$/.test(Object.prototype.toString.call(file))) {
                if (isNaN(size)) {
                    size = 1024000;
                }
                let suffix = "";
                let index = file.name.lastIndexOf(".");
                if (index !== -1) {
                    suffix = file.name.substring(index);
                }
                let typeName = suffix ?
                    suffix.substring(1) :
                    file.type && file.type.split("/")[0];

                if (
                    !typeName &&
                    /^\[object String]$/.test(Object.prototype.toString.call(accept)) &&
                    accept !== ""
                ) {
                    resolve({
                        message: `????????????${accept}!`,
                        error: 2,
                        validation: false,
                    });
                } else {
                    if (isNaN(size)) {
                        if (
                            /^\.(png|jpe?g|gif|svg|webp)/i.test(suffix) ||
                            /^image/.test(file.type)
                        ) {
                            size = 10240;
                        } else if (
                            /^\.(ogg|mp3|wav|flac|aac)/i.test(suffix) ||
                            /^audio/.test(file.type)
                        ) {
                            size = 102400;
                        }
                    }
                    if (size && file.size / 1024 > Number(size)) {
                        let error = size >= 1024 ? `${size / 1024}M` : `${size}KB`;
                        resolve({
                            message: `??????${typeName}??????????????????${error}!`,
                            error: 3,
                            validation: false,
                        });
                    } else if (
                        /^\[object String]$/.test(Object.prototype.toString.call(accept)) &&
                        accept !== "" &&
                        !accept.split(",").some((value) => {
                            value = value.trim();
                            return (
                                value &&
                                (new RegExp(`^${value}`).test(file.type) ||
                                    new RegExp(`^${value}`).test(suffix))
                            );
                        })
                    ) {
                        resolve({
                            message: `????????????${accept}!`,
                            error: 4,
                            validation: false,
                        });
                    } else if (
                        (/^\.(png|jpe?g|gif|svg|webp)/i.test(suffix) ||
                            /^image/.test(file.type)) &&
                        (!isNaN(width) || !isNaN(height))
                    ) {
                        const image = new Image();
                        image.onload = function () {
                            let message = "";
                            if (!isNaN(width) && image.width > Number(width)) {
                                message += `????????????????????????${width}`;
                            }
                            if (!isNaN(height) && image.height > Number(height)) {
                                if (message) message += "???";
                                message += `????????????????????????${height}`;
                            }
                            if (message) {
                                resolve({
                                    message,
                                    error: 5,
                                    validation: false,
                                });
                            } else {
                                resolve({
                                    message: "",
                                    error: 0,
                                    validation: true,
                                });
                            }
                        };
                        image.onerror = function () {
                            resolve({
                                message: "??????????????????????????????",
                                error: 6,
                                validation: false,
                            });
                        };
                        image.src = URL.createObjectURL(file);
                    } else {
                        resolve({
                            message: "",
                            error: 0,
                            validation: true,
                        });
                    }
                }
            } else {
                resolve({
                    message: "file???????????????File????????????",
                    error: 1,
                    validation: false,
                });
            }
        });
    }
}
mc.lang = {
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
     * Remove duplicate Array property
     * @param {Array} arr 
     * @returns {Array}
     */
    arrayUnique: function (arr) {
        return [...new Set(arr)]
    },
    /**
     * Remove contiguous string
     * @param {String} str 
     * @returns {String}
     */
    contiguousStringUnique: function (str) {
        return str.replace(/(\w)\1+/g, '$1')
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
    /**
     * Is it a palindrome string
     * @param {String} str 
     * @returns {Boolean} 
     */
    isPalina: function (str) {
        if (Object.prototype.toString.call(str) !== '[object String]') {
            return false;
        }
        var len = str.length;
        for (var i = 0; i < len / 2; i++) {
            if (str[i] != str[len - 1 - i]) {
                return false;
            }
        }
        return true;
    },
    /**
     * quick sort [left] + min + [right]
     * @param {Array} arr 
     * @returns {Array}
     */
    quickSort: function (arr) {
        if (arr.length <= 1) {
            return arr;
        }
        var left = [],
            right = [];
        var pIndex = Math.floor(arr.length / 2);
        var p = arr.splice(pIndex, 1)[0];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] <= p) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        // ??????
        return quickArr(left).concat([p], quickArr(right));
    },
    /**
     * ????????????
     * @param {Number} a 
     * @param {Number} b 
     * @returns 
     */
    sumBigNumber: function (a, b) {
        var res = '', //??????
            temp = 0; //???????????????????????????
        a = a.split('');
        b = b.split('');
        while (a.length || b.length || temp) {
            //~~????????? 1.?????????????????????????????? 2.~~undefined==0 
            temp += ~~a.pop() + ~~b.pop();
            res = (temp % 10) + res;
            temp = temp > 9;
        }
        return res.replace(/^0+/, '');
    },
    /**
     * ??????????????????????????????????????????
     * @param {Array} arr 
     * @param {Function} fn 
     * @returns {Boolean}
     */
    arrayAllMeet: function (arr, fn = Boolean){
        return arr.every(fn);
    },
    /**
     * ?????????????????????????????????????????????
     * @param {Array} arr 
     * @returns {Boolean}
     */
    arrayAllEqual: function (arr) {
        return arr.every(v => val === arr[0]);
    },
    /**
     * ???????????????????????????????????????????????????????????????????????????CVS?????????????????????
     * @param {Array} arr 
     * @param {String} delimiter 
     * @returns 
     */
    arrayToCSV: function (arr, delimiter=",") {
        return arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join("\n");
    },
    /**
     * ???????????????
     * @param  {...any} nums 
     * @returns 
     */
    average: function (...nums) {
        return nums.reduce((acc, val) => Number(acc) + Number(val), 0) / nums.length;
    },
    /**
     * ??????????????????????????????fn??????arr???????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @param {Array} arr 
     * @param {Function} fn 
     * @returns => [[??????], [?????????]] 
     */
    bifurcateBy: function (arr, fn) {
        return arr.reduce((acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc), [[], []]);
    },
    /**
     * ??????????????????????????????????????????
     * @param {Array} arr 
     * @param {any} val 
     * @returns 
     */
    countOccurences: function (arr, val) {
        return arr.reduce((a, v) => (v === val ? a+1 : a), 0);
    }

}

/**
 * String's method
 * String unique
 * @returns {String}
 */
String.prototype.unique = function () {
    var obj = {},
        str = '',
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}

mc.timeUtils = {
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
        let startDate = this.parseDateTime(date1);
        let endDate = this.parseDateTime(date2);
        return (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
    },
    /**
     * 
     * @param {Date|String|Long} obj 
     */
    parseDateTime: function (obj) {
        let type = Object.prototype.toString.call(obj).substring(8);
        let objType = type.substring(0, type.length - 1);
        if (!(objType == "String" || objType == "Number" || objType == "Date")) {
            return null;
        }
        if (objType == "String") {
            return Date.parse(obj);
        } else if (objType == "Number" && !isNaN(parseInt(obj))) {
            return obj;
        } else if (objType == "Date") {
            return obj.getTime();
        } else {
            return null;
        }
    },
    /**
     * format Date
     * yyyy-MM-dd hh:mm:ss SSS
     * @param {Date} date 
     * @param {String} fmt 
     * @returns {String}
     */
    format: function (date, fmt = "yyyy-MM-dd hh:mm:ss") {
        if (Object.prototype.toString.call(date) != '[object Date]') {
            console.error("type error! date must be Date!");
            return;
        }
        var o = {
            "M+": date.getMonth() + 1, //??????
            "d+": date.getDate(), //???
            "h+": date.getHours(), //??????
            "m+": date.getMinutes(), //???
            "s+": date.getSeconds(), //???
            "q+": Math.floor((date.getMonth() + 3) / 3), //??????
            "S": date.getMilliseconds() //??????
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * time string format to another format
     * @param {String} datestr date string param
     * @param {String} preFmt Original Format
     * @param {String} tarFmt target Format
     * @returns {String}
     */
    transFormat: function (datestr, preFmt, tarFmt) {

    },
    /**
     * ?????????????????????????????????
     * @param {Date} date 
     * @returns 
     */
    dayOfYear: function (date = new Date()) {
        return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24); 
    }
}

/**
 * format Date
 * yyyy-MM-dd hh:mm:ss SSS
 * @param {Date} date 
 * @param {String} fmt 
 * @returns {String}
 */
Date.prototype.format = Date.prototype.format ? Date.prototype.format : function (fmt = "yyyy-MM-dd hh:mm:ss") {
    let o = {
        "M+": this.getMonth() + 1, //??????
        "d+": this.getDate(), //???
        "h+": this.getHours(), //??????
        "m+": this.getMinutes(), //???
        "s+": this.getSeconds(), //???
        "q+": Math.floor((this.getMonth() + 3) / 3), //??????
        "S": this.getMilliseconds() //??????
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


/**
 * decrease/increase time by date type
 * yyyy-MM-dd hh:mm:ss SSS
 * @param {Number} n
 * @param {String} type y,M,d,h,m,s,S
 * @returns {Date}
 */
 Date.prototype.add = Date.prototype.add ? Date.prototype.add : function (n, type) {
    let time = this.getTime();
    let dateMapping = {
        "S" : time + n,
        "s" : time + n * 1000,
        "m" : time + n * 1000 * 60,
        "h" : time + n * 1000 * 60 * 60,
        "d" : time + n * 1000 * 60 * 60 * 24,
        "M" : "M" == type ? this.setMonth(this.getMonth() + n) : undefined,
        "y" : "y" == type ? this.setYear(this.getFullYear() + n) : undefined
    }
    if(!dateMapping[type]){
        console.error("param [type] is not correct");
        return null;
    }
    return new Date(dateMapping[type]);
}



mc.utils = {
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
    /**
     * ????????????
     * @param {String} url 
     * @returns 
     */
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
    /**
     * ?????????
     *      ?????????{delay}???????????????????????????{handle}??????????????????????????????
     *      ?????????{delay}?????????????????????{handle}?????????????????????????????????????????????????????????
     * ?????????
     *      ?????????input?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * @param {Function} handle 
     * @param {Number} delay 
     * @returns 
     */
    debounce: function (handle, delay) {
        var timer = null;
        return function () {
            var _self = this,
                _args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                handle.apply(_self, _args)
            }, delay)
        }
    },
    /**
     * ?????????
     *      ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
     * ?????????
     *      ??????resize????????????????????????????????????????????????????????????????????????????????????????????????dom????????????????????????????????????????????????????????????????????????????????????????????????
     * @param {Function} handler 
     * @param {Number} wait 
     * @returns 
     */
    throttle: function (handler, wait) {
        var lastTime = 0;
        return function (e) {
            var nowTime = new Date().getTime();
            if (nowTime - lastTime > wait) {
                handler.apply(this, arguments);
                lastTime = nowTime;
            }
        }
    },
    /**
     * 
     * @param {String} sUrl 
     * @param {String} sKey 
     * @returns {Object|*}
     */
    getUrlParam: function (sUrl, sKey) {
        var result = {};
        sUrl.replace(/(\w+)=(\w+)(?=[&|#])/g, function (ele, key, val) {
            if (!result[key]) {
                result[key] = val;
            } else {
                var temp = result[key];
                result[key] = [].concat(temp, val);
            }
        })
        if (!sKey) {
            return result;
        } else {
            return result[sKey] || '';
        }
    },
    /**
     * 
     * @param {String} sEmail 
     * @returns {Boolean}
     */
    isEmail: function (sEmail) {
        var reg = /^([\w+\.])+@\w+([.]\w+)+$/
        return reg.test(sEmail)
    },
    /**
     * ???????????????????????????
     * @param {String} str 
     * @returns 
     */
    capitalizeEveryWord: function (str) {
        return str.replace(/\b[a-z]/g, char => char.toUpperCase());
    }
}
})();