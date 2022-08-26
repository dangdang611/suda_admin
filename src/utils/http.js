/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */


import axios from 'axios';
import Cookie from "js-cookie"
import qs from 'qs'

axios.defaults.timeout = 3000;
axios.defaults.baseURL = '';


// http request 拦截器
axios.interceptors.request.use(
    config => {
        const token = Cookie.get('rootTaken'); //注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json; charset=utf-8'
        }
        if (token) {
            console.log(token)
            config.headers.rootTaken = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.errCode ==2){
//       router.push({
//         path:"/login",
//         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                if (response.data.code === "200") {
                    resolve(response.data)
                } else if (response.data.status === 0) {
                    resolve(response.data)
                } else {
                    reject(response.data)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                if (response.data.code === "200") {
                    resolve(response.data)
                } else {
                    reject(response.data)
                }
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                if (response.data.code === "200") {
                    resolve(response.data)
                } else {
                    reject(response.data)
                }
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                if (response.data.code === "200") {
                    resolve(response.data)
                } else {
                    reject(response.data)
                }
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
                params: params,
                paramsSerializer: params => {
                    return qs.stringify(params, {
                        indices: false
                    })
                }
            })
            .then(response => {
                if (response.data.code === "200") {
                    resolve(response.data)
                } else {
                    reject(response.data)
                }
            }, err => {
                reject(err)
            })
    })
}
