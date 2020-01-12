import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // vuex
// vant组件
import './utils/register-vant'
// vee-validate组件，表单验证
import './utils/validation.js'

import 'amfe-flexible' // 引入移动端适配

import './styles/index.css' // 引入公共样式及基础样式

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
