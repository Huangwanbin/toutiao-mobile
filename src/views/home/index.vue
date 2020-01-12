<template>
  <div class="homeContainer">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-tabs v-model="active">
      <!-- 循环生成频道标签页 -->
      <van-tab :title="item.name" v-for="(item,index) in channels" :key="index">
        <channel-list :channel='item' />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import channelList from './components/articleList'
export default {
  name: 'homePage',
  props: {},
  components: {
    channelList
  },
  data () {
    return {
      active: 1,
      channels: []
    }
  },
  methods: {
    async getChannels () {
      const { data } = await getChannels()
      this.channels = data.data.channels
      // console.log(this.channels)
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getChannels()
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
</style>
