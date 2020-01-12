// 文章相关的接口，一致保存维护
import request from '@/utils/request.js'
// 获取指定id的用户文章列表
export const getUserArticle = ({ id, params }) => {
  return request({
    method: 'get',
    url: `/app/v1_0/users/${id}/articles`,
    params
  })
}

// 获取对应频道文章列表
export const getArticlesByChannel = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
