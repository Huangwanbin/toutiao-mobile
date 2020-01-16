<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" @click="$router.push('/article/'+item.art_id)" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  methods: {
    async onRefresh () {
      let { data } = await getArticlesByChannel({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 0
      })
      const results = data.data.results
      this.list.unshift(...results)
      // 加载状态结束
      this.isLoading = false
      this.$toast('更新了10条数据')
    },
    async onLoad () {
      // 异步更新数据
      // console.log(this.channel)
      let { data } = await getArticlesByChannel({
        channel_id: this.channel.id,
        timestamp: this.timestamp ? this.timestamp : Date.now(),
        with_top: 0
      })
      const results = data.data.results
      this.list.push(...results)
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
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
</style>
