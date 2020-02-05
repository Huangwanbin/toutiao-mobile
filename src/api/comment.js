import request from '@/utils/request'
// 获取所有评论
export const getArticleComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params
  })
}

// 发布文章评论
export const addArticleComment = data => {
  return request({
    url: '/app/v1_0/comments',
    method: 'post',
    data
  })
}
