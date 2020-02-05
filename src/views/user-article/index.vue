<template>
<div class='user-article'>
    <van-nav-bar
        title="我的收藏/历史/作品"
        left-arrow
        @click-left="$router.back()"
        />
    <van-tabs v-model="active">
        <van-tab title="我的收藏">
            <article-collect></article-collect>
        </van-tab>
        <van-tab title="我的历史">
            <article-history></article-history>
        </van-tab>
        <van-tab title="我的作品">
            <user-articles></user-articles>
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import articleCollect from './components/article-collect'
import articleHistory from './components/article-history'
import userArticles from './components/user-articles'
export default {
  name: 'userArticle',
  props: {},
  components: {
    articleCollect,
    articleHistory,
    userArticles
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {},
  computed: {},
  watch: {},
  created () {},
  mounted () {}
}
</script>

<style lang='less' scoped>

 </style>
