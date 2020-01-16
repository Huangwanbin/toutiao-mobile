<template>
<div class='popupContainer'>
  <div class="title">编辑频道</div>
  <van-cell title="我的频道">
    <van-button slot="right-icon" type="danger" size="mini" round @click="isEditShow=!isEditShow">{{isEditShow?'完成':'编辑'}}</van-button>
  </van-cell>
  <van-grid :gutter="10">
  <van-grid-item
    v-for="(item,index) in channels"
    :key="index"
    :text="item.name"
    @click="ClickChannel(index)"
  >
  <van-icon name="close" slot="icon" class="closeIcon" v-show="isEditShow&&index!==0" />
  </van-grid-item>
</van-grid>
<van-cell title="推荐频道"></van-cell>
<van-grid :gutter="10">
  <van-grid-item
    v-for="(item,index) in likeChannels"
    :key="index"
    :text="item.name"
    @click='addChannel(index)'
  />
</van-grid>
</div>
</template>

<script>
import { AllChannels } from '@/api/channel'
export default {
  name: 'popupContainer',
  props: {
    // 父组件传过来的频道列表
    channels: {
      required: true,
      type: Array
    }
  },
  components: {},
  data () {
    return {
      allChannels: [], // 所有频道
      isEditShow: false // 删除按钮是否隐藏
    }
  },
  methods: {
    // 删除频道或者进入频道
    ClickChannel (index) {
      if (this.isEditShow && index !== 0) {
        this.channels.splice(index, 1)
      } else {
        this.$emit('enterChannel', index)
      }
    },
    // 编辑频道
    addChannel (index) {
      this.channels.push(this.likeChannels[index])
    },
    // 获取所有频道
    async getAllchannels () {
      let { data } = await AllChannels()
      this.allChannels = data.data.channels
      // console.log(this.allChannels)
    }
  },
  computed: {
    // 计算推荐频道
    likeChannels () {
      let arr = []
      this.allChannels.forEach(item => {
        let channel = this.channels.find(itm => {
          return item.id === itm.id
        })
        if (!channel) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  watch: {},
  created () {
    this.getAllchannels()
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
.popupContainer{
  // padding-top: 40px;
  .title{
    line-height: 40px;
    font-size: 20px;
    text-align: center;
  }
}
.closeIcon{
  font-size: 16px;
  position: absolute;
  top: -20px;
  right: -45px;
}
 </style>
