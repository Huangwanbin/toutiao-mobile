import request from '@/utils/request'

// 联想建议
export const searchResults = q => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索结果
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/search',
    params
  })
}
