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