<template>
  <div class="tab-bar">
      <!-- 路由出口 -->
      <router-view  class="routerView"/>

      <!-- tab-bar标签栏 -->
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/questionAndAnswer">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tab-bar',
  data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped>
.routerView{
  width: 100%;
  height: 100vh;
}
</style>
