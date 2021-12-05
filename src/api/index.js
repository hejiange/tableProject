import axios from 'axios'
import Router from "../router"
import _ from 'lodash'
import Vue from 'vue'
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
export const BASE_URL = '/'
axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 45 * 1000;
var loadingInstance;
function getCookie(name) {
    var prefix = name + "="
    var start = document.cookie.indexOf(prefix)
 
    if (start == -1) {
        return null;
    }
 
    var end = document.cookie.indexOf(";", start + prefix.length)
    if (end == -1) {
        end = document.cookie.length;
    }
 
    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // 设置content-type
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.headers['token'] = getCookie('token');

    loadingInstance = Loading.service({
        text:"加载中..."
    })
    config.params = config.params || {}

    // 默认禁用缓存
    if (!config.cache) {
        config.params._t = +new Date()
    }

    // 默认开启默认错误处理
    if (config.defaultErrAction === undefined) {
        config.defaultErrAction = true
    }

    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    let config = response.config
    let data = response.data
    let result = data.Result
    let action = data.Action
    let error = data.Error
    loadingInstance && loadingInstance.close();
    if(data.code == '401'){
        Router.push({name:'login'});
        return Promise.reject('登录过期');
    }
    if(data.code !== '200'){
        Message.error(data.msg || "未知异常");
        return Promise.reject(data.msg || "未知异常");
    }
    return response.data
}, function (error) {
    // Do something with response error
    loadingInstance && loadingInstance.close();
    Message.error(error);
    return Promise.reject(error)
})
export default axios
