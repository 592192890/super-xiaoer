/**
 * @file ajax.js
 * @synopsis  ajax
 * @author licuiting, 250602615@qq.com
 * @version 1.0.0
 * @date 2017-07-23
 */

import Vue from 'vue'
import Promise from 'promise'
import axios from 'axios'
import jsonp from 'jsonp';
import querystring from 'querystring';
import router from '@/router/index';
var isPro = (process.env.NODE_ENV === 'production');

//配置tokenId
// axios.defaults.headers.tokenId=sessionStorage.getItem('tokenId');
axios.defaults.timeout = 10000;
axios.defaults.withCredentials=true; 
var ajax = function(type, url, data) {
    if (!isPro) {
        //sessionStorage.setItem(url, JSON.stringify(data));
    };
    if (type == 'post') {
        data = querystring.stringify(data);
    }
    if (type == 'get') {
        data = {
            params: data
        }
    }
    return axios[type](url, data).then((res) => {
        // //为了兼容腾讯地图的webservice api
        // if(res.data.status==0){
        //     return res.data;
        // }
        ///////////////////////////
        if (res.data.error === undefined) {
            center.$emit('globalError', res.data);
        } else if (res.data.error == 0) {
            return res.data;
        } else if (res.data.error === -100) {
            //如果登录失效了，保存该状态
            localStorage.setItem('loginExpired','loginExpired');
            router.push({ name: '登录' });

            // center.$emit('globalError', res.data.msg);
            return res.data;
        } else {
            center.$emit('globalError', res.data.msg);
            return res.data;
        }

    }).catch((err) => {
        center.$emit('globalError', err.message);
    })
}

//ajax
Vue.prototype.$ajax = {
    get: (url, data) => ajax('get', url, data),
    post: (url, data) => ajax('post', url, data),
    jsonp: (url, data) => {
        if (isPro) {
            return new Promise(
                function(resolve, reject) {
                    jsonp(url, data, function(err, res) {
                        resolve(res);
                    })
                }
            )
        } else {
            return ajax('post', url, data);
        }
    }
};