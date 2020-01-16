<template>
<div class='searchResult'>
 <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
      <van-cell v-for="(item,index) in searchArticles" :key="index" :title="item.title"  @click="$router.push('/article/'+item.art_id)" />
    </van-list>
</div>
</template>

<script>
import { getArticles } from '@/api/search'
export default {
  name: 'searchResult',
  props: {
    q: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      page: 1,
      searchArticles: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async  onLoad () {
      // 异步更新数据
      const { data } = await getArticles({
        q: this.q,
        page: this.page,
        per_page: 10
      })
      // console.log(data)
      const { results } = data.data
      this.searchArticles.push(...results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {}
}
</script>

<style lang='less' scoped>

 </style>
