<template>
<!-- 输入评论组件 -->
  <div class="post-comment">
    <van-field
      :value="value"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="textarea"
      @input="$emit('onInput',$event)"
    />
    <p class="public" @click="$emit('click-post')">发布</p>
  </div>
</template>

<script>
export default {
  name: 'postComment',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      message: ''
    }
  },
  methods: {
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {}
}
</script>

<style lang='less' scoped>
.post-comment{
    display: flex;
    align-items: center;
    .textarea{
        background-color: pink;
        .van-field__control{
            height: 100px;
        }
    }
    .public{
        text-align: center;
        width: 55px;
        font-size: 16px;
    }
}
</style>
