import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js' // 本地存储方法载入
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      // 解析，添加登录者id
      data.id = jwtDecode(data.token).user_id
      state.user = data
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
