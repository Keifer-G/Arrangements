/* advantage */
//语法简洁，更加语义化
//基于标准 Promise 实现，支持 async/await
//同构方便，使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
//更加底层，提供的API丰富（request, response）
//脱离了XHR，是ES规范里新的实现方式

/* shortcoming */
//fetch只对网络请求报错，对400，500都当做成功的请求，服务器返回 400，500 错误码时并不会 reject，只有网络错误这些导致请求不能完成时，fetch 才会被 reject。
//fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
//fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了流量的浪费
//fetch没有办法原生监测请求的进度，而XHR可以
let fetchUtils = {
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