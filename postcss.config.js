module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 设计稿375:37.5
      // 设计稿：750：75
      // vant是基于375
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
