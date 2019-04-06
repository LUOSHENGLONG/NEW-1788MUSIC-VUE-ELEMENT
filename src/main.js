// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
// import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'


import VueProgressBar from 'vue-progressbar'

import router from './router'
import store from './store'
// Vue.use(ElementUI)
// Vue.use(Vuex)
Vue.config.productionTip = false


// 图片懒加载
Vue.use(VueLazyLoad,{
  preLoad: 1.5,
  error: require('./assets/svg/1788music.svg'),
  loading: require('./assets/svg/1788music.svg')
})

// 顶部进度条配置
const options = {
    color: '#409EFF',
    failedColor: '#874b4b',
    thickness: '2px',
    transition: {
      speed: '0.2s',
      opacity: '0.6s',
      termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}

Vue.use(VueProgressBar, options)


// 引入jquery
import $ from 'jquery'
Vue.prototype.$ = $

// 引入axios
import axios from './http'
Vue.prototype.$axios = axios

import 'element-ui/lib/theme-chalk/display.css';
// 初始化css
import '@/assets/css/normalize.css'
// import 'element-ui/lib/theme-chalk/index.css'

export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
