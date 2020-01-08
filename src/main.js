import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vant组件
import './utils/register-vant'
// vee-validate组件，表单验证
import './utils/validation.js'

import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
