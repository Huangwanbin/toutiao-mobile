<template>
  <div class="comment-popup">
    <van-field
      v-model="message"
      rows="3"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="textarea"
    />
    <p class="public">发布</p>
  </div>
</template>

<script>
export default {
  name: 'commentPopup',
  props: {},
  components: {},
  data () {
    return {
      message: ''
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
.comment-popup{
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
