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

// 获取文章详情
export const getArticleContent = id => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${id}`
  })
}

// 添加收藏
export const addCollect = id => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'post',
    data: {
      target: id
    }
  })
}

// 取消收藏
export const removeCollect = id => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${id}`
  })
}

// 点赞
export const addLike = id => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data: {
      target: id
    }
  })
}

// 取消点赞
export const removeLike = id => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${id}`
  })
}

// 获取用户收藏列表
export const getUserCollectArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/article/collections',
    params
  })
}

// 获取用户阅读历史
export const getUserHistoryArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/histories',
    params
  })
}

// 获取用户作品
export const getUserArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/articles',
    params
  })
}
