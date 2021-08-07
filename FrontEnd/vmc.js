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
    initLocalStorage: function (storages) {
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
    addLocalStorage: function (key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (err) {
            console.error(err);
        }
    }

}
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