<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar :title="userInfo.name" left-arrow
  @click-left="$router.back()"/>
    <!-- /导航栏 -->

    <!-- 用户信息 -->
    <div class="user-info-container">
      <div class="row1">
        <van-image class="col1" fit="cover" round :src="userInfo.photo" />
        <div class="col2">
          <div class="row1">
            <div class="item">
              <div class="count">{{userInfo.art_count}}</div>
              <div class="text">发布</div>
            </div>
            <div class="item">
              <div class="count">{{userInfo.follow_count}}</div>
              <div class="text">关注</div>
            </div>
            <div class="item">
              <div class="count">{{userInfo.fans_count}}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="item">
              <div class="count">{{userInfo.like_count}}</div>
              <div class="text">获赞</div>
            </div>
          </div>
          <div class="action">
            <van-button type="primary" size="small" v-if="$route.params.id===userInfo.id">私信</van-button>
            <van-button type="default" size="small" v-else>编辑资料</van-button>
            <van-button type="default" size="small" v-if="$route.params.id===userInfo.id">关注</van-button>
          </div>
        </div>
      </div>
      <div class="intro-wrap">
        <div v-if="userInfo.certi!==''">
          <span>认证：</span>
          <span>{{userInfo.certi}}</span>
        </div>
        <div>
          <span>简介：</span>
          <span>{{userInfo.intro}}</span>
        </div>
      </div>
    </div>
    <!-- /用户信息 -->

    <!-- 文章列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.id" :title="item.title" />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/user'
import { getUserArticle } from '@/api/article'

export default {
  name: 'user',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      userInfo: {},
      articleInfo: {
        page: 1,
        per_page: 20
      }
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      let res = await getUserArticle({ id: this.$route.params.id, params: this.articleInfo })
      const { results } = res.data.data
      this.list.push(...results)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (results.length) {
        this.articleInfo.page++
      } else {
        this.finished = true
      }
    },
    async getInfoById () {
      const res = await getUserInfoById(this.$route.params.id)
      const { data } = res.data
      this.userInfo = data
    //   console.log(data)
    }
  },
  created () {
    this.getInfoById()
    // this.getUserArticles()
  }
}
</script>

<style lang='less' scoped>
.user-container {
  font-size: 14px;
  .user-info-container {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 10px;
    > .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .item {
        text-align: center;
        .text {
          font-size: 12px;
        }
      }
      > .col1 {
        width: 80px;
        height: 80px;
      }
      > .col2 {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width: 70%;
        height: 80px;
        padding: 0 12px;
        > .row1 {
          display: flex;
          justify-content: space-between;
        }
        .action {
          display: flex;
          justify-content: space-between;
          .van-button {
            width: 45%;
          }
        }
      }
    }
  }
}
</style>
