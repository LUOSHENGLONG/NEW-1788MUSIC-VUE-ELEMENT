const axios = require('axios')

axios.defaults.baseURL = 'http://127.0.0.1:3006'

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
    // 加载
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截  401 token过期处理
axios.interceptors.response.use(response => {
    return response
}, error => {
    // 错误提醒
    return Promise.reject(error)
    }
)

export default axios