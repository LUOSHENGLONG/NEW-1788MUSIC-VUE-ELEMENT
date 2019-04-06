const axios = require('axios')
import { Message, Loading } from 'element-ui' 
import router from '@/router/index'
import store from '@/store'
import app from './main'
axios.defaults.baseURL = 'http://127.0.0.1:3006'
axios.defaults.withCredentials=true;


// 定义loading变量
let loading

// 使用Element Loading.service 方法
function startLoading() {
    loading = Loading.service({
        lock: true,
        background: 'rgba(0,0,0,0.7)'
    })
}

// 使用Element Loading.close 方法
function endLoading() {
    loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
    // 设置请求头
    if (sessionStorage.token) {
        config.headers.Authorization = sessionStorage.token
    } else {
        config.headers.Authorization = localStorage.token
    }
    app.$Progress.start();
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(config => {
    app.$Progress.finish();
    return config
}, error => {
    const { status } = error.response
    // if (status == 401) {
    //     console.log(router)
    //     Message.error('登录失效，请重新登录')
    //     // 清除token
    //     localStorage.removeItem('token')
    //     sessionStorage.removeItem('token')
    //     store.dispatch('clearCurrentState')
    //     // 页面跳转
    //     router.push({path: '/'})
    // }
    return Promise.reject(error)
})



export default axios