// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import router from './router'
import store from './store'
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false


//图片懒加载
Vue.use(VueLazyLoad,{
  error:'@/assets/images/1788.png',
  loading:'@/assets/images/lazy8.gif'
})


// 引入jquery
import $ from 'jquery'
Vue.prototype.$ = $

// 引入axios
import axios from './http'
Vue.prototype.$axios = axios

import 'element-ui/lib/theme-chalk/display.css';
// 初始化css
import '@/assets/css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
