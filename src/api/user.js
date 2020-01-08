// 用户相关的接口，一致保存维护
import request from '@/utils/request.js'
// 登录验证
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const getCodes = data => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${data.mobile}`
  })
}
