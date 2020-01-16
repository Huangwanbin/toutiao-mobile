<template>
  <div class="searchPage">
    <form action="/" class="topContainer">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        @focus="SearchFocus"
        @input="onThinkSearch"
        @search="onSearch(searchValue)"
        @cancel="onCancel"
        slot="title"
      />
    </form>

    <!-- 搜索结果列表 -->
    <search-result v-if="isResultShow" :q="searchValue"></search-result>
    <!-- 联想搜索 -->
    <van-cell-group v-else-if="searchValue">
      <van-cell icon="search" v-for="(item,index) in suggestionList" :key="index" @click="suggestionSearch(item)">
        <div slot="title" v-html="highLight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 历史搜索记录 -->
    <div v-else>
      <van-cell title="历史记录">
        <div slot="default" class="historySearch">
          <van-icon
            name="delete"
            @click="isDeleteHistoryShow=!isDeleteHistoryShow"
            v-if="!isDeleteHistoryShow"
          />
          <div v-else>
            <span @click="historyList=[]">全部删除</span>
            &nbsp;&nbsp;
            <span @click="isDeleteHistoryShow=!isDeleteHistoryShow">完成</span>
          </div>
        </div>
      </van-cell>
      <van-cell-group>
        <van-cell :title="item" v-for="(item,index) in historyList" :key="index" @click="OnHistoryClick(item,index)">
          <van-icon name="close" slot="right-icon" v-if="isDeleteHistoryShow"  />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import searchResult from './component/search-result'
import { searchResults } from '@/api/search'
import { debounce } from 'lodash'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'searchPage',
  props: {},
  components: {
    searchResult
  },
  data () {
    return {
      isDeleteHistoryShow: false, // 删除按钮
      historyList: getItem('historyList') || [], // 历史搜索
      suggestionList: [], // 联想建议
      searchValue: '', // 搜索内容
      isResultShow: false // 搜索结果结果
    }
  },
  methods: {
    // 联想建议搜索
    suggestionSearch (q) {
      this.onSearch(q)
    },
    // 通过历史搜素
    OnHistoryClick (item, index) {
      if (this.isDeleteHistoryShow) {
        this.historyList.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    },
    // 搜索框获取焦点，不展示搜索结果
    SearchFocus () {
      this.isResultShow = false
    },
    // 高亮
    highLight (str) {
      let reg = new RegExp(this.searchValue, 'ig')
      return str.replace(
        reg,
        `<span style='color:red'>${this.searchValue}</span>`
      )
    },
    // 确认搜索事件
    onSearch (q) {
      this.searchValue = q
      this.isResultShow = true
      const index = this.historyList.indexOf(q)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(q)
    },
    // 联想建议,注意用了防抖处理函数后，不要用箭头函数，this就不指向vue实例了
    onThinkSearch: debounce(async function () {
      if (!this.searchValue) {
        return
      }
      let { data } = await searchResults(this.searchValue)
      this.suggestionList = data.data.options
      // console.log(this.suggestionList)
    }, 500),
    // 取消搜索
    onCancel () {
      this.$router.back()
    }
  },
  computed: {},
  watch: {
    historyList (newValue, oldValue) {
      setItem('historyList', newValue)
    }
  },
  created () {},
  mounted () {}
}
</script>

<style lang='less' scoped>
.topContainer {
  position: fixed;
  top: 0;
  width: 100%;
  .van-search {
    background-color: #3296fa !important;
    .van-search__action {
      color: #fff;
    }
  }
}
.searchPage {
  padding-top: 54px;
}
</style>
