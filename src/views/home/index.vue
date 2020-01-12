<template>
  <div class="homeContainer">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" left-arrow @click-left="$router.back()" fixed />
    <!-- /导航栏 -->
    <van-tabs v-model="active">
      <!-- 循环生成频道标签页 -->
      <van-tab :title="item.name" v-for="(item,index) in channels" :key="index">
        <channel-list :channel="item" />
      </van-tab>
      <van-icon name="wap-nav" class="iconforPopup" slot="nav-right" @click="popupShow=!popupShow"/>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="popupShow"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '95%' }"
    >
    <popup-container></popup-container>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel'
import channelList from './components/articleList'
import popupContainer from './components/popupContainer'
export default {
  name: 'homePage',
  props: {},
  components: {
    channelList,
    popupContainer
  },
  data () {
    return {
      active: 0,
      channels: [],
      popupShow: false
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
.homeContainer {
  padding-top: 90px;
}
/deep/ .van-tabs__content {
  padding-bottom: 60px;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
.iconforPopup{
  line-height: 44px;
  // width: 44px;
  font-size: 26px;
  // text-align: center;
  position: fixed;
  right: 0;
  background-color: #fff;
  opacity: 0.8;
}
</style>
