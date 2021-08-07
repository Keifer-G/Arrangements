let timeUtils = {
    getYear: function(){
        console.log(new Date());
    },
    /**
     * 
     * @param {*} days Days difference
     * @param {String} link Date connector
     * @returns {String} 
     */
    getDay: function(days, link="-"){
        let dayNum = parseInt(days);
        let now = new Date().getTime();
        let someoneday = now + (isNaN(dayNum) ? 0 : dayNum*1000*60*60*24);
        let newd = new Date(someoneday);
        let newm = newd.getMonth(),newdate = newd.getDate();
        return newd.getFullYear() +link+ (newm+1 < 10 ? "0"+ (newm+1) : newm) +link+ (newdate < 10 ? "0"+ newdate : newdate);
    }
}
