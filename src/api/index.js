import axios from 'axios'

import _ from 'lodash'

export const BASE_URL = '/'
axios.defaults.baseURL = BASE_URL
axios.defaults.timeout = 45 * 1000
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // 设置content-type
    config.headers['Content-Type'] = 'application/json; charset=utf-8'


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
    return response.data
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})
export default axios
