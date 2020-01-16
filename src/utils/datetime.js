import moment from 'moment'
import Vue from 'vue'

Vue.use(moment)

// 配置中文语言
moment.locale('zh-cn')
// 相对时间
Vue.filter('relativeTime', value => {
  return moment(value).startOf('hour').fromNow()
})
// 日期格式化
Vue.filter('dateTime', value => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
})
