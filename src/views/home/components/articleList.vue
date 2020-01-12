<template>
  <div class="channel-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.aut_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  name: 'channelList',
  props: { channel: {
    type: Object,
    required: true
  } },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      console.log(this.channel)
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
