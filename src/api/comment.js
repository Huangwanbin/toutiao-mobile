import request from '@/utils/request'

export const getArticleComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params
  })
}
