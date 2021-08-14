let utils = {
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
     * 播放音频
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
    },
    capitalizeEveryWord: function (str) {
        return str.replace(/\b[a-z]/g, char => char.toUpperCase());
    }
}