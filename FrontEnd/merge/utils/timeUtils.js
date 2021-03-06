let timeUtils = {
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


