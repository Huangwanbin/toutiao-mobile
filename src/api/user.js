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

// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}

// 获取当前用户信息
export const getUserInfoById = Id => {
  return request({
    method: 'get',
    url: `/app/v1_0/users/${Id}`
  })
}

// 关注用户
export const followUser = target => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target
    }
  })
}

// 取消关注用户
export const unFollowUser = target => {
  return request({
    url: `/app/v1_0/user/followings/${target}`,
    method: 'delete'
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}

// 编辑用户头像
export const changeUserPhoto = data => {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/photo',
    data
  })
}

// 编辑用户个人资料
export const changeUserProfile = data => {
  return request({
    method: 'patch',
    url: '/app/v1_0/user/profile',
    data
  })
}
