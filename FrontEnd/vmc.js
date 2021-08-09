// create global vmc
let vmc = {};
(function () {
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
    vmc.fetch = {
        GET: {
            method: 'GET',
            credentials: 'include'
        },
        POST: {
            method: 'POST',
            credentials: 'include'
        },
        get: function (url) {
            let req = new Request(url, this.GET);
            fetch(req).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response.text());
                }
            })
        }
    }
    vmc.element = {
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
            if (oscript.readyState) { // ie8及以下版本
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

    }
    vmc.lang = {
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
            // 递归
            return quickArr(left).concat([p], quickArr(right));
        },
        /**
         * 大数相加
         * @param {Number} a 
         * @param {Number} b 
         * @returns 
         */
        sumBigNumber: function (a, b) {
            var res = '', //结果
                temp = 0; //按位加的结果及进位
            a = a.split('');
            b = b.split('');
            while (a.length || b.length || temp) {
                //~~按位非 1.类型转换，转换成数字 2.~~undefined==0 
                temp += ~~a.pop() + ~~b.pop();
                res = (temp % 10) + res;
                temp = temp > 9;
            }
            return res.replace(/^0+/, '');
        }

    }

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
        format: function (date, fmt) {
            if (Object.prototype.toString.call(date) != '[object Date]') {
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
        /**
         * time string format to another format
         * @param {String} datestr date string param
         * @param {String} preFmt Original Format
         * @param {String} tarFmt target Format
         * @returns {String}
         */
        transFormat: function (datestr, preFmt, tarFmt) {

        }
    }

    /**
     * format Date
     * yyyy-MM-dd hh:mm:ss SSS
     * @param {Date} date 
     * @param {String} fmt 
     * @returns {String}
     */
    Date.prototype.format = Date.prototype.format ? Date.prototype.format : function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    vmc.utils = {
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
         * 
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
         * 防抖：
         *      如果在{delay}时间内没有再次触发{handle}事件，那么就执行函数
         *      如果在{delay}时间内再次触发{handle}事件，那么当前的计时取消，重新开始计时
         * 案例：
         *      搜索框input事件，例如要支持输入实时搜索可以使用节流方案（间隔一段时间就必须查询相关内容）
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
         * 节流：
         *      如果短时间内大量触发同一事件，那么在函数执行一次之后，该函数在指定的时间期限内不再工作，直至过了这段时间才重新生效
         * 案例：
         *      页面resize事件，常见于需要做页面适配的时候。需要根据最终呈现的页面情况进行dom渲染（这种情形一般是使用防抖，因为只需要判断最后一次的变化情况）
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
        }
    }
})();