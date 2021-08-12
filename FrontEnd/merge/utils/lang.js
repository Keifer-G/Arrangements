let lang = {
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