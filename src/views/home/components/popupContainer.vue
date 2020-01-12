<template>
<div class='popupContainer'>
  <div class="title">编辑频道</div>
  <van-cell title="我的频道">
    <van-button slot="right-icon" type="danger" size="mini" round>编辑</van-button>
  </van-cell>
</div>
</template>

<script>
export default {
  name: 'popupContainer',
  props: {},
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  created () {},
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
 </style>
