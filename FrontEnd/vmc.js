// create global vmc
let vmc = {};
(function(){
// register method collections
// register codes come from merge.js
// first run merge.js to create methods then copy here
vmc.doajax = {
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

vmc.utils = {
    isEmpty: function(value){
        if ( value == null ) return value;
        
    } 
}
})();