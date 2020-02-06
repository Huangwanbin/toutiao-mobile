<template>
  <div class="user-articles">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title"  @click="$router.push('/article/'+item.art_id)"/>
    </van-list>
  </div>
</template>

<script>
import { getUserArticles } from '@/api/article'
export default {
  name: 'userArticle',
  props: {},
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getUserArticles({
        page: this.page,
        per_page: this.per_page
      })
      // console.log(data)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.page++
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
