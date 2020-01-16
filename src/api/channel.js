// 频道相关接口
import request from '@/utils/request'

export const getChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}

export const AllChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
