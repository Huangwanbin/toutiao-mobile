<template>
  <div class="login">
    <van-nav-bar title="登录"></van-nav-bar>
  <ValidationObserver ref="myform">
    <ValidationProvider name='手机号' rules='required|mobile' immediate>
      <van-field placeholder="请输入手机号" v-model="user.mobile">
        <i slot="left-icon" class="icon icon-Mobile-"></i>
      </van-field>
        <!-- <p>{{errors[0]}}</p> -->
    </ValidationProvider>

    <ValidationProvider name='验证码' rules='required|code'  immediate>
      <van-field placeholder="请输入验证码" v-model="user.code">
        <i slot="left-icon" class="icon icon-icon--"></i>
        <div slot="button">
          <van-count-down
            v-if="countDownControl"
            :time="1000*60"
            format="ss 秒"
            @finish="countDownControl=false"
            style="height:30px"
          />
          <van-button v-else size="small" type="primary" @click="changeCountDown">发送验证码</van-button>
        </div>
      </van-field>
    </ValidationProvider>
  </ValidationObserver>
    <div class="loginButton">
      <van-button type="info" @click="login">登录</van-button>
    </div>
    <p class="bottomText">隐私条款</p>
  </div>
</template>

<script>
// import request from '@/utils/request.js'
import { login as onLogin, getCodes } from '@/api/user.js' // 引入用户相关接口
import { validate } from 'vee-validate'
export default {
  name: 'login',
  data () {
    return {
      countDownControl: false,
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async changeCountDown () {
      try {
        const validateResult = await validate(this.user.mobile, 'required|mobile', { name: '手机号' })
        // console.log(validateResult)
        if (!validateResult.valid) {
          this.$toast(validateResult.errors[0])
          return
        }
        // 表单验证成功，执行发送验证码请求
        let result = await getCodes(this.user)
        this.$toast('发送成功，请注意查收！')
        console.log(result)
        this.countDownControl = true
      } catch (error) {
        console.log(error)
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送！')
          return
        }
        this.$toast('发送失败！')
      }
    },
    // 用户登录请求
    async login () {
      const success = await this.$refs.myform.validate()
      if (!success) {
        const errors = this.$refs.myform.errors
        for (let key in errors) {
          const item = errors[key]
          if (item[0]) {
            this.$toast(item[0])
            return
          }
        }
        return
      }
      // 加载loading
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        let result = await onLogin(this.user)
        // console.log(result.data.data)
        this.$store.commit('setUser', result.data.data)
        this.$toast.success('登陆成功嘞')
        this.$router.push('/my')
      } catch (error) {
        console.log(error)
        this.$toast.fail('登陆失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.loginButton {
  padding: 27px 16px;
  button {
    width: 100%;
    background-color: #6db4fb;
  }
}
.bottomText {
  font-size: 12px;
  color: #ccc;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 0;
}
.icon {
  font-size: 18px;
}
.van-field {
  align-items: center;
}
</style>
