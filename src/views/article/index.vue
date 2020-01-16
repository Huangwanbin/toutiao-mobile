<template>
  <div class="article-page">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow fixed @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading class="loading" color="#1989fa" vertical v-if="isLoadingShow">
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="articleContent.title">
      <h3 class="title">{{articleContent.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image class="avatar" round fit="cover" :src="articleContent.aut_photo" />
          <div class="text">
            <p class="name">{{articleContent.aut_name}}</p>
            <p class="time">{{articleContent.pubdate | relativeTime}}</p>
          </div>
        </div>
        <van-button
          class="follow-btn"
          :type="articleContent.is_followed?'default':'info'"
          size="small"
          :loading="isBtnLoading"
          round
          v-if="!$store.state.user||articleContent.aut_id!==$store.state.user.id"
          @click="onFllowClick"
        >{{articleContent.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="articleContent.content"></div>
      <van-divider>正文结束</van-divider>
      <!-- 文章评论 -->
      <article-comment :articleId="articleId"></article-comment>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network" />
      <p class="text">亲，网络不给力哦~</p>
      <van-button class="btn" type="default" size="small">点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button class="write-btn" type="default" round size="small" @click="isPopupShow=true">写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" info="9" />
      <van-icon
        color="orange"
        :name="articleContent.is_collected?'star':'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="articleContent.attitude===1?'good-job':'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->

    <!-- 底部弹出层 -->
    <van-popup v-model="isPopupShow" position="bottom" :style="{ height: '20%' }" class="popup">
      <comment-popup class="popupContent"></comment-popup>
    </van-popup>
  </div>
</template>

<script>
import {
  getArticleContent,
  addCollect,
  removeCollect,
  removeLike,
  addLike
} from '@/api/article'
import { followUser, unFollowUser } from '@/api/user'
import articleComment from './components/article-comment'
import commentPopup from './components/comment-popup'
export default {
  name: 'articlePage',
  props: {
    articleId: {
      required: true,
      type: String
    }
  },
  components: {
    articleComment,
    commentPopup
  },
  data () {
    return {
      isPopupShow: false,
      isBtnLoading: false,
      articleContent: {},
      isLoadingShow: false
    }
  },
  methods: {
    // 关注按钮
    async onFllowClick () {
      this.isBtnLoading = true
      try {
        // 如果已经关注，则取消关注
        if (this.articleContent.is_followed) {
          await unFollowUser(this.articleContent.aut_id)
          this.$toast({
            type: 'success',
            message: '取消关注'
          })
        } else {
          // 如果没有关注，关注
          await followUser(this.articleContent.aut_id)
          this.$toast({
            type: 'success',
            message: '已关注'
          })
        }
        this.articleContent.is_followed = !this.articleContent.is_followed
      } catch (err) {
        console.log(err)
      }
      this.isBtnLoading = false
    },
    // 点赞按钮
    async onLike () {
      this.$toast.loading({
        duration: 0,
        message: '操作中。。。',
        forbidClick: true
      })
      try {
        if (this.articleContent.attitude === 1) {
          // 取消点赞
          await removeLike(this.articleContent.art_id)
          // console.log(res)
          this.articleContent.attitude = -1
          this.$toast({ type: 'success', message: '取消点赞' })
        } else {
          // 点赞
          await addLike(this.articleContent.art_id)
          // console.log(res)
          this.articleContent.attitude = 1
          this.$toast({ type: 'success', message: '已点赞' })
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 收藏按钮
    async onCollect () {
      this.$toast.loading({
        duration: 0,
        message: '操作中。。。',
        forbidClick: true
      })
      try {
        if (this.articleContent.is_collected) {
          // 取消收藏
          await removeCollect(this.articleContent.art_id)
          // console.log(res)
          this.$toast({ type: 'success', message: '取消收藏' })
        } else {
          // 添加收藏
          await addCollect(this.articleContent.art_id)
          // console.log(res)
          this.$toast({ type: 'success', message: '收藏成功' })
        }
        this.articleContent.is_collected = !this.articleContent.is_collected
      } catch (err) {
        console.log(err)
      }
    },
    // 获取文章详情
    async getArticleById () {
      try {
        this.isLoadingShow = true
        const { data } = await getArticleContent(this.articleId)
        console.log(data)
        this.articleContent = data.data
      } catch (err) {
        console.log(err)
      }
      this.isLoadingShow = false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleById()
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
@import "./markdown.css";
.article-page {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3a3a3a;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
.popup{
  padding: 15px 0 15px 15px;
  .popupContent{
    height: 130px;
    width: 350px;
  }
}
</style>
