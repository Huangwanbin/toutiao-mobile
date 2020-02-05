<template>
<!-- 评论列表 -->
<div class='article-comment'>
    <h4 class="title">全部评论</h4>
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item v-for="(item,index) in list" :key="index" :comment='item'></comment-item>
    </van-list>
    <!-- 评论列表 -->

</div>
</template>

<script>
import { getArticleComments } from '@/api/comment'
import commentItem from './comment-item'
export default {
  name: 'articleComment',
  props: {
    articleId: {
      required: true,
      type: [String, Number]
    }
  },
  components: {
    commentItem
  },
  data () {
    return {
      offset: null, // 请求下一页数据的页码
      totalCount: 0, // 总数据条数
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const { data } = await getArticleComments({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: this.limit
      })
      const { results } = data.data
      //   console.log(results)
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {}
}
</script>

<style lang='less' scoped>
.article-comment{
    .title{
        font-size: 20px;
    }
  .van-list {
    margin-bottom: 45px;
  }
}

 </style>
