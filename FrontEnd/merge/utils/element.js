let element = {
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
    /**
     * 检测页面是否滚动到页面底部
     * @returns {Boolean}
     */
    bottomVisible: function () {
        return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight);
    }
}