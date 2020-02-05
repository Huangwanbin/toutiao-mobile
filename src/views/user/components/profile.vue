<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image round width="30" height="30" fit="cover" :src="user.photo" @click="onClickFile" />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link @click="isUserNameShow=true" />
      <van-cell title="介绍" value="内容" is-link />
      <van-cell title="性别" :value="user.gender===1?'女':'男'" is-link @click="isUserGenderShow=true" />
      <van-cell title="生日" :value="user.birthday" is-link @click="isUserBirthdayShow=true" />
    </van-cell-group>
    <!-- 上传图片 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 昵称弹出层 -->
    <van-popup v-model="isUserNameShow" position="bottom" :style="{ height: '20%' }">
      <div>
        <van-nav-bar
          title="编辑昵称"
          left-text="取消"
          right-text="确定"
          @click-left="isUserNameShow=false"
          @click-right="onUserNameSave"
        />
        <van-field
          @input="inputName=$event"
          :value="user.name"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          placeholder="请输入昵称"
          show-word-limit
        />
      </div>
    </van-popup>
    <!-- 性别 -->
    <van-action-sheet
      v-model="isUserGenderShow"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      @cancel="isUserGenderShow=false"
    />
    <!-- 生日 -->
    <van-popup v-model="isUserBirthdayShow" position="bottom">
      <div>
        <van-datetime-picker
          :value="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel='isUserBirthdayShow=false'
          @confirm='onUserBirthdaySave'
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, changeUserPhoto, changeUserProfile } from '@/api/user.js'
import moment from 'moment'
export default {
  name: 'userProfile',
  props: {},
  components: {},
  data () {
    return {
      user: {},
      inputName: '',
      isUserNameShow: false,
      isUserGenderShow: false,
      isUserBirthdayShow: false,
      actions: [
        { name: '男', type: 0 },
        { name: '女', type: 1 }
      ],
      minDate: new Date(1970, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    // 保存生日
    async onUserBirthdaySave (value) {
      await changeUserProfile({ birthday: moment(value).format('YYYY-MM-DD') })
      this.user.birthday = moment(value).format('YYYY-MM-DD')
      this.isUserBirthdayShow = false
    },
    async onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      await changeUserProfile({ gender: item.type })
      this.user.gender = item.name
      this.isUserGenderShow = false
      this.$toast('成功更改为:' + item.name)
    },
    // 保存用户昵称
    async onUserNameSave () {
      await changeUserProfile({ name: this.inputName })
      this.user.name = this.inputName
      this.isUserNameShow = false
    },
    // 图片改变事件
    async onFileChange () {
      // 获取dom
      const file = this.$refs.file
      // 创建图片地址
      const fileData = window.URL.createObjectURL(file.files[0])
      this.user.photo = fileData
      // console.log(data)
      const fd = new FormData()
      fd.append('photo', file.files[0])
      await changeUserPhoto(fd)
      console.log('yes')
    },
    // 点击图片上传
    onClickFile () {
      this.$refs['file'].click()
    },
    // 获取用户信息
    async getUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
      // console.log(data)
    }
  },
  computed: {
    currentDate () {
      // 把字符串格式的日期转换为 JavaScript 日期对象，设置给 Vant 日期选择器
      return new Date(this.user.birthday)
    }
  },
  watch: {},
  created () {
    this.getUserProfile()
  },
  mounted () {}
}
</script>

<style lang='less' scoped>
.van-popup{
.van-nav-bar {
  background-color: #fff;
  .van-nav-bar__title {
    color: #000;
  }
}
}

.genderContent {
  padding: 16px 0px;
}
</style>
